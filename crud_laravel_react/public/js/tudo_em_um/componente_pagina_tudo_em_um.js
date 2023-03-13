class ComponentePaginaTudoEmUm extends React.Component{
  chave_do_react;
  ordenacao_inicial;
  status_da_busca;
  html_da_lista_de_pessoas;
  html_da_paginacao_da_lista_de_pessoas;
  mensagem;
  tipo_de_mensagem;
  momento_da_acao_ajax;
  contador_ajax;
  
  constructor(props){
    super(props);
    
    this.ordenacao_inicial = null;
    this.status_da_busca = "";
    this.html_da_lista_de_pessoas = "";
    this.html_da_paginacao_da_lista_de_pessoas = "";
    this.mensagem = "";
    this.tipo_de_mensagem = "";
    this.momento_da_acao_ajax = 0;
    this.contador_ajax = 0;
    
    this.state = {
      elemento_modelo: props.elemento.cloneNode(true),
      campos_do_formulario: new Map(),
      o_componente_ja_foi_montado: false
    }
    
    this.remover_foco_do_botao = this.remover_foco_do_botao.bind(this);
    this.buscar = this.buscar.bind(this);
    this.limpar = this.limpar.bind(this);
    this.cadastrar_pessoa = this.cadastrar_pessoa.bind(this);
    this.atualizar_a_lista_de_pessoas = this.atualizar_a_lista_de_pessoas.bind(this);
    this.editar_pessoa = this.editar_pessoa.bind(this);
    this.excluir_pessoa = this.excluir_pessoa.bind(this);
    
    props.elemento.remove();
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
    
    array_atributos["key"] = "ComponentePaginaTudoEmUm tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_lista_de_opcoes_da_pagina":
          elemento = React.createElement(ComponenteListaDeOpcoesDaPagina, {key: "ComponenteListaDeOpcoesDaPagina", elemento: elemento, cadastrar_pessoa: this.cadastrar_pessoa, campos_do_formulario: this.state.campos_do_formulario, mensagem: this.mensagem, tipo_de_mensagem: this.tipo_de_mensagem, momento_da_acao_ajax: this.momento_da_acao_ajax}, null);
          return elemento;
        break;
        case "div_filtro_nome":
          elemento = React.createElement(ComponenteFiltroNome, {key: "ComponenteFiltroNome", elemento: elemento, atualizar_a_lista_de_pessoas: this.atualizar_a_lista_de_pessoas, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_filtro_cpf":
          elemento = React.createElement(ComponenteFiltroCPF, {key: "ComponenteFiltroCPF", elemento: elemento, atualizar_a_lista_de_pessoas: this.atualizar_a_lista_de_pessoas, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_filtro_data_de_nascimento":
          elemento = React.createElement(ComponenteFiltroDataDeNascimento, {key: "ComponenteFiltroDataDeNascimento", elemento: elemento, atualizar_a_lista_de_pessoas: this.atualizar_a_lista_de_pessoas, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_filtro_setor":
          elemento = React.createElement(ComponenteFiltroSetor, {key: "ComponenteFiltroSetor", elemento: elemento, atualizar_a_lista_de_pessoas: this.atualizar_a_lista_de_pessoas, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_quantidade_por_pagina":
          elemento = React.createElement(ComponenteQuantidadePorPagina, {key: "ComponenteQuantidadePorPagina", elemento: elemento, atualizar_a_lista_de_pessoas: this.atualizar_a_lista_de_pessoas, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "campo_ordenacao":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.campos_do_formulario.set("ordenacao", elemento.value);
            this.ordenacao_inicial = elemento.value;
          }else{
            elemento.value = this.ordenacao_inicial;
            elemento["value"] = this.ordenacao_inicial;
          }
        break;
        case "botao_buscar":
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.buscar;
        break;
        case "botao_limpar":
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.limpar;
        break;
        case "span_status_da_busca":
          array_atributos["className"] = this.status_da_busca === "" ? "tag_oculta" : "";
          conteudo_dinamico = this.status_da_busca;
        break;
        case "div_paginacao_de_cima_da_lista_de_pessoas":
          elemento = React.createElement(ComponentePaginacaoDeCimaDaListaDePessoas, {key: "ComponentePaginacaoDeCimaDaListaDePessoas", elemento: elemento, atualizar_a_lista_de_pessoas: this.atualizar_a_lista_de_pessoas, html: this.html_da_paginacao_da_lista_de_pessoas, campos_do_formulario: this.state.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_partes_da_lista_de_pessoas":
          elemento = React.createElement(ComponentePartesDaListaDePessoas, {key: "ComponentePartesDaListaDePessoas", elemento: elemento, atualizar_a_lista_de_pessoas: this.atualizar_a_lista_de_pessoas, campos_do_formulario: this.state.campos_do_formulario, ordenacao_inicial: this.ordenacao_inicial}, null);
          return elemento;
        break;
        case "div_lista_de_pessoas":
          elemento = React.createElement(ComponenteListaDePessoas, {key: "ComponenteListaDePessoas", elemento: elemento, html: this.html_da_lista_de_pessoas, editar_pessoa: this.editar_pessoa, excluir_pessoa: this.excluir_pessoa, campos_do_formulario: this.state.campos_do_formulario, mensagem: this.mensagem, tipo_de_mensagem: this.tipo_de_mensagem, momento_da_acao_ajax: this.momento_da_acao_ajax}, null);
          return elemento;
        break;
        case "div_paginacao_de_baixo_da_lista_de_pessoas":
          elemento = React.createElement(ComponentePaginacaoDeBaixoDaListaDePessoas, {key: "ComponentePaginacaoDeBaixoDaListaDePessoas", elemento: elemento, atualizar_a_lista_de_pessoas: this.atualizar_a_lista_de_pessoas, html: this.html_da_paginacao_da_lista_de_pessoas, campos_do_formulario: this.state.campos_do_formulario}, null);
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
    evento.target.blur();
    
    this.state.campos_do_formulario.set("pagina", 1);
    
    this.atualizar_a_lista_de_pessoas();
  }
  
  limpar(evento){
    evento.target.blur();
    
    this.state.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      this.state.campos_do_formulario.set(nome_do_campo, "");
    }.bind(this));
    
    this.state.campos_do_formulario.set("status_da_busca", "Limpando...");
    this.atualizar_a_lista_de_pessoas();
  }
  
  cadastrar_pessoa(evento){
    this.status_da_busca = "Atualizando...";
    
    this.mensagem = "Cadastrando...";
    this.tipo_de_mensagem = "";
    this.momento_da_acao_ajax = new Date().getTime();
    
    this.contador_ajax++;
    let numero_desta_acao_ajax = this.contador_ajax;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        campos_do_formulario: this.state.campos_do_formulario
      }
    );
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/cadastrar_pessoa_ajax" + url_mais;
    let dados_post = {};
    this.state.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      if(nome_do_campo.indexOf("cadastrar_") === 0 || nome_do_campo === "_token"){
        let nome_do_campo_sem_o_prefixo = nome_do_campo.replace("cadastrar_", "");
        dados_post[nome_do_campo_sem_o_prefixo] = valor_do_campo;
      }
    });
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_ajax >= this.contador_ajax){
            this.state.campos_do_formulario.delete("_token");
            
            if(typeof resposta.mensagem_de_falha != "undefined"){
              this.tipo_de_mensagem = "mensagem_de_falha";
              this.mensagem = resposta.mensagem_de_falha;
            }
            if(typeof resposta.mensagem_de_sucesso != "undefined"){
              this.state.campos_do_formulario.delete("cadastrar_nome");
              this.state.campos_do_formulario.delete("cadastrar_sobrenome");
              this.state.campos_do_formulario.delete("cadastrar_cpf");
              this.state.campos_do_formulario.delete("cadastrar_data_de_nascimento");
              this.state.campos_do_formulario.delete("cadastrar_sexo");
              this.state.campos_do_formulario.delete("cadastrar_id_do_setor");
              this.state.campos_do_formulario.delete("cadastrar_email");
              this.state.campos_do_formulario.delete("cadastrar_telefone_fixo");
              this.state.campos_do_formulario.delete("cadastrar_telefone_movel");
              this.state.campos_do_formulario.delete("cadastrar_telefone_estrangeiro");
              
              this.state.campos_do_formulario.set("filtro_nome", "");
              this.state.campos_do_formulario.set("filtro_cpf", "");
              this.state.campos_do_formulario.set("filtro_data_de_nascimento", "");
              this.state.campos_do_formulario.set("filtro_id_do_setor", "");
              this.state.campos_do_formulario.set("quantidade_por_pagina", "");
              this.state.campos_do_formulario.set("ordenacao", "");
              this.state.campos_do_formulario.delete("pagina");
              
              this.tipo_de_mensagem = "mensagem_de_sucesso";
              this.mensagem = resposta.mensagem_de_sucesso;
              
              if(resposta.paginacao.indexOf("pagina=0") === -1){
                this.html_da_paginacao_da_lista_de_pessoas = resposta.paginacao;
              }else{
                this.html_da_paginacao_da_lista_de_pessoas = null;
              }
              this.html_da_lista_de_pessoas = resposta.lista;
            }
            
            this.status_da_busca = "";
            
            /* Chamando o método setState para renderizar o componente novamente. */
            this.setState(
              {
                elemento_modelo: this.state.elemento_modelo,
                campos_do_formulario: this.state.campos_do_formulario
              }
            );
          }
        }
      }
    }.bind(this);
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  atualizar_a_lista_de_pessoas(evento){
    this.status_da_busca = "Buscando...";
    if(typeof this.state.campos_do_formulario.get("status_da_busca") !== "undefined"
       && this.state.campos_do_formulario.get("status_da_busca") !== null
       && this.state.campos_do_formulario.get("status_da_busca") !== ""){
      this.status_da_busca = this.state.campos_do_formulario.get("status_da_busca");
    }
    this.state.campos_do_formulario.delete("status_da_busca");
    
    this.contador_ajax++;
    let numero_desta_acao_ajax = this.contador_ajax;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        campos_do_formulario: this.state.campos_do_formulario
      }
    );
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "GET";
    let url_mais = "";
    this.state.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      url_mais += "&" + nome_do_campo + "=" + valor_do_campo;
    });
    url_mais = url_mais.replace('&', '?');
    let url = "tudo_em_um/mostrar_pessoas_ajax" + url_mais;
    let dados_post = null;
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_ajax >= this.contador_ajax){
            this.status_da_busca = "";
            this.mensagem = "";
            this.tipo_de_mensagem = "";
            
            if(resposta.paginacao.indexOf("pagina=0") === -1){
              this.html_da_paginacao_da_lista_de_pessoas = resposta.paginacao;
            }else{
              this.html_da_paginacao_da_lista_de_pessoas = null;
            }
            this.html_da_lista_de_pessoas = resposta.lista;
            
            /* Chamando o método setState para renderizar o componente novamente. */
            this.setState(
              {
                elemento_modelo: this.state.elemento_modelo,
                campos_do_formulario: this.state.campos_do_formulario
              }
            );
          }
        }
      }
    }.bind(this);
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  editar_pessoa(evento){
    this.status_da_busca = "Atualizando...";
    
    this.mensagem = "Editando...";
    this.tipo_de_mensagem = "";
    this.momento_da_acao_ajax = new Date().getTime();
    
    this.contador_ajax++;
    let numero_desta_acao_ajax = this.contador_ajax;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        campos_do_formulario: this.state.campos_do_formulario
      }
    );
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/editar_pessoa_ajax" + url_mais;
    let dados_post = {};
    this.state.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      dados_post[nome_do_campo] = valor_do_campo;
    });
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_ajax >= this.contador_ajax){
            this.state.campos_do_formulario.delete("nome");
            this.state.campos_do_formulario.delete("sobrenome");
            this.state.campos_do_formulario.delete("cpf");
            this.state.campos_do_formulario.delete("data_de_nascimento");
            this.state.campos_do_formulario.delete("sexo");
            this.state.campos_do_formulario.delete("id_do_setor");
            this.state.campos_do_formulario.delete("email");
            this.state.campos_do_formulario.delete("telefone_fixo");
            this.state.campos_do_formulario.delete("telefone_movel");
            this.state.campos_do_formulario.delete("telefone_estrangeiro");
            this.state.campos_do_formulario.delete("_token");
            this.state.campos_do_formulario.delete("id_da_pessoa");
            
            if(typeof resposta.mensagem_de_falha != "undefined"){
              this.tipo_de_mensagem = "mensagem_de_falha";
              this.mensagem = resposta.mensagem_de_falha;
            }
            if(typeof resposta.mensagem_de_sucesso != "undefined"){
              this.tipo_de_mensagem = "mensagem_de_sucesso";
              this.mensagem = resposta.mensagem_de_sucesso;
              
              if(resposta.paginacao.indexOf("pagina=0") === -1){
                this.html_da_paginacao_da_lista_de_pessoas = resposta.paginacao;
              }else{
                this.html_da_paginacao_da_lista_de_pessoas = null;
              }
              this.html_da_lista_de_pessoas = resposta.lista;
            }
            
            this.status_da_busca = "";
            
            /* Chamando o método setState para renderizar o componente novamente. */
            this.setState(
              {
                elemento_modelo: this.state.elemento_modelo,
                campos_do_formulario: this.state.campos_do_formulario
              }
            );
          }
        }
      }
    }.bind(this);
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  excluir_pessoa(evento){
    this.status_da_busca = "Atualizando...";
    
    this.mensagem = "Excluindo...";
    this.tipo_de_mensagem = "";
    this.momento_da_acao_ajax = new Date().getTime();
    
    this.contador_ajax++;
    let numero_desta_acao_ajax = this.contador_ajax;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        campos_do_formulario: this.state.campos_do_formulario
      }
    );
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/excluir_pessoa_ajax" + url_mais;
    let dados_post = {};
    this.state.campos_do_formulario.forEach(function(valor_do_campo, nome_do_campo){
      dados_post[nome_do_campo] = valor_do_campo;
    });
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_ajax >= this.contador_ajax){
            this.state.campos_do_formulario.delete("_token");
            this.state.campos_do_formulario.delete("id_da_pessoa");
            
            if(typeof resposta.mensagem_de_falha != "undefined"){
              this.tipo_de_mensagem = "mensagem_de_falha";
              this.mensagem = resposta.mensagem_de_falha;
            }
            if(typeof resposta.mensagem_de_sucesso != "undefined"){
              this.tipo_de_mensagem = "mensagem_de_sucesso";
              this.mensagem = resposta.mensagem_de_sucesso;
              
              if(resposta.paginacao.indexOf("pagina=0") === -1){
                this.html_da_paginacao_da_lista_de_pessoas = resposta.paginacao;
              }else{
                this.html_da_paginacao_da_lista_de_pessoas = null;
              }
              this.html_da_lista_de_pessoas = resposta.lista;
            }
            
            this.status_da_busca = "";
            
            /* Chamando o método setState para renderizar o componente novamente. */
            this.setState(
              {
                elemento_modelo: this.state.elemento_modelo,
                campos_do_formulario: this.state.campos_do_formulario
              }
            );
          }
        }
      }
    }.bind(this);
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
}

