<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Entidades\Pessoa;

// Use esta classe apenas para testes
class DeletePessoaSeeder extends Seeder{

  public function run(){
    $pessoa = new Pessoa('array_de_testes');
    $pk_pessoa = $pessoa->get_pk_pessoa();
    DB::table('pessoa')->where('pk_pessoa', '=', $pk_pessoa)->delete();

    /* Retrocedendo valor do AUTO_INCREMENT */
    $auto_increment = DB::table('pessoa')->max('pk_pessoa') + 1;
    DB::statement("ALTER TABLE pessoa AUTO_INCREMENT = $auto_increment");
  }

}
