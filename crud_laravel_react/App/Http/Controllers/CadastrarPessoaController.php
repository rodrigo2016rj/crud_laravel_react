<?php

namespace App\Http\Controllers;

use App\Models\CadastrarPessoaModel;
use App\Models\Entidades\Pessoa;

final class CadastrarPessoaController extends TemplateController{

  public function carregar_pagina($redirecionar = false){
    if($redirecionar){
      /* Redireciona para si mesmo, motivo: limpar a requisição. */
      header('Location: /cadastrar_pessoa');
      die;
    }

    $valores = $this->valores_do_template();
    $sessao = session();
    $cadastrar_pessoa_model = new CadastrarPessoaModel();
    $pessoa = new Pessoa();

    /* Consultando valores */
    $setores = $cadastrar_pessoa_model->selecionar_setores();
    $array_setores = array();
    foreach($setores as $setor){
      $array_setor = array();

      $array_setor['id'] = $setor->get_pk_setor();
      $array_setor['nome'] = $setor->get_nome();
      $array_setor['descricao'] = $setor->get_descricao();

      $array_setores[] = $array_setor;
    }

    /* Colocando valores iniciais nas variáveis para não ficarem undefined no Blade */
    $valores['mensagem'] = '';
    $valores['tipo_de_mensagem'] = 'sucesso';
    $valores['nome'] = '';
    $valores['sobrenome'] = '';
    $valores['cpf'] = '';
    $valores['data_de_nascimento'] = '';
    $valores['sexos'] = $pessoa->enum_sexo();
    $valores['sexo'] = '';
    $valores['setores'] = $array_setores;
    $valores['id_do_setor'] = '';
    $valores['email'] = '';
    $valores['telefone_fixo'] = '';
    $valores['telefone_movel'] = '';
    $valores['telefone_estrangeiro'] = '';

    /* Recolocando valores preenchidos previamente pelo usuário no formulário */
    if($sessao->has('backup_do_formulario_da_pagina_cadastrar_pessoa')){
      $backup = $sessao->get('backup_do_formulario_da_pagina_cadastrar_pessoa');
      $valores['nome'] = $backup['nome'];
      $valores['sobrenome'] = $backup['sobrenome'];
      $valores['cpf'] = $backup['cpf'];
      $valores['data_de_nascimento'] = $backup['data_de_nascimento'];
      $valores['sexo'] = $backup['sexo'];
      $valores['id_do_setor'] = $backup['id_do_setor'];
      $valores['email'] = $backup['email'];
      $valores['telefone_fixo'] = $backup['telefone_fixo'];
      $valores['telefone_movel'] = $backup['telefone_movel'];
      $valores['telefone_estrangeiro'] = $backup['telefone_estrangeiro'];
      $sessao->forget('backup_do_formulario_da_pagina_cadastrar_pessoa');
      $sessao->save();
    }

    /* Se houver mensagem na sessão, deve ser mostrada */
    if($sessao->has('mensagem_da_pagina_cadastrar_pessoa')){
      $valores['mensagem'] = $sessao->get('mensagem_da_pagina_cadastrar_pessoa');
      $valores['tipo_de_mensagem'] = $sessao->get('tipo_de_mensagem_da_pagina_cadastrar_pessoa');
      $sessao->forget('mensagem_da_pagina_cadastrar_pessoa');
      $sessao->forget('tipo_de_mensagem_da_pagina_cadastrar_pessoa');
      $sessao->save();
    }

    return view('cadastrar_pessoa/cadastrar_pessoa', $valores);
  }

