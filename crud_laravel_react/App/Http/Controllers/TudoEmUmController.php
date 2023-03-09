<?php

namespace App\Http\Controllers;

use App\Models\TudoEmUmModel;
use App\Models\Entidades\Pessoa;
use DateTimeZone;
use DateTime;

final class TudoEmUmController extends TemplateController{
  private const QUANTIDADE_PADRAO_POR_PAGINA = 10;

  public function carregar_pagina($redirecionar = false){
    if($redirecionar){
      /* Redireciona para si mesmo, motivo: limpar a requisição. */
      header('Location: /tudo_em_um');
      die;
    }

    $valores = $this->valores_do_template();
    $pessoa = new Pessoa();

    /* Consultando valores */
    $array_setores = $this->consultar_setores();

    /* Definindo valores */
    $quantidades_por_pagina['padrao'] = 'Selecione';
    $quantidades_por_pagina['1'] = '1';
    $quantidades_por_pagina['5'] = '5';
    $quantidades_por_pagina['10'] = '10';
    $quantidades_por_pagina['15'] = '15';
    $quantidades_por_pagina['20'] = '20';
    $quantidades_por_pagina['25'] = '25';
    $quantidades_por_pagina['30'] = '30';
    $quantidades_por_pagina['50'] = '50';
    $quantidades_por_pagina['75'] = '75';
    $quantidades_por_pagina['100'] = '100';

    /* Colocando valores iniciais nas variáveis para não ficarem undefined no Blade */
    $valores['setores'] = $array_setores;
    $valores['quantidades_por_pagina'] = $quantidades_por_pagina;
    $valores['sexos'] = $pessoa->enum_sexo();
    $valores['lista_de_pessoas'] = $this->mostrar_pessoas();

    return view('tudo_em_um/tudo_em_um', $valores);
  }

  private function consultar_setores(){
    $tudo_em_um_model = new TudoEmUmModel();

    $setores = $tudo_em_um_model->selecionar_setores();
    $array_setores = array();
    foreach($setores as $setor){
      $array_setor = array();

      $array_setor['id'] = $setor->get_pk_setor();
      $array_setor['nome'] = $setor->get_nome();
      $array_setor['descricao'] = $setor->get_descricao();

      $array_setores[] = $array_setor;
    }

    return $array_setores;
  }

