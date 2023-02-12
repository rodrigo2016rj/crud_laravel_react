@extends('template')

@section('head_especifico')
<link href='{{asset("css/$visual_escolhido_template/tudo_em_um.css")}}' type="text/css" rel="stylesheet"/>
<title>{{$nome_do_sistema_template}} - Tudo em um</title>
@endsection

@section('pagina_do_sistema')
<div id="div_pagina_tudo_em_um">
  <h2 id="h2_titulo_da_pagina">
    <span>Tudo em um</span>
  </h2>
  <div id="div_opcoes_da_pagina">
    <h3 id="h3_titulo_das_opcoes_da_pagina">
      <span>Opções</span>
    </h3>
    <div id="div_lista_de_opcoes_da_pagina">
      <a id="link_cadastrar_pessoa" class="opcao_da_pagina" href="/cadastrar_pessoa">Cadastrar Pessoa</a>
      <div id="div_cadastrar_pessoa" class="tag_oculta">
        <div class="div_fechar">
          <span>X</span>
        </div>
        <h3 id="h3_titulo_cadastrar_pessoa">
          <span>Cadastrar Pessoa</span>
        </h3>
        <div id="div_legenda_do_formulario_cadastrar_pessoa">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>Indica que o campo é de preenchimento obrigatório.</span>
        </div>
        <div id="div_cadastrar_nome">
          <div id="div_label_nome">
            <label id="label_nome" for="campo_nome">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Nome</span>
            </label>
          </div>
          <div id="div_campo_nome">
            <input type="text" id="campo_nome" name="nome" autocomplete="off"/>
          </div>
        </div>
        <div id="div_cadastrar_sobrenome">
          <div id="div_label_sobrenome">
            <label id="label_sobrenome" for="campo_sobrenome">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Sobrenome</span>
            </label>
          </div>
          <div id="div_campo_sobrenome">
            <input type="text" id="campo_sobrenome" name="sobrenome" autocomplete="off"/>
          </div>
        </div>
        <div id="div_cadastrar_cpf">
          <div id="div_label_cpf">
            <label id="label_cpf" for="campo_cpf">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>CPF</span>
            </label>
          </div>
          <div id="div_campo_cpf">
            <input type="text" id="campo_cpf" name="cpf" autocomplete="off"/>
          </div>
        </div>
        <div id="div_cadastrar_data_de_nascimento">
          <div id="div_label_data_de_nascimento">
            <label id="label_data_de_nascimento" for="campo_data_de_nascimento">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Data de nascimento</span>
            </label>
          </div>
          <div id="div_campo_data_de_nascimento">
            <input type="text" id="campo_data_de_nascimento" name="data_de_nascimento" autocomplete="off"/>
            <span id="span_icone_de_calendario_do_campo_data_de_nascimento"></span>
            <div id="div_calendario_para_o_campo_data_de_nascimento"></div>
          </div>
        </div>
        <div id="div_cadastrar_sexo">
          <div id="div_label_lista_de_sexos">
            <label id="label_lista_de_sexos">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Sexo</span>
            </label>
          </div>
          <div id="div_lista_de_sexos">
          @foreach ($sexos as $chave => $valor)
          <label class="item_da_lista_de_sexos">
            <input type="radio" name="sexo" value="{{$chave}}" autocomplete="off"/>
            <span>{{$valor}}</span>
          </label>
          @endforeach
          </div>
        </div>
        <div id="div_cadastrar_setor">
          <div id="div_label_setor">
            <label id="label_setor" for="caixa_de_selecao_setor">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Setor</span>
            </label>
          </div>
          <div id="div_caixa_de_selecao_setor">
            <select id="caixa_de_selecao_setor" name="id_do_setor" autocomplete="off">
              <option value="">Selecione</option>
              @foreach ($setores as $setor)
                <option value="{{$setor['id']}}">{{$setor['nome']}}</option>
              @endforeach
            </select>
          </div>
        </div>
        <div id="div_cadastrar_email">
          <div id="div_label_email">
            <label id="label_email" for="campo_email">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>E-mail</span>
            </label>
          </div>
          <div id="div_campo_email">
            <input type="text" id="campo_email" name="email" autocomplete="off"/>
          </div>
        </div>
        <div id="div_cadastrar_telefone_fixo">
          <div id="div_label_telefone_fixo">
            <label id="label_telefone_fixo" for="campo_telefone_fixo">
              <span>Número do telefone fixo</span>
            </label>
          </div>
          <div id="div_campo_telefone_fixo">
            <input type="text" id="campo_telefone_fixo" name="telefone_fixo" autocomplete="off"/>
          </div>
        </div>
        <div id="div_cadastrar_telefone_movel">
          <div id="div_label_telefone_movel">
            <label id="label_telefone_movel" for="campo_telefone_movel">
              <span>Número de celular</span>
            </label>
          </div>
          <div id="div_campo_telefone_movel">
            <input type="text" id="campo_telefone_movel" name="telefone_movel" autocomplete="off"/>
          </div>
        </div>
        <div id="div_cadastrar_telefone_estrangeiro">
          <div id="div_label_telefone_estrangeiro">
            <label id="label_telefone_estrangeiro" for="campo_telefone_estrangeiro">
              <span>Número para contato no exterior</span>
            </label>
          </div>
          <div id="div_campo_telefone_estrangeiro">
            <input type="text" id="campo_telefone_estrangeiro" name="telefone_estrangeiro" 
                   autocomplete="off"/>
          </div>
        </div>
        <div id="div_mensagem_cadastrar_pessoa" class="div_mensagem tag_oculta">
          <span id="span_mensagem_cadastrar_pessoa"></span>
        </div>
        <div id="div_botao_cadastrar">
          @csrf
          <button type="button" id="botao_cadastrar">Cadastrar</button>
        </div>
      </div>
    </div>
  </div>
  <div id="div_filtros">
    <h3 id="h3_titulo_dos_filtros">
      <span>Buscar</span>
    </h3>
    <div id="div_filtro_nome">
      <div id="div_label_filtro_nome">
        <label id="label_filtro_nome" for="campo_filtro_nome">
          <span>Nome</span>
        </label>
      </div>
      <div id="div_campo_filtro_nome">
        <input type="text" id="campo_filtro_nome" name="filtro_nome" 
               value="{{$lista_de_pessoas['filtro_nome']}}" autocomplete="off" 
               placeholder="Parte do nome"/>
      </div>
    </div>
    <div id="div_filtro_cpf">
      <div id="div_label_filtro_cpf">
        <label id="label_filtro_cpf" for="campo_filtro_cpf">
          <span>CPF</span>
        </label>
      </div>
      <div id="div_campo_filtro_cpf">
        <input type="text" id="campo_filtro_cpf" name="filtro_cpf" 
               value="{{$lista_de_pessoas['filtro_cpf']}}" autocomplete="off" 
               placeholder="CPF completo"/>
      </div>
    </div>
    <div id="div_filtro_data_de_nascimento">
      <div id="div_label_filtro_data_de_nascimento">
        <label id="label_filtro_data_de_nascimento" for="campo_filtro_data_de_nascimento">
          <span>Data de nascimento</span>
        </label>
      </div>
      <div id="div_campo_filtro_data_de_nascimento">
        <input type="text" id="campo_filtro_data_de_nascimento" name="filtro_data_de_nascimento" 
               value="{{$lista_de_pessoas['filtro_data_de_nascimento']}}" 
               autocomplete="off" placeholder="dia/mês/ano"/>
        <span id="span_icone_de_calendario_do_campo_filtro_data_de_nascimento"></span>
        <div id="div_calendario_para_o_campo_filtro_data_de_nascimento"></div>
      </div>
    </div>
    <div id="div_filtro_setor">
      <div id="div_label_filtro_setor">
        <label id="label_filtro_setor" for="caixa_de_selecao_filtro_setor">
          <span>Setor</span>
        </label>
      </div>
      <div id="div_caixa_de_selecao_filtro_setor">
        <select id="caixa_de_selecao_filtro_setor" name="filtro_id_do_setor" autocomplete="off">
          <option value="">Selecione</option>
          @foreach ($setores as $setor)
            @if ($setor['id'] == $lista_de_pessoas['filtro_id_do_setor'])
            <option value="{{$setor['id']}}" selected="selected">{{$setor['nome']}}</option>
            @else
            <option value="{{$setor['id']}}">{{$setor['nome']}}</option>
            @endif
          @endforeach
        </select>
      </div>
    </div>
    <div id="div_quantidade_por_pagina">
      <div id="div_label_quantidade_por_pagina">
        <label id="label_quantidade_por_pagina" for="caixa_de_selecao_quantidade_por_pagina">
          <span>Quantidade por página</span>
        </label>
      </div>
      <div id="div_caixa_de_selecao_quantidade_por_pagina">
        <select id="caixa_de_selecao_quantidade_por_pagina" name="quantidade_por_pagina" 
                autocomplete="off">
          @foreach ($quantidades_por_pagina as $chave => $valor)
            @if ($chave === $lista_de_pessoas['quantidade_por_pagina'])
            <option value="{{$chave}}" selected="selected">{{$valor}}</option>
            @else
            <option value="{{$chave}}">{{$valor}}</option>
            @endif
          @endforeach
        </select>
      </div>
    </div>
    <div id="div_botoes_dos_filtros">
      <input type="hidden" id="campo_ordenacao" name="ordenacao" 
             value="{{$lista_de_pessoas['ordenacao']}}"/>
      <button type="button" id="botao_buscar">Buscar</button>
      <button type="button" id="botao_limpar">Limpar</button>
    </div>
  </div>
  <div id="div_local_da_lista_de_pessoas">
    <h3 id="h3_titulo_da_lista_de_pessoas">
      <span id="span_titulo_da_lista_de_pessoas">Lista</span>
      <span id="span_status_da_busca" class="tag_oculta"></span>
    </h3>
    <div id="div_paginacao_de_cima_da_lista_de_pessoas">
    @if ($lista_de_pessoas['pagina_atual'])
      @include ('tudo_em_um.paginacao_da_lista_de_pessoas')
    @endif
    </div>
    <div id="div_partes_da_lista_de_pessoas">
      <div id="div_parte_nome_da_lista_de_pessoas" class="parte_da_lista">
        <span>Nome{{$lista_de_pessoas['ordem_do_nome']}}</span>
      </div>
      <div id="div_parte_cpf_da_lista_de_pessoas" class="parte_da_lista">
        <span>CPF{{$lista_de_pessoas['ordem_do_cpf']}}</span>
      </div>
      <div id="div_parte_setor_da_lista_de_pessoas" class="parte_da_lista">
        <span>Setor{{$lista_de_pessoas['ordem_do_setor']}}</span>
      </div>
      <div id="div_parte_contato_da_lista_de_pessoas" class="parte_da_lista">
        <span>Contato{{$lista_de_pessoas['ordem_do_contato']}}</span>
      </div>
      <div id="div_parte_opcoes_da_lista_de_pessoas" class="parte_da_lista">
        <span>Opções</span>
      </div>
    </div>
    <div id="div_lista_de_pessoas">
      @include ('tudo_em_um.lista_de_pessoas')
    </div>
    <div id="div_paginacao_de_baixo_da_lista_de_pessoas">
    @if ($lista_de_pessoas['pagina_atual'])
      @include ('tudo_em_um.paginacao_da_lista_de_pessoas')
    @endif
    </div>
  </div>
