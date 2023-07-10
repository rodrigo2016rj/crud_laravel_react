<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Entidades\Setor;

// Use esta classe apenas para testes
class InsertSetorSeeder extends Seeder{

  public function run(){
    $setor = new Setor();
    $insert = $setor->array_de_testes();
    DB::table('setor')->insert($insert);
  }

}