  private function mostrar_pessoas($metodo = 'get'){
    $tudo_em_um_model = new TudoEmUmModel();

    $valores = array();

    $requisicao = $this->get_requisicao();

    /* Preparando os filtros */
    $filtros = array();
    $filtro_nome = trim($requisicao->$metodo('filtro_nome') ?? '');
    if($filtro_nome !== ''){
      $filtros['nome'] = $filtro_nome;
    }
    $valores['filtro_nome'] = $filtro_nome;

    $filtro_cpf = trim($requisicao->$metodo('filtro_cpf') ?? '');
    if($filtro_cpf !== ''){
      $filtros['cpf'] = $filtro_cpf;
    }
    $valores['filtro_cpf'] = $filtro_cpf;

    $filtro_data_de_nascimento = trim($requisicao->$metodo('filtro_data_de_nascimento') ?? '');
    if($filtro_data_de_nascimento !== ''){
      $data_convertida = $this->converter_para_data_do_sql($filtro_data_de_nascimento);
      $filtros['data_de_nascimento'] = $data_convertida;
    }
    $valores['filtro_data_de_nascimento'] = $filtro_data_de_nascimento;

    $filtro_id_do_setor = $requisicao->$metodo('filtro_id_do_setor');
    if($filtro_id_do_setor !== '' && $filtro_id_do_setor !== null){
      $filtros['id_do_setor'] = $filtro_id_do_setor;
    }
    $valores['filtro_id_do_setor'] = $filtro_id_do_setor;

    /* Preparando a ordenação */
    $ordenacao = $requisicao->$metodo('ordenacao');
    $valores['ordem_do_nome'] = '';
    $valores['ordem_do_cpf'] = '';
    $valores['ordem_do_setor'] = '';
    $valores['ordem_do_contato'] = '';
    switch($ordenacao){
      case 'padrao':
        break;
      case 'nome_completo_a_z':
        $valores['ordem_do_nome'] = ' (A → Z)';
        break;
      case 'nome_completo_z_a':
        $valores['ordem_do_nome'] = ' (Z → A)';
        break;
      case 'cpf_crescente':
        $valores['ordem_do_cpf'] = ' (0 → 9)';
        break;
      case 'cpf_decrescente':
        $valores['ordem_do_cpf'] = ' (9 → 0)';
        break;
      case 'setor_a_z':
        $valores['ordem_do_setor'] = ' (A → Z)';
        break;
      case 'setor_z_a':
        $valores['ordem_do_setor'] = ' (Z → A)';
        break;
      case 'contato_a_z':
        $valores['ordem_do_contato'] = ' (A → Z)';
        break;
      case 'contato_z_a':
        $valores['ordem_do_contato'] = ' (Z → A)';
        break;
      default:
        $ordenacao = 'padrao';
        break;
    }
    $valores['ordenacao'] = $ordenacao;

    /* Preparando a paginação */
    $quantidade_por_pagina = (int) $requisicao->$metodo('quantidade_por_pagina');
    $valores['quantidade_por_pagina'] = $quantidade_por_pagina;
    if($quantidade_por_pagina < 1 or $quantidade_por_pagina > 250){
      $quantidade_por_pagina = self::QUANTIDADE_PADRAO_POR_PAGINA;
      $valores['quantidade_por_pagina'] = 'padrao';
    }

    $pagina = (int) $requisicao->$metodo('pagina');
    if($pagina < 1){
      $pagina = 1;
    }
    $quantidade_de_paginas = $this->calcular_quantidade_de_paginas_da_lista_de_pessoas($filtros,
      $quantidade_por_pagina);
    if($pagina > $quantidade_de_paginas){
      $pagina = $quantidade_de_paginas;
    }

    $valores['pagina_atual'] = $pagina;
    $valores['ultima_pagina'] = $quantidade_de_paginas;

    $descartar = $quantidade_por_pagina * $pagina - $quantidade_por_pagina;
    $descartar = $descartar >= 0 ? $descartar : 0;

    /* Preparando o resultado */
    $pessoas = $tudo_em_um_model->selecionar_pessoas($filtros, $ordenacao, $quantidade_por_pagina,
      $descartar);
    $array_pessoas = array();
    foreach($pessoas as $pessoa){
      $array_pessoa = array();

      $id = $pessoa->get_pk_pessoa();
      $array_pessoa['id'] = $id;

      $nome = $pessoa->get_nome();
      $array_pessoa['nome'] = $nome;

      $sobrenome = $pessoa->get_sobrenome();
      $array_pessoa['sobrenome'] = $sobrenome;

      $nome_completo = $pessoa->nome_completo();
      $array_pessoa['nome_completo'] = $nome_completo;

      $cpf = $pessoa->get_cpf();
      $array_pessoa['cpf'] = $cpf;

      $data_de_nascimento = $pessoa->get_data_de_nascimento();
      $data_convertida = $this->converter_para_data_do_html($data_de_nascimento);
      $array_pessoa['data_de_nascimento'] = $data_convertida;

      $sem_fuso_horario = new DateTimeZone('GMT');
      $momento_atual = new DateTime('now', $sem_fuso_horario);
      $data_de_nascimento = new DateTime($data_de_nascimento, $sem_fuso_horario);
      $tempo_decorrido = date_diff($momento_atual, $data_de_nascimento);
      $idade = $tempo_decorrido->y;
      $array_pessoa['idade'] = $idade;

      $sexo = $pessoa->get_sexo();
      $array_pessoa['sexo'] = $sexo;

      $sexo_classe_css = '';
      switch($sexo){
        case 'masculino':
          $sexo_classe_css = 'azul_claro';
          break;
        case 'feminino':
          $sexo_classe_css = 'rosa';
          break;
      }
      $array_pessoa['sexo_classe_css'] = $sexo_classe_css;

      $id_do_setor = $pessoa->get_setor()->get_pk_setor();
      $array_pessoa['id_do_setor'] = $id_do_setor;

      $nome_do_setor = $pessoa->get_setor()->get_nome();
      $array_pessoa['nome_do_setor'] = $nome_do_setor;

      $nome_do_setor = htmlspecialchars($nome_do_setor);
      $nome_do_setor_com_quebra_de_linha = str_replace(' ', '</span><br/><span>', $nome_do_setor);
      $nome_do_setor_com_quebra_de_linha = "<span>$nome_do_setor_com_quebra_de_linha</span>";
      $array_pessoa['nome_do_setor_com_quebra_de_linha'] = $nome_do_setor_com_quebra_de_linha;

      $email = $pessoa->get_email();
      $array_pessoa['email'] = $email;

      $telefone_fixo = $pessoa->get_telefone_fixo();
      $array_pessoa['telefone_fixo'] = $telefone_fixo;

      $telefone_movel = $pessoa->get_telefone_movel();
      $array_pessoa['telefone_movel'] = $telefone_movel;

      $telefone_estrangeiro = $pessoa->get_telefone_estrangeiro();
      $array_pessoa['telefone_estrangeiro'] = $telefone_estrangeiro;

      $array_pessoas[] = $array_pessoa;
    }

    $valores['pessoas'] = $array_pessoas;

    return $valores;
  }

