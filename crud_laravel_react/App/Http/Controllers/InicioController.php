<?php

namespace App\Http\Controllers;

final class InicioController extends TemplateController{

  public function carregar_pagina(){
    $valores = $this->valores_do_template();

    return view('inicio/inicio', $valores);
  }

}
