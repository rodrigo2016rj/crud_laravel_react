<?php

namespace App\Http\Controllers;

use App\Models\ListarPessoasModel;

final class ListarPessoasController extends TemplateController{
  private const QUANTIDADE_PADRAO_POR_PAGINA = 10;

  public function carregar_pagina($redirecionar = false){
    if($redirecionar){
      /* Redireciona para si mesmo, motivo: limpar a requisição. */
      header('Location: /listar_pessoas');
      die;
    }

    $valores = $this->valores_do_template();
    $listar_pessoas_model = new ListarPessoasModel();

    /* Consultando valores */
    $setores = $listar_pessoas_model->selecionar_setores();
    $array_setores = array();
    foreach($setores as $setor){
      $array_setor = array();

      $array_setor['id'] = $setor->get_pk_setor();
      $array_setor['nome'] = $setor->get_nome();
      $array_setor['descricao'] = $setor->get_descricao();

      $array_setores[] = $array_setor;
    }

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
    $valores['lista_de_pessoas'] = $this->mostrar_pessoas();

    return view('listar_pessoas/listar_pessoas', $valores);
  }

  private function mostrar_pessoas(){
    $listar_pessoas_model = new ListarPessoasModel();

    $valores = array();

    $requisicao = $this->get_requisicao();

    /* Preparando os filtros */
    $filtros = array();
    $filtro_nome = trim($requisicao->get('filtro_nome') ?? '');
    if($filtro_nome !== ''){
      $filtros['nome'] = $filtro_nome;
    }
    $valores['filtro_nome'] = $filtro_nome;

    $filtro_cpf = trim($requisicao->get('filtro_cpf') ?? '');
    if($filtro_cpf !== ''){
      $filtros['cpf'] = $filtro_cpf;
    }
    $valores['filtro_cpf'] = $filtro_cpf;

    $filtro_data_de_nascimento = trim($requisicao->get('filtro_data_de_nascimento') ?? '');
    if($filtro_data_de_nascimento !== ''){
      $data_convertida = $this->converter_para_data_do_sql($filtro_data_de_nascimento);
      $filtros['data_de_nascimento'] = $data_convertida;
    }
    $valores['filtro_data_de_nascimento'] = $filtro_data_de_nascimento;

    $filtro_id_do_setor = $requisicao->get('filtro_id_do_setor');
    if($filtro_id_do_setor !== '' && $filtro_id_do_setor !== null){
      $filtros['id_do_setor'] = $filtro_id_do_setor;
    }
    $valores['filtro_id_do_setor'] = $filtro_id_do_setor;

    /* Preparando a ordenação */
    $ordenacao = $requisicao->get('ordenacao');
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
    $quantidade_por_pagina = (int) $requisicao->get('quantidade_por_pagina');
    $valores['quantidade_por_pagina'] = $quantidade_por_pagina;
    if($quantidade_por_pagina < 1 or $quantidade_por_pagina > 250){
      $quantidade_por_pagina = self::QUANTIDADE_PADRAO_POR_PAGINA;
      $valores['quantidade_por_pagina'] = 'padrao';
    }

    $pagina = (int) $requisicao->get('pagina');
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
    $pessoas = $listar_pessoas_model->selecionar_pessoas($filtros, $ordenacao, $quantidade_por_pagina,
      $descartar);
    $array_pessoas = array();
    foreach($pessoas as $pessoa){
      $array_pessoa = array();

      $id = $pessoa->get_pk_pessoa();
      $array_pessoa['id'] = $id;

      $nome_completo = $pessoa->nome_completo();
      $array_pessoa['nome_completo'] = $nome_completo;

      $cpf = $pessoa->get_cpf();
      $array_pessoa['cpf'] = $cpf;

      $nome_do_setor = $pessoa->get_setor()->get_nome();
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

  private function calcular_quantidade_de_paginas_da_lista_de_pessoas($filtros, $quantidade_por_pagina){
    $listar_pessoas_model = new ListarPessoasModel();

    $array_resultado = $listar_pessoas_model->contar_pessoas($filtros);
    $quantidade_de_paginas = ceil($array_resultado['quantidade'] / $quantidade_por_pagina);

    return $quantidade_de_paginas;
  }

}
