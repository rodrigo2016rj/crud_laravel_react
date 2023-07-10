<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Models\Entidades\Setor;
use App\Models\Entidades\Pessoa;
use App\Models\EditarPessoaModel;

final class EditarPessoaTest extends TestCase{
  private $ID_NECESSARIO_PARA_TESTAR_TABELA_PESSOA = 1;

  public function testar_o_metodo_selecionar_setores_001(){
    $editar_pessoa_model = new EditarPessoaModel();

    error_log("\n");
    error_log('Testando o método selecionar_setores.');
    error_log("\n");

    error_log('Testando consulta.');
    $retorno = $editar_pessoa_model->selecionar_setores();

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

  public function testar_o_metodo_selecionar_pessoa_001(){
    try{
      $editar_pessoa_model = new EditarPessoaModel();

      error_log("\n");
      error_log('Testando o método selecionar_pessoa.');
      error_log("\n");

      error_log('Testando retorno quando pessoa está cadastrada.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $id = $pessoa->get_pk_pessoa();
      $retorno = $editar_pessoa_model->selecionar_pessoa($id);

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
    $editar_pessoa_model = new EditarPessoaModel();

    error_log("\n");
    error_log('Testando o método selecionar_pessoa.');
    error_log("\n");

    error_log('Testando retorno quando pessoa não está cadastrada.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $id = $pessoa->get_pk_pessoa();
    $retorno = $editar_pessoa_model->selecionar_pessoa($id);

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

  public function testar_o_metodo_verificar_disponibilidade_de_nome_completo_001(){
    try{
      $editar_pessoa_model = new EditarPessoaModel();

      error_log("\n");
      error_log('Testando o método verificar_disponibilidade_de_nome_completo.');
      error_log("\n");

      error_log('Testando retorno quando nome completo não está disponível.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $nome_completo = $pessoa->nome_completo();
      $id = $this->ID_NECESSARIO_PARA_TESTAR_TABELA_PESSOA;
      $retorno = $editar_pessoa_model->verificar_disponibilidade_de_nome_completo($nome_completo, $id);

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
    $editar_pessoa_model = new EditarPessoaModel();

    error_log("\n");
    error_log('Testando o método verificar_disponibilidade_de_nome_completo.');
    error_log("\n");

    error_log('Testando retorno quando nome completo está disponível.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $nome_completo = $pessoa->nome_completo();
    $id = $this->ID_NECESSARIO_PARA_TESTAR_TABELA_PESSOA;
    $retorno = $editar_pessoa_model->verificar_disponibilidade_de_nome_completo($nome_completo, $id);

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
      $editar_pessoa_model = new EditarPessoaModel();

      error_log("\n");
      error_log('Testando o método verificar_disponibilidade_de_cpf.');
      error_log("\n");

      error_log('Testando retorno quando CPF não está disponível.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $cpf = $pessoa->get_cpf();
      $id = $this->ID_NECESSARIO_PARA_TESTAR_TABELA_PESSOA;
      $retorno = $editar_pessoa_model->verificar_disponibilidade_de_cpf($cpf, $id);

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
    $editar_pessoa_model = new EditarPessoaModel();

    error_log("\n");
    error_log('Testando o método verificar_disponibilidade_de_cpf.');
    error_log("\n");

    error_log('Testando retorno quando CPF está disponível.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $cpf = $pessoa->get_cpf();
    $id = $this->ID_NECESSARIO_PARA_TESTAR_TABELA_PESSOA;
    $retorno = $editar_pessoa_model->verificar_disponibilidade_de_cpf($cpf, $id);

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
      $editar_pessoa_model = new EditarPessoaModel();

      error_log("\n");
      error_log('Testando o método verificar_se_o_setor_existe.');
      error_log("\n");

      error_log('Testando retorno quando setor existe.');
      Artisan::call('db:seed', ['--class' => 'DeleteSetorSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertSetorSeeder']);
      $setor = new Setor('array_de_testes');
      $id = $setor->get_pk_setor();
      $retorno = $editar_pessoa_model->verificar_se_o_setor_existe($id);

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
    $editar_pessoa_model = new EditarPessoaModel();

    error_log("\n");
    error_log('Testando o método verificar_se_o_setor_existe.');
    error_log("\n");

    error_log('Testando retorno quando setor não existe.');
    Artisan::call('db:seed', ['--class' => 'DeleteSetorSeeder']);
    $setor = new Setor('array_de_testes');
    $id = $setor->get_pk_setor();
    $retorno = $editar_pessoa_model->verificar_se_o_setor_existe($id);

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
      $editar_pessoa_model = new EditarPessoaModel();

      error_log("\n");
      error_log('Testando o método verificar_disponibilidade_de_email.');
      error_log("\n");

      error_log('Testando retorno quando e-mail não está disponível.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $email = $pessoa->get_email();
      $id = $this->ID_NECESSARIO_PARA_TESTAR_TABELA_PESSOA;
      $retorno = $editar_pessoa_model->verificar_disponibilidade_de_email($email, $id);

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
    $editar_pessoa_model = new EditarPessoaModel();

    error_log("\n");
    error_log('Testando o método verificar_disponibilidade_de_email.');
    error_log("\n");

    error_log('Testando retorno quando e-mail está disponível.');
    Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    $pessoa = new Pessoa('array_de_testes');
    $email = $pessoa->get_email();
    $id = $this->ID_NECESSARIO_PARA_TESTAR_TABELA_PESSOA;
    $retorno = $editar_pessoa_model->verificar_disponibilidade_de_email($email, $id);

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

  public function testar_o_metodo_editar_pessoa_001(){
    try{
      $editar_pessoa_model = new EditarPessoaModel();

      error_log("\n");
      error_log('Testando o método editar_pessoa.');
      error_log("\n");

      error_log('Testando retorno quando a pessoa está cadastrada.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $pessoa->set_nome('Teste Editado');
      $retorno = $editar_pessoa_model->editar_pessoa($pessoa);

      error_log("\n");

      error_log('Retorno precisa ser array.');
      $this->assertIsArray($retorno);
      error_log('É array.');

      error_log("\n");

      error_log('Retorno não pode ter mensagem.');
      $this->assertArrayNotHasKey('mensagem_do_model', $retorno);
      error_log('Não tem mensagem.');

      error_log("\n");

      error_log('Verificando por meio de uma consulta genérica se o registro foi editado.');
      $id = $pessoa->get_pk_pessoa();
      $array_resultado = $this->consulta_generica_para_testes('pessoa', $id);
      $this->assertSame($pessoa->get_nome(), $array_resultado[0]->nome);
      error_log('O registro foi editado.');

      error_log("\n");
      error_log('O método passou pelo teste.');
      error_log("\n");
    }finally{
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
    }
  }

  //É necessário ter a pessoa de pk_pessoa 1 no banco de dados para poder realizar este teste
  public function testar_o_metodo_editar_pessoa_002(){
    try{
      $editar_pessoa_model = new EditarPessoaModel();

      error_log("\n");
      error_log('Testando o método editar_pessoa.');
      error_log("\n");

      error_log('Testando retorno quando a pessoa está cadastrada, mas há outra pessoa com as mesmas informações.');
      error_log("\n");
      error_log('É necessário ter a pessoa de pk_pessoa 1 no banco de dados para poder realizar este teste.');
      Artisan::call('db:seed', ['--class' => 'DeletePessoaSeeder']);
      Artisan::call('db:seed', ['--class' => 'InsertPessoaSeeder']);
      $pessoa = new Pessoa('array_de_testes');
      $pessoa->set_pk_pessoa($this->ID_NECESSARIO_PARA_TESTAR_TABELA_PESSOA);
      $retorno = $editar_pessoa_model->editar_pessoa($pessoa);

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

}