  public function cadastrar(){
    $sessao = session();
    $cadastrar_pessoa_model = new CadastrarPessoaModel();
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

    /* Fazendo backup do formulário */
    $backup_do_formulario['nome'] = $nome;
    $backup_do_formulario['sobrenome'] = $sobrenome;
    $backup_do_formulario['cpf'] = $cpf;
    $backup_do_formulario['data_de_nascimento'] = $data_de_nascimento;
    $backup_do_formulario['sexo'] = $sexo;
    $backup_do_formulario['id_do_setor'] = $id_do_setor;
    $backup_do_formulario['email'] = $email;
    $backup_do_formulario['telefone_fixo'] = $telefone_fixo;
    $backup_do_formulario['telefone_movel'] = $telefone_movel;
    $backup_do_formulario['telefone_estrangeiro'] = $telefone_estrangeiro;
    $sessao->put('backup_do_formulario_da_pagina_cadastrar_pessoa', $backup_do_formulario);
    $sessao->save();

    /* Validações */
    $sessao->put('tipo_de_mensagem_da_pagina_cadastrar_pessoa', 'falha');
    if(empty($nome)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo nome da pessoa precisa ser preenchido.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('nome');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('nome');
    $quantidade = mb_strlen($nome);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo nome da pessoa precisa ter no mínimo $minimo caracteres.";
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo nome da pessoa não pode ultrapassar $maximo caracteres.";
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_nome($nome);

    if(empty($sobrenome)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo sobrenome da pessoa precisa ser preenchido.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('sobrenome');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('sobrenome');
    $quantidade = mb_strlen($sobrenome);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo sobrenome da pessoa precisa ter no mínimo $minimo caracteres.";
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo sobrenome da pessoa não pode ultrapassar $maximo caracteres.";
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_sobrenome($sobrenome);

    $nome_completo = $pessoa->nome_completo();
    $array_resultado = $cadastrar_pessoa_model->verificar_disponibilidade_de_nome_completo($nome_completo);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }

    if(empty($cpf)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo CPF da pessoa precisa ser preenchido.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $array_resultado = $cadastrar_pessoa_model->verificar_disponibilidade_de_cpf($cpf);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $padrao = $pessoa->padrao_para_cpf();
    if(!preg_match($padrao, $cpf)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato do CPF não é válido.';
      $mensagem .= ' O CPF precisa ser preenchido no formato correto.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_cpf($cpf);

    if(empty($data_de_nascimento)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo data de nascimento da pessoa precisa ser preenchido.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $data_convertida = $this->converter_para_data_do_sql($data_de_nascimento);
    if($data_de_nascimento === $data_convertida){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato de data para a data de nascimento da pessoa não está correto.';
      $mensagem .= ' A data de nascimento precisa estar no seguinte formato: dia/mês/ano.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $data_de_nascimento = $data_convertida;
    $ano = substr($data_de_nascimento, 0, 4);
    $mes = substr($data_de_nascimento, 5, 2);
    $dia = substr($data_de_nascimento, 8, 2);
    if(!checkdate($mes, $dia, $ano)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' A data de nascimento escolhida não é uma data válida.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $timestamp_da_data_de_nascimento = strtotime($data_de_nascimento);
    $timestamp_de_agora = strtotime('now');
    if($timestamp_de_agora < $timestamp_da_data_de_nascimento){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' Você não pode cadastrar uma pessoa com data de nascimento futura.';
      $mensagem .= ' Preencha o campo de data de nascimento corretamente.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_data_de_nascimento($data_de_nascimento);

    if(empty($sexo)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O sexo precisa ser informado.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    if(!array_key_exists($sexo, $pessoa->enum_sexo())){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O valor escolhido para o sexo não é válido.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_sexo($sexo);

    if($id_do_setor === '' or $id_do_setor === null){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' Você precisa selecionar um setor para poder cadastrar a pessoa.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    if(!is_numeric($id_do_setor) or $id_do_setor <= 0 or floor($id_do_setor) != $id_do_setor){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O setor selecionado não possui um ID válido, tente novamente.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $array_resultado = $cadastrar_pessoa_model->verificar_se_o_setor_existe($id_do_setor);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_fk_setor($id_do_setor);

    if(empty($email)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ser preenchido.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $quantidade_de_arrobas = substr_count($email, '@');
    if($quantidade_de_arrobas > 1){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ter somente um caractere @.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    if($quantidade_de_arrobas < 1){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O campo e-mail da pessoa precisa ter pelo menos um caractere @.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $array_resultado = $cadastrar_pessoa_model->verificar_disponibilidade_de_email($email);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $minimo = $pessoa->quantidade_minima_de_caracteres('email');
    $maximo = $pessoa->quantidade_maxima_de_caracteres('email');
    $quantidade = mb_strlen($email);
    if($quantidade < $minimo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo e-mail da pessoa precisa ter no mínimo $minimo caracteres.";
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    if($quantidade > $maximo){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= " O campo e-mail da pessoa não pode ultrapassar $maximo caracteres.";
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_email($email);

    $padrao = $pessoa->padrao_para_telefone_fixo();
    if($telefone_fixo !== '' && !preg_match($padrao, $telefone_fixo)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato do número do telefone fixo não é válido.';
      $mensagem .= ' O número do telefone fixo precisa ser preenchido no formato correto.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_telefone_fixo($telefone_fixo);

    $padrao = $pessoa->padrao_para_telefone_movel();
    if($telefone_movel !== '' && !preg_match($padrao, $telefone_movel)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato do número de celular não é válido.';
      $mensagem .= ' O número de celular precisa ser preenchido no formato correto.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_telefone_movel($telefone_movel);

    $padrao = $pessoa->padrao_para_telefone_estrangeiro();
    if($telefone_estrangeiro !== '' && !preg_match($padrao, $telefone_estrangeiro)){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' O formato do número para contato no exterior não é válido.';
      $mensagem .= ' O número para contato no exterior precisa ser preenchido no formato correto.';
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
    $pessoa->set_telefone_estrangeiro($telefone_estrangeiro);

    /* Cadastrar pessoa no banco de dados */
    $array_resultado = $cadastrar_pessoa_model->cadastrar_pessoa($pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi cadastrada.';
      $mensagem .= ' '.$array_resultado['mensagem_do_model'];
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }else{
      $mensagem = 'A pessoa foi cadastrada com sucesso.';
      $sessao->put('tipo_de_mensagem_da_pagina_cadastrar_pessoa', 'sucesso');
      $sessao->put('mensagem_da_pagina_cadastrar_pessoa', $mensagem);
      $sessao->forget('backup_do_formulario_da_pagina_cadastrar_pessoa');
      $sessao->save();
      $this->carregar_pagina(true);
      die;
    }
  }

}
