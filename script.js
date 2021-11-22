/*****************************************
 *         COnfigurações gerais:          *
 ******************************************/

//let quizzesUsuarioArmazenados = 0; //variável global onde será alterado o valor se adicionado quizzes pelo usuário

/*****************************************
 *         COnfigurações tela 1:          *
 ******************************************/
/*carregarQuizzes();

function carregarQuizzes() {

  //console.log("tá indo aqui");
  console.log("tá indo aqui");
  let quizzes = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  quizzes.then(exibicaoDeQuizz);
  quizzes.catch(verificacaoDeErro);

  if (quizzesUsuarioArmazenados == 0) {
    let listagem_quizz_usuario = document.querySelector(".quizzes-usuario");
    listagem_quizz_usuario.style.display = "none";
  }
}

function verificacaoDeErro(erro) {
  alert("deu ruim");
  //console.log(erro);
}

function exibicaoDeQuizz(resposta) {
  let nomes = [];
  let capas = [];
  let imprimir = 0;
  let listagem_quizz = document.querySelector(".lista_servidor");

  listagem_quizz.innerHTML = "";

  for (let ii = 0; ii < resposta.data.length; ii++) {
    if (nomes.includes(resposta.data[ii].title)) {
      //console.log("já tem um quizz com esse nome");
      //verificar mais uma variável para ver se é mesmo o mesmo quizz
      imprimir = false;
    } else {
      nomes.push(resposta.data[ii].title);
      capas.push(resposta.data[ii].image);
      //console.log("ok, é um quizz novo");
      imprimir = true;
    }

    if (imprimir) {
      //CONFERIR SE TEM QUIZZES REPETIDOS

      listagem_quizz.innerHTML += `<article class = "quizz" onclick = 'mostraQuizz(this)'>
      
        <figure>
        <div class = "degrade-escuro"></div>
          <img  src = '${resposta.data[ii].image}' = alt = "image da ap" />
          <span>${resposta.data[ii].title}</span>
          <span class = "identificacao">${resposta.data[ii].id}</span>
        </figure>
      </article>`;
    }
  }
  //fim criacao quizz
  //console.log(nomes);
  nomes = [];
  capas = [];
}

function tela1tela3(resposta) {
  let tela_anterior = document.querySelector(".tela1");
  tela_anterior.classList.toggle("hide");
  //console.log(tela_anterior);
  let tela_atual = document.querySelector(".tela31");
  tela_atual.classList.toggle("hide");
  //console.log("ok");

}

// function buscarQuizzSelecionado(id) {
//   let identificacao = id.querySelector(".identificacao").innerText;
//   let quizz = axios(
//     `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identificacao}`
//   );

//   quizz.then(mostraQuizz);
//   quizz.catch(verificacaoDeErro);
// }

function criarQuizzSelecionado() {
  let tela_anterior = document.querySelector(".tela1");
  tela_anterior.classList.toggle("hide");
  let tela_atual = document.querySelector(".embrulho-quizz-tela2");
  tela_atual.classList.toggle("hide");

}*/

/******************************************
 *         COnfigurações tela 2:          *
 ******************************************/
let id = 0;

function mostraQuizz(resposta) {
  /////criarQuizzSelecionado();

  let id = resposta //resposta.querySelector(".identificacao").innerText;
  console.log(id);

  const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
  promisse.then(quizzLoading);
  promisse.catch(loadingQuizzError);
}
mostraQuizz(1)

function loadingQuizzError(error) {
  alert("error#1 - Não foi possivel carregar esse quizz");
}

