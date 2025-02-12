<?php

namespace App\Http\Controllers;

use App\Models\ExcluirPessoaModel;

final class ExcluirPessoaController extends TemplateController{

  public function carregar_pagina($redirecionar_com_id = false){
    if($redirecionar_com_id !== false){
      /* Redireciona para si mesmo, motivo: limpar a requisição. */
      header("Location: /excluir_pessoa?id=$redirecionar_com_id");
      die;
    }

    $valores = $this->valores_do_template();
    $excluir_pessoa_model = new ExcluirPessoaModel();
    $sessao = session();

    /* Colocando valores iniciais nas variáveis para não ficarem undefined no Blade */
    $valores['mensagem'] = '';
    $valores['tipo_de_mensagem'] = 'sucesso';
    $valores['id_valido'] = true;
    $valores['id_da_pessoa'] = '';
    $valores['nome_completo_da_pessoa'] = '';
    $valores['cpf_da_pessoa'] = '';
    $valores['setor_da_pessoa'] = '';

    /* Validando o ID da pessoa informado na URL */
    $requisicao = $this->get_requisicao();
    $id_da_pessoa = $requisicao->get('id');
    if(!is_numeric($id_da_pessoa) or $id_da_pessoa <= 0 or floor($id_da_pessoa) != $id_da_pessoa){
      $mensagem = 'ID inválido, o ID da pessoa precisa ser um número natural maior que zero.';
      $valores['mensagem'] = $mensagem;
      $valores['tipo_de_mensagem'] = 'falha';
      $valores['id_valido'] = false;
    }else{
      /* Consultando e mostrando informações da pessoa */
      $array_resultado = $excluir_pessoa_model->selecionar_pessoa($id_da_pessoa);
      if(isset($array_resultado['mensagem_do_model'])){
        $valores['mensagem'] = $array_resultado['mensagem_do_model'];
        $valores['tipo_de_mensagem'] = 'falha';
        $valores['id_valido'] = false;
      }else{
        $pessoa = $array_resultado[0];

        $id = $pessoa->get_pk_pessoa();
        $valores['id_da_pessoa'] = $id;

        $nome_completo = $pessoa->nome_completo();
        $valores['nome_completo_da_pessoa'] = $nome_completo;

        $cpf = $pessoa->get_cpf();
        $valores['cpf_da_pessoa'] = $cpf;

        $nome_do_setor = $pessoa->get_setor()->get_nome();
        $valores['setor_da_pessoa'] = $nome_do_setor;
      }
    }

    /* Se houver mensagem na sessão, deve ser mostrada */
    if($sessao->has('mensagem_da_pagina_excluir_pessoa')){
      $valores['mensagem'] = $sessao->get('mensagem_da_pagina_excluir_pessoa');
      $valores['tipo_de_mensagem'] = $sessao->get('tipo_de_mensagem_da_pagina_excluir_pessoa');
      $sessao->forget('mensagem_da_pagina_excluir_pessoa');
      $sessao->forget('tipo_de_mensagem_da_pagina_excluir_pessoa');
      $sessao->save();
    }

    return view('excluir_pessoa/excluir_pessoa', $valores);
  }

  public function excluir(){
    $excluir_pessoa_model = new ExcluirPessoaModel();
    $sessao = session();

    /* Obtendo valores do formulário */
    $requisicao = $this->get_requisicao();
    $id_da_pessoa = $requisicao->post('id_da_pessoa');

    /* Validações */
    $sessao->put('tipo_de_mensagem_da_pagina_excluir_pessoa', 'falha');
    if(!is_numeric($id_da_pessoa) or $id_da_pessoa <= 0 or floor($id_da_pessoa) != $id_da_pessoa){
      $mensagem = 'A pessoa não foi excluída.';
      $mensagem .= ' O ID da pessoa precisa ser um número natural maior que zero.';
      $sessao->put('mensagem_da_pagina_excluir_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina($id_da_pessoa);
      die;
    }
    $array_resultado = $excluir_pessoa_model->selecionar_pessoa($id_da_pessoa);
    if(isset($array_resultado['mensagem_do_model'])){
      $mensagem = 'A pessoa não foi excluída.';
      $mensagem .= " {$array_resultado['mensagem_do_model']}";
      $sessao->put('mensagem_da_pagina_excluir_pessoa', $mensagem);
      $sessao->save();
      $this->carregar_pagina($id_da_pessoa);
      die;
    }

    /* Excluir pessoa do banco de dados */
    $excluir_pessoa_model->deletar_pessoa($id_da_pessoa);
    $mensagem = 'A pessoa foi excluída com sucesso.';
    $sessao->put('tipo_de_mensagem_da_pagina_excluir_pessoa', 'sucesso');
    $sessao->put('mensagem_da_pagina_excluir_pessoa', $mensagem);
    $sessao->save();
    $this->carregar_pagina($id_da_pessoa);
    die;
  }

}
