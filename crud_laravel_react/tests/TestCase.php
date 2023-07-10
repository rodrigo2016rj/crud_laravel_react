<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase{

  use CreatesApplication;

  // Usado para conferir um registro após um insert, update ou delete.
  protected final function consulta_generica_para_testes($tabela, $pk){
    $array_resultado = DB::table($tabela)->where("pk_$tabela", '=', $pk)->get()->all();
    return $array_resultado;
  }

  // Usado para remover um registro após um insert.
  protected final function remocao_generica_para_testes($tabela, $pk){
    DB::table($tabela)->where("pk_$tabela", '=', $pk)->delete();

    /* Retrocedendo valor do AUTO_INCREMENT */
    $auto_increment = DB::table($tabela)->max("pk_$tabela") + 1;
    DB::statement("ALTER TABLE $tabela AUTO_INCREMENT = $auto_increment");
  }

}
