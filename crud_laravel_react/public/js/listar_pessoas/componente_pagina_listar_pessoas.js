class ComponentePaginaListarPessoas extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    this.state = {
      elemento_modelo: props.elemento.cloneNode(true),
      campos_do_formulario: new Map()
    }
    
    this.remover_foco_do_botao = this.remover_foco_do_botao.bind(this);
    this.buscar = this.buscar.bind(this);
    this.redirecionar_sem_filtros = this.redirecionar_sem_filtros.bind(this);
    
    props.elemento.remove();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          case "for":
            array_melhorado["htmlFor"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponentePaginaListarPessoas tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_filtro_nome":
          elemento = React.createElement(ComponenteFiltroNome, {key: "ComponenteFiltroNome", elemento: elemento, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_filtro_cpf":
          elemento = React.createElement(ComponenteFiltroCPF, {key: "ComponenteFiltroCPF", elemento: elemento, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_filtro_data_de_nascimento":
          elemento = React.createElement(ComponenteFiltroDataDeNascimento, {key: "ComponenteFiltroDataDeNascimento", elemento: elemento, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_filtro_setor":
          elemento = React.createElement(ComponenteFiltroSetor, {key: "ComponenteFiltroSetor", elemento: elemento, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_quantidade_por_pagina":
          elemento = React.createElement(ComponenteQuantidadePorPagina, {key: "ComponenteQuantidadePorPagina", elemento: elemento, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "campo_ordenacao":
          if(elemento.value !== "padrao"){
            this.state.campos_do_formulario.set("ordenacao", elemento.value);
          }else{
            array_atributos["name"] = "";
          }
        break;
        case "botao_buscar":
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.buscar;
        break;
        case "botao_limpar":
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.redirecionar_sem_filtros;
        break;
        case "div_paginacao_de_cima_da_lista_de_pessoas":
          elemento = React.createElement(ComponentePaginacaoDeCimaDaListaDePessoas, {key: "ComponentePaginacaoDeCimaDaListaDePessoas", elemento: elemento, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_partes_da_lista_de_pessoas":
          elemento = React.createElement(ComponentePartesDaListaDePessoas, {key: "ComponentePartesDaListaDePessoas", elemento: elemento, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_paginacao_de_baixo_da_lista_de_pessoas":
          elemento = React.createElement(ComponentePaginacaoDeBaixoDaListaDePessoas, {key: "ComponentePaginacaoDeBaixoDaListaDePessoas", elemento: elemento, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  remover_foco_do_botao(evento){
    evento.target.blur();
  }
  
  buscar(evento){
    evento.preventDefault();
    
    evento.target.blur();
    
    let elemento_formulario = document.createElement("form");
    elemento_formulario.setAttribute("class", "tag_oculta");
    elemento_formulario.setAttribute("method", "get");
    elemento_formulario.setAttribute("action", "/listar_pessoas");
    
    /* Fazendo o campo ordenação ficar por último no map */
    const ordenacao = this.state.campos_do_formulario.get("ordenacao");
    if(typeof ordenacao !== "undefined"){
      this.state.campos_do_formulario.delete("ordenacao");
      this.state.campos_do_formulario.set("ordenacao", ordenacao);
    }
    
    this.state.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      let elemento_campo = document.createElement("input");
      elemento_campo.setAttribute("name", nome_do_campo);
      elemento_campo.setAttribute("value", valor_do_campo);
      elemento_formulario.appendChild(elemento_campo);
    });
    
    if(this.state.campos_do_formulario.size > 0){
      document.body.appendChild(elemento_formulario);
      elemento_formulario.submit();
    }else{
      window.location.href = "/listar_pessoas";
    }
  }
  
  redirecionar_sem_filtros(evento){
    evento.preventDefault();
    
    evento.target.blur();
    
    window.location.href = "/listar_pessoas";
  }
}

class ComponenteFiltroNome extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      o_componente_ja_foi_montado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.state.o_componente_ja_foi_montado = true;
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          case "for":
            array_melhorado["htmlFor"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteFiltroNome tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_filtro_nome":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
            if(elemento.value !== "" && elemento.value !== null){
              this.props.campos_do_formulario.set("filtro_nome", elemento.value);
            }
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["name"] = this.tirar_o_name() ? "" : "filtro_nome";
          array_atributos["onChange"] = this.atualizar_este_componente;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  tirar_o_name(){
    if(this.state.valor === "" || this.state.valor === null){
      return true;
    }
    return false;
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    if(evento.target.value !== ""){
      this.props.campos_do_formulario.set("filtro_nome", evento.target.value);
    }else{
      this.props.campos_do_formulario.delete("filtro_nome");
    }
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
}

class ComponenteFiltroCPF extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      o_componente_ja_foi_montado: false
    }
    
    this.aplicar_mascara = this.aplicar_mascara.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(this.state.valor !== "" && this.state.valor !== null){
      this.props.campos_do_formulario.set("filtro_cpf", this.state.valor);
    }
    this.state.o_componente_ja_foi_montado = true;
  }
  
  componentDidUpdate(){
    if(this.state.valor !== "" && this.state.valor !== null){
      this.props.campos_do_formulario.set("filtro_cpf", this.state.valor);
    }else{
      this.props.campos_do_formulario.delete("filtro_cpf");
    }
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          case "for":
            array_melhorado["htmlFor"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteFiltroCPF tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_filtro_cpf":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["name"] = this.tirar_o_name() ? "" : "filtro_cpf";
          array_atributos["onKeyUp"] = this.aplicar_mascara;
          array_atributos["onChange"] = this.atualizar_este_componente;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  tirar_o_name(){
    if(this.state.valor === "" || this.state.valor === null){
      return true;
    }
    return false;
  }
  
  aplicar_mascara(evento){
    evento.preventDefault();
    
    const campo_filtro_cpf = evento.target;
    
    let posicao_do_cursor = campo_filtro_cpf.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      this.state.valor = campo_filtro_cpf.value;
      return;
    }
    
    campo_filtro_cpf.value = campo_filtro_cpf.value.replace(/[^0-9]/g, "");
    
    if(campo_filtro_cpf.value.length > this.state.valor.length){
      posicao_do_cursor++;
    }
    if(campo_filtro_cpf.value.length >= 3){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 3) + "." + campo_filtro_cpf.value.slice(3);
      if(posicao_do_cursor === 3 || posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length >= 7){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 7) + "." + campo_filtro_cpf.value.slice(7);
      if(posicao_do_cursor === 7 || posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length >= 11){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 11) + "-" + campo_filtro_cpf.value.slice(11);
      if(posicao_do_cursor === 11 || posicao_do_cursor === 12){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length > 14){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 14);
    }
    
    campo_filtro_cpf.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    this.state.valor = campo_filtro_cpf.value;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
}

class ComponenteFiltroDataDeNascimento extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: null,
      calendario: {
        nome: "calendario_para_o_campo_filtro_data_de_nascimento",
        valor: null,
        dia: null,
        mes: null,
        ano: null,
        total_de_dias_do_mes: null,
        ano_referencia: null
      },
      atualiza_todo_o_calendario: true,
      o_componente_ja_foi_montado: false
    }
    
    this.colocar_estilo_hover_na_borda_do_campo = this.colocar_estilo_hover_na_borda_do_campo.bind(this);
    this.colocar_estilo_normal_na_borda_do_campo = this.colocar_estilo_normal_na_borda_do_campo.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    this.desfaz_selecao_de_texto = this.desfaz_selecao_de_texto.bind(this);
    this.atualizar_o_calendario = this.atualizar_o_calendario.bind(this);
    this.registrar_escolha_de_dia = this.registrar_escolha_de_dia.bind(this);
    this.registrar_escolha_de_mes = this.registrar_escolha_de_mes.bind(this);
    this.registrar_escolha_de_ano = this.registrar_escolha_de_ano.bind(this);
    this.confirmar_escolha = this.confirmar_escolha.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.state.o_componente_ja_foi_montado = true;
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          case "for":
            array_melhorado["htmlFor"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteFiltroDataDeNascimento tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_filtro_data_de_nascimento":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
            if(elemento.value !== "" && elemento.value !== null){
              this.props.campos_do_formulario.set("filtro_data_de_nascimento", elemento.value);
            }
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["name"] = this.tirar_o_name() ? "" : "filtro_data_de_nascimento";
          array_atributos["onMouseEnter"] = this.colocar_estilo_hover_na_borda_do_campo;
          array_atributos["onMouseLeave"] = this.colocar_estilo_normal_na_borda_do_campo;
          array_atributos["onChange"] = this.atualizar_este_componente;
        break;
        case "span_icone_de_calendario_do_campo_filtro_data_de_nascimento":
          array_atributos["onMouseEnter"] = this.colocar_estilo_hover_na_borda_do_campo;
          array_atributos["onMouseLeave"] = this.colocar_estilo_normal_na_borda_do_campo;
          array_atributos["onMouseDown"] = this.desfaz_selecao_de_texto;
          array_atributos["onClick"] = this.atualizar_o_calendario;
        break;
        case "div_calendario_para_o_campo_filtro_data_de_nascimento":
          if(this.state.atualiza_todo_o_calendario){
            this.atualizar_todo_o_calendario();
          }
          const calendario = this.state.calendario;
          const funcoes = {
            registrar_escolha_de_dia: this.registrar_escolha_de_dia,
            registrar_escolha_de_mes: this.registrar_escolha_de_mes,
            registrar_escolha_de_ano: this.registrar_escolha_de_ano,
            confirmar_escolha: this.confirmar_escolha
          }
          elemento = React.createElement(ComponenteCalendario, {key: "ComponenteCalendario do campo filtro data de nascimento", calendario: calendario, funcoes: funcoes}, null);
          return elemento;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  tirar_o_name(){
    if(this.state.valor === "" || this.state.valor === null){
      return true;
    }
    return false;
  }
  
  colocar_estilo_hover_na_borda_do_campo(evento){
    let tag_alvo = evento.target;
    
    if(tag_alvo.id === "span_icone_de_calendario_do_campo_filtro_data_de_nascimento"){
      tag_alvo = tag_alvo.parentNode.querySelector("#campo_filtro_data_de_nascimento");
    }
    if(tag_alvo.id === "campo_filtro_data_de_nascimento"){
      tag_alvo.style.border = "1px solid #8080C8";
    }
  }
  
  colocar_estilo_normal_na_borda_do_campo(evento){
    let tag_alvo = evento.target;
    
    if(tag_alvo.id === "span_icone_de_calendario_do_campo_filtro_data_de_nascimento"){
      tag_alvo = tag_alvo.parentNode.querySelector("#campo_filtro_data_de_nascimento");
    }
    if(tag_alvo.id === "campo_filtro_data_de_nascimento"){
      tag_alvo.style.border = "1px solid #C8C8C8";
    }
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.state.atualiza_todo_o_calendario = true;
    
    if(evento.target.value !== ""){
      this.props.campos_do_formulario.set("filtro_data_de_nascimento", evento.target.value);
    }else{
      this.props.campos_do_formulario.delete("filtro_data_de_nascimento");
    }
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  desfaz_selecao_de_texto(evento){
    evento.preventDefault();
  }
  
  atualizar_o_calendario(evento){
    this.state.atualiza_todo_o_calendario = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  atualizar_todo_o_calendario(){
    const valor = this.state.valor;
    
    if(valor !== null && valor.match(/^\d{2}\/(0[1-9]|1[0-2])\/\d{4}$/)){
      this.state.calendario.valor = valor;
      
      let dia = valor.substring(0, 2);
      let mes = valor.substring(3, 5);
      let ano = valor.substring(6, 10);
      
      if(dia.substring(0, 1) === "0"){
        dia = dia.substring(1, 2);
      }
      this.state.calendario.dia = parseInt(dia, 10);
      
      if(mes.substring(0, 1) === "0"){
        mes = mes.substring(1, 2);
      }
      this.state.calendario.mes = parseInt(mes, 10);
      
      this.state.calendario.ano = parseInt(ano, 10);
      
      this.state.calendario.total_de_dias_do_mes = new Date(ano, mes, 0).getDate();
      
      this.state.calendario.ano_referencia = this.state.calendario.ano;
      
      if(this.state.calendario.dia > this.state.calendario.total_de_dias_do_mes){
        this.state.calendario.dia = this.state.calendario.total_de_dias_do_mes;
      }
    }else{
      this.state.calendario.valor = null;
      
      const data_atual = new Date();
      this.state.calendario.dia = data_atual.getDate();
      this.state.calendario.mes = data_atual.getMonth() + 1;
      this.state.calendario.ano = data_atual.getFullYear() - 30;
      this.state.calendario.total_de_dias_do_mes = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
      this.state.calendario.ano_referencia = this.state.calendario.ano;
    }
  }
  
  registrar_escolha_de_dia(evento){
    const texto_do_dia = evento.target.innerText;
    if(texto_do_dia === null || texto_do_dia === ""){
      return;
    }
    this.state.calendario.dia = texto_do_dia;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  registrar_escolha_de_mes(evento){
    this.state.calendario.mes = parseInt(evento.target.value, 10);
    
    this.state.calendario.total_de_dias_do_mes = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
    
    if(this.state.calendario.dia > this.state.calendario.total_de_dias_do_mes){
      this.state.calendario.dia = this.state.calendario.total_de_dias_do_mes;
    }
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  registrar_escolha_de_ano(evento){
    this.state.calendario.ano = parseInt(evento.target.value, 10);
    
    this.state.calendario.total_de_dias_do_mes = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
    
    if(this.state.calendario.dia > this.state.calendario.total_de_dias_do_mes){
      this.state.calendario.dia = this.state.calendario.total_de_dias_do_mes;
    }
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  confirmar_escolha(evento){
    let dia = this.state.calendario.dia;
    if(dia < 10){
      dia = "0" + dia;
    }
    
    let mes = this.state.calendario.mes;
    if(mes < 10){
      mes = "0" + mes;
    }
    
    const ano = this.state.calendario.ano;
    this.state.calendario.ano_referencia = this.state.calendario.ano;
    
    const valor = dia + "/" + mes + "/" + ano;
    this.state.calendario.valor = valor;
    this.state.valor = valor;
    
    this.state.atualiza_todo_o_calendario = false;
    
    this.props.campos_do_formulario.set("filtro_data_de_nascimento", valor);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
}

class ComponenteCalendario extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = document.getElementById("div_calendario");
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
    
    this.remover_foco_do_botao = this.remover_foco_do_botao.bind(this);
    
    this.react_referencia_calendario = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(typeof window.evento_do_calendario_ja_foi_adicionado === "undefined"){
      window.evento_do_calendario_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
      window.addEventListener("click", function(evento){
        let tag_alvo = evento.target;
        
        while(true){
          if(tag_alvo === null || !tag_alvo.tagName){
            this.react_referencia_calendario.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.id === "campo_filtro_data_de_nascimento"){
            break;
          }
          
          if(tag_alvo.id === "span_icone_de_calendario_do_campo_filtro_data_de_nascimento"){
            if(this.react_referencia_calendario.current.classList.contains("tag_oculta")){
              this.react_referencia_calendario.current.classList.remove("tag_oculta");
            }else{
              this.react_referencia_calendario.current.classList.add("tag_oculta");
            }
            break;
          }
          
          if(tag_alvo.id === "botao_confirmar_do_calendario_para_o_campo_filtro_data_de_nascimento"){
            this.react_referencia_calendario.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.id === "div_calendario_para_o_campo_filtro_data_de_nascimento"){
            break;
          }
          
          tag_alvo = tag_alvo.parentNode;
        }
      }.bind(this));
    }
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteCalendario tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      array_atributos["id"] = array_atributos["id"].replace("calendario", this.props.calendario.nome);
      switch(array_atributos["id"]){
        case "div_" + this.props.calendario.nome:
          if(window.innerWidth <= 640){
            const largura_do_calendario = 348; //Em pixels.
            var estilo = {
              left: window.innerWidth / 2 - largura_do_calendario / 2 + "px"
            }
            array_atributos["style"] = estilo;
          }
          array_atributos["ref"] = this.react_referencia_calendario;
        break;
        case "caixa_de_selecao_de_ano_do_" + this.props.calendario.nome:
          const ano_alvo = this.props.calendario.ano_referencia;
          const menor_ano = ano_alvo - 6;
          const maior_ano = ano_alvo + 5;
          
          conteudo_dinamico = Array(0);
          for(let ano = menor_ano; ano <= maior_ano; ano++){
            var atributos = {
              key: "option_ano_" + ano,
              value: ano
            }
            var react_option = React.createElement("option", atributos, ano);
            conteudo_dinamico.push(react_option);
          }
          array_atributos["value"] = this.props.calendario.ano;
          array_atributos["onChange"] = this.props.funcoes.registrar_escolha_de_ano;
        break;
        case "div_dias_do_" + this.props.calendario.nome:
          if(this.props.calendario.dia > this.props.calendario.total_de_dias_do_mes){
            this.props.calendario.dia = this.props.calendario.total_de_dias_do_mes;
          }
          
          const mes = this.props.calendario.mes;
          const ano = this.props.calendario.ano;
          const dia_da_semana_do_primeiro_dia_do_mes = new Date(ano, mes - 1, 1).getDay() + 1;
          const posicao_inicial = 7; //As posições de 0 a 6 são as legendas (exemplo: Dom, Seg, Ter e etc).
          const posicao_do_primeiro_dia = dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
          const posicao_do_ultimo_dia = this.props.calendario.total_de_dias_do_mes - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
          let posicao_do_dia_selecionado = this.props.calendario.dia - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
          
          conteudo_dinamico = Array(0);
          var elemento_react_span = React.createElement("span", {key: "span_domingo"}, "Dom");
          const elemento_react_div_domingo = React.createElement("div", {key: "div_domingo", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_domingo);
          
          var elemento_react_span = React.createElement("span", {key: "span_segunda"}, "Seg");
          const elemento_react_div_segunda = React.createElement("div", {key: "div_segunda", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_segunda);
          
          var elemento_react_span = React.createElement("span", {key: "span_terca"}, "Ter");
          const elemento_react_div_terca = React.createElement("div", {key: "div_terca", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_terca);
          
          var elemento_react_span = React.createElement("span", {key: "span_quarta"}, "Qua");
          const elemento_react_div_quarta = React.createElement("div", {key: "div_quarta", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_quarta);
          
          var elemento_react_span = React.createElement("span", {key: "span_quinta"}, "Qui");
          const elemento_react_div_quinta = React.createElement("div", {key: "div_quinta", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_quinta);
          
          var elemento_react_span = React.createElement("span", {key: "span_sexta"}, "Sex");
          const elemento_react_div_sexta = React.createElement("div", {key: "div_sexta", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_sexta);
          
          var elemento_react_span = React.createElement("span", {key: "span_sabado"}, "Sáb");
          const elemento_react_div_sabado = React.createElement("div", {key: "div_sabado", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_sabado);
          
          let numero_do_dia = 0;
          for(let i = posicao_inicial; i < 7*7; i++){
            var elemento = document.createElement("div");
            elemento.classList.add("celula_do_calendario");
            
            var elemento_react_span = React.createElement("span", null, null);
            
            if(i >= posicao_do_primeiro_dia && i <= posicao_do_ultimo_dia){
              numero_do_dia++;
              elemento_react_span = React.createElement("span", {key: "span_dia_" + numero_do_dia}, numero_do_dia);
              elemento.classList.add("dia_do_calendario");
              if(i === posicao_do_dia_selecionado){
                elemento.classList.add("dia_escolhido");
              }
            }else if(i > posicao_do_ultimo_dia){
              elemento.classList.add("tag_oculta");
            }
            
            const on_clique = this.props.funcoes.registrar_escolha_de_dia;
            var elemento_react_dia = React.createElement("div", {key: "celula_do_calendario_" + i, className: elemento.getAttribute("class"), onClick: on_clique}, elemento_react_span);
            conteudo_dinamico.push(elemento_react_dia);
          }
        break;
        case "caixa_de_selecao_de_mes_do_" + this.props.calendario.nome:
          array_atributos["value"] = this.props.calendario.mes;
          array_atributos["onChange"] = this.props.funcoes.registrar_escolha_de_mes;
        break;
        case "botao_confirmar_do_" + this.props.calendario.nome:
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.props.funcoes.confirmar_escolha;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  remover_foco_do_botao(evento){
    evento.target.blur();
  }
}

class ComponenteFiltroSetor extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      o_componente_ja_foi_montado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.state.o_componente_ja_foi_montado = true;
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          case "for":
            array_melhorado["htmlFor"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteFiltroSetor tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "caixa_de_selecao_filtro_setor":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
            if(elemento.value !== "" && elemento.value !== null){
              this.props.campos_do_formulario.set("filtro_id_do_setor", elemento.value);
            }
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["name"] = this.tirar_o_name() ? "" : "filtro_id_do_setor";
          array_atributos["onChange"] = this.atualizar_este_componente;
        break;
      }
    }
    if(nome_da_tag === "option"){
      delete array_atributos["selected"];
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  tirar_o_name(){
    if(this.state.valor === "" || this.state.valor === null){
      return true;
    }
    return false;
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    if(evento.target.value !== ""){
      this.props.campos_do_formulario.set("filtro_id_do_setor", evento.target.value);
    }else{
      this.props.campos_do_formulario.delete("filtro_id_do_setor");
    }
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
}

class ComponenteQuantidadePorPagina extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      o_componente_ja_foi_montado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.state.o_componente_ja_foi_montado = true;
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          case "for":
            array_melhorado["htmlFor"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteQuantidadePorPagina tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "caixa_de_selecao_quantidade_por_pagina":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
            if(elemento.value !== "padrao" && elemento.value !== "" && elemento.value !== null){
              this.props.campos_do_formulario.set("quantidade_por_pagina", elemento.value);
            }
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["name"] = this.tirar_o_name() ? "" : "quantidade_por_pagina";
          array_atributos["onChange"] = this.atualizar_este_componente;
        break;
      }
    }
    if(nome_da_tag === "option"){
      delete array_atributos["selected"];
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  tirar_o_name(){
    if(this.state.valor === "padrao" || this.state.valor === "" || this.state.valor === null){
      return true;
    }
    return false;
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    if(evento.target.value !== "padrao" && evento.target.value !== ""){
      this.props.campos_do_formulario.set("quantidade_por_pagina", evento.target.value);
    }else{
      this.props.campos_do_formulario.delete("quantidade_por_pagina");
    }
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
}

class ComponentePaginacaoDeCimaDaListaDePessoas extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
    
    this.submeter_o_formulario = this.submeter_o_formulario.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          case "for":
            array_melhorado["htmlFor"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponentePaginacaoDeCimaDaListaDePessoas tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(nome_da_tag === "a"){
      array_atributos["onClick"] = this.submeter_o_formulario;
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  submeter_o_formulario(evento){
    evento.preventDefault();
    
    let elemento_formulario = document.createElement("form");
    elemento_formulario.setAttribute("class", "tag_oculta");
    elemento_formulario.setAttribute("method", "get");
    elemento_formulario.setAttribute("action", "/listar_pessoas");
    
    /* Fazendo o campo ordenação ficar por último no map */
    const ordenacao = this.props.campos_do_formulario.get("ordenacao");
    if(typeof ordenacao !== "undefined"){
      this.props.campos_do_formulario.delete("ordenacao");
      this.props.campos_do_formulario.set("ordenacao", ordenacao);
    }
    
    this.props.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      let elemento_campo = document.createElement("input");
      elemento_campo.setAttribute("name", nome_do_campo);
      elemento_campo.setAttribute("value", valor_do_campo);
      elemento_formulario.appendChild(elemento_campo);
    });
    
    let href = evento.target.getAttribute("href");
    const pagina = href.replace("/listar_pessoas?pagina=", "");
    
    let elemento_campo_pagina = document.createElement("input");
    elemento_campo_pagina.setAttribute("type", "hidden");
    elemento_campo_pagina.setAttribute("name", "pagina");
    elemento_campo_pagina.setAttribute("value", pagina);
    elemento_formulario.appendChild(elemento_campo_pagina);
    
    document.body.appendChild(elemento_formulario);
    elemento_formulario.submit();
  }
}

class ComponentePartesDaListaDePessoas extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
    
    this.ordenar_lista = this.ordenar_lista.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponentePartesDaListaDePessoas tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_parte_nome_da_lista_de_pessoas":
          array_atributos["onClick"] = this.ordenar_lista;
        break;
        case "div_parte_cpf_da_lista_de_pessoas":
          array_atributos["onClick"] = this.ordenar_lista;
        break;
        case "div_parte_setor_da_lista_de_pessoas":
          array_atributos["onClick"] = this.ordenar_lista;
        break;
        case "div_parte_contato_da_lista_de_pessoas":
          array_atributos["onClick"] = this.ordenar_lista;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  ordenar_lista(evento){
    const texto = evento.target.innerText;
    
    /* Trocando o valor após o clique */
    let ordenacao = "padrao";
    switch(texto){
      case "Nome":
        ordenacao = "nome_completo_a_z";
        break;
      case "Nome (A → Z)":
        ordenacao = "nome_completo_z_a";
        break;
      case "Nome (Z → A)":
        ordenacao = "padrao";
        break;
      case "CPF":
        ordenacao = "cpf_crescente";
        break;
      case "CPF (0 → 9)":
        ordenacao = "cpf_decrescente";
        break;
      case "CPF (9 → 0)":
        ordenacao = "padrao";
        break;
      case "Setor":
        ordenacao = "setor_a_z";
        break;
      case "Setor (A → Z)":
        ordenacao = "setor_z_a";
        break;
      case "Setor (Z → A)":
        ordenacao = "padrao";
        break;
      case "Contato":
        ordenacao = "contato_a_z";
        break;
      case "Contato (A → Z)":
        ordenacao = "contato_z_a";
        break;
      case "Contato (Z → A)":
        ordenacao = "padrao";
        break;
    }
    this.props.campos_do_formulario.delete("ordenacao");
    if(ordenacao !== "padrao"){
      this.props.campos_do_formulario.set("ordenacao", ordenacao);
    }
    
    let elemento_formulario = document.createElement("form");
    elemento_formulario.setAttribute("class", "tag_oculta");
    elemento_formulario.setAttribute("method", "get");
    elemento_formulario.setAttribute("action", "/listar_pessoas");
    
    this.props.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      let elemento_campo = document.createElement("input");
      elemento_campo.setAttribute("name", nome_do_campo);
      elemento_campo.setAttribute("value", valor_do_campo);
      elemento_formulario.appendChild(elemento_campo);
    });
    
    if(this.props.campos_do_formulario.size > 0){
      document.body.appendChild(elemento_formulario);
      elemento_formulario.submit();
    }else{
      window.location.href = "/listar_pessoas";
    }
  }
}

class ComponentePaginacaoDeBaixoDaListaDePessoas extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
    
    this.submeter_o_formulario = this.submeter_o_formulario.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        switch(atributo.nodeName){
          case "autocomplete":
            array_melhorado["autoComplete"] = atributo.nodeValue;
          break;
          case "class":
            array_melhorado["className"] = atributo.nodeValue;
          break;
          case "for":
            array_melhorado["htmlFor"] = atributo.nodeValue;
          break;
          default:
            array_melhorado[atributo.nodeName] = atributo.nodeValue;
          break;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponentePaginacaoDeBaixoDaListaDePessoas tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(nome_da_tag === "a"){
      array_atributos["onClick"] = this.submeter_o_formulario;
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  submeter_o_formulario(evento){
    evento.preventDefault();
    
    let elemento_formulario = document.createElement("form");
    elemento_formulario.setAttribute("class", "tag_oculta");
    elemento_formulario.setAttribute("method", "get");
    elemento_formulario.setAttribute("action", "/listar_pessoas");
    
    /* Fazendo o campo ordenação ficar por último no map */
    const ordenacao = this.props.campos_do_formulario.get("ordenacao");
    if(typeof ordenacao !== "undefined"){
      this.props.campos_do_formulario.delete("ordenacao");
      this.props.campos_do_formulario.set("ordenacao", ordenacao);
    }
    
    this.props.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      let elemento_campo = document.createElement("input");
      elemento_campo.setAttribute("name", nome_do_campo);
      elemento_campo.setAttribute("value", valor_do_campo);
      elemento_formulario.appendChild(elemento_campo);
    });
    
    let href = evento.target.getAttribute("href");
    const pagina = href.replace("/listar_pessoas?pagina=", "");
    
    let elemento_campo_pagina = document.createElement("input");
    elemento_campo_pagina.setAttribute("type", "hidden");
    elemento_campo_pagina.setAttribute("name", "pagina");
    elemento_campo_pagina.setAttribute("value", pagina);
    elemento_formulario.appendChild(elemento_campo_pagina);
    
    document.body.appendChild(elemento_formulario);
    elemento_formulario.submit();
  }
}

const div_pagina_listar_pessoas = document.getElementById("div_pagina_listar_pessoas");
const div_componente_pagina_listar_pessoas = document.getElementById("div_componente_pagina_listar_pessoas");

const root = ReactDOM.createRoot(div_componente_pagina_listar_pessoas);
root.render(
  React.createElement(
    React.StrictMode, 
    null,
    React.createElement(ComponentePaginaListarPessoas, {elemento: div_pagina_listar_pessoas}, null)
  )
);
