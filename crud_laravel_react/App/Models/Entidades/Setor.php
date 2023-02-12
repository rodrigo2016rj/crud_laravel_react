<?php

namespace App\Models\Entidades;

final class Setor{
  private $pk_setor;
  private $nome;
  private $descricao;

  public function __construct($array_setor = array()){
    if(isset($array_setor['pk_setor'])){
      $this->pk_setor = $array_setor['pk_setor'];
    }
    if(isset($array_setor['nome'])){
      $this->nome = $array_setor['nome'];
    }
    if(isset($array_setor['descricao'])){
      $this->descricao = $array_setor['descricao'];
    }
  }

  public function set_pk_setor($pk_setor){
    $this->pk_setor = $pk_setor;
  }

  public function set_nome($nome){
    $this->nome = $nome;
  }

  public function set_descricao($descricao){
    $this->descricao = $descricao;
  }

  public function get_pk_setor(){
    return $this->pk_setor;
  }

  public function get_nome(){
    return $this->nome;
  }

  public function get_descricao(){
    return $this->descricao;
  }

  public function quantidade_minima_de_caracteres($atributo){
    switch($atributo){
      case 'nome':
        return 2;
      case 'descricao':
        return 20;
    }
    return -1;
  }

  /* O método abaixo deve ser sempre igual ou mais restritivo que o banco de dados */
  public function quantidade_maxima_de_caracteres($atributo){
    switch($atributo){
      case 'nome':
        return 30;
      case 'descricao':
        return 1000;
    }
    return -1;
  }

}