function quizzLoading(answer) {
  const quizzPerguntar = answer.data;
  console.log(quizzPerguntar);
  //console.log(quizzPerguntar.questions.length);
  const tituloDaPaginaLoading = document.querySelector(".embrulho-quizz-tela2");
  tituloDaPaginaLoading.innerHTML = `<div class="quizz-titulo" id="titulo${id}">
<p>${quizzPerguntar.title}</p>
</div>`;
  document.querySelector(".quizz-titulo").style.backgroundImage = `url('${quizzPerguntar.image}')`;
  document.querySelector(".quizz-titulo").style.backgroundColor = "black";

  for (let i = 0; i < quizzPerguntar.questions.length; i++) {
    let embaralhador = [];
    let comprimento = quizzPerguntar.questions[i].answers.length;

    while (embaralhador.length < comprimento) {
      let numero = Math.floor(Math.random() * 4);
      if (!embaralhador.includes(numero))
        embaralhador.push(numero);
    }
    tituloDaPaginaLoading.innerHTML += `<div class="pergunta-embrulho">
<div class="pergunta-caixa" id = "caixa${i + 1}">
  <div class="pergunta-titulo" id="c${i}"><p>${quizzPerguntar.questions[i].title}</p>
</div>
<div class="cards-embrulho conjunto-cards${i}">  </div>
`
    let j = 0;
    while (j < comprimento) {
      let localRespostas = document.querySelector(`.conjunto-cards${i}`);
      localRespostas.innerHTML += `<div class="card" onclick = "respostaSelecionada(this)"><div class = "nao-selecionada"></div>
<img class="card-image" src="${quizzPerguntar.questions[i].answers[embaralhador[j]].image}" height = "175.2px"  width="329.91px"/>
<div class="card-titulo"><p>${quizzPerguntar.questions[i].answers[embaralhador[j]].text}</p><span class = "resposta-card">${quizzPerguntar.questions[i].answers[embaralhador[j]].isCorrectAnswer}</span></div>
</div>
</div>`
      j++
    }

  }
  for (i = 0; i < quizzPerguntar.questions.length; i++) {
    document.getElementById(`c${i}`).style.backgroundColor = `${quizzPerguntar.questions[i].color}`;
  }
}

// **************************************** ESSA FUNCAO DEIXA AS COISAS BRANCAS E CHAMA A FUNCAO QUE VAI CONFERIR AS RESPOSTAS ***************

function respostaSelecionada(resposta) {
  let selecionada = resposta;
  console.log(selecionada.firstChild);
  selecionada.classList.add("selecionada");
  selecionada.removeAttribute("onclick");
  selecionada.firstChild.classList.remove("nao-selecionada");
  console.log(selecionada);

  //com isso, ele marca a carta que foi selecionada, agora falta adicionar algo nas outras para remover o onclick, mas como a encontrar?
  let espacoSelecao = selecionada.parentElement.classList[1];
  console.log(espacoSelecao);
  // console.log(espacoSelecao);
  // com isso, ele ve em qual espaço (ou em qual pergunta) foi selecionada a resposta em questão
  let numeroRespostas = document.querySelectorAll(`.${espacoSelecao} .card`).length;
  //com isso ele ve quantas respostas tem no total, contando a selecionada
  // console.log(numeroRespostas);
  //agora com um for eu vou adicionar a classe de nao selecionada em todas as outras, e tirar o onclick delas muahahaha

  let nao_selecionada_display = document.querySelectorAll(`.${espacoSelecao} .card .nao-selecionada`);
  let nao_selecionada_clique = document.querySelectorAll(`.${espacoSelecao} .card .nao-selecionada`);

  for (let i = 0; i < nao_selecionada_display.length; i++) {
    nao_selecionada_display[i].style.display = "initial";
    nao_selecionada_clique[i].parentElement.removeAttribute("onclick");
  }
  //conferencia se a resposta é certa ou não

  conferirRespostas(resposta);
}

