class ComponentePaginaExcluirPessoa extends React.Component{
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
    
    array_atributos["key"] = "ComponentePaginaExcluirPessoa tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "botao_excluir":
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

const div_pagina_excluir_pessoa = document.getElementById("div_pagina_excluir_pessoa");
const div_componente_pagina_excluir_pessoa = document.getElementById("div_componente_pagina_excluir_pessoa");

const root = ReactDOM.createRoot(div_componente_pagina_excluir_pessoa);
root.render(
  React.createElement(
    React.StrictMode, 
    null,
    React.createElement(ComponentePaginaExcluirPessoa, {elemento: div_pagina_excluir_pessoa}, null)
  )
);