class ComponenteListaDeOpcoesDaPagina extends React.Component{
  chave_do_react;
  mensagem;
  tipo_de_mensagem;
  posicionar_popup_cadastrar_pessoa;
  momento_da_acao_mostrar_popup;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.mensagem = this.props.mensagem;
    this.tipo_de_mensagem = this.props.tipo_de_mensagem;
    this.posicionar_popup_cadastrar_pessoa = false;
    this.momento_da_acao_mostrar_popup = 0;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      informacoes_de_estilo: {
        posicao_y: 0
      }
    }
    
    this.exibir_popup_cadastrar_pessoa = this.exibir_popup_cadastrar_pessoa.bind(this);
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
    
    array_atributos["key"] = "ComponenteListaDeOpcoesDaPagina tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "link_cadastrar_pessoa":
          array_atributos["onClick"] = this.exibir_popup_cadastrar_pessoa;
        break;
        case "div_cadastrar_pessoa":
          if(this.posicionar_popup_cadastrar_pessoa || this.props.momento_da_acao_ajax < this.momento_da_acao_mostrar_popup){
            this.mensagem = "";
            this.tipo_de_mensagem = "";
          }else{
            this.mensagem = this.props.mensagem;
            this.tipo_de_mensagem = this.props.tipo_de_mensagem;
          }
          elemento = React.createElement(ComponentePopupCadastrarPessoa, {key: "ComponentePopupCadastrarPessoa", elemento: elemento, link_cadastrar_pessoa: this.state.informacoes_de_estilo, cadastrar_pessoa: this.props.cadastrar_pessoa, campos_do_formulario: this.props.campos_do_formulario, mensagem: this.mensagem, tipo_de_mensagem: this.tipo_de_mensagem, posicionar: this.posicionar_popup_cadastrar_pessoa}, null);
          this.posicionar_popup_cadastrar_pessoa = false;
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
  
  exibir_popup_cadastrar_pessoa(evento){
    evento.preventDefault();
    
    this.state.informacoes_de_estilo.posicao_y = evento.target.getBoundingClientRect().top + window.scrollY;
    
    this.posicionar_popup_cadastrar_pessoa = true;
    
    this.momento_da_acao_mostrar_popup = new Date().getTime();
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        informacoes_de_estilo: this.state.informacoes_de_estilo
      }
    );
  }
}

