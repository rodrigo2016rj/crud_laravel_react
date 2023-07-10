<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Entidades\Pessoa;

// Use esta classe apenas para testes
class InsertPessoaSeeder extends Seeder{

  public function run(){
    $pessoa = new Pessoa();
    $insert = $pessoa->array_de_testes();
    DB::table('pessoa')->insert($insert);
  }

}
