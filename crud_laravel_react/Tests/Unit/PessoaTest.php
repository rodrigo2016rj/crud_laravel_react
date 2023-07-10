<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Models\Entidades\Pessoa;
use App\Models\PessoaModel;

final class PessoaTest extends TestCase{

  public function testar_o_metodo_selecionar_pessoa_001(){
    try{
      $pessoa_model = new PessoaModel();

      error_log("\n");
      error_log('Testando o método selecionar_pessoa.');
      error_log("\n");

      error_log('Testando retorno quando pessoa está cadastrada.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $id = $pessoa->get_pk_pessoa();
      $retorno = $pessoa_model->selecionar_pessoa($id);

      error_log("\n");

      error_log('Retorno precisa ser array.');
      $this->assertIsArray($retorno);
      error_log('É array.');

      error_log("\n");

      error_log('Retorno não pode ter algo diferente de objeto da classe Pessoa.');
      $this->assertContainsOnlyInstancesOf(Pessoa::class, $retorno);
      error_log('Não há algo diferente de objeto da classe Pessoa.');

      error_log("\n");

      error_log('Retorno só pode ter uma pessoa.');
      $this->assertCount(1, $retorno);
      error_log('Retorno só tem uma.');

      error_log("\n");
      error_log('O método passou pelo teste.');
      error_log("\n");
    }finally{
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    }
  }

  public function testar_o_metodo_selecionar_pessoa_002(){
    $pessoa_model = new PessoaModel();

    error_log("\n");
    error_log('Testando o método selecionar_pessoa.');
    error_log("\n");

    error_log('Testando retorno quando pessoa não está cadastrada.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $id = $pessoa->get_pk_pessoa();
    $retorno = $pessoa_model->selecionar_pessoa($id);

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

}
