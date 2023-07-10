<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Models\Entidades\Pessoa;
use App\Models\ExcluirPessoaModel;

final class ExcluirPessoaTest extends TestCase{

  public function testar_o_metodo_selecionar_pessoa_001(){
    try{
      $excluir_pessoa_model = new ExcluirPessoaModel();

      error_log("\n");
      error_log('Testando o método selecionar_pessoa.');
      error_log("\n");

      error_log('Testando retorno quando pessoa está cadastrada.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $id = $pessoa->get_pk_pessoa();
      $retorno = $excluir_pessoa_model->selecionar_pessoa($id);

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
    $excluir_pessoa_model = new ExcluirPessoaModel();

    error_log("\n");
    error_log('Testando o método selecionar_pessoa.');
    error_log("\n");

    error_log('Testando retorno quando pessoa não está cadastrada.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $id = $pessoa->get_pk_pessoa();
    $retorno = $excluir_pessoa_model->selecionar_pessoa($id);

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

  public function testar_o_metodo_deletar_pessoa_001(){
    $excluir_pessoa_model = new ExcluirPessoaModel();

    error_log("\n");
    error_log('Testando o método deletar_pessoa.');
    error_log("\n");

    error_log('Testando retorno quando a pessoa está cadastrada.');
    error_log('Este método não retorna (void).');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $id = $pessoa->get_pk_pessoa();
    $this->assertNull($excluir_pessoa_model->deletar_pessoa($id));
    error_log('Não retornou.');

    error_log("\n");

    error_log('Verificando por meio de uma consulta genérica se o registro foi deletado.');
    $array_resultado = $this->consulta_generica_para_testes('pessoa', $id);
    $this->assertCount(0, $array_resultado);
    error_log('O registro foi deletado.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_deletar_pessoa_002(){
    $excluir_pessoa_model = new ExcluirPessoaModel();

    error_log("\n");
    error_log('Testando o método deletar_pessoa.');
    error_log("\n");

    error_log('Testando retorno quando a pessoa não está cadastrada.');
    error_log('Este método não retorna (void).');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $id = $pessoa->get_pk_pessoa();
    $this->assertNull($excluir_pessoa_model->deletar_pessoa($id));
    error_log('Não retornou.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

}
