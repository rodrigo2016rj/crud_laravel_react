@foreach ($lista_de_pessoas['pessoas'] as $pessoa)
@if ($loop->odd)<div class="pessoa impar">@else<div class="pessoa par">@endif
  <div class="local_do_nome_da_pessoa">
    <a href="pessoa?id={{$pessoa['id']}}" class="nome_da_pessoa">{{$pessoa['nome_completo']}}</a>
  </div>
  <div class="local_do_cpf_da_pessoa">
    <span class="cpf_da_pessoa">{{$pessoa['cpf']}}</span>
  </div>
  <div class="local_do_nome_do_setor">
    <span class="nome_do_setor">{!! $pessoa['nome_do_setor_com_quebra_de_linha'] !!}</span>
  </div>
  <div class="local_do_contato_da_pessoa">
    <div class="contato_da_pessoa">
      <span class="email_da_pessoa">{{$pessoa['email']}}</span>
    </div>
    @if ($pessoa['telefone_fixo'])
    <div class="contato_da_pessoa">
      <span class="telefone_fixo_da_pessoa">{{$pessoa['telefone_fixo']}}</span>
    </div>
    @endif
    @if ($pessoa['telefone_movel'])
    <div class="contato_da_pessoa">
      <span class="telefone_movel_da_pessoa">{{$pessoa['telefone_movel']}}</span>
    </div>
    @endif
    @if ($pessoa['telefone_estrangeiro'])
    <div class="contato_da_pessoa">
      <span class="telefone_estrangeiro_da_pessoa">{{$pessoa['telefone_estrangeiro']}}</span>
    </div>
    @endif
  </div>
  <div class="local_das_opcoes_do_item_da_lista">
    <div class="opcao_do_item_da_lista">
      <a href="editar_pessoa?id={{$pessoa['id']}}" class="link_editar_pessoa">Editar</a>
    </div>
    <div class="opcao_do_item_da_lista">
      <a href="excluir_pessoa?id={{$pessoa['id']}}" class="link_excluir_pessoa">Excluir</a>
    </div>
  </div>
</div>
@endforeach
@if (empty($lista_de_pessoas['pessoas']))
<div id="div_mensagem_quando_nao_ha_pessoas">
  <span id="span_mensagem_quando_nao_ha_pessoas">Nenhuma pessoa foi encontrada, limpe os filtros ou busque por outras informações.</span>
</div>
@endif