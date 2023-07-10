<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Entidades\Setor;
use App\Models\Entidades\Pessoa;
use App\Models\ListarPessoasModel;

final class ListarPessoasTest extends TestCase{

  public function testar_o_metodo_selecionar_setores_001(){
    $listar_pessoas_model = new ListarPessoasModel();

    error_log("\n");
    error_log('Testando o método selecionar_setores.');
    error_log("\n");

    error_log('Testando consulta.');
    $retorno = $listar_pessoas_model->selecionar_setores();

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

  public function testar_o_metodo_selecionar_pessoas_001(){
    $listar_pessoas_model = new ListarPessoasModel();

    error_log("\n");
    error_log('Testando o método selecionar_pessoas.');
    error_log("\n");

    error_log('Testando consulta.');
    $filtros = array();
    $ordenacao = 'padrao';
    $quantidade = 100;
    $descartar = 0;
    $retorno = $listar_pessoas_model->selecionar_pessoas($filtros, $ordenacao, $quantidade, $descartar);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno não pode ter algo diferente de objeto da classe Pessoa.');
    $this->assertContainsOnlyInstancesOf(Pessoa::class, $retorno);
    error_log('Não há algo diferente de objeto da classe Pessoa.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_selecionar_pessoas_002(){
    $listar_pessoas_model = new ListarPessoasModel();

    error_log("\n");
    error_log('Testando o método selecionar_pessoas.');
    error_log("\n");

    error_log('Testando consulta com filtro e ordenação.');
    $filtros = array();
    $filtros['nome'] = 'a';
    $ordenacao = 'nome_completo_a_z';
    $quantidade = 100;
    $descartar = 0;
    $retorno = $listar_pessoas_model->selecionar_pessoas($filtros, $ordenacao, $quantidade, $descartar);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno não pode ter algo diferente de objeto da classe Pessoa.');
    $this->assertContainsOnlyInstancesOf(Pessoa::class, $retorno);
    error_log('Não há algo diferente de objeto da classe Pessoa.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_contar_pessoas_001(){
    $listar_pessoas_model = new ListarPessoasModel();

    error_log("\n");
    error_log('Testando o método contar_pessoas.');
    error_log("\n");

    error_log('Testando consulta.');
    $filtros = array();
    $retorno = $listar_pessoas_model->contar_pessoas($filtros);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");

    error_log('Retorno precisa ter quantidade.');
    $this->assertArrayHasKey('quantidade', $retorno);
    error_log('Tem quantidade.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

  public function testar_o_metodo_contar_pessoas_002(){
    $listar_pessoas_model = new ListarPessoasModel();

    error_log("\n");
    error_log('Testando o método contar_pessoas.');
    error_log("\n");

    error_log('Testando consulta com filtro.');
    $filtros = array();
    $filtros['nome'] = 'a';
    $retorno = $listar_pessoas_model->contar_pessoas($filtros);

    error_log("\n");

    error_log('Retorno precisa ser array.');
    $this->assertIsArray($retorno);
    error_log('É array.');

    error_log("\n");
    error_log('Retorno precisa ter quantidade.');
    $this->assertArrayHasKey('quantidade', $retorno);
    error_log('Tem quantidade.');

    error_log("\n");
    error_log('O método passou pelo teste.');
    error_log("\n");
  }

}