  public function mostrar_pessoas_ajax($mensagem_de_sucesso = ""){
    $pessoa = new Pessoa();

    $metodo = 'get';
    if($mensagem_de_sucesso){
      $metodo = 'post';
    }

    $valores['lista_de_pessoas'] = $this->mostrar_pessoas($metodo);
    $valores['sexos'] = $pessoa->enum_sexo();
    $valores['setores'] = $this->consultar_setores();

    $blade = 'tudo_em_um/lista_de_pessoas';
    $retorno['lista'] = view($blade, $valores)->render();

    $blade = 'tudo_em_um/paginacao_da_lista_de_pessoas';
    $retorno['paginacao'] = view($blade, $valores)->render();

    if($mensagem_de_sucesso !== ""){
      $retorno['mensagem_de_sucesso'] = $mensagem_de_sucesso;
    }

    echo json_encode($retorno);
    die;
  }

  private function calcular_quantidade_de_paginas_da_lista_de_pessoas($filtros, $quantidade_por_pagina){
    $tudo_em_um_model = new TudoEmUmModel();

    $array_resultado = $tudo_em_um_model->contar_pessoas($filtros);
    $quantidade_de_paginas = ceil($array_resultado['quantidade'] / $quantidade_por_pagina);

    return $quantidade_de_paginas;
  }

