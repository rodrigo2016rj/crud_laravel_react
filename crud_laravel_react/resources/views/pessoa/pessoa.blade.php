@extends('template')

@section('head_especifico')
<link href='{{asset("css/$visual_escolhido_template/pessoa.css")}}' type="text/css" rel="stylesheet"/>
<title>{{$nome_do_sistema_template}} - Pessoa</title>
@endsection

@section('pagina_do_sistema')
<div id="div_pagina_pessoa">
  <h2 id="h2_titulo_da_pagina">
    @if ($id_valido)
    <span>{{$nome_completo_da_pessoa}}</span>
    @else
    <span>Pessoa</span>
    @endif
  </h2>
  @if ($mensagem)
  <div id="div_mensagem">
    <span id="span_mensagem" class="mensagem_de_{{$tipo_de_mensagem}}">{{$mensagem}}</span>
  </div>
  @endif
  @if ($id_valido)
  <div id="div_opcoes_da_pagina">
    <h3 id="h3_titulo_das_opcoes_da_pagina">
      <span>Opções</span>
    </h3>
    <div id="div_lista_de_opcoes_da_pagina">
      <a id="link_editar_pessoa" class="opcao_da_pagina" 
         href="/editar_pessoa?id={{$id_da_pessoa}}">Editar Pessoa</a>
      <a id="link_excluir_pessoa" class="opcao_da_pagina" 
         href="/excluir_pessoa?id={{$id_da_pessoa}}">Excluir Pessoa</a>
    </div>
  </div>
  <div id="div_local_das_informacoes_da_pessoa">
    <h3 id="h3_titulo_das_informacoes_da_pessoa">
      <span>Informações</span>
    </h3>
    <div id="div_informacoes_da_pessoa">
      <div id="div_local_do_nome_completo" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">Nome:</span>
        <div id="div_nome_completo" class="local_da_parte_especifica_da_informacao">
          <span id="span_nome_completo" 
                class="parte_especifica_da_informacao">{{$nome_completo_da_pessoa}}</span>
        </div>
      </div>
      <div id="div_local_do_cpf" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">CPF:</span>
        <div id="div_cpf" class="local_da_parte_especifica_da_informacao">
          <span id="span_cpf" class="parte_especifica_da_informacao">{{$cpf_da_pessoa}}</span>
        </div>
      </div>
      <div id="div_local_da_data_de_nascimento" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">Data de nascimento:</span>
        <div id="div_data_de_nascimento" class="local_da_parte_especifica_da_informacao">
          <span id="span_data_de_nascimento" 
                class="parte_especifica_da_informacao">{{$data_de_nascimento_da_pessoa}}</span>
        </div>
      </div>
      <div id="div_local_da_idade" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">Idade:</span>
        <div id="div_idade" class="local_da_parte_especifica_da_informacao">
          <span id="span_idade" 
                class="parte_especifica_da_informacao">{{$idade_da_pessoa}}</span>
        </div>
      </div>
      <div id="div_local_do_sexo" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">Sexo:</span>
        <div id="div_sexo" class="local_da_parte_especifica_da_informacao">
          <span id="span_sexo" 
                class="parte_especifica_da_informacao {{$sexo_classe_css}}">{{$sexo_da_pessoa}}</span>
        </div>
      </div>
      <div id="div_local_do_setor" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">Setor:</span>
        <div id="div_setor" class="local_da_parte_especifica_da_informacao">
          <span id="span_setor" class="parte_especifica_da_informacao">{{$setor_da_pessoa}}</span>
        </div>
      </div>
      <div id="div_local_do_email" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">E-mail:</span>
        <div id="div_email" class="local_da_parte_especifica_da_informacao">
          <span id="span_email" class="parte_especifica_da_informacao">{{$email_da_pessoa}}</span>
        </div>
      </div>
      <div id="div_local_do_telefone_fixo" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">Número do telefone fixo:</span>
        @if ($telefone_fixo_da_pessoa)
        <div id="div_telefone_fixo" class="local_da_parte_especifica_da_informacao">
          <span id="span_telefone_fixo" 
                class="parte_especifica_da_informacao">{{$telefone_fixo_da_pessoa}}</span>
        </div>
        @else
        <div id="div_telefone_fixo" class="local_da_parte_especifica_da_informacao">
          <span class="sem_informacao">Não informado</span>
        </div>
        @endif
      </div>
      <div id="div_local_do_telefone_movel" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">Número de celular:</span>
        @if ($telefone_movel_da_pessoa)
        <div id="div_telefone_movel" class="local_da_parte_especifica_da_informacao">
          <span id="span_telefone_movel" 
                class="parte_especifica_da_informacao">{{$telefone_movel_da_pessoa}}</span>
        </div>
        @else
        <div id="div_telefone_movel" class="local_da_parte_especifica_da_informacao">
          <span class="sem_informacao">Não informado</span>
        </div>
        @endif
      </div>
      <div id="div_local_do_telefone_estrangeiro" class="informacao_da_pessoa">
        <span class="parte_generica_da_informacao">Número para contato no exterior:</span>
        @if ($telefone_estrangeiro_da_pessoa)
        <div id="div_telefone_estrangeiro" class="local_da_parte_especifica_da_informacao">
          <span id="span_telefone_estrangeiro" 
                class="parte_especifica_da_informacao">{{$telefone_estrangeiro_da_pessoa}}</span>
        </div>
        @else
        <div id="div_telefone_estrangeiro" class="local_da_parte_especifica_da_informacao">
          <span class="sem_informacao">Não informado</span>
        </div>
        @endif
      </div>
    </div>
  </div>
  @endif
</div>
@endsection