class ComponentePopupCadastrarPessoa extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      anti_csrf: ""
    }
    
    this.remover_foco_do_botao = this.remover_foco_do_botao.bind(this);
    this.cadastrar_pessoa = this.cadastrar_pessoa.bind(this);
    
    this.react_referencia_popup_cadastrar_pessoa = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(typeof window.evento_do_popup_cadastrar_pessoa_ja_foi_adicionado === "undefined"){
      window.evento_do_popup_cadastrar_pessoa_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
      window.addEventListener("click", function(evento){
        let tag_alvo = evento.target;
        
        while(true){
          if(tag_alvo === null || !tag_alvo.tagName){
            this.react_referencia_popup_cadastrar_pessoa.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.id === "link_cadastrar_pessoa"){
            this.react_referencia_popup_cadastrar_pessoa.current.classList.remove("tag_oculta");
            break;
          }
          
          if(tag_alvo.classList.contains("div_fechar")){
            this.react_referencia_popup_cadastrar_pessoa.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.id === "div_cadastrar_pessoa"){
            break;
          }
          
          tag_alvo = tag_alvo.parentNode;
        }
      }.bind(this));
    }
  }
  
  componentDidUpdate(){
    if(this.props.posicionar){
      this.react_referencia_popup_cadastrar_pessoa.current.classList.remove("tag_oculta");
      
      let largura_da_div = 0;
      var estilo_computado = window.getComputedStyle(this.react_referencia_popup_cadastrar_pessoa.current);
      largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
      largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
      largura_da_div += parseInt(estilo_computado.width, 10);
      largura_da_div += parseInt(estilo_computado.paddingRight, 10);
      largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
      
      const tag_html = document.querySelector("html");
      let largura_da_tag_html = 0;
      var estilo_computado = window.getComputedStyle(tag_html);
      largura_da_tag_html += parseInt(estilo_computado.width, 10);
      
      var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
      if(window.innerWidth <= largura_da_div){
        posicao_x = 0;
      }
      
      let altura_da_div = 0;
      var estilo_computado = window.getComputedStyle(this.react_referencia_popup_cadastrar_pessoa.current);
      altura_da_div += parseInt(estilo_computado.borderTopWidth, 10);
      altura_da_div += parseInt(estilo_computado.paddingTop, 10);
      altura_da_div += parseInt(estilo_computado.height, 10);
      altura_da_div += parseInt(estilo_computado.paddingBottom, 10);
      altura_da_div += parseInt(estilo_computado.borderBottomWidth, 10);
      
      var posicao_y = window.scrollY + (window.innerHeight - altura_da_div) / 2;
      if(window.innerHeight <= altura_da_div){
        posicao_y = this.props.link_cadastrar_pessoa.posicao_y;
      }
      
      this.react_referencia_popup_cadastrar_pessoa.current.style.left = posicao_x + "px";
      this.react_referencia_popup_cadastrar_pessoa.current.style.top = posicao_y + "px";
      
      this.react_referencia_popup_cadastrar_pessoa.current.classList.add("tag_oculta");
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
    
    array_atributos["key"] = "ComponentePopupCadastrarPessoa tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_cadastrar_pessoa":
          array_atributos["ref"] = this.react_referencia_popup_cadastrar_pessoa;
        break;
        case "div_cadastrar_nome":
          elemento = React.createElement(ComponenteCadastrarNome, {key: "ComponenteCadastrarNome", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_sobrenome":
          elemento = React.createElement(ComponenteCadastrarSobrenome, {key: "ComponenteCadastrarSobrenome", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_cpf":
          elemento = React.createElement(ComponenteCadastrarCPF, {key: "ComponenteCadastrarCPF", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_data_de_nascimento":
          elemento = React.createElement(ComponenteCadastrarDataDeNascimento, {key: "ComponenteCadastrarDataDeNascimento", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_sexo":
          elemento = React.createElement(ComponenteCadastrarSexo, {key: "ComponenteCadastrarSexo", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_setor":
          elemento = React.createElement(ComponenteCadastrarSetor, {key: "ComponenteCadastrarSetor", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_email":
          elemento = React.createElement(ComponenteCadastrarEmail, {key: "ComponenteCadastrarEmail", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_telefone_fixo":
          elemento = React.createElement(ComponenteCadastrarTelefoneFixo, {key: "ComponenteCadastrarTelefoneFixo", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_telefone_movel":
          elemento = React.createElement(ComponenteCadastrarTelefoneMovel, {key: "ComponenteCadastrarTelefoneMovel", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_cadastrar_telefone_estrangeiro":
          elemento = React.createElement(ComponenteCadastrarTelefoneEstrangeiro, {key: "ComponenteCadastrarTelefoneEstrangeiro", elemento: elemento, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_mensagem_cadastrar_pessoa":
          array_atributos["className"] = this.props.mensagem !== "" ? "div_mensagem" : "div_mensagem tag_oculta";
        break;
        case "span_mensagem_cadastrar_pessoa":
          conteudo_dinamico = this.props.mensagem;
          array_atributos["className"] = this.props.tipo_de_mensagem;
        break;
        case "botao_cadastrar":
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.cadastrar_pessoa;
        break;
      }
    }
    if(nome_da_tag === "input" && array_atributos["name"] === "_token"){
      this.state.anti_csrf = array_atributos["value"];
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
  
  cadastrar_pessoa(evento){
    this.props.campos_do_formulario.delete("nome");
    this.props.campos_do_formulario.delete("sobrenome");
    this.props.campos_do_formulario.delete("cpf");
    this.props.campos_do_formulario.delete("data_de_nascimento");
    this.props.campos_do_formulario.delete("sexo");
    this.props.campos_do_formulario.delete("id_do_setor");
    this.props.campos_do_formulario.delete("email");
    this.props.campos_do_formulario.delete("telefone_fixo");
    this.props.campos_do_formulario.delete("telefone_movel");
    this.props.campos_do_formulario.delete("telefone_estrangeiro");
    this.props.campos_do_formulario.delete("_token");
    this.props.campos_do_formulario.delete("id_da_pessoa");
    
    this.props.campos_do_formulario.set("_token", this.state.anti_csrf);
    
    this.props.cadastrar_pessoa();
  }
}

class ComponenteCadastrarNome extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: ""
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
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
    
    array_atributos["key"] = "ComponenteCadastrarNome tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_nome":
          if(typeof this.props.campos_do_formulario.get("cadastrar_nome") === "undefined"){
            this.state.valor = "";
          }
          if(this.state.valor !== ""){
            this.props.campos_do_formulario.set("cadastrar_nome", this.state.valor);
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
    
    this.props.campos_do_formulario.set("cadastrar_nome", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
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
      valor: ""
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
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
    
    array_atributos["key"] = "ComponenteCadastrarSobrenome tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_sobrenome":
          if(typeof this.props.campos_do_formulario.get("cadastrar_sobrenome") === "undefined"){
            this.state.valor = "";
          }
          if(this.state.valor !== ""){
            this.props.campos_do_formulario.set("cadastrar_sobrenome", this.state.valor);
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
    
    this.props.campos_do_formulario.set("cadastrar_sobrenome", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
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
      valor: ""
    }
    
    this.aplicar_mascara = this.aplicar_mascara.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_campo = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.props.campos_do_formulario.set("cadastrar_cpf", this.react_referencia_campo.current.value);
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
          if(typeof this.props.campos_do_formulario.get("cadastrar_cpf") === "undefined"){
            this.state.valor = "";
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["ref"] = this.react_referencia_campo;
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
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
      }
    );
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
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
        nome: "calendario_para_o_campo_cadastrar_data_de_nascimento",
        valor: null,
        dia: null,
        mes: null,
        ano: null,
        total_de_dias_do_mes: null,
        ano_referencia: null
      },
      atualiza_todo_o_calendario: true
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
          if(typeof this.props.campos_do_formulario.get("cadastrar_data_de_nascimento") === "undefined"){
            this.state.valor = "";
          }
          if(this.state.valor !== ""){
            this.props.campos_do_formulario.set("cadastrar_data_de_nascimento", this.state.valor);
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
          elemento = React.createElement(ComponenteCalendario, {key: "ComponenteCalendario do campo cadastrar data de nascimento", calendario: calendario, funcoes: funcoes}, null);
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
    
    this.props.campos_do_formulario.set("cadastrar_data_de_nascimento", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario
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
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario
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
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario
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
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario
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
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario
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
    
    this.props.campos_do_formulario.set("cadastrar_data_de_nascimento", valor);
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario
      }
    );
  }
}

class ComponenteCadastrarSexo extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: ""
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_botao_de_radio_para_desmarcar = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    if(this.react_referencia_botao_de_radio_para_desmarcar.current !== null
       && typeof this.props.campos_do_formulario.get("cadastrar_sexo") === "undefined"){
      this.state.valor = "";
      this.react_referencia_botao_de_radio_para_desmarcar.current.checked = false;
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
    
    array_atributos["key"] = "ComponenteCadastrarSexo tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(nome_da_tag === "input" && array_atributos["name"] === "sexo"){
      let desmarcar_botoes_de_radio = false;
      if(typeof this.props.campos_do_formulario.get("cadastrar_sexo") === "undefined"){
        desmarcar_botoes_de_radio = true;
        if(this.state.valor === elemento.value){
          array_atributos["ref"] = this.react_referencia_botao_de_radio_para_desmarcar;
        }
      }
      
      delete array_atributos["checked"];
      
      if(this.state.valor === elemento.value && desmarcar_botoes_de_radio === false){
        array_atributos["defaultChecked"] = true;
        this.props.campos_do_formulario.set("cadastrar_sexo", this.state.valor);
      }else{
        array_atributos["defaultChecked"] = false;
      }
      array_atributos["onClick"] = this.atualizar_este_componente;
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
    
    this.props.campos_do_formulario.set("cadastrar_sexo", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
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
      valor: ""
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
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
    
    array_atributos["key"] = "ComponenteCadastrarSetor tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "caixa_de_selecao_setor":
          if(typeof this.props.campos_do_formulario.get("cadastrar_id_do_setor") === "undefined"){
            this.state.valor = "";
          }
          if(this.state.valor !== ""){
            this.props.campos_do_formulario.set("cadastrar_id_do_setor", this.state.valor);
          }
          array_atributos["value"] = this.state.valor;
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
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.props.campos_do_formulario.set("cadastrar_id_do_setor", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
      }
    );
  }
}

class ComponenteCadastrarEmail extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: ""
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
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
    
    array_atributos["key"] = "ComponenteCadastrarEmail tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_email":
          if(typeof this.props.campos_do_formulario.get("cadastrar_email") === "undefined"){
            this.state.valor = "";
          }
          if(this.state.valor !== ""){
            this.props.campos_do_formulario.set("cadastrar_email", this.state.valor);
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
    
    this.props.campos_do_formulario.set("cadastrar_email", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
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
      valor: ""
    }
    
    this.aplicar_mascara = this.aplicar_mascara.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_campo = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.props.campos_do_formulario.set("cadastrar_telefone_fixo", this.react_referencia_campo.current.value);
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
          if(typeof this.props.campos_do_formulario.get("cadastrar_telefone_fixo") === "undefined"){
            this.state.valor = "";
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["ref"] = this.react_referencia_campo;
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
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
      }
    );
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
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
      valor: ""
    }
    
    this.aplicar_mascara = this.aplicar_mascara.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_campo = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.props.campos_do_formulario.set("cadastrar_telefone_movel", this.react_referencia_campo.current.value);
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
          if(typeof this.props.campos_do_formulario.get("cadastrar_telefone_movel") === "undefined"){
            this.state.valor = "";
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["ref"] = this.react_referencia_campo;
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
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
      }
    );
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
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
      valor: ""
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
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
    
    array_atributos["key"] = "ComponenteCadastrarTelefoneEstrangeiro tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_telefone_estrangeiro":
          if(typeof this.props.campos_do_formulario.get("cadastrar_telefone_estrangeiro") === "undefined"){
            this.state.valor = "";
          }
          if(this.state.valor !== ""){
            this.props.campos_do_formulario.set("cadastrar_telefone_estrangeiro", this.state.valor);
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
    
    this.props.campos_do_formulario.set("cadastrar_telefone_estrangeiro", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor
      }
    );
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
          }else if(this.props.campos_do_formulario.get("filtro_nome") === ""){
            elemento.value = "";
            this.state.valor = "";
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
    
    this.props.campos_do_formulario.set("filtro_nome", evento.target.value);
    this.props.campos_do_formulario.set("pagina", 1);
    this.props.atualizar_a_lista_de_pessoas();
    
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
      funcao_aplicar_mascara_foi_utilizada: false,
      o_componente_ja_foi_montado: false
    }
    
    this.aplicar_mascara = this.aplicar_mascara.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_campo = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(this.state.valor !== "" && this.state.valor !== null){
      this.props.campos_do_formulario.set("filtro_cpf", this.react_referencia_campo.current.value);
    }
    this.state.o_componente_ja_foi_montado = true;
  }
  
  componentDidUpdate(){
    if(this.state.funcao_aplicar_mascara_foi_utilizada === true){
      this.state.funcao_aplicar_mascara_foi_utilizada = false;
      this.props.campos_do_formulario.set("pagina", 1);
      this.props.campos_do_formulario.set("filtro_cpf", this.react_referencia_campo.current.value);
      this.props.atualizar_a_lista_de_pessoas();
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
          }else if(this.props.campos_do_formulario.get("filtro_cpf") === ""){
            elemento.value = "";
            this.state.valor = "";
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["ref"] = this.react_referencia_campo;
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
      
      this.state.funcao_aplicar_mascara_foi_utilizada = true;
      
      /* Chamando o método setState para renderizar o componente novamente. */
      this.setState(
        {
          elemento_modelo: this.state.elemento_modelo,
          valor: this.state.valor,
          funcao_aplicar_mascara_foi_utilizada: this.state.funcao_aplicar_mascara_foi_utilizada,
          o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
        }
      );
      
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
    
    this.state.funcao_aplicar_mascara_foi_utilizada = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        funcao_aplicar_mascara_foi_utilizada: this.state.funcao_aplicar_mascara_foi_utilizada,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.props.campos_do_formulario.set("filtro_cpf", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        funcao_aplicar_mascara_foi_utilizada: this.state.funcao_aplicar_mascara_foi_utilizada,
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
          }else if(this.props.campos_do_formulario.get("filtro_data_de_nascimento") === ""){
            elemento.value = "";
            this.state.valor = "";
          }
          array_atributos["value"] = this.state.valor;
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
    
    this.props.campos_do_formulario.set("filtro_data_de_nascimento", evento.target.value);
    this.props.campos_do_formulario.set("pagina", 1);
    this.props.atualizar_a_lista_de_pessoas();
    
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
    this.props.campos_do_formulario.set("pagina", 1);
    this.props.atualizar_a_lista_de_pessoas();
    
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
          }else if(this.props.campos_do_formulario.get("filtro_id_do_setor") === ""){
            elemento.value = "";
            this.state.valor = "";
          }
          array_atributos["value"] = this.state.valor;
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
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.props.campos_do_formulario.set("filtro_id_do_setor", evento.target.value);
    this.props.campos_do_formulario.set("pagina", 1);
    this.props.atualizar_a_lista_de_pessoas();
    
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
          }else if(this.props.campos_do_formulario.get("quantidade_por_pagina") === ""){
            elemento.value = "";
            this.state.valor = "";
          }
          array_atributos["value"] = this.state.valor;
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
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.props.campos_do_formulario.set("quantidade_por_pagina", evento.target.value);
    this.props.campos_do_formulario.set("pagina", 1);
    this.props.atualizar_a_lista_de_pessoas();
    
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
    
    this.selecionar_pagina = this.selecionar_pagina.bind(this);
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
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_paginacao_de_cima_da_lista_de_pessoas":
          if(this.props.html !== ""){
            elemento.innerHTML = this.props.html;
          }
        break;
      }
    }
    if(nome_da_tag === "a"){
      array_atributos["onClick"] = this.selecionar_pagina;
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
  
  selecionar_pagina(evento){
    evento.preventDefault();
    
    let href = evento.target.getAttribute("href");
    const pagina = href.replace("/tudo_em_um?pagina=", "");
    
    this.props.campos_do_formulario.set("pagina", pagina);
    this.props.campos_do_formulario.set("status_da_busca", "Mudando de página...");
    this.props.atualizar_a_lista_de_pessoas();
  }
}

class ComponentePartesDaListaDePessoas extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    let partes_ordenaveis = [];
    partes_ordenaveis["nome"] = "Nome";
    partes_ordenaveis["cpf"] = "CPF";
    partes_ordenaveis["setor"] = "Setor";
    partes_ordenaveis["contato"] = "Contato";
    
    switch(props.ordenacao_inicial){
      case "nome_completo_a_z":
        partes_ordenaveis["nome"] = "Nome (A → Z)";
      break;
      case "nome_completo_z_a":
        partes_ordenaveis["nome"] = "Nome (Z → A)";
      break;
      case "cpf_crescente":
        partes_ordenaveis["cpf"] = "CPF (0 → 9)";
      break;
      case "cpf_decrescente":
        partes_ordenaveis["cpf"] = "CPF (9 → 0)";
      break;
      case "setor_a_z":
        partes_ordenaveis["setor"] = "Setor (A → Z)";
      break;
      case "setor_z_a":
        partes_ordenaveis["setor"] = "Setor (Z → A)";
      break;
      case "contato_a_z":
        partes_ordenaveis["contato"] = "Contato (A → Z)";
      break;
      case "contato_z_a":
        partes_ordenaveis["contato"] = "Contato (Z → A)";
      break;
    }
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      partes_ordenaveis: partes_ordenaveis
    }
    
    this.desfaz_selecao_de_texto = this.desfaz_selecao_de_texto.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
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
        case "div_partes_da_lista_de_pessoas":
          if(typeof this.props.campos_do_formulario.get("ordenacao") === "undefined"
             || this.props.campos_do_formulario.get("ordenacao") === ""
             || this.props.campos_do_formulario.get("ordenacao") === "padrao"){
            this.state.partes_ordenaveis["nome"] = "Nome";
            this.state.partes_ordenaveis["cpf"] = "CPF";
            this.state.partes_ordenaveis["setor"] = "Setor";
            this.state.partes_ordenaveis["contato"] = "Contato";
          }
        break;
        case "div_parte_nome_da_lista_de_pessoas":
          elemento.innerHTML = "<span>" + this.state.partes_ordenaveis["nome"] + "</span>";
          array_atributos["onMouseDown"] = this.desfaz_selecao_de_texto;
          array_atributos["onClick"] = this.atualizar_este_componente;
        break;
        case "div_parte_cpf_da_lista_de_pessoas":
          elemento.innerHTML = "<span>" + this.state.partes_ordenaveis["cpf"] + "</span>";
          array_atributos["onMouseDown"] = this.desfaz_selecao_de_texto;
          array_atributos["onClick"] = this.atualizar_este_componente;
        break;
        case "div_parte_setor_da_lista_de_pessoas":
          elemento.innerHTML = "<span>" + this.state.partes_ordenaveis["setor"] + "</span>";
          array_atributos["onMouseDown"] = this.desfaz_selecao_de_texto;
          array_atributos["onClick"] = this.atualizar_este_componente;
        break;
        case "div_parte_contato_da_lista_de_pessoas":
          elemento.innerHTML = "<span>" + this.state.partes_ordenaveis["contato"] + "</span>";
          array_atributos["onMouseDown"] = this.desfaz_selecao_de_texto;
          array_atributos["onClick"] = this.atualizar_este_componente;
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
  
  desfaz_selecao_de_texto(evento){
    evento.preventDefault();
  }
  
  atualizar_este_componente(evento){
    const texto = evento.target.innerText;
    
    /* Trocando o valor após o clique */
    let ordenacao = "padrao";
    this.state.partes_ordenaveis["nome"] = "Nome";
    this.state.partes_ordenaveis["cpf"] = "CPF";
    this.state.partes_ordenaveis["setor"] = "Setor";
    this.state.partes_ordenaveis["contato"] = "Contato";
    switch(texto){
      case "Nome":
        this.state.partes_ordenaveis["nome"] = "Nome (A → Z)";
        ordenacao = "nome_completo_a_z";
      break;
      case "Nome (A → Z)":
        this.state.partes_ordenaveis["nome"] = "Nome (Z → A)";
        ordenacao = "nome_completo_z_a";
      break;
      case "Nome (Z → A)":
        this.state.partes_ordenaveis["nome"] = "Nome";
        ordenacao = "padrao";
      break;
      case "CPF":
        this.state.partes_ordenaveis["cpf"] = "CPF (0 → 9)";
        ordenacao = "cpf_crescente";
      break;
      case "CPF (0 → 9)":
        this.state.partes_ordenaveis["cpf"] = "CPF (9 → 0)";
        ordenacao = "cpf_decrescente";
      break;
      case "CPF (9 → 0)":
        this.state.partes_ordenaveis["cpf"] = "CPF";
        ordenacao = "padrao";
      break;
      case "Setor":
        this.state.partes_ordenaveis["setor"] = "Setor (A → Z)";
        ordenacao = "setor_a_z";
      break;
      case "Setor (A → Z)":
        this.state.partes_ordenaveis["setor"] = "Setor (Z → A)";
        ordenacao = "setor_z_a";
      break;
      case "Setor (Z → A)":
        this.state.partes_ordenaveis["setor"] = "Setor";
        ordenacao = "padrao";
      break;
      case "Contato":
        this.state.partes_ordenaveis["contato"] = "Contato (A → Z)";
        ordenacao = "contato_a_z";
      break;
      case "Contato (A → Z)":
        this.state.partes_ordenaveis["contato"] = "Contato (Z → A)";
        ordenacao = "contato_z_a";
      break;
      case "Contato (Z → A)":
        this.state.partes_ordenaveis["contato"] = "Contato";
        ordenacao = "padrao";
      break;
    }
    
    this.props.campos_do_formulario.set("ordenacao", ordenacao);
    this.props.campos_do_formulario.set("pagina", 1);
    this.props.campos_do_formulario.set("status_da_busca", "Ordenando...");
    this.props.atualizar_a_lista_de_pessoas();
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        partes_ordenaveis: this.state.partes_ordenaveis
      }
    );
  }
}

class ComponenteListaDePessoas extends React.Component{
  chave_do_react;
  mensagem;
  tipo_de_mensagem;
  posicionar_popup_visualizar_pessoa;
  posicionar_popup_editar_pessoa;
  posicionar_popup_excluir_pessoa;
  momento_da_acao_mostrar_popup;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.mensagem = this.props.memsagem;
    this.tipo_de_mensagem = this.props.tipo_de_mensagem;
    this.posicionar_popup_visualizar_pessoa = false;
    this.posicionar_popup_editar_pessoa = false;
    this.posicionar_popup_excluir_pessoa = false;
    this.momento_da_acao_mostrar_popup = 0;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      informacoes_de_estilo: {
        posicao_y: 0
      },
      id_da_pessoa_do_popup_visualizar: 0,
      id_da_pessoa_do_popup_editar: 0,
      id_da_pessoa_do_popup_excluir: 0,
      html_do_popup_visualizar_pessoa: "",
      html_do_popup_editar_pessoa: "",
      html_do_popup_excluir_pessoa: "",
      nova_exibicao_do_popup_editar: false,
      anti_csrf: ""
    }
    
    this.escolher_a_pessoa_do_popup_visualizar = this.escolher_a_pessoa_do_popup_visualizar.bind(this);
    this.escolher_a_pessoa_do_popup_editar = this.escolher_a_pessoa_do_popup_editar.bind(this);
    this.escolher_a_pessoa_do_popup_excluir = this.escolher_a_pessoa_do_popup_excluir.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.state.nova_exibicao_do_popup_editar = false;
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
    
    array_atributos["key"] = "ComponenteListaDePessoas tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_lista_de_pessoas":
          if(this.props.html !== ""){
            elemento.innerHTML = this.props.html;
          }
        break;
        case "div_visualizar_pessoa_do_id_" + this.state.id_da_pessoa_do_popup_visualizar:
          this.state.html_do_popup_visualizar_pessoa = elemento.innerHTML;
        break;
        case "div_editar_pessoa_do_id_" + this.state.id_da_pessoa_do_popup_editar:
          this.state.html_do_popup_editar_pessoa = elemento.innerHTML;
        break;
        case "div_excluir_pessoa_do_id_" + this.state.id_da_pessoa_do_popup_excluir:
          this.state.html_do_popup_excluir_pessoa = elemento.innerHTML;
        break;
        case "div_visualizar_pessoa":
          elemento = React.createElement(ComponentePopupVisualizarPessoa, {key: "ComponentePopupVisualizarPessoa", elemento: elemento, html: this.state.html_do_popup_visualizar_pessoa, link_nome_da_pessoa: this.state.informacoes_de_estilo, posicionar: this.posicionar_popup_visualizar_pessoa}, null);
          this.posicionar_popup_visualizar_pessoa = false;
          return elemento;
        break;
        case "div_editar_pessoa":
          if(this.posicionar_popup_editar_pessoa || this.props.momento_da_acao_ajax < this.momento_da_acao_mostrar_popup){
            this.mensagem = "";
            this.tipo_de_mensagem = "";
          }else{
            this.mensagem = this.props.mensagem;
            this.tipo_de_mensagem = this.props.tipo_de_mensagem;
          }
          elemento = React.createElement(ComponentePopupEditarPessoa, {key: "ComponentePopupEditarPessoa", elemento: elemento, html: this.state.html_do_popup_editar_pessoa, link_editar_pessoa: this.state.informacoes_de_estilo, id_da_pessoa: this.state.id_da_pessoa_do_popup_editar, anti_csrf: this.state.anti_csrf, editar_pessoa: this.props.editar_pessoa, nova_exibicao: this.state.nova_exibicao_do_popup_editar, campos_do_formulario: this.props.campos_do_formulario, mensagem: this.mensagem, tipo_de_mensagem: this.tipo_de_mensagem, posicionar: this.posicionar_popup_editar_pessoa}, null);
          this.posicionar_popup_editar_pessoa = false;
          return elemento;
        break;
        case "div_excluir_pessoa":
          if(this.posicionar_popup_excluir_pessoa || this.props.momento_da_acao_ajax < this.momento_da_acao_mostrar_popup){
            this.mensagem = "";
            this.tipo_de_mensagem = "";
          }else{
            this.mensagem = this.props.mensagem;
            this.tipo_de_mensagem = this.props.tipo_de_mensagem;
          }
          elemento = React.createElement(ComponentePopupExcluirPessoa, {key: "ComponentePopupExcluirPessoa", elemento: elemento, html: this.state.html_do_popup_excluir_pessoa, link_excluir_pessoa: this.state.informacoes_de_estilo, id_da_pessoa: this.state.id_da_pessoa_do_popup_excluir, anti_csrf: this.state.anti_csrf, excluir_pessoa: this.props.excluir_pessoa, campos_do_formulario: this.props.campos_do_formulario, mensagem: this.mensagem, tipo_de_mensagem: this.tipo_de_mensagem, posicionar: this.posicionar_popup_excluir_pessoa}, null);
          this.posicionar_popup_excluir_pessoa = false;
          return elemento;
        break;
      }
    }
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "nome_da_pessoa":
          array_atributos["onClick"] = this.escolher_a_pessoa_do_popup_visualizar;
        break;
        case "link_editar_pessoa":
          array_atributos["onClick"] = this.escolher_a_pessoa_do_popup_editar;
        break;
        case "link_excluir_pessoa":
          array_atributos["onClick"] = this.escolher_a_pessoa_do_popup_excluir;
        break;
        case "campo_nome":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
        case "campo_sobrenome":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
        case "campo_cpf":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
        case "campo_data_de_nascimento":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
        case "campo_email":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
        case "campo_telefone_fixo":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
        case "campo_telefone_movel":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
        case "campo_telefone_estrangeiro":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
        case "campo_id_da_pessoa":
          array_atributos["defaultValue"] = array_atributos["value"];
          delete array_atributos["value"];
        break;
      }
    }
    if(nome_da_tag === "input" && array_atributos["name"].indexOf("sexo_da_pessoa_do_id_") === 0){
      if(typeof array_atributos["checked"] !== "undefined"){
        array_atributos["defaultChecked"] = true;
      }else{
        array_atributos["defaultChecked"] = false;
      }
      delete array_atributos["checked"];
    }
    if(nome_da_tag === "option"){
      delete array_atributos["selected"];
    }
    if(nome_da_tag === "input" && array_atributos["name"] === "_token"){
      this.state.anti_csrf = array_atributos["value"];
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
  
  escolher_a_pessoa_do_popup_visualizar(evento){
    evento.preventDefault();
    
    this.state.informacoes_de_estilo.posicao_y = evento.target.getBoundingClientRect().top + window.scrollY;
    
    let href = evento.target.getAttribute("href");
    const id_da_pessoa = href.replace("pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    this.state.id_da_pessoa_do_popup_visualizar = id_da_pessoa;
    
    this.posicionar_popup_visualizar_pessoa = true;
    
    this.momento_da_acao_mostrar_popup = new Date().getTime();
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        informacoes_de_estilo: this.state.informacoes_de_estilo,
        id_da_pessoa_do_popup_visualizar: this.state.id_da_pessoa_do_popup_visualizar,
        id_da_pessoa_do_popup_editar: this.state.id_da_pessoa_do_popup_editar,
        id_da_pessoa_do_popup_excluir: this.state.id_da_pessoa_do_popup_excluir,
        html_do_popup_visualizar_pessoa: this.state.html_do_popup_visualizar_pessoa,
        html_do_popup_editar_pessoa: this.state.html_do_popup_editar_pessoa,
        html_do_popup_excluir_pessoa: this.state.html_do_popup_excluir_pessoa,
        nova_exibicao_do_popup_editar: this.state.nova_exibicao_do_popup_editar,
        anti_csrf: this.state.anti_csrf
      }
    );
  }
  
  escolher_a_pessoa_do_popup_editar(evento){
    evento.preventDefault();
    
    this.state.informacoes_de_estilo.posicao_y = evento.target.getBoundingClientRect().top + window.scrollY;
    
    let href = evento.target.getAttribute("href");
    const id_da_pessoa = href.replace("editar_pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    this.state.nova_exibicao_do_popup_editar = true;
    
    this.state.id_da_pessoa_do_popup_editar = id_da_pessoa;
    
    this.posicionar_popup_editar_pessoa = true;
    
    this.momento_da_acao_mostrar_popup = new Date().getTime();
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        informacoes_de_estilo: this.state.informacoes_de_estilo,
        id_da_pessoa_do_popup_visualizar: this.state.id_da_pessoa_do_popup_visualizar,
        id_da_pessoa_do_popup_editar: this.state.id_da_pessoa_do_popup_editar,
        id_da_pessoa_do_popup_excluir: this.state.id_da_pessoa_do_popup_excluir,
        html_do_popup_visualizar_pessoa: this.state.html_do_popup_visualizar_pessoa,
        html_do_popup_editar_pessoa: this.state.html_do_popup_editar_pessoa,
        html_do_popup_excluir_pessoa: this.state.html_do_popup_excluir_pessoa,
        nova_exibicao_do_popup_editar: this.state.nova_exibicao_do_popup_editar,
        anti_csrf: this.state.anti_csrf
      }
    );
  }
  
  escolher_a_pessoa_do_popup_excluir(evento){
    evento.preventDefault();
    
    this.state.informacoes_de_estilo.posicao_y = evento.target.getBoundingClientRect().top + window.scrollY;
    
    let href = evento.target.getAttribute("href");
    const id_da_pessoa = href.replace("excluir_pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    this.state.id_da_pessoa_do_popup_excluir = id_da_pessoa;
    
    this.posicionar_popup_excluir_pessoa = true;
    
    this.momento_da_acao_mostrar_popup = new Date().getTime();
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        informacoes_de_estilo: this.state.informacoes_de_estilo,
        id_da_pessoa_do_popup_visualizar: this.state.id_da_pessoa_do_popup_visualizar,
        id_da_pessoa_do_popup_editar: this.state.id_da_pessoa_do_popup_editar,
        id_da_pessoa_do_popup_excluir: this.state.id_da_pessoa_do_popup_excluir,
        html_do_popup_visualizar_pessoa: this.state.html_do_popup_visualizar_pessoa,
        html_do_popup_editar_pessoa: this.state.html_do_popup_editar_pessoa,
        html_do_popup_excluir_pessoa: this.state.html_do_popup_excluir_pessoa,
        nova_exibicao_do_popup_editar: this.state.nova_exibicao_do_popup_editar,
        anti_csrf: this.state.anti_csrf
      }
    );
  }
}

class ComponentePopupVisualizarPessoa extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
    
    this.react_referencia_popup_visualizar_pessoa = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(typeof window.evento_do_popup_visualizar_pessoa_ja_foi_adicionado === "undefined"){
      window.evento_do_popup_visualizar_pessoa_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
      window.addEventListener("click", function(evento){
        let tag_alvo = evento.target;
        
        while(true){
          if(tag_alvo === null || !tag_alvo.tagName){
            this.react_referencia_popup_visualizar_pessoa.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.classList.contains("nome_da_pessoa")){
            this.react_referencia_popup_visualizar_pessoa.current.classList.remove("tag_oculta");
            break;
          }
          
          if(tag_alvo.classList.contains("div_fechar")){
            this.react_referencia_popup_visualizar_pessoa.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.id === "div_visualizar_pessoa"){
            break;
          }
          
          tag_alvo = tag_alvo.parentNode;
        }
      }.bind(this));
    }
  }
  
  componentDidUpdate(){
    if(this.props.posicionar){
      this.react_referencia_popup_visualizar_pessoa.current.classList.remove("tag_oculta");
      
      let largura_da_div = 0;
      var estilo_computado = window.getComputedStyle(this.react_referencia_popup_visualizar_pessoa.current);
      largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
      largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
      largura_da_div += parseInt(estilo_computado.width, 10);
      largura_da_div += parseInt(estilo_computado.paddingRight, 10);
      largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
      
      const tag_html = document.querySelector("html");
      let largura_da_tag_html = 0;
      var estilo_computado = window.getComputedStyle(tag_html);
      largura_da_tag_html += parseInt(estilo_computado.width, 10);
      
      var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
      if(window.innerWidth <= largura_da_div){
        posicao_x = 0;
      }
      
      let altura_da_div = 0;
      var estilo_computado = window.getComputedStyle(this.react_referencia_popup_visualizar_pessoa.current);
      altura_da_div += parseInt(estilo_computado.borderTopWidth, 10);
      altura_da_div += parseInt(estilo_computado.paddingTop, 10);
      altura_da_div += parseInt(estilo_computado.height, 10);
      altura_da_div += parseInt(estilo_computado.paddingBottom, 10);
      altura_da_div += parseInt(estilo_computado.borderBottomWidth, 10);
      
      var posicao_y = window.scrollY + (window.innerHeight - altura_da_div) / 2;
      if(window.innerHeight <= altura_da_div){
        posicao_y = this.props.link_nome_da_pessoa.posicao_y;
      }
      
      this.react_referencia_popup_visualizar_pessoa.current.style.left = posicao_x + "px";
      this.react_referencia_popup_visualizar_pessoa.current.style.top = posicao_y + "px";
      
      this.react_referencia_popup_visualizar_pessoa.current.classList.add("tag_oculta");
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
    
    array_atributos["key"] = "ComponentePopupVisualizarPessoa tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_visualizar_pessoa":
          array_atributos["ref"] = this.react_referencia_popup_visualizar_pessoa;
          elemento.innerHTML = this.props.html;
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
}

class ComponentePopupEditarPessoa extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
    
    this.remover_foco_do_botao = this.remover_foco_do_botao.bind(this);
    this.editar_pessoa = this.editar_pessoa.bind(this);
    
    this.react_referencia_popup_editar_pessoa = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(typeof window.evento_do_popup_editar_pessoa_ja_foi_adicionado === "undefined"){
      window.evento_do_popup_editar_pessoa_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
      window.addEventListener("click", function(evento){
        let tag_alvo = evento.target;
        
        while(true){
          if(tag_alvo === null || !tag_alvo.tagName){
            this.react_referencia_popup_editar_pessoa.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.classList.contains("link_editar_pessoa")){
            this.react_referencia_popup_editar_pessoa.current.classList.remove("tag_oculta");
            break;
          }
          
          if(tag_alvo.classList.contains("div_fechar")){
            this.react_referencia_popup_editar_pessoa.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.id === "div_editar_pessoa"){
            break;
          }
          
          tag_alvo = tag_alvo.parentNode;
        }
      }.bind(this));
    }
  }
  
  componentDidUpdate(){
    if(this.props.posicionar){
      this.react_referencia_popup_editar_pessoa.current.classList.remove("tag_oculta");
      
      let largura_da_div = 0;
      var estilo_computado = window.getComputedStyle(this.react_referencia_popup_editar_pessoa.current);
      largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
      largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
      largura_da_div += parseInt(estilo_computado.width, 10);
      largura_da_div += parseInt(estilo_computado.paddingRight, 10);
      largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
      
      const tag_html = document.querySelector("html");
      let largura_da_tag_html = 0;
      var estilo_computado = window.getComputedStyle(tag_html);
      largura_da_tag_html += parseInt(estilo_computado.width, 10);
      
      var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
      if(window.innerWidth <= largura_da_div){
        posicao_x = 0;
      }
      
      let altura_da_div = 0;
      var estilo_computado = window.getComputedStyle(this.react_referencia_popup_editar_pessoa.current);
      altura_da_div += parseInt(estilo_computado.borderTopWidth, 10);
      altura_da_div += parseInt(estilo_computado.paddingTop, 10);
      altura_da_div += parseInt(estilo_computado.height, 10);
      altura_da_div += parseInt(estilo_computado.paddingBottom, 10);
      altura_da_div += parseInt(estilo_computado.borderBottomWidth, 10);
      
      var posicao_y = window.scrollY + (window.innerHeight - altura_da_div) / 2;
      if(window.innerHeight <= altura_da_div){
        posicao_y = this.props.link_editar_pessoa.posicao_y;
      }
      
      this.react_referencia_popup_editar_pessoa.current.style.left = posicao_x + "px";
      this.react_referencia_popup_editar_pessoa.current.style.top = posicao_y + "px";
      
      this.react_referencia_popup_editar_pessoa.current.classList.add("tag_oculta");
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
    
    array_atributos["key"] = "ComponentePopupEditarPessoa tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_editar_pessoa":
          array_atributos["ref"] = this.react_referencia_popup_editar_pessoa;
          elemento.innerHTML = this.props.html;
        break;
      }
    }
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_nome":
          elemento = React.createElement(ComponenteEditarNome, {key: "ComponenteEditarNome", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_sobrenome":
          elemento = React.createElement(ComponenteEditarSobrenome, {key: "ComponenteEditarSobrenome", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_cpf":
          elemento = React.createElement(ComponenteEditarCPF, {key: "ComponenteEditarCPF", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_data_de_nascimento":
          elemento = React.createElement(ComponenteEditarDataDeNascimento, {key: "ComponenteEditarDataDeNascimento", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_sexo":
          const valor = elemento.querySelectorAll("input[type='radio'][checked='checked']")[0].value;
          elemento = React.createElement(ComponenteEditarSexo, {key: "ComponenteEditarSexo", elemento: elemento, nova_exibicao: this.props.nova_exibicao, valor: valor, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_setor":
          elemento = React.createElement(ComponenteEditarSetor, {key: "ComponenteEditarSetor", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_email":
          elemento = React.createElement(ComponenteEditarEmail, {key: "ComponenteEditarEmail", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_telefone_fixo":
          elemento = React.createElement(ComponenteEditarTelefoneFixo, {key: "ComponenteEditarTelefoneFixo", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_telefone_movel":
          elemento = React.createElement(ComponenteEditarTelefoneMovel, {key: "ComponenteEditarTelefoneMovel", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_editar_telefone_estrangeiro":
          elemento = React.createElement(ComponenteEditarTelefoneEstrangeiro, {key: "ComponenteEditarTelefoneEstrangeiro", elemento: elemento, nova_exibicao: this.props.nova_exibicao, campos_do_formulario: this.props.campos_do_formulario}, null);
          return elemento;
        break;
        case "div_mensagem tag_oculta":
          array_atributos["className"] = this.props.mensagem !== "" ? "div_mensagem" : "div_mensagem tag_oculta";
        break;
        case "span_mensagem_editar_pessoa":
          conteudo_dinamico = this.props.mensagem;
          array_atributos["className"] = "span_mensagem_editar_pessoa " + this.props.tipo_de_mensagem;
          array_atributos["className"] = array_atributos["className"].trim();
        break;
        case "botao_editar":
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.editar_pessoa;
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
  
  editar_pessoa(evento){
    this.props.campos_do_formulario.set("id_da_pessoa", this.props.id_da_pessoa);
    this.props.campos_do_formulario.set("_token", this.props.anti_csrf);
    
    this.props.editar_pessoa();
  }
}

class ComponenteEditarNome extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      valor_editado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarNome tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_nome":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "campo_nome":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          this.props.campos_do_formulario.set("nome", this.state.valor);
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
    
    this.props.campos_do_formulario.set("nome", evento.target.value);
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarSobrenome extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      valor_editado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarSobrenome tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_sobrenome":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "campo_sobrenome":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          this.props.campos_do_formulario.set("sobrenome", this.state.valor);
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
    
    this.props.campos_do_formulario.set("sobrenome", evento.target.value);
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarCPF extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      valor_editado: false
    }
    
    this.aplicar_mascara = this.aplicar_mascara.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_campo = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.props.campos_do_formulario.set("cpf", this.react_referencia_campo.current.value);
  }
  
  componentDidUpdate(){
    this.props.campos_do_formulario.set("cpf", this.react_referencia_campo.current.value);
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarCPF tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_cpf":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "campo_cpf":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["ref"] = this.react_referencia_campo;
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
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarDataDeNascimento extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: null,
      calendario: {
        nome: "calendario_para_o_campo_editar_data_de_nascimento",
        valor: null,
        dia: null,
        mes: null,
        ano: null,
        total_de_dias_do_mes: null,
        ano_referencia: null
      },
      atualiza_todo_o_calendario: true,
      valor_editado: false
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
  
  componentDidUpdate(){
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarDataDeNascimento tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_data_de_nascimento":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "campo_data_de_nascimento":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          this.props.campos_do_formulario.set("data_de_nascimento", this.state.valor);
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
    
    if(tag_alvo.classList.contains("span_icone_de_calendario_do_campo_data_de_nascimento")){
      tag_alvo = tag_alvo.parentNode.querySelector(".campo_data_de_nascimento");
    }
    if(tag_alvo.classList.contains("campo_data_de_nascimento")){
      tag_alvo.style.border = "1px solid #8080C8";
    }
  }
  
  colocar_estilo_normal_na_borda_do_campo(evento){
    let tag_alvo = evento.target;
    
    if(tag_alvo.classList.contains("span_icone_de_calendario_do_campo_data_de_nascimento")){
      tag_alvo = tag_alvo.parentNode.querySelector(".campo_data_de_nascimento");
    }
    if(tag_alvo.classList.contains("campo_data_de_nascimento")){
      tag_alvo.style.border = "1px solid #C8C8C8";
    }
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.state.valor_editado = true;
    
    this.state.atualiza_todo_o_calendario = true;
    
    this.props.campos_do_formulario.set("data_de_nascimento", evento.target.value);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        valor_editado: this.state.valor_editado
      }
    );
  }
  
  desfaz_selecao_de_texto(evento){
    evento.preventDefault();
  }
  
  atualizar_o_calendario(evento){
    this.state.valor_editado = true;
    
    this.state.atualiza_todo_o_calendario = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        valor_editado: this.state.valor_editado
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
    
    this.state.valor_editado = true;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        valor_editado: this.state.valor_editado
      }
    );
  }
  
  registrar_escolha_de_mes(evento){
    this.state.calendario.mes = parseInt(evento.target.value, 10);
    
    this.state.calendario.total_de_dias_do_mes = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
    
    if(this.state.calendario.dia > this.state.calendario.total_de_dias_do_mes){
      this.state.calendario.dia = this.state.calendario.total_de_dias_do_mes;
    }
    
    this.state.valor_editado = true;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        valor_editado: this.state.valor_editado
      }
    );
  }
  
  registrar_escolha_de_ano(evento){
    this.state.calendario.ano = parseInt(evento.target.value, 10);
    
    this.state.calendario.total_de_dias_do_mes = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
    
    if(this.state.calendario.dia > this.state.calendario.total_de_dias_do_mes){
      this.state.calendario.dia = this.state.calendario.total_de_dias_do_mes;
    }
    
    this.state.valor_editado = true;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        valor_editado: this.state.valor_editado
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
    
    this.props.campos_do_formulario.set("data_de_nascimento", valor);
    
    this.state.valor_editado = true;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarSexo extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: props.valor,
      valor_editado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_botao_de_radio_marcado = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    if(!this.state.valor_editado && this.props.nova_exibicao){
      this.state.valor = this.props.valor;
    }
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    if(this.react_referencia_botao_de_radio_marcado.current !== null){
      this.react_referencia_botao_de_radio_marcado.current.checked = true;
      this.state.valor = this.react_referencia_botao_de_radio_marcado.current.value;
      this.props.campos_do_formulario.set("sexo", this.react_referencia_botao_de_radio_marcado.current.value);
    }
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarSexo tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(nome_da_tag === "input" && array_atributos["name"].indexOf("sexo_da_pessoa_do_id_") === 0){
      if(!this.state.valor_editado && this.props.nova_exibicao){
        this.state.valor = this.props.valor;
      }
      if(this.state.valor === elemento.value){
        array_atributos["defaultChecked"] = true;
        array_atributos["ref"] = this.react_referencia_botao_de_radio_marcado;
        this.props.campos_do_formulario.set("sexo", elemento.value);
      }else{
        array_atributos["defaultChecked"] = false;
      }
      delete array_atributos["checked"];
      
      array_atributos["onClick"] = this.atualizar_este_componente;
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
    
    this.props.campos_do_formulario.set("sexo", evento.target.value);
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarSetor extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      valor_editado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarSetor tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_setor":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "caixa_de_selecao_setor":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          this.props.campos_do_formulario.set("id_do_setor", this.state.valor);
          array_atributos["value"] = this.state.valor;
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
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.props.campos_do_formulario.set("id_do_setor", evento.target.value);
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarEmail extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      valor_editado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarEmail tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_email":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "campo_email":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          this.props.campos_do_formulario.set("email", this.state.valor);
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
    
    this.props.campos_do_formulario.set("email", evento.target.value);
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarTelefoneFixo extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      valor_editado: false
    }
    
    this.aplicar_mascara = this.aplicar_mascara.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_campo = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.props.campos_do_formulario.set("telefone_fixo", this.react_referencia_campo.current.value);
  }
  
  componentDidUpdate(){
    this.props.campos_do_formulario.set("telefone_fixo", this.react_referencia_campo.current.value);
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarTelefoneFixo tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_telefone_fixo":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "campo_telefone_fixo":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["ref"] = this.react_referencia_campo;
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
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarTelefoneMovel extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      valor_editado: false
    }
    
    this.aplicar_mascara = this.aplicar_mascara.bind(this);
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
    
    this.react_referencia_campo = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.props.campos_do_formulario.set("telefone_movel", this.react_referencia_campo.current.value);
  }
  
  componentDidUpdate(){
    this.props.campos_do_formulario.set("telefone_movel", this.react_referencia_campo.current.value);
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarTelefoneMovel tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_telefone_movel":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "campo_telefone_movel":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["ref"] = this.react_referencia_campo;
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
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
  
  atualizar_este_componente(evento){
    this.state.valor = evento.target.value;
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponenteEditarTelefoneEstrangeiro extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: "",
      valor_editado: false
    }
    
    this.atualizar_este_componente = this.atualizar_este_componente.bind(this);
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidUpdate(){
    this.state.valor_editado = false;
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
    
    array_atributos["key"] = "ComponenteEditarTelefoneEstrangeiro tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_editar_telefone_estrangeiro":
          if(this.props.nova_exibicao){
            elemento.innerHTML = this.props.elemento.innerHTML;
          }
        break;
        case "campo_telefone_estrangeiro":
          if(!this.state.valor_editado && this.props.nova_exibicao){
            this.state.valor = elemento.value;
          }
          this.props.campos_do_formulario.set("telefone_estrangeiro", this.state.valor);
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
    
    this.props.campos_do_formulario.set("telefone_estrangeiro", evento.target.value);
    
    this.state.valor_editado = true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        valor_editado: this.state.valor_editado
      }
    );
  }
}

class ComponentePopupExcluirPessoa extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
    
    this.remover_foco_do_botao = this.remover_foco_do_botao.bind(this);
    this.excluir_pessoa = this.excluir_pessoa.bind(this);
    
    this.react_referencia_popup_excluir_pessoa = React.createRef();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    if(typeof window.evento_do_popup_excluir_pessoa_ja_foi_adicionado === "undefined"){
      window.evento_do_popup_excluir_pessoa_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
      window.addEventListener("click", function(evento){
        let tag_alvo = evento.target;
        
        while(true){
          if(tag_alvo === null || !tag_alvo.tagName){
            this.react_referencia_popup_excluir_pessoa.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.classList.contains("link_excluir_pessoa")){
            this.react_referencia_popup_excluir_pessoa.current.classList.remove("tag_oculta");
            break;
          }
          
          if(tag_alvo.classList.contains("div_fechar")){
            this.react_referencia_popup_excluir_pessoa.current.classList.add("tag_oculta");
            break;
          }
          
          if(tag_alvo.id === "div_excluir_pessoa"){
            break;
          }
          
          tag_alvo = tag_alvo.parentNode;
        }
      }.bind(this));
    }
  }
  
  componentDidUpdate(){
    if(this.props.posicionar){
      this.react_referencia_popup_excluir_pessoa.current.classList.remove("tag_oculta");
      
      let largura_da_div = 0;
      var estilo_computado = window.getComputedStyle(this.react_referencia_popup_excluir_pessoa.current);
      largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
      largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
      largura_da_div += parseInt(estilo_computado.width, 10);
      largura_da_div += parseInt(estilo_computado.paddingRight, 10);
      largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
      
      const tag_html = document.querySelector("html");
      let largura_da_tag_html = 0;
      var estilo_computado = window.getComputedStyle(tag_html);
      largura_da_tag_html += parseInt(estilo_computado.width, 10);
      
      var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
      if(window.innerWidth <= largura_da_div){
        posicao_x = 0;
      }
      
      let altura_da_div = 0;
      var estilo_computado = window.getComputedStyle(this.react_referencia_popup_excluir_pessoa.current);
      altura_da_div += parseInt(estilo_computado.borderTopWidth, 10);
      altura_da_div += parseInt(estilo_computado.paddingTop, 10);
      altura_da_div += parseInt(estilo_computado.height, 10);
      altura_da_div += parseInt(estilo_computado.paddingBottom, 10);
      altura_da_div += parseInt(estilo_computado.borderBottomWidth, 10);
      
      var posicao_y = this.props.link_excluir_pessoa.posicao_y - altura_da_div / 2;
      if(window.innerHeight <= altura_da_div){
        posicao_y = this.props.link_excluir_pessoa.posicao_y;
      }
      
      this.react_referencia_popup_excluir_pessoa.current.style.left = posicao_x + "px";
      this.react_referencia_popup_excluir_pessoa.current.style.top = posicao_y + "px";
      
      this.react_referencia_popup_excluir_pessoa.current.classList.add("tag_oculta");
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
    
    array_atributos["key"] = "ComponentePopupExcluirPessoa tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_excluir_pessoa":
          array_atributos["ref"] = this.react_referencia_popup_excluir_pessoa;
          elemento.innerHTML = this.props.html;
        break;
      }
    }
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "div_mensagem tag_oculta":
          array_atributos["className"] = this.props.mensagem !== "" ? "div_mensagem" : "div_mensagem tag_oculta";
        break;
        case "span_mensagem_excluir_pessoa":
          conteudo_dinamico = this.props.mensagem;
          array_atributos["className"] = "span_mensagem_excluir_pessoa " + this.props.tipo_de_mensagem;
          array_atributos["className"] = array_atributos["className"].trim();
        break;
        case "botao_excluir":
          array_atributos["onMouseLeave"] = this.remover_foco_do_botao;
          array_atributos["onClick"] = this.excluir_pessoa;
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
  
  excluir_pessoa(evento){
    this.props.campos_do_formulario.set("id_da_pessoa", this.props.id_da_pessoa);
    this.props.campos_do_formulario.set("_token", this.props.anti_csrf);
    
    this.props.excluir_pessoa();
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
    
    this.selecionar_pagina = this.selecionar_pagina.bind(this);
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
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_paginacao_de_baixo_da_lista_de_pessoas":
          if(this.props.html !== ""){
            elemento.innerHTML = this.props.html;
          }
        break;
      }
    }
    if(nome_da_tag === "a"){
      array_atributos["onClick"] = this.selecionar_pagina;
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
  
  selecionar_pagina(evento){
    evento.preventDefault();
    
    let href = evento.target.getAttribute("href");
    const pagina = href.replace("/tudo_em_um?pagina=", "");
    
    this.props.campos_do_formulario.set("pagina", pagina);
    this.props.campos_do_formulario.set("status_da_busca", "Mudando de página...");
    this.props.atualizar_a_lista_de_pessoas();
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
    switch(this.react_referencia_calendario.current.id){
      case "div_calendario_para_o_campo_cadastrar_data_de_nascimento":
        if(typeof window.evento_do_calendario_para_o_campo_cadastrar_data_de_nascimento_ja_foi_adicionado === "undefined"){
          window.evento_do_calendario_para_o_campo_cadastrar_data_de_nascimento_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
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
              
              if(tag_alvo.id === "botao_confirmar_do_calendario_para_o_campo_cadastrar_data_de_nascimento"){
                this.react_referencia_calendario.current.classList.add("tag_oculta");
                break;
              }
              
              if(tag_alvo.id === "div_calendario_para_o_campo_cadastrar_data_de_nascimento"){
                break;
              }
              
              tag_alvo = tag_alvo.parentNode;
            }
          }.bind(this));
        }
      break;
      case "div_calendario_para_o_campo_filtro_data_de_nascimento":
        if(typeof window.evento_do_calendario_para_o_campo_filtro_data_de_nascimento_ja_foi_adicionado === "undefined"){
          window.evento_do_calendario_para_o_campo_filtro_data_de_nascimento_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
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
      break;
      case "div_calendario_para_o_campo_editar_data_de_nascimento":
        if(typeof window.evento_do_calendario_para_o_campo_editar_data_de_nascimento_ja_foi_adicionado === "undefined"){
          window.evento_do_calendario_para_o_campo_editar_data_de_nascimento_ja_foi_adicionado = true; //Necessário caso esteja usando React.StrictMode
          window.addEventListener("click", function(evento){
            let tag_alvo = evento.target;
            
            while(true){
              if(tag_alvo === null || !tag_alvo.tagName){
                this.react_referencia_calendario.current.classList.add("tag_oculta");
                break;
              }
              
              if(tag_alvo.classList.contains("campo_data_de_nascimento")){
                break;
              }
              
              if(tag_alvo.classList.contains("span_icone_de_calendario_do_campo_data_de_nascimento")){
                if(this.react_referencia_calendario.current.classList.contains("tag_oculta")){
                  this.react_referencia_calendario.current.classList.remove("tag_oculta");
                }else{
                  this.react_referencia_calendario.current.classList.add("tag_oculta");
                }
                break;
              }
              
              if(tag_alvo.id === "botao_confirmar_do_calendario_para_o_campo_editar_data_de_nascimento"){
                this.react_referencia_calendario.current.classList.add("tag_oculta");
                break;
              }
              
              if(tag_alvo.id === "div_calendario_para_o_campo_editar_data_de_nascimento"){
                break;
              }
              
              tag_alvo = tag_alvo.parentNode;
            }
          }.bind(this));
        }
      break;
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

const div_pagina_tudo_em_um = document.getElementById("div_pagina_tudo_em_um");
const div_componente_pagina_tudo_em_um = document.getElementById("div_componente_pagina_tudo_em_um");

const root = ReactDOM.createRoot(div_componente_pagina_tudo_em_um);
root.render(
  React.createElement(
    React.StrictMode, 
    null,
    React.createElement(ComponentePaginaTudoEmUm, {elemento: div_pagina_tudo_em_um}, null)
  )
);
