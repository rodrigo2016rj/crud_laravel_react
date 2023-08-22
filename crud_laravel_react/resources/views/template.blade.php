<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href='{{asset("css/$visual_escolhido_template/template.css")}}' type="text/css" rel="stylesheet"/>
    <script src="{{asset('js/react.development.js')}}"></script>
    <script src="{{asset('js/react-dom.development.js')}}"></script>
    <script src="{{asset('js/template/interacoes.js')}}"></script>
    @section('head_especifico')
    @show
    {{header('Cache-Control: no-store');}}
  </head>
  <body>
    <div id="div_cabecalho_template">
      <h1 id="h1_titulo_do_sistema_template">
        <span>{{$nome_do_sistema_template}}</span>
      </h1>
      <nav id="nav_menu_do_sistema_template">
        <div id="div_opcoes_do_menu_do_sistema_template">
          <a id="link_inicio_template" class="opcao_do_menu_do_sistema" 
             href="/inicio">Início</a>
          <a id="link_cadastrar_template" class="opcao_do_menu_do_sistema" 
             href="/cadastrar_pessoa">Cadastrar</a>
          <a id="link_listar_template" class="opcao_do_menu_do_sistema" 
             href="/listar_pessoas">Listar</a>
          <a id="link_tudo_em_um_template" class="opcao_do_menu_do_sistema" 
             href="/tudo_em_um">Tudo em um</a>
        </div>
      </nav>
    </div>
    <div id="div_tronco_template">
      @yield('pagina_do_sistema')
    </div>
    <div id="div_rodape_template">
      <div id="div_autor_do_sistema_template">
        <span>Este sistema foi feito por Rodrigo Diniz da Silva.</span>
      </div>
      <div id="div_tecnologias_do_sistema_template">
        <span>Este sistema usa PHP, Laravel e React.</span>
      </div>
    </div>
  </body>
</html>
