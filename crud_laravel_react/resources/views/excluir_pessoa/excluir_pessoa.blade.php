@extends('template')

@section('head_especifico')
<link href='{{asset("css/$visual_escolhido_template/excluir_pessoa.css")}}' type="text/css" rel="stylesheet"/>
<title>{{$nome_do_sistema_template}} - Excluir Pessoa</title>
@endsection

@section('pagina_do_sistema')
<div id="div_pagina_excluir_pessoa">
  <h2 id="h2_titulo_da_pagina">
    <span>Excluir Pessoa</span>
  </h2>
  @if ($mensagem)
  <div id="div_mensagem">
    <span id="span_mensagem" class="mensagem_de_{{$tipo_de_mensagem}}">{{$mensagem}}</span>
  </div>
  @endif
  @if ($id_valido)
  <form id="form_confirmar_exclusao_de_pessoa" method="post" action="/excluir_pessoa/excluir">
    <div id="div_texto_confirmar_exclusao_de_pessoa">
      <span>
        Tem certeza que você deseja excluir definitivamente, do banco de dados deste sistema, 
        {{$nome_completo_da_pessoa}}, CPF {{$cpf_da_pessoa}}, cujo setor é o {{$setor_da_pessoa}}?
      </span>
    </div>
    <div id="div_botao_excluir">
      @csrf
      <input type="hidden" id="campo_id_da_pessoa" name="id_da_pessoa" value="{{$id_da_pessoa}}"/>
      <input type="submit" id="botao_excluir" value="Excluir Pessoa"/>
    </div>
  </form>
  @endif
</div>
<div id="div_componente_pagina_excluir_pessoa">
  <script src="{{asset('js/excluir_pessoa/componente_pagina_excluir_pessoa.js')}}"></script>
</div>
@endsection
