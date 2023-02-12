<a class="primeira_pagina" href="/listar_pessoas?pagina=1">Primeira</a>
@if ($lista_de_pessoas['pagina_atual'] > 1)
  <a class="pagina_anterior" href="/listar_pessoas?pagina={{$lista_de_pessoas['pagina_atual'] - 1}}">Anterior</a>
@else
  <a class="pagina_anterior" href="/listar_pessoas?pagina=1">Anterior</a>
@endif
@for ($pagina=1; $pagina <= $lista_de_pessoas['ultima_pagina']; $pagina++)
  @if ($pagina < $lista_de_pessoas['pagina_atual'] - 3)
    @continue
  @endif
  @if ($pagina != 1 and $pagina == $lista_de_pessoas['pagina_atual'] - 3)
    <span>...</span>
  @endif
  @if ($pagina > $lista_de_pessoas['pagina_atual'] + 3)
    <span>...</span>
    @break
  @endif
  @if ($pagina == $lista_de_pessoas['pagina_atual'])
    <a class="pagina_selecionada" href="/listar_pessoas?pagina={{$pagina}}">{{$pagina}}</a>
  @else
    <a class="pagina" href="/listar_pessoas?pagina={{$pagina}}">{{$pagina}}</a>
  @endif
@endfor
@if ($lista_de_pessoas['pagina_atual'] < $lista_de_pessoas['ultima_pagina'])
  <a class="pagina_seguinte" href="/listar_pessoas?pagina={{$lista_de_pessoas['pagina_atual'] + 1}}">Seguinte</a>
@else
  <a class="pagina_seguinte" href="/listar_pessoas?pagina={{$lista_de_pessoas['ultima_pagina']}}">Seguinte</a>
@endif
<a class="ultima_pagina" href="/listar_pessoas?pagina={{$lista_de_pessoas['ultima_pagina']}}">Última</a>