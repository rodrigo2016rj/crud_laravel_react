class ComponentePaginaCadastrarPessoa extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    this.state = {
      elemento_modelo: props.elemento.cloneNode(true)
    }
    
    this.remover_foco_do_botao = this.remover_foco_do_botao.bind(this);
    
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
    
    array_atributos["key"] = "ComponentePaginaCadastrarPessoa tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_cadastrar_nome":
          elemento = React.createElement(ComponenteCadastrarNome, {key: "ComponenteCadastrarNome", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_sobrenome":
          elemento = React.createElement(ComponenteCadastrarSobrenome, {key: "ComponenteCadastrarSobrenome", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_cpf":
          elemento = React.createElement(ComponenteCadastrarCPF, {key: "ComponenteCadastrarCPF", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_data_de_nascimento":
          elemento = React.createElement(ComponenteCadastrarDataDeNascimento, {key: "ComponenteCadastrarDataDeNascimento", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_sexo":
          elemento = React.createElement(ComponenteCadastrarSexo, {key: "ComponenteCadastrarSexo", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_setor":
          elemento = React.createElement(ComponenteCadastrarSetor, {key: "ComponenteCadastrarSetor", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_email":
          elemento = React.createElement(ComponenteCadastrarEmail, {key: "ComponenteCadastrarEmail", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_telefone_fixo":
          elemento = React.createElement(ComponenteCadastrarTelefoneFixo, {key: "ComponenteCadastrarTelefoneFixo", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_telefone_movel":
          elemento = React.createElement(ComponenteCadastrarTelefoneMovel, {key: "ComponenteCadastrarTelefoneMovel", elemento: elemento}, null);
          return elemento;
        break;
        case "div_cadastrar_telefone_estrangeiro":
          elemento = React.createElement(ComponenteCadastrarTelefoneEstrangeiro, {key: "ComponenteCadastrarTelefoneEstrangeiro", elemento: elemento}, null);
          return elemento;
        break;
        case "botao_cadastrar":
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.remover_foco_do_botao;
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

class ComponenteCadastrarNome extends React.Component{
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
    
    array_atributos["key"] = "ComponenteCadastrarNome tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_nome":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
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

class ComponenteCadastrarSobrenome extends React.Component{
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
    
    array_atributos["key"] = "ComponenteCadastrarSobrenome tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_sobrenome":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
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

class ComponenteCadastrarCPF extends React.Component{
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
    
    array_atributos["key"] = "ComponenteCadastrarCPF tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_cpf":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
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
  
  aplicar_mascara(evento){
    evento.preventDefault();
    
    const campo_cpf = evento.target;
    
    let posicao_do_cursor = campo_cpf.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      this.state.valor = campo_cpf.value;
      return;
    }
    
    campo_cpf.value = campo_cpf.value.replace(/[^0-9]/g, "");
    
    if(campo_cpf.value.length > this.state.valor.length){
      posicao_do_cursor++;
    }
    if(campo_cpf.value.length >= 3){
      campo_cpf.value = campo_cpf.value.slice(0, 3) + "." + campo_cpf.value.slice(3);
      if(posicao_do_cursor === 3 || posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length >= 7){
      campo_cpf.value = campo_cpf.value.slice(0, 7) + "." + campo_cpf.value.slice(7);
      if(posicao_do_cursor === 7 || posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length >= 11){
      campo_cpf.value = campo_cpf.value.slice(0, 11) + "-" + campo_cpf.value.slice(11);
      if(posicao_do_cursor === 11 || posicao_do_cursor === 12){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length > 14){
      campo_cpf.value = campo_cpf.value.slice(0, 14);
    }
    
    campo_cpf.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    this.state.valor = campo_cpf.value;
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

class ComponenteCadastrarDataDeNascimento extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: null,
      calendario: {
        nome: "calendario_para_o_campo_data_de_nascimento",
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
    
    array_atributos["key"] = "ComponenteCadastrarDataDeNascimento tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_data_de_nascimento":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["onMouseEnter"] = this.colocar_estilo_hover_na_borda_do_campo;
          array_atributos["onMouseLeave"] = this.colocar_estilo_normal_na_borda_do_campo;
          array_atributos["onChange"] = this.atualizar_este_componente;
        break;
        case "span_icone_de_calendario_do_campo_data_de_nascimento":
          array_atributos["onMouseEnter"] = this.colocar_estilo_hover_na_borda_do_campo;
          array_atributos["onMouseLeave"] = this.colocar_estilo_normal_na_borda_do_campo;
          array_atributos["onMouseDown"] = this.desfaz_selecao_de_texto;
          array_atributos["onClick"] = this.atualizar_o_calendario;
        break;
        case "div_calendario_para_o_campo_data_de_nascimento":
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
          elemento = React.createElement(ComponenteCalendario, {key: "ComponenteCalendario do campo data de nascimento", calendario: calendario, funcoes: funcoes}, null);
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
  
  colocar_estilo_hover_na_borda_do_campo(evento){
    let tag_alvo = evento.target;
    
    if(tag_alvo.id === "span_icone_de_calendario_do_campo_data_de_nascimento"){
      tag_alvo = tag_alvo.parentNode.querySelector("#campo_data_de_nascimento");
    }
    if(tag_alvo.id === "campo_data_de_nascimento"){
      tag_alvo.style.border = "1px solid #8080C8";
    }
  }
  
  colocar_estilo_normal_na_borda_do_campo(evento){
    let tag_alvo = evento.target;
    
    if(tag_alvo.id === "span_icone_de_calendario_do_campo_data_de_nascimento"){
      tag_alvo = tag_alvo.parentNode.querySelector("#campo_data_de_nascimento");
    }
    if(tag_alvo.id === "campo_data_de_nascimento"){
      tag_alvo.style.border = "1px solid #C8C8C8";
    }
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
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
          
          if(tag_alvo.id === "campo_data_de_nascimento"){
            break;
          }
          
          if(tag_alvo.id === "span_icone_de_calendario_do_campo_data_de_nascimento"){
            if(this.react_referencia_calendario.current.classList.contains("tag_oculta")){
              this.react_referencia_calendario.current.classList.remove("tag_oculta");
            }else{
              this.react_referencia_calendario.current.classList.add("tag_oculta");
            }
            break;
          }
          
          if(tag_alvo.id === "botao_confirmar_do_calendario_para_o_campo_data_de_nascimento"){
            this.react_referencia_calendario.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.id === "div_calendario_para_o_campo_data_de_nascimento"){
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
          if(window.innerWidth <= 365){
            var estilo = {
              marginLeft: "-15px"
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

class ComponenteCadastrarSexo extends React.Component{
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
    
    array_atributos["key"] = "ComponenteCadastrarSexo tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(nome_da_tag === "input" && array_atributos["name"] === "sexo"){
      if(this.state.o_componente_ja_foi_montado === false && typeof array_atributos["checked"] !== "undefined"){
        this.state.valor = elemento.value;
      }
      delete array_atributos["checked"];
      if(this.state.valor === elemento.value){
        array_atributos["defaultChecked"] = true;
      }else{
        array_atributos["defaultChecked"] = false;
      }
      array_atributos["onChange"] = this.atualizar_este_componente;
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

class ComponenteCadastrarSetor extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      informacoes_de_estilo: {
        posicao_x: 0,
        posicao_y: 0,
        largura: 0,
        altura: 0
      },
      reposicionar_descricao: false,
      o_componente_ja_foi_montado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_caixa_de_selecao = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(typeof window.evento_do_cadastrar_setor_ja_foi_adicionado === "undefined"){
      window.evento_do_cadastrar_setor_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
      
      window.addEventListener("resize", function(evento){
        this.state.informacoes_de_estilo.posicao_x = this.react_referencia_caixa_de_selecao.current.getBoundingClientRect().left + window.scrollX;
        this.state.informacoes_de_estilo.posicao_y = this.react_referencia_caixa_de_selecao.current.getBoundingClientRect().top + window.scrollY;
        
        if(this.state.valor !== ""){
          this.state.reposicionar_descricao = true;
        }else{
          this.state.reposicionar_descricao = false;
        }
        
        /* Chamando o método setState para renderizar o componente novamente. */
        this.setState(
          {
            elemento_modelo: this.state.elemento_modelo,
            valor: this.state.valor,
            informacoes_de_estilo: this.state.informacoes_de_estilo,
            reposicionar_descricao: this.state.reposicionar_descricao,
            o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
          }
        );
      }.bind(this));
    }
    
    this.state.informacoes_de_estilo.posicao_x = this.react_referencia_caixa_de_selecao.current.getBoundingClientRect().left + window.scrollX;
    
    this.state.informacoes_de_estilo.posicao_y = this.react_referencia_caixa_de_selecao.current.getBoundingClientRect().top + window.scrollY;
    
    var estilo_computado = window.getComputedStyle(this.react_referencia_caixa_de_selecao.current);
    
    let largura = 0;
    largura += parseInt(estilo_computado.width, 10);
    this.state.informacoes_de_estilo.largura = largura;
    
    let altura = 0;
    altura += parseInt(estilo_computado.height, 10);
    this.state.informacoes_de_estilo.altura = altura;
    
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
    
    array_atributos["key"] = "ComponenteCadastrarSetor tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "caixa_de_selecao_setor":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["ref"] = this.react_referencia_caixa_de_selecao;
          array_atributos["value"] = this.state.valor;
          array_atributos["onChange"] = this.atualizar_este_componente;
        break;
        case "div_descricoes_para_a_caixa_de_selecao_setor":
          elemento = React.createElement(ComponenteDescricoesDosSetores, {key: "ComponenteDescricoesDosSetores da caixa de selecao setor", id_do_setor: this.state.valor, caixa_de_selecao: this.state.informacoes_de_estilo, reposicionar: this.state.reposicionar_descricao}, null);
          return elemento;
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
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    this.state.reposicionar_descricao = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        informacoes_de_estilo: this.state.informacoes_de_estilo,
        reposicionar_descricao: this.state.reposicionar_descricao,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
}

class ComponenteDescricoesDosSetores extends React.Component{
  chave_do_react;
  id_anterior;
  
  constructor(props){
    super(props);
    
    const elemento = document.getElementById("div_descricoes_dos_setores");
    
    this.id_anterior = this.props.id_do_setor;
    
    this.reposicionar = this.props.reposicionar;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
    
    this.react_referencia_popup = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(typeof window.evento_da_descricao_do_setor_ja_foi_adicionado === "undefined"){
      window.evento_da_descricao_do_setor_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
      window.addEventListener("click", function(evento){
        let tag_alvo = evento.target;
        
        while(true){
          if(tag_alvo === null || !tag_alvo.tagName){
            this.react_referencia_popup.current.classList.add("tag_oculta");
            this.reposicionar = false;
            break;
          }
          
          const nome_da_tag = tag_alvo.tagName.toLowerCase();
          
          if(tag_alvo.id === "caixa_de_selecao_setor"){
            if(/Chrome/.test(navigator.userAgent)){
              if(this.id_anterior !== tag_alvo.value){
                if(this.props.id_do_setor !== ""){
                  this.react_referencia_popup.current.classList.remove("tag_oculta");
                  this.reposicionar = true;
                }else{
                  this.react_referencia_popup.current.classList.add("tag_oculta");
                  this.reposicionar = false;
                }
                this.id_anterior = tag_alvo.value;
              }
            }
            break;
          }
          
          if(nome_da_tag === "option" && tag_alvo.parentNode.id === "caixa_de_selecao_setor"){
            if(this.id_anterior !== tag_alvo.getAttribute("value")){
              if(this.props.id_do_setor !== ""){
                this.react_referencia_popup.current.classList.remove("tag_oculta");
                this.reposicionar = true;
              }else{
                this.react_referencia_popup.current.classList.add("tag_oculta");
                this.reposicionar = false;
              }
              this.id_anterior = tag_alvo.getAttribute("value");
            }
            break;
          }
          
          if(tag_alvo.id === "div_descricoes_da_caixa_de_selecao_dos_setores"){
            break;
          }
          
          tag_alvo = tag_alvo.parentNode;
        }
      }.bind(this));
    }
  }
  
  componentDidUpdate(){
    this.react_referencia_popup.current.classList.remove("tag_oculta");
    
    let posicao_x = 0;
    posicao_x += this.props.caixa_de_selecao.posicao_x;
    posicao_x += this.props.caixa_de_selecao.largura;
    posicao_x += 10;
    
    let posicao_y = 0;
    posicao_y += this.props.caixa_de_selecao.posicao_y;
    posicao_y += this.props.caixa_de_selecao.altura / 2;
    
    var estilo_computado = window.getComputedStyle(this.react_referencia_popup.current);
    
    posicao_y -= parseInt(estilo_computado.borderTopWidth, 10) / 2;
    posicao_y -= parseInt(estilo_computado.paddingTop, 10) / 2;
    posicao_y -= parseInt(estilo_computado.height, 10) / 2;
    posicao_y -= parseInt(estilo_computado.paddingBottom, 10) / 2;
    posicao_y -= parseInt(estilo_computado.borderBottomWidth, 10) / 2;
    
    this.react_referencia_popup.current.style.left = posicao_x + "px";
    this.react_referencia_popup.current.style.top = posicao_y + "px";
    
    if(!this.reposicionar || this.props.id_do_setor === ""){
      this.react_referencia_popup.current.classList.add("tag_oculta");
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
    
    array_atributos["key"] = "ComponenteDescricoesDosSetores tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      array_atributos["id"] = array_atributos["id"].replace("descricoes", "descricoes_da_caixa_de_selecao");
      array_atributos["id"] = array_atributos["id"].replace("descricao", "descricao_da_caixa_de_selecao");
      switch(array_atributos["id"]){
        case "div_descricoes_da_caixa_de_selecao_dos_setores":
          array_atributos["ref"] = this.react_referencia_popup;
          var estilo = {
            position: "absolute"
          }
          array_atributos["style"] = estilo;
        break;
      }
      if(typeof array_atributos["className"] !== "undefined"){
        if(array_atributos["className"].indexOf("descricao_do_setor") >= 0){
          if(array_atributos["id"] === "div_descricao_da_caixa_de_selecao_do_setor_id_" + this.props.id_do_setor){
            array_atributos["className"] = "descricao_do_setor";
          }else{
            array_atributos["className"] = "descricao_do_setor tag_oculta";
          }
        }
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
}

class ComponenteCadastrarEmail extends React.Component{
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
    
    array_atributos["key"] = "ComponenteCadastrarEmail tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_email":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
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

class ComponenteCadastrarTelefoneFixo extends React.Component{
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
    
    array_atributos["key"] = "ComponenteCadastrarTelefoneFixo tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_telefone_fixo":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
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
  
  aplicar_mascara(evento){
    evento.preventDefault();
    
    const campo_telefone_fixo = evento.target;
    
    let posicao_do_cursor = campo_telefone_fixo.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      this.state.valor = campo_telefone_fixo.value;
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if(campo_telefone_fixo.value.charAt(0) !== "("){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(0))){
        campo_telefone_fixo.value = "(" + campo_telefone_fixo.value;
        atualizacao_do_cursor++;
      }else{
        campo_telefone_fixo.value = "(" + campo_telefone_fixo.value.slice(1);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(1))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 1) + campo_telefone_fixo.value.slice(2);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(2))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 2) + campo_telefone_fixo.value.slice(3);
    }
    if(campo_telefone_fixo.value.length > 3 && campo_telefone_fixo.value.charAt(3) !== ")"){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(3))){
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 3) + ")" + campo_telefone_fixo.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 3) + ")" + campo_telefone_fixo.value.slice(4);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(4))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 4) + campo_telefone_fixo.value.slice(5);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(5))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 5) + campo_telefone_fixo.value.slice(6);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(6))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 6) + campo_telefone_fixo.value.slice(7);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(7))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 7) + campo_telefone_fixo.value.slice(8);
    }
    if(campo_telefone_fixo.value.length > 8 && campo_telefone_fixo.value.charAt(8) !== "-"){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(8))){
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 8) + "-" + campo_telefone_fixo.value.slice(8);
        if(posicao_do_cursor >= 8){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 8) + "-" + campo_telefone_fixo.value.slice(9);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(9))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 9) + campo_telefone_fixo.value.slice(10);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(10))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 10) + campo_telefone_fixo.value.slice(11);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(11))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 11) + campo_telefone_fixo.value.slice(12);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(12))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 12) + campo_telefone_fixo.value.slice(13);
    }
    if(campo_telefone_fixo.value.length > 13){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 13);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    campo_telefone_fixo.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    this.state.valor = campo_telefone_fixo.value;
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

class ComponenteCadastrarTelefoneMovel extends React.Component{
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
    
    array_atributos["key"] = "ComponenteCadastrarTelefoneMovel tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_telefone_movel":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
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
  
  aplicar_mascara(evento){
    evento.preventDefault();
    
    const campo_telefone_movel = evento.target;
    
    let posicao_do_cursor = campo_telefone_movel.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      this.state.valor = campo_telefone_movel.value;
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if(campo_telefone_movel.value.charAt(0) !== "("){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(0))){
        campo_telefone_movel.value = "(" + campo_telefone_movel.value;
        atualizacao_do_cursor++;
      }else{
        campo_telefone_movel.value = "(" + campo_telefone_movel.value.slice(1);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(1))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 1) + campo_telefone_movel.value.slice(2);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(2))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 2) + campo_telefone_movel.value.slice(3);
    }
    if(campo_telefone_movel.value.length > 3 && campo_telefone_movel.value.charAt(3) !== ")"){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(3))){
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 3) + ")" + campo_telefone_movel.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 3) + ")" + campo_telefone_movel.value.slice(4);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(4))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 4) + campo_telefone_movel.value.slice(5);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(5))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 5) + campo_telefone_movel.value.slice(6);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(6))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 6) + campo_telefone_movel.value.slice(7);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(7))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 7) + campo_telefone_movel.value.slice(8);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(8))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 8) + campo_telefone_movel.value.slice(9);
    }
    if(campo_telefone_movel.value.length > 9 && campo_telefone_movel.value.charAt(9) !== "-"){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(9))){
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 9) + "-" + campo_telefone_movel.value.slice(9);
        if(posicao_do_cursor >= 9){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 9) + "-" + campo_telefone_movel.value.slice(10);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(10))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 10) + campo_telefone_movel.value.slice(11);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(11))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 11) + campo_telefone_movel.value.slice(12);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(12))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 12) + campo_telefone_movel.value.slice(13);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(13))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 13) + campo_telefone_movel.value.slice(14);
    }
    if(campo_telefone_movel.value.length > 14){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 14);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    campo_telefone_movel.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    this.state.valor = campo_telefone_movel.value;
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

class ComponenteCadastrarTelefoneEstrangeiro extends React.Component{
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
    
    array_atributos["key"] = "ComponenteCadastrarTelefoneEstrangeiro tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_telefone_estrangeiro":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
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

const div_pagina_cadastrar_pessoa = document.getElementById("div_pagina_cadastrar_pessoa");
const div_componente_pagina_cadastrar_pessoa = document.getElementById("div_componente_pagina_cadastrar_pessoa");

const root = ReactDOM.createRoot(div_componente_pagina_cadastrar_pessoa);
root.render(
  React.createElement(
    React.StrictMode, 
    null,
    React.createElement(ComponentePaginaCadastrarPessoa, {elemento: div_pagina_cadastrar_pessoa}, null)
  )
);
