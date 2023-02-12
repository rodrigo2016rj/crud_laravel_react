<?php

namespace App\Models\Entidades;

final class Pessoa{
  private $pk_pessoa;
  private $fk_setor;
  private $nome;
  private $sobrenome;
  private $cpf;
  private $data_de_nascimento;
  private $sexo;
  private $email;
  private $telefone_fixo;
  private $telefone_movel;
  private $telefone_estrangeiro;
  private $setor;

  public function __construct($array_pessoa = array()){
    if(isset($array_pessoa['pk_pessoa'])){
      $this->pk_pessoa = $array_pessoa['pk_pessoa'];
    }
    if(isset($array_pessoa['fk_setor'])){
      $this->fk_setor = $array_pessoa['fk_setor'];
    }
    if(isset($array_pessoa['nome'])){
      $this->nome = $array_pessoa['nome'];
    }
    if(isset($array_pessoa['sobrenome'])){
      $this->sobrenome = $array_pessoa['sobrenome'];
    }
    if(isset($array_pessoa['cpf'])){
      $this->cpf = $array_pessoa['cpf'];
    }
    if(isset($array_pessoa['data_de_nascimento'])){
      $this->data_de_nascimento = $array_pessoa['data_de_nascimento'];
    }
    if(isset($array_pessoa['sexo'])){
      $this->sexo = $array_pessoa['sexo'];
    }
    if(isset($array_pessoa['email'])){
      $this->email = $array_pessoa['email'];
    }
    if(isset($array_pessoa['telefone_fixo'])){
      $this->telefone_fixo = $array_pessoa['telefone_fixo'];
    }
    if(isset($array_pessoa['telefone_movel'])){
      $this->telefone_movel = $array_pessoa['telefone_movel'];
    }
    if(isset($array_pessoa['telefone_estrangeiro'])){
      $this->telefone_estrangeiro = $array_pessoa['telefone_estrangeiro'];
    }
    if(isset($array_pessoa['setor'])){
      $this->setor = $array_pessoa['setor'];
    }
  }

  public function set_pk_pessoa($pk_pessoa){
    $this->pk_pessoa = $pk_pessoa;
  }

  public function set_fk_setor($fk_setor){
    $this->fk_setor = $fk_setor;
  }

  public function set_nome($nome){
    $this->nome = $nome;
  }

  public function set_sobrenome($sobrenome){
    $this->sobrenome = $sobrenome;
  }

  public function set_cpf($cpf){
    $this->cpf = $cpf;
  }

  public function set_data_de_nascimento($data_de_nascimento){
    $this->data_de_nascimento = $data_de_nascimento;
  }

  public function set_sexo($sexo){
    $this->sexo = $sexo;
  }

  public function set_email($email){
    $this->email = $email;
  }

  public function set_telefone_fixo($telefone_fixo){
    $this->telefone_fixo = $telefone_fixo;
  }

  public function set_telefone_movel($telefone_movel){
    $this->telefone_movel = $telefone_movel;
  }

  public function set_telefone_estrangeiro($telefone_estrangeiro){
    $this->telefone_estrangeiro = $telefone_estrangeiro;
  }

  public function set_setor($setor){
    $this->setor = $setor;
  }

  public function get_pk_pessoa(){
    return $this->pk_pessoa;
  }

  public function get_fk_setor(){
    return $this->fk_setor;
  }

  public function get_nome(){
    return $this->nome;
  }

  public function get_sobrenome(){
    return $this->sobrenome;
  }

  public function get_cpf(){
    return $this->cpf;
  }

  public function get_data_de_nascimento(){
    return $this->data_de_nascimento;
  }

  public function get_sexo(){
    return $this->sexo;
  }

  public function get_email(){
    return $this->email;
  }

  public function get_telefone_fixo(){
    return $this->telefone_fixo;
  }

  public function get_telefone_movel(){
    return $this->telefone_movel;
  }

  public function get_telefone_estrangeiro(){
    return $this->telefone_estrangeiro;
  }

  public function get_setor(){
    return $this->setor;
  }

  public function enum_sexo(){
    $array_enum['masculino'] = 'Masculino';
    $array_enum['feminino'] = 'Feminino';
    return $array_enum;
  }

  public function nome_completo(){
    return "$this->nome $this->sobrenome";
  }

  public function quantidade_minima_de_caracteres($atributo){
    switch($atributo){
      case 'nome':
        return 2;
      case 'sobrenome':
        return 2;
      case 'cpf':
        return 14;
      case 'email':
        return 5;
    }
    return -1;
  }

  /* O método abaixo deve ser sempre igual ou mais restritivo que o banco de dados */
  public function quantidade_maxima_de_caracteres($atributo){
    switch($atributo){
      case 'nome':
        return 40;
      case 'sobrenome':
        return 160;
      case 'cpf':
        return 14;
      case 'email':
        return 160;
      case 'telefone_fixo':
        return 20;
      case 'telefone_movel':
        return 20;
      case 'telefone_estrangeiro':
        return 30;
    }
    return -1;
  }

  public function padrao_para_cpf(){
    return '/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/';
  }

  public function padrao_para_telefone_fixo(){
    return '/^\(\d{2}\)\d{4}\-\d{4}$/';
  }

  public function padrao_para_telefone_movel(){
    return '/^\(\d{2}\)\d{5}\-\d{4}$/';
  }

  public function padrao_para_telefone_estrangeiro(){
    return '/^\+\d{1,3}\(\d{1,4}\)[0-9,\-]{3,12}$/';
  }

}
