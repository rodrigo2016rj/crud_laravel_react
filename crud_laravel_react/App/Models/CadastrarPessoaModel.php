<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use App\Models\Entidades\Setor;
use \Exception;

final class CadastrarPessoaModel{

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

  public function verificar_disponibilidade_de_nome_completo($nome_completo){
    $query = DB::table('pessoa');
    $query = $query->addSelect('pk_pessoa');

    $query = $query->whereRaw('CONCAT(nome, \' \', sobrenome) = ?', $nome_completo);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    if(count($array_resultado) > 0){
      $mensagem_do_model = 'O nome completo informado (nome mais sobrenome) já é o nome de uma';
      $mensagem_do_model .= ' pessoa cadastrada anteriormente. Por favor, utilize outro nome ou ';
      $mensagem_do_model .= ' outro sobrenome para cadastrar a pessoa.';
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }

    return $array_resultado;
  }

  public function verificar_disponibilidade_de_cpf($cpf){
    $query = DB::table('pessoa');
    $query = $query->addSelect('pk_pessoa');
    $query = $query->where('cpf', '=', $cpf);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    if(count($array_resultado) > 0){
      $mensagem_do_model = 'O CPF escolhido já é o CPF de uma pessoa cadastrada anteriormente.';
      $mensagem_do_model .= ' Verifique se a pessoa que deseja cadastrar já não havia sido';
      $mensagem_do_model .= ' cadastrada, ou se o CPF não foi digitado corretamente.';
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }

    return $array_resultado;
  }

  public function verificar_se_o_setor_existe($id_do_setor){
    $query = DB::table('setor');
    $query = $query->addSelect('pk_setor');
    $query = $query->where('pk_setor', '=', $id_do_setor);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    if(count($array_resultado) == 0){
      $mensagem_do_model = 'O setor escolhido não foi encontrado no banco de dados deste sistema.';
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }

    return $array_resultado;
  }

  public function verificar_disponibilidade_de_email($email){
    $query = DB::table('pessoa');
    $query = $query->addSelect('email');
    $query = $query->where('email', '=', $email);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    if(count($array_resultado) > 0){
      $mensagem_do_model = 'O e-mail escolhido já foi utilizado em outro cadastro de pessoa.';
      $mensagem_do_model .= ' Verifique se a pessoa que deseja cadastrar já não havia sido';
      $mensagem_do_model .= ' cadastrada, ou se o e-mail não foi digitado corretamente.';
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }

    return $array_resultado;
  }

  public function cadastrar_pessoa($pessoa){
    $insert['fk_setor'] = $pessoa->get_fk_setor();
    $insert['nome'] = $pessoa->get_nome();
    $insert['sobrenome'] = $pessoa->get_sobrenome();
    $insert['cpf'] = $pessoa->get_cpf();
    $insert['data_de_nascimento'] = $pessoa->get_data_de_nascimento();
    $insert['sexo'] = $pessoa->get_sexo();
    $insert['email'] = $pessoa->get_email();
    $insert['telefone_fixo'] = $pessoa->get_telefone_fixo();
    $insert['telefone_movel'] = $pessoa->get_telefone_movel();
    $insert['telefone_estrangeiro'] = $pessoa->get_telefone_estrangeiro();

    $array_resultado = array();

    try{
      DB::table('pessoa')->insert($insert);
      $array_resultado['id_da_pessoa'] = DB::getPdo()->lastInsertId();
    }catch(Exception $excecao){
      $codigo_da_excecao = $excecao->errorInfo[1];
      switch($codigo_da_excecao){
        case 1062:
          $mensagem = 'Já existe uma pessoa cadastrada com uma ou mais destas informações.';
          $array_resultado['mensagem_do_model'] = $mensagem;
          break;
        default:
          $array_resultado['mensagem_do_model'] = $excecao->getMessage();
          break;
      }
    }

    return $array_resultado;
  }

}
