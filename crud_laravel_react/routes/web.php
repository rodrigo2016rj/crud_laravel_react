<?php

use Illuminate\Support\Facades\Route;

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider and all of them will
  | be assigned to the "web" middleware group. Make something great!
  |
 */

/* Página Padrão */
Route::get('/', [App\Http\Controllers\InicioController::class, 'carregar_pagina']);

/* Página Início */
Route::get('/inicio', [App\Http\Controllers\InicioController::class, 'carregar_pagina']);

/* Página Cadastrar Pessoa */
Route::get('/cadastrar_pessoa', [App\Http\Controllers\CadastrarPessoaController::class, 'carregar_pagina']);
Route::post('/cadastrar_pessoa/cadastrar', [App\Http\Controllers\CadastrarPessoaController::class, 'cadastrar']);

/* Página Listar Pessoas */
Route::get('/listar_pessoas', [App\Http\Controllers\ListarPessoasController::class, 'carregar_pagina']);

/* Página Pessoa */
Route::get('/pessoa', [App\Http\Controllers\PessoaController::class, 'carregar_pagina']);

/* Página Editar Pessoa */
Route::get('/editar_pessoa', [App\Http\Controllers\EditarPessoaController::class, 'carregar_pagina']);
Route::post('/editar_pessoa/editar', [App\Http\Controllers\EditarPessoaController::class, 'editar']);

/* Página Excluir Pessoa */
Route::get('/excluir_pessoa', [App\Http\Controllers\ExcluirPessoaController::class, 'carregar_pagina']);
Route::post('/excluir_pessoa/excluir', [App\Http\Controllers\ExcluirPessoaController::class, 'excluir']);

/* Página Tudo em Um */
Route::get('/tudo_em_um', [App\Http\Controllers\TudoEmUmController::class, 'carregar_pagina']);
Route::get('/tudo_em_um/mostrar_pessoas_ajax', [App\Http\Controllers\TudoEmUmController::class, 'mostrar_pessoas_ajax']);
Route::post('/tudo_em_um/cadastrar_pessoa_ajax', [App\Http\Controllers\TudoEmUmController::class, 'cadastrar_pessoa_ajax']);
Route::post('/tudo_em_um/editar_pessoa_ajax', [App\Http\Controllers\TudoEmUmController::class, 'editar_pessoa_ajax']);
Route::post('/tudo_em_um/excluir_pessoa_ajax', [App\Http\Controllers\TudoEmUmController::class, 'excluir_pessoa_ajax']);
