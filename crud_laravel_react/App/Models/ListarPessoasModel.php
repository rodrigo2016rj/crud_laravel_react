<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use App\Models\Entidades\Pessoa;
use App\Models\Entidades\Setor;

final class ListarPessoasModel{

  public function selecionar_setores(){
    $query = DB::table('setor');
    $query = $query->addSelect('pk_setor');
    $query = $query->addSelect('nome');
    $query = $query->addSelect('descricao');

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    $array_melhorado = array();
    foreach($array_resultado as $objeto_generico){
      $valores = (array) $objeto_generico;
      $setor = new Setor($valores);
      $array_melhorado[] = $setor;
    }
    $array_resultado = $array_melhorado;

    return $array_resultado;
  }

  public function selecionar_pessoas($filtros, $ordenacao, $quantidade, $descartar){
    $query = DB::table('pessoa');
    $query = $query->addSelect('pk_pessoa');
    $query = $query->addSelect('pessoa.fk_setor');
    $query = $query->addSelect('pessoa.nome AS nome_da_pessoa');
    $query = $query->addSelect('pessoa.sobrenome');
    $query = $query->addSelect('pessoa.cpf');
    $query = $query->addSelect('pessoa.data_de_nascimento');
    $query = $query->addSelect('pessoa.sexo');
    $query = $query->addSelect('pessoa.email');
    $query = $query->addSelect('pessoa.telefone_fixo');
    $query = $query->addSelect('pessoa.telefone_movel');
    $query = $query->addSelect('pessoa.telefone_estrangeiro');
    $query = $query->addSelect('pk_setor');
    $query = $query->addSelect('setor.nome AS nome_do_setor');
    $query = $query->addSelect('setor.descricao');

    $query = $query->join('setor', 'fk_setor', '=', 'pk_setor'); //INNER JOIN

    foreach($filtros as $chave => $valor){
      switch($chave){
        case 'nome':
          $query = $query->whereRaw('CONCAT(pessoa.nome, \' \', pessoa.sobrenome) LIKE ?', ["%$valor%"]);
          break;
        case 'cpf':
          $query = $query->where('pessoa.cpf', '=', $valor);
          break;
        case 'data_de_nascimento':
          $query = $query->where('pessoa.data_de_nascimento', '=', $valor);
          break;
        case 'id_do_setor':
          $query = $query->where('pessoa.fk_setor', '=', $valor);
          break;
      }
    }

    switch($ordenacao){
      case 'padrao':
        $query = $query->orderBy('pk_pessoa', 'DESC');
        break;
      case 'nome_completo_a_z':
        $query = $query->orderByRaw('CONCAT(pessoa.nome, \' \', pessoa.sobrenome) ASC');
        break;
      case 'nome_completo_z_a':
        $query = $query->orderByRaw('CONCAT(pessoa.nome, \' \', pessoa.sobrenome) DESC');
        break;
      case 'cpf_crescente':
        $query = $query->orderBy('pessoa.cpf', 'ASC');
        break;
      case 'cpf_decrescente':
        $query = $query->orderBy('pessoa.cpf', 'DESC');
        break;
      case 'setor_a_z':
        $query = $query->orderBy('setor.nome', 'ASC');
        $query = $query->orderBy('pk_pessoa', 'DESC');
        break;
      case 'setor_z_a':
        $query = $query->orderBy('setor.nome', 'DESC');
        $query = $query->orderBy('pk_pessoa', 'DESC');
        break;
      case 'contato_a_z':
        $query = $query->orderBy('pessoa.email', 'ASC');
        break;
      case 'contato_z_a':
        $query = $query->orderBy('pessoa.email', 'DESC');
        break;
    }

    $query = $query->offset($descartar);
    $query = $query->limit($quantidade);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    $array_melhorado = array();
    foreach($array_resultado as $objeto_generico){
      $valores = (array) $objeto_generico;
      $pessoa = new Pessoa($valores);

      $pessoa->set_nome($valores['nome_da_pessoa']);

      $setor = new Setor();
      $setor->set_pk_setor($valores['pk_setor']);
      $setor->set_nome($valores['nome_do_setor']);
      $setor->set_descricao($valores['descricao']);

      $pessoa->set_setor($setor);

      $array_melhorado[] = $pessoa;
    }
    $array_resultado = $array_melhorado;

    return $array_resultado;
  }

  public function contar_pessoas($filtros){
    $query = DB::table('pessoa');
    $query = $query->select(DB::raw('COUNT(*) AS quantidade'));

    $query = $query->join('setor', 'fk_setor', '=', 'pk_setor'); //INNER JOIN

    foreach($filtros as $chave => $valor){
      switch($chave){
        case 'nome':
          $query = $query->whereRaw('CONCAT(pessoa.nome, \' \', pessoa.sobrenome) LIKE ?', ["%$valor%"]);
          break;
        case 'cpf':
          $query = $query->where('pessoa.cpf', '=', $valor);
          break;
        case 'data_de_nascimento':
          $query = $query->where('pessoa.data_de_nascimento', '=', $valor);
          break;
        case 'id_do_setor':
          $query = $query->where('pessoa.fk_setor', '=', $valor);
          break;
      }
    }

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    $array_melhorado['quantidade'] = $array_resultado[0]->quantidade;
    $array_resultado = $array_melhorado;

    return $array_resultado;
  }

}