</div>
<div id="div_calendario" class="div_calendario tag_oculta">
  <div id="div_cabecalho_do_calendario" class="div_cabecalho_do_calendario">
    <span id="span_titulo_do_calendario" class="span_titulo_do_calendario">Calendário</span>
    <select id="caixa_de_selecao_de_mes_do_calendario" class="caixa_de_selecao_de_mes_do_calendario" 
            autocomplete="off">
      <option class="opcao_mes" value="1">Janeiro</option>
      <option class="opcao_mes" value="2">Fevereiro</option>
      <option class="opcao_mes" value="3">Março</option>
      <option class="opcao_mes" value="4">Abril</option>
      <option class="opcao_mes" value="5">Maio</option>
      <option class="opcao_mes" value="6">Junho</option>
      <option class="opcao_mes" value="7">Julho</option>
      <option class="opcao_mes" value="8">Agosto</option>
      <option class="opcao_mes" value="9">Setembro</option>
      <option class="opcao_mes" value="10">Outubro</option>
      <option class="opcao_mes" value="11">Novembro</option>
      <option class="opcao_mes" value="12">Dezembro</option>
    </select>
    <select id="caixa_de_selecao_de_ano_do_calendario" class="caixa_de_selecao_de_ano_do_calendario" 
            autocomplete="off">
    </select>
  </div>
  <div id="div_corpo_do_calendario" class="div_corpo_do_calendario">
    <div id="div_dias_do_calendario" class="div_dias_do_calendario">
      <div class="celula_do_calendario">
        <span>Dom</span>
      </div>
      <div class="celula_do_calendario">
        <span>Seg</span>
      </div>
      <div class="celula_do_calendario">
        <span>Ter</span>
      </div>
      <div class="celula_do_calendario">
        <span>Qua</span>
      </div>
      <div class="celula_do_calendario">
        <span>Qui</span>
      </div>
      <div class="celula_do_calendario">
        <span>Sex</span>
      </div>
      <div class="celula_do_calendario">
        <span>Sáb</span>
      </div>
    </div>
  </div>
  <div id="div_rodape_do_calendario" class="div_rodape_do_calendario">
    <div id="div_botoes_do_calendario" class="div_botoes_do_calendario">
      <button type="button" id="botao_confirmar_do_calendario" 
              class="botao_confirmar_do_calendario">Confirmar</button>
    </div>
  </div>
</div>
<div id="div_componente_pagina_tudo_em_um">
  <script src="{{asset('js/tudo_em_um/componente_pagina_tudo_em_um.js')}}"></script>
</div>
@endsection
