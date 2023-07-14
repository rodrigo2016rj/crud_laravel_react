<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use App\Models\Entidades\Pessoa;
use App\Models\Entidades\Setor;
use Exception;

final class TudoEmUmModel{

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

  public function verificar_disponibilidade_de_nome_completo_para_cadastrar($nome_completo){
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

  public function verificar_disponibilidade_de_cpf_para_cadastrar($cpf){
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

  public function verificar_disponibilidade_de_email_para_cadastrar($email){
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

  public function selecionar_pessoa($id_da_pessoa){
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
      $setor->set_descricao($valores['descricao']);

      $pessoa->set_setor($setor);

      $array_melhorado[] = $pessoa;

      $array_resultado = $array_melhorado;
    }

    return $array_resultado;
  }

  public function verificar_disponibilidade_de_nome_completo_para_editar($nome_completo, $id_da_pessoa){
    $query = DB::table('pessoa');
    $query = $query->addSelect('pk_pessoa');

    $query = $query->whereRaw('CONCAT(nome, \' \', sobrenome) = ?', $nome_completo);
    $query = $query->where('pk_pessoa', '<>', $id_da_pessoa);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    if(count($array_resultado) > 0){
      $mensagem_do_model = 'O nome completo informado (nome mais sobrenome) já é o nome de uma';
      $mensagem_do_model .= ' pessoa cadastrada anteriormente. Por favor, utilize outro nome ou ';
      $mensagem_do_model .= ' outro sobrenome para editar esta pessoa.';
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }

    return $array_resultado;
  }

  public function verificar_disponibilidade_de_cpf_para_editar($cpf, $id_da_pessoa){
    $query = DB::table('pessoa');
    $query = $query->addSelect('pk_pessoa');
    $query = $query->where('cpf', '=', $cpf);
    $query = $query->where('pk_pessoa', '<>', $id_da_pessoa);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    if(count($array_resultado) > 0){
      $mensagem_do_model = 'O CPF escolhido já é o CPF de uma pessoa cadastrada anteriormente.';
      $mensagem_do_model .= ' Verifique se a pessoa que deseja editar já não havia sido';
      $mensagem_do_model .= ' cadastrada, ou se o CPF não foi digitado corretamente.';
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }

    return $array_resultado;
  }

  public function verificar_disponibilidade_de_email_para_editar($email, $id_da_pessoa){
    $query = DB::table('pessoa');
    $query = $query->addSelect('email');
    $query = $query->where('email', '=', $email);
    $query = $query->where('pk_pessoa', '<>', $id_da_pessoa);

    $colecao = $query->get();
    $array_resultado = $colecao->all();

    if(count($array_resultado) > 0){
      $mensagem_do_model = 'O e-mail escolhido já foi utilizado em outro cadastro de pessoa.';
      $mensagem_do_model .= ' Verifique se a pessoa que deseja editar já não havia sido';
      $mensagem_do_model .= ' cadastrada, ou se o e-mail não foi digitado corretamente.';
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }

    return $array_resultado;
  }

  public function editar_pessoa($pessoa){
    $update['fk_setor'] = $pessoa->get_fk_setor();
    $update['nome'] = $pessoa->get_nome();
    $update['sobrenome'] = $pessoa->get_sobrenome();
    $update['cpf'] = $pessoa->get_cpf();
    $update['data_de_nascimento'] = $pessoa->get_data_de_nascimento();
    $update['sexo'] = $pessoa->get_sexo();
    $update['email'] = $pessoa->get_email();
    $update['telefone_fixo'] = $pessoa->get_telefone_fixo();
    $update['telefone_movel'] = $pessoa->get_telefone_movel();
    $update['telefone_estrangeiro'] = $pessoa->get_telefone_estrangeiro();

    $array_resultado = array();

    try{
      DB::table('pessoa')->where('pk_pessoa', '=', $pessoa->get_pk_pessoa())->update($update);
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

  public function deletar_pessoa($id_da_pessoa){
    DB::table('pessoa')->where('pk_pessoa', '=', $id_da_pessoa)->delete();
  }

}