  public function cadastrar_pessoa_ajax(){
    $tudo_em_um_model = new TudoEmUmModel();
    $pessoa = new Pessoa();

    /* Obtendo valores do formulário */
    $requisicao = $this->get_requisicao();
    $nome = trim($requisicao->post('nome') ?? '');
    $sobrenome = trim($requisicao->post('sobrenome') ?? '');
    $cpf = trim($requisicao->post('cpf') ?? '');
    $data_de_nascimento = trim($requisicao->post('data_de_nascimento') ?? '');
    $sexo = trim($requisicao->post('sexo') ?? '');
    $id_do_setor = $requisicao->post('id_do_setor');
    $email = trim($requisicao->post('email') ?? '');
    $telefone_fixo = trim($requisicao->post('telefone_fixo') ?? '');
    $telefone_movel = trim($requisicao->post('telefone_movel') ?? '');
    $telefone_estrangeiro = trim($requisicao->post('telefone_estrangeiro') ?? '');

    while(strpos($nome, '  ') !== false){
      $nome = str_replace('  ', ' ', $nome);
    }
    while(strpos($sobrenome, '  ') !== false){
      $sobrenome = str_replace('  ', ' ', $sobrenome);
    }

    /* Validações */
    if(empty($nome)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo nome da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('nome');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('nome');
    $quantidade = mb_strlen($nome);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo nome da pessoa precisa ter no mínimo $minimo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo nome da pessoa não pode ultrapassar $maximo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_nome($nome);

    if(empty($sobrenome)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo sobrenome da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('sobrenome');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('sobrenome');
    $quantidade = mb_strlen($sobrenome);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo sobrenome da pessoa precisa ter no mínimo $minimo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo sobrenome da pessoa não pode ultrapassar $maximo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_sobrenome($sobrenome);

    $nome_completo = $pessoa->nome_completo();
    $array_resultado = $tudo_em_um_model->verificar_disponibilidade_de_nome_completo_para_cadastrar($nome_completo);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }

    if(empty($cpf)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo CPF da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $array_resultado = $tudo_em_um_model->verificar_disponibilidade_de_cpf_para_cadastrar($cpf);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $padrao = $pessoa->padrao_para_cpf();
    if(!preg_match($padrao, $cpf)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato do CPF não é válido.';
      $mensagem .= ' O CPF precisa ser preenchido no formato correto.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_cpf($cpf);

    if(empty($data_de_nascimento)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo data de nascimento da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $data_convertida = $this->converter_para_data_do_sql($data_de_nascimento);
    if($data_de_nascimento === $data_convertida){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato de data para a data de nascimento da pessoa não está correto.';
      $mensagem .= ' A data de nascimento precisa estar no seguinte formato: dia/mês/ano.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $data_de_nascimento = $data_convertida;
    $ano = substr($data_de_nascimento, 0, 4);
    $mes = substr($data_de_nascimento, 5, 2);
    $dia = substr($data_de_nascimento, 8, 2);
    if(!checkdate($mes, $dia, $ano)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' A data de nascimento escolhida não é uma data válida.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $timestamp_da_data_de_nascimento = strtotime($data_de_nascimento);
    $timestamp_de_agora = strtotime('now');
    if($timestamp_de_agora < $timestamp_da_data_de_nascimento){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' Você não pode cadastrar uma pessoa com data de nascimento futura.';
      $mensagem .= ' Preencha o campo de data de nascimento corretamente.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_data_de_nascimento($data_de_nascimento);

    if(empty($sexo)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O sexo precisa ser informado.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if(!array_key_exists($sexo, $pessoa->enum_sexo())){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O valor escolhido para o sexo não é válido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_sexo($sexo);

    if($id_do_setor === '' or $id_do_setor === null){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' Você precisa selecionar um setor para poder cadastrar a pessoa.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if(!is_numeric($id_do_setor) or $id_do_setor <= 0 or floor($id_do_setor) != $id_do_setor){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O setor selecionado não possui um ID válido, tente novamente.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $array_resultado = $tudo_em_um_model->verificar_se_o_setor_existe($id_do_setor);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_fk_setor($id_do_setor);

    if(empty($email)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $quantidade_de_arrobas = substr_count($email, '@');
    if($quantidade_de_arrobas > 1){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ter somente um caractere @.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if($quantidade_de_arrobas < 1){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ter pelo menos um caractere @.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $array_resultado = $tudo_em_um_model->verificar_disponibilidade_de_email_para_cadastrar($email);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('email');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('email');
    $quantidade = mb_strlen($email);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo e-mail da pessoa precisa ter no mínimo $minimo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo e-mail da pessoa não pode ultrapassar $maximo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_email($email);

    $padrao = $pessoa->padrao_para_telefone_fixo();
    if($telefone_fixo !== '' && !preg_match($padrao, $telefone_fixo)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato do número do telefone fixo não é válido.';
      $mensagem .= ' O número do telefone fixo precisa ser preenchido no formato correto.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_telefone_fixo($telefone_fixo);

    $padrao = $pessoa->padrao_para_telefone_movel();
    if($telefone_movel !== '' && !preg_match($padrao, $telefone_movel)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato do número de celular não é válido.';
      $mensagem .= ' O número de celular precisa ser preenchido no formato correto.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_telefone_movel($telefone_movel);

    $padrao = $pessoa->padrao_para_telefone_estrangeiro();
    if($telefone_estrangeiro !== '' && !preg_match($padrao, $telefone_estrangeiro)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato do número para contato no exterior não é válido.';
      $mensagem .= ' O número para contato no exterior precisa ser preenchido no formato correto.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_telefone_estrangeiro($telefone_estrangeiro);

    /* Cadastrar pessoa no banco de dados */
    $array_resultado = $tudo_em_um_model->cadastrar_pessoa($pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }

    $mensagem = 'A pessoa foi cadastrada com sucesso.';
    $this->mostrar_pessoas_ajax($mensagem);
  }

  public function editar_pessoa_ajax(){
    $tudo_em_um_model = new TudoEmUmModel();
    $pessoa = new Pessoa();

    /* Obtendo valores do formulário */
    $requisicao = $this->get_requisicao();
    $id_da_pessoa = $requisicao->post('id_da_pessoa');
    $nome = trim($requisicao->post('nome') ?? '');
    $sobrenome = trim($requisicao->post('sobrenome') ?? '');
    $cpf = trim($requisicao->post('cpf') ?? '');
    $data_de_nascimento = trim($requisicao->post('data_de_nascimento') ?? '');
    $sexo = trim($requisicao->post('sexo') ?? '');
    $id_do_setor = $requisicao->post('id_do_setor');
    $email = trim($requisicao->post('email') ?? '');
    $telefone_fixo = trim($requisicao->post('telefone_fixo') ?? '');
    $telefone_movel = trim($requisicao->post('telefone_movel') ?? '');
    $telefone_estrangeiro = trim($requisicao->post('telefone_estrangeiro') ?? '');

    while(strpos($nome, '  ') !== false){
      $nome = str_replace('  ', ' ', $nome);
    }
    while(strpos($sobrenome, '  ') !== false){
      $sobrenome = str_replace('  ', ' ', $sobrenome);
    }

    /* Validações */
    if(!is_numeric($id_da_pessoa) or $id_da_pessoa <= 0 or floor($id_da_pessoa) != $id_da_pessoa){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O ID da pessoa precisa ser um número natural maior que zero.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $array_resultado = $tudo_em_um_model->selecionar_pessoa($id_da_pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= " {$array_resultado['mensagem_do_model']}";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_pk_pessoa($id_da_pessoa);

    if(empty($nome)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O campo nome da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('nome');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('nome');
    $quantidade = mb_strlen($nome);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= " O campo nome da pessoa precisa ter no mínimo $minimo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= " O campo nome da pessoa não pode ultrapassar $maximo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_nome($nome);

    if(empty($sobrenome)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O campo sobrenome da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('sobrenome');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('sobrenome');
    $quantidade = mb_strlen($sobrenome);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= " O campo sobrenome da pessoa precisa ter no mínimo $minimo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= " O campo sobrenome da pessoa não pode ultrapassar $maximo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_sobrenome($sobrenome);

    $nome_completo = $pessoa->nome_completo();
    $array_resultado = $tudo_em_um_model->verificar_disponibilidade_de_nome_completo_para_editar($nome_completo,
      $id_da_pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }

    if(empty($cpf)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O campo CPF da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $array_resultado = $tudo_em_um_model->verificar_disponibilidade_de_cpf_para_editar($cpf,
      $id_da_pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $padrao = $pessoa->padrao_para_cpf();
    if(!preg_match($padrao, $cpf)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O formato do CPF não é válido.';
      $mensagem .= ' O CPF precisa ser preenchido no formato correto.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_cpf($cpf);

    if(empty($data_de_nascimento)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O campo data de nascimento da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $data_convertida = $this->converter_para_data_do_sql($data_de_nascimento);
    if($data_de_nascimento === $data_convertida){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O formato de data para a data de nascimento da pessoa não está correto.';
      $mensagem .= ' A data de nascimento precisa estar no seguinte formato: dia/mês/ano.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $data_de_nascimento = $data_convertida;
    $ano = substr($data_de_nascimento, 0, 4);
    $mes = substr($data_de_nascimento, 5, 2);
    $dia = substr($data_de_nascimento, 8, 2);
    if(!checkdate($mes, $dia, $ano)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' A data de nascimento escolhida não é uma data válida.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $timestamp_da_data_de_nascimento = strtotime($data_de_nascimento);
    $timestamp_de_agora = strtotime('now');
    if($timestamp_de_agora < $timestamp_da_data_de_nascimento){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' Você não pode modificar a data de nascimento para uma data futura.';
      $mensagem .= ' Preencha o campo de data de nascimento corretamente.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_data_de_nascimento($data_de_nascimento);

    if(empty($sexo)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O sexo precisa ser informado.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if(!array_key_exists($sexo, $pessoa->enum_sexo())){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O valor escolhido para o sexo não é válido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_sexo($sexo);

    if($id_do_setor === '' or $id_do_setor === null){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' Você precisa selecionar um setor para poder editar a pessoa.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if(!is_numeric($id_do_setor) or $id_do_setor <= 0 or floor($id_do_setor) != $id_do_setor){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O setor selecionado não possui um ID válido, tente novamente.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $array_resultado = $tudo_em_um_model->verificar_se_o_setor_existe($id_do_setor);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_fk_setor($id_do_setor);

    if(empty($email)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ser preenchido.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $quantidade_de_arrobas = substr_count($email, '@');
    if($quantidade_de_arrobas > 1){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ter somente um caractere @.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if($quantidade_de_arrobas < 1){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ter pelo menos um caractere @.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $array_resultado = $tudo_em_um_model->verificar_disponibilidade_de_email_para_editar($email,
      $id_da_pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('email');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('email');
    $quantidade = mb_strlen($email);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= " O campo e-mail da pessoa precisa ter no mínimo $minimo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= " O campo e-mail da pessoa não pode ultrapassar $maximo caracteres.";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_email($email);

    $padrao = $pessoa->padrao_para_telefone_fixo();
    if($telefone_fixo !== '' && !preg_match($padrao, $telefone_fixo)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O formato do número do telefone fixo não é válido.';
      $mensagem .= ' O número do telefone fixo precisa ser preenchido no formato correto.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_telefone_fixo($telefone_fixo);

    $padrao = $pessoa->padrao_para_telefone_movel();
    if($telefone_movel !== '' && !preg_match($padrao, $telefone_movel)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O formato do número de celular não é válido.';
      $mensagem .= ' O número de celular precisa ser preenchido no formato correto.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_telefone_movel($telefone_movel);

    $padrao = $pessoa->padrao_para_telefone_estrangeiro();
    if($telefone_estrangeiro !== '' && !preg_match($padrao, $telefone_estrangeiro)){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' O formato do número para contato no exterior não é válido.';
      $mensagem .= ' O número para contato no exterior precisa ser preenchido no formato correto.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $pessoa->set_telefone_estrangeiro($telefone_estrangeiro);

    /* Editar pessoa no banco de dados */
    $array_resultado = $tudo_em_um_model->editar_pessoa($pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi editada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }

    $mensagem = 'A pessoa foi editada com sucesso.';
    $this->mostrar_pessoas_ajax($mensagem);
  }

  public function excluir_pessoa_ajax(){
    $tudo_em_um_model = new TudoEmUmModel();

    /* Obtendo valores do formulário */
    $requisicao = $this->get_requisicao();
    $id_da_pessoa = $requisicao->post('id_da_pessoa');

    /* Validações */
    if(!is_numeric($id_da_pessoa) or $id_da_pessoa <= 0 or floor($id_da_pessoa) != $id_da_pessoa){
      $mensagem = 'A pessoa não foi excluida.';
      $mensagem .= ' O ID da pessoa precisa ser um número natural maior que zero.';
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }
    $array_resultado = $tudo_em_um_model->selecionar_pessoa($id_da_pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi excluida.';
      $mensagem .= " {$array_resultado['mensagem_do_model']}";
      $retorno['mensagem_de_falha'] = $mensagem;
      echo(json_encode($retorno));
      die;
    }

    /* Excluir pessoa do banco de dados */
    $tudo_em_um_model->deletar_pessoa($id_da_pessoa);
    $mensagem = 'A pessoa foi excluida com sucesso.';
    $this->mostrar_pessoas_ajax($mensagem);
  }

}
