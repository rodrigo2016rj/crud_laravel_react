<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Entidades\Setor;

// Use esta classe apenas para testes
class DeleteSetorSeeder extends Seeder{

  public function run(){
    $setor = new Setor('array_de_testes');
    $pk_setor = $setor->get_pk_setor();
    DB::table('setor')->where('pk_setor', '=', $pk_setor)->delete();

    /* Retrocedendo valor do AUTO_INCREMENT */
    $auto_increment = DB::table('setor')->max('pk_setor') + 1;
    DB::statement("ALTER TABLE setor AUTO_INCREMENT = $auto_increment");
  }

}
