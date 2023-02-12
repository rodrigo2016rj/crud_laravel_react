<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use App\Models\Entidades\Pessoa;
use App\Models\Entidades\Setor;

final class ExcluirPessoaModel{

  public function selecionar_pessoa($id_da_pessoa){
    $query = DB::table('pessoa');
    $query = $query->addSelect('pk_pessoa');
    $query = $query->addSelect('pessoa.fk_setor');
    $query = $query->addSelect('pessoa.nome AS nome_da_pessoa');
    $query = $query->addSelect('pessoa.sobrenome');
    $query = $query->addSelect('pessoa.cpf');
    $query = $query->addSelect('pk_setor');
    $query = $query->addSelect('setor.nome AS nome_do_setor');

    $query = $query->join('setor', 'fk_setor', '=', 'pk_setor'); //INNER JOIN

    $query = $query->where('pk_pessoa', '=', $id_da_pessoa);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    if(count($array_resultado) === 0){
      $mensagem_do_model = "Nenhuma pessoa com ID $id_da_pessoa foi encontrada no banco de dados";
      $mensagem_do_model .= ' do sistema.';
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }else{
      $valores = (array) $array_resultado[0];
      $pessoa = new Pessoa($valores);

      $pessoa->set_nome($valores['nome_da_pessoa']);

      $setor = new Setor();
      $setor->set_pk_setor($valores['pk_setor']);
      $setor->set_nome($valores['nome_do_setor']);

      $pessoa->set_setor($setor);

      $array_melhorado[] = $pessoa;

      $array_resultado = $array_melhorado;
    }

    return $array_resultado;
  }

  public function deletar_pessoa($id_da_pessoa){
    DB::table('pessoa')->where('pk_pessoa', '=', $id_da_pessoa)->delete();
  }

}
