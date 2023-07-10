<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Models\Entidades\Setor;
use App\Models\Entidades\Pessoa;
use App\Models\CadastrarPessoaModel;

final class CadastrarPessoaTest extends TestCase{

  public function testar_o_metodo_selecionar_setores_001(){
    $cadastrar_pessoa_model = new CadastrarPessoaModel();

    error_log("\n");
    error_log('Testando o método selecionar_setores.');
    error_log("\n");

    error_log('Testando consulta.');
    $retorno = $cadastrar_pessoa_model->selecionar_setores();

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno não pode ter algo diferente de objeto da classe Setor.');
    $this->assertContainsOnlyInstancesOf(Setor::class, $retorno);
    error_log('Não há algo diferente de objeto da classe Setor.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_verificar_disponibilidade_de_nome_completo_001(){
    try{
      $cadastrar_pessoa_model = new CadastrarPessoaModel();

      error_log("\n");
      error_log('Testando o método verificar_disponibilidade_de_nome_completo.');
      error_log("\n");

      error_log('Testando retorno quando nome completo não está disponível.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $nome_completo = $pessoa->nome_completo();
      $retorno = $cadastrar_pessoa_model->verificar_disponibilidade_de_nome_completo($nome_completo);

      error_log("\n");

      error_log('Retorno precisa ser array.');
      $this->assertIsArray($retorno);
      error_log('É array.');

      error_log("\n");

      error_log('Retorno precisa ter mensagem.');
      $this->assertArrayHasKey('mensagem_do_model', $retorno);
      error_log('Tem mensagem.');

      error_log("\n");
      error_log('O método passou pelo teste.');
      error_log("\n");
    }finally{
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    }
  }

  public function testar_o_metodo_verificar_disponibilidade_de_nome_completo_002(){
    $cadastrar_pessoa_model = new CadastrarPessoaModel();

    error_log("\n");
    error_log('Testando o método verificar_disponibilidade_de_nome_completo.');
    error_log("\n");

    error_log('Testando retorno quando nome completo está disponível.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $nome_completo = $pessoa->nome_completo();
    $retorno = $cadastrar_pessoa_model->verificar_disponibilidade_de_nome_completo($nome_completo);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno não pode ter mensagem.');
    $this->assertArrayNotHasKey('mensagem_do_model', $retorno);
    error_log('Não tem mensagem.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_verificar_disponibilidade_de_cpf_001(){
    try{
      $cadastrar_pessoa_model = new CadastrarPessoaModel();

      error_log("\n");
      error_log('Testando o método verificar_disponibilidade_de_cpf.');
      error_log("\n");

      error_log('Testando retorno quando CPF não está disponível.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $cpf = $pessoa->get_cpf();
      $retorno = $cadastrar_pessoa_model->verificar_disponibilidade_de_cpf($cpf);

      error_log("\n");

      error_log('Retorno precisa ser array.');
      $this->assertIsArray($retorno);
      error_log('É array.');

      error_log("\n");

      error_log('Retorno precisa ter mensagem.');
      $this->assertArrayHasKey('mensagem_do_model', $retorno);
      error_log('Tem mensagem.');

      error_log("\n");
      error_log('O método passou pelo teste.');
      error_log("\n");
    }finally{
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    }
  }

  public function testar_o_metodo_verificar_disponibilidade_de_cpf_002(){
    $cadastrar_pessoa_model = new CadastrarPessoaModel();

    error_log("\n");
    error_log('Testando o método verificar_disponibilidade_de_cpf.');
    error_log("\n");

    error_log('Testando retorno quando CPF está disponível.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $cpf = $pessoa->get_cpf();
    $retorno = $cadastrar_pessoa_model->verificar_disponibilidade_de_cpf($cpf);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno não pode ter mensagem.');
    $this->assertArrayNotHasKey('mensagem_do_model', $retorno);
    error_log('Não tem mensagem.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_verificar_se_o_setor_existe_001(){
    try{
      $cadastrar_pessoa_model = new CadastrarPessoaModel();

      error_log("\n");
      error_log('Testando o método verificar_se_o_setor_existe.');
      error_log("\n");

      error_log('Testando retorno quando setor existe.');
      Artisan::call('db:seed', ['--class' => 'DeleteSetorSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertSetorSeeder']);
      $setor = new Setor('array_de_testes');
      $id = $setor->get_pk_setor();
      $retorno = $cadastrar_pessoa_model->verificar_se_o_setor_existe($id);

      error_log("\n");

      error_log('Retorno precisa ser array.');
      $this->assertIsArray($retorno);
      error_log('É array.');

      error_log("\n");

      error_log('Retorno não pode ter mensagem.');
      $this->assertArrayNotHasKey('mensagem_do_model', $retorno);
      error_log('Não tem mensagem.');

      error_log("\n");
      error_log('O método passou pelo teste.');
      error_log("\n");
    }finally{
      Artisan::call('db:seed', ['--class' => 'DeleteSetorSeeder']);
    }
  }

  public function testar_o_metodo_verificar_se_o_setor_existe_002(){
    $cadastrar_pessoa_model = new CadastrarPessoaModel();

    error_log("\n");
    error_log('Testando o método verificar_se_o_setor_existe.');
    error_log("\n");

    error_log('Testando retorno quando setor não existe.');
    Artisan::call('db:seed', ['--class' => 'DeleteSetorSeeder']);
    $setor = new Setor('array_de_testes');
    $id = $setor->get_pk_setor();
    $retorno = $cadastrar_pessoa_model->verificar_se_o_setor_existe($id);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno precisa ter mensagem.');
    $this->assertArrayHasKey('mensagem_do_model', $retorno);
    error_log('Tem mensagem.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_verificar_disponibilidade_de_email_001(){
    try{
      $cadastrar_pessoa_model = new CadastrarPessoaModel();

      error_log("\n");
      error_log('Testando o método verificar_disponibilidade_de_email.');
      error_log("\n");

      error_log('Testando retorno quando e-mail não está disponível.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $email = $pessoa->get_email();
      $retorno = $cadastrar_pessoa_model->verificar_disponibilidade_de_email($email);

      error_log("\n");

      error_log('Retorno precisa ser array.');
      $this->assertIsArray($retorno);
      error_log('É array.');

      error_log("\n");

      error_log('Retorno precisa ter mensagem.');
      $this->assertArrayHasKey('mensagem_do_model', $retorno);
      error_log('Tem mensagem.');

      error_log("\n");
      error_log('O método passou pelo teste.');
      error_log("\n");
    }finally{
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    }
  }

  public function testar_o_metodo_verificar_disponibilidade_de_email_002(){
    $cadastrar_pessoa_model = new CadastrarPessoaModel();

    error_log("\n");
    error_log('Testando o método verificar_disponibilidade_de_email.');
    error_log("\n");

    error_log('Testando retorno quando e-mail está disponível.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $email = $pessoa->get_email();
    $retorno = $cadastrar_pessoa_model->verificar_disponibilidade_de_email($email);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno não pode ter mensagem.');
    $this->assertArrayNotHasKey('mensagem_do_model', $retorno);
    error_log('Não tem mensagem.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_cadastrar_pessoa_001(){
    try{
      $cadastrar_pessoa_model = new CadastrarPessoaModel();

      error_log("\n");
      error_log('Testando o método cadastrar_pessoa.');
      error_log("\n");

      error_log('Testando retorno quando a pessoa já está cadastrada.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $retorno = $cadastrar_pessoa_model->cadastrar_pessoa($pessoa);

      error_log("\n");

      error_log('Retorno precisa ser array.');
      $this->assertIsArray($retorno);
      error_log('É array.');

      error_log("\n");

      error_log('Retorno precisa ter mensagem.');
      $this->assertArrayHasKey('mensagem_do_model', $retorno);
      error_log('Tem mensagem.');

      error_log("\n");
      error_log('O método passou pelo teste.');
      error_log("\n");
    }finally{
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    }
  }

  public function testar_o_metodo_cadastrar_pessoa_002(){
    $cadastrar_pessoa_model = new CadastrarPessoaModel();

    error_log("\n");
    error_log('Testando o método cadastrar_pessoa.');
    error_log("\n");

    error_log('Testando retorno quando a pessoa ainda não está cadastrada.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $retorno = $cadastrar_pessoa_model->cadastrar_pessoa($pessoa);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno não pode ter mensagem.');
    $this->assertArrayNotHasKey('mensagem_do_model', $retorno);
    error_log('Não tem mensagem.');

    error_log("\n");

    error_log('Retorno tem que ter id.');
    $this->assertArrayHasKey('id_da_pessoa', $retorno);
    error_log('Tem id.');

    error_log("\n");

    error_log('Verificando por meio de uma consulta genérica se o registro foi inserido.');
    $id = $retorno['id_da_pessoa'];
    $array_resultado = $this->consulta_generica_para_testes('pessoa', $id);
    $this->assertCount(1, $array_resultado);
    error_log('O registro foi inserido.');

    $this->remocao_generica_para_testes('pessoa', $id);

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

}