// **************************************** ESSA FUNCAO  VAI CONFERIR AS RESPOSTAS ***************
let respostas_certas = 0; //variável global para contabilizar quantas das respostas seleciondas são === true
let perguntas_respondidas = 0;
let embrulhoCardSelecionado; //para scrollar pagina
function conferirRespostas(resposta) {

  let selecionada = resposta;
  let espacoSelecao = selecionada.parentElement.classList[1];
  embrulhoCardSelecionado = espacoSelecao;
  //conferir se a resposta selecionada é a resposta certa
  let resposta_selecionada = document.querySelector(`.${espacoSelecao} .selecionada .resposta-card`).innerText;
  // console.log(resposta_selecionada==selecionada);
  console.log(resposta_selecionada);
  console.log(resposta_selecionada === "true");
  if (resposta_selecionada === "true") {
    alert("você acertou!");
    respostas_certas++
  }


  let cards_conferir = document.querySelectorAll(`.${espacoSelecao} .card .resposta-card`);
  //com isso eu consigo um vetor com todas as respostas já de forma relacionada aos seus cards. 

  for (let i = 0; i < cards_conferir.length; i++) {

    if (cards_conferir[i].innerText === "true") {

      let titulo_card = cards_conferir[i].parentElement;
      titulo_card.classList.add("resposta-certa");

    }
    else {
      let titulo_card = cards_conferir[i].parentElement;
      titulo_card.classList.add("resposta-errada");

    }
  }
  //eu tenho que saber quantas perguntas no total tem, pra ver se eu já respondi todas elas

  let numero_perguntas = document.querySelectorAll(".pergunta-caixa").length;
  //cada vez que a função é chamada, uma função foi respondida

  perguntas_respondidas++

  if (perguntas_respondidas === numero_perguntas) {
    alert(`você terminou o quiz! você acertou ${respostas_certas} perguntas`);
  }
  setTimeout(scrollPagina, 2000);
}
function scrollPagina() {
  let scrollInto = document.querySelector(`.${embrulhoCardSelecionado}`);
  scrollInto.lastElementChild.lastElementChild.scrollIntoView();

}

/*****************************************
 *         COnfigurações tela 3:          *
 ******************************************/

//cria um novo quiz personalizado e envia informaçoes dele para o servidor
//  function criarNovoQuizz(){
// const informacoesBasicas = document.querySelectorAll(".informacoesBasicas");
//    const novaPergunta = document.querySelectorAll(".novaPergunta");
//    const novoNivel = document.querySelectorAll(".novoNivel");

//   const novoQuizz = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',{
//     title: informacoesBasicas.firstChild.value,
//     image: informacoesBasicas.secondChild.value,
//     questions: [],
//     levels: []
//   });

//   //for pra criar o vetor de questions
//   for(i = 0; i < informacoesBasicas.thirdChild.value; i++){

//   }

//   //for pra criar o vetor de levels
//   for(i = 0; i < informacoesBasicas.fourthChild.value; i++){

//   }

function validarInformacoesBasicas() {
  console.log('estou funcionando');
  // RAFA, COMENTEI SUA PARTE PORQUE NÃO ACHEI DE ONDE QUE ESTAVA VINDO ESSE INFORMACOES BASICAS NO HTML

  // let tituloQuiz = informacoesBasicas.firstChild.value;
  // let URLquiz = informacoesBasicas.secondChild.value;
  // let quantPerguntas = informacoesBasicas.thirdChild.value;
  // let quantNiveis = informacoesBasicas.fourthChild.value  


  let tituloQuiz = document.querySelector("#titulo").value;
  let URLquiz = document.querySelector("#urlImagem").value;
  let quantPerguntas = document.querySelector("#numeroPerguntas").value;
  let quantNiveis = document.querySelector("#numeroNiveis").value;

  //passei esse daqui pra cima, por a verificacao do else não podia ser feita se ele ainda nào estivesse definido

  let isValidHttpUrl = (URLquiz) => {
    let url;

    try {
      url = new URL(URLquiz);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  if (tituloQuiz.length < 20 || tituloQuiz.length > 65) {
    alert('Validação falhou, titulo do quiz deve ter no mínimo 20 e no máximo 65 caracters');
  }
  else if (!isValidHttpUrl || URLquiz.length < 2) {
    alert('Validação falhou, url deve ter formato válido');
  }
  else if (parseInt(quantPerguntas) < 3 || parseInt(quantPerguntas) !== parseInt(quantPerguntas)) {
    alert('Validação falhou, o quiz deve ter no mínimo 3 perguntas');
  }
  else if (parseInt(quantNiveis) < 2 || parseInt(quantNiveis) !== parseInt(quantNiveis)) {
    alert('Validação falhou, o quiz deve ter no mínimo 2 níveis');
  }

  else {
    console.log('passei');
    passarProximaFormulario();
  }

  //se passou, essas informacoes tem que ser armazenadas em forma de objeto para depoir criarem o novo quizz. E o botão deve chamar a próxima página
}

function validarPerguntaseRespostas() {
  let textoPergunta = document.querySelector("#textoPergunta").value;
  let corFundo = document.querySelector("#corFundo").value;
  let textoResposta = document.querySelector("#textoResposta").value;
  let urlImagemResposta = document.querySelector("#urlImagemResposta").value;

  let isValidHttpUrl = (urlImagemResposta) => {
    let url;
    try {
      url = new URL(urlImagemResposta);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  if (textoPergunta.lentgh < 20 || textoPergunta === "") {
    alert('Validação falhou, a pergunta deve ter no mínimo 20 caracteres');
  }
  else if (corFundo.match(/^#[a-f0-9]{6}$/i) === null) {
    alert('Validação falhou, cor em formato inválido');
  }
  else if (textoResposta === "") {
    alert('Validação falhou, o texto da resposta não pode estar vazio');
  }
  else if (!isValidHttpUrl || urlImagemResposta === "") {
    alert('Validação falhou, url deve ter formato válido');
  }
  else {
    console.log('passei');
    passarProximaFormulario();
  }
}

function validarNiveis() {
  let tituloNivel = document.querySelector("#tituloNivel").value;
  let porcentagemAcerto = document.querySelector("#porcentagemAcerto").value;
  //Pelo menos um dos níveis precisa ter porcentagemAcerto mínimo igual a 0%
  let urlImagemNivel = document.querySelector("#urlImagemNivel").value;
  let descricaoNivel = document.querySelector("#descricaoNivel").value;

  let isValidHttpUrl = (urlImagemNivel) => {
    let url;

    try {
      url = new URL(urlImagemNivel);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  if (tituloNivel.length < 10 || tituloNivel === "") {
    alert('Validação falhou, o título do nível precisa ter no mínimo 10 caracteres');
  }
  else if (parseInt(porcentagemAcerto) < 0 || parseInt(porcentagemAcerto) > 100 || porcentagemAcerto === "") {
    alert('Validação falhou, porcentagem precisa estar entre 0 e 100%');
  }
  else if (!isValidHttpUrl || urlImagemNivel === "") {
    alert('Validação falhou, o texto da resposta não pode estar vazio');
  }
  else if (descricaoNivel.length < 30 || descricaoNivel === "") {
    alert('Validação falhou, descrição do nível deve ter no mínimo 30 caracteres');
  }
  else {
    console.log('passei');
    passarProximaFormulario();
  }
}









/***********************************************
 *         COnfigurações Navegação Entre Telas *
 ***********************************************/
let posicaoFormulario = 1; //variavel global para poder conferir a passagem dos formularios

function voltarParaHome(clique) {
  console.log("fui chamado para voltar pra tela1");
  let conferencia = clique.parentElement.classList;
  console.log(conferencia);
  console.log(conferencia.value);
  console.log(typeof (conferencia.value));


  //  ESTÁ FUNCIONANDO PARA A TELA 2, MAS NÃO PARA A TELA 3. AINDA NÃO SEI O PORQUE. NAO COMENTEI ESSA PARTE PORQUE ELA NÃO ESTÁ AFETANDO O RESTANTE
  const localTela2 = "embrulho-quizz-tela2";
  const localTela3 = 'tela34';


  if (conferencia == localTela2) {
    let tela_anterior = document.querySelector(".embrulho-quizz-tela2");
    tela_anterior.classList.toggle("hide");
    console.log(tela_anterior);
    let tela_atual = document.querySelector(".tela1");
    tela_atual.classList.toggle("hide");
    console.log("ok");
  }
  else if (conferencia.value == localTela3) {
    console.log("ok");
    let tela_anterior = document.querySelector(".tela34");
    tela_anterior.classList.toggle("hide");
    console.log(tela_anterior);
    let tela_atual = document.querySelector(".tela1");
    tela_atual.classList.toggle("hide");

    posicaoFormulario = 1;
    //resentando minha variável global

  }

  else { console.log("tem algum lugar errado"); }
}



function passarProximaFormulario() {
  if (posicaoFormulario < 4) {
    let tela_atual = document.querySelector(`.tela3${posicaoFormulario}`);
    let proxima_tela = document.querySelector(`.tela3${posicaoFormulario + 1}`);
    tela_atual.classList.toggle("hide");
    proxima_tela.classList.toggle("hide");
    posicaoFormulario++;
  }

}