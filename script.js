/*****************************************
 *         COnfigurações gerais:          *
 ******************************************/
let posicaoFormulario = 1;
let quizzesUsuarioArmazenados = 0;

let tituloQuizNovo = "";
let bannerQuizNovo = "";
let perguntasQuizNovo = [];
let niveisQuizNovo = [];

let Objeto_Vazio = {
  title: tituloQuizNovo,
  image: bannerQuizNovo,
  questions: perguntasQuizNovo,
  levels: niveisQuizNovo,
};
/*****************************************
 *         COnfigurações tela 1:          *
 ******************************************/
carregarQuizzes();

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
  console.log("fui chamada");
  let tela_anterior = document.querySelector(".tela1");
  tela_anterior.classList.toggle("hide");
  let tela_atual = document.querySelector(".tela31");
  tela_atual.classList.toggle("hide");
}
function buscarQuizzSelecionado(id) {
  let identificacao = id.querySelector(".identificacao").innerText;
  let quizz = axios(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identificacao}`
  );

  quizz.then(mostraQuizz);
  quizz.catch(verificacaoDeErro);
}

function criarQuizzSelecionado() {
  let tela_anterior = document.querySelector(".tela1");
  tela_anterior.classList.toggle("hide");
  let tela_atual = document.querySelector(".embrulho-quizz-tela2");
  tela_atual.classList.toggle("hide");
}

/******************************************
 *         COnfigurações tela 2:          *
 ******************************************/
let id = 0;

function mostraQuizz(resposta) {
  criarQuizzSelecionado();
  let id = resposta.querySelector(".identificacao").innerText;
  const promisse = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`
  );

  promisse.then(quizzLoading);
  promisse.catch(loadingQuizzError);
}
function loadingQuizzError(error) {
  alert("error#1 - Não foi possivel carregar esse quizz");
}

let quizzPerguntar = [];
let reloadPage = 0;
function quizzLoading(answer) {
  quizzPerguntar = answer.data;
  console.log(quizzPerguntar);
  reloadPage = answer;
  const tituloDaPaginaLoading = document.querySelector(".embrulho-quizz-tela2");
  tituloDaPaginaLoading.innerHTML = `<div class="quizz-titulo" id="titulo${id} " >
  <img src="${quizzPerguntar.image}" alt="${quizzPerguntar.title}">
<p>${quizzPerguntar.title}</p>
</div>`;
  //document.querySelector(".quizz-titulo").style.backgroundImage = `url('${quizzPerguntar.image}')`;

  for (let i = 0; i < quizzPerguntar.questions.length; i++) {
    let embaralhador = [];
    let comprimento = quizzPerguntar.questions[i].answers.length;

    while (embaralhador.length < comprimento) {
      let numero = Math.floor(Math.random() * 4);
      if (!embaralhador.includes(numero)) embaralhador.push(numero);
    }
    tituloDaPaginaLoading.innerHTML += `<div class="pergunta-embrulho">
<div class="pergunta-caixa" id = "caixa${i + 1}">
  <div class="pergunta-titulo" id="c${i}"><p>${
      quizzPerguntar.questions[i].title
    }</p>
</div>
<div class="cards-embrulho conjunto-cards${i}">  </div>
`;
    let j = 0;
    while (j < comprimento) {
      let localRespostas = document.querySelector(`.conjunto-cards${i}`);
      localRespostas.innerHTML += `<div class="card" onclick = "respostaSelecionada(this)"><div class = "nao-selecionada"></div>
<img class="card-image" src="${
        quizzPerguntar.questions[i].answers[embaralhador[j]].image
      }" height = "175.2px"  width="329.91px"/>
<div class="card-titulo"><p>${
        quizzPerguntar.questions[i].answers[embaralhador[j]].text
      }</p><span class = "resposta-card">${
        quizzPerguntar.questions[i].answers[embaralhador[j]].isCorrectAnswer
      }</span></div>
</div>
</div>`;
      j++;
    }
  }
  for (i = 0; i < quizzPerguntar.questions.length; i++) {
    document.getElementById(
      `c${i}`
    ).style.backgroundColor = `${quizzPerguntar.questions[i].color}`;
  }
}
//respostas brancas:
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
  let numeroRespostas = document.querySelectorAll(
    `.${espacoSelecao} .card`
  ).length;
  //com isso ele ve quantas respostas tem no total, contando a selecionada
  // console.log(numeroRespostas);
  //agora com um for eu vou adicionar a classe de nao selecionada em todas as outras, e tirar o onclick delas muahahaha

  let nao_selecionada_display = document.querySelectorAll(
    `.${espacoSelecao} .card .nao-selecionada`
  );
  let nao_selecionada_clique = document.querySelectorAll(
    `.${espacoSelecao} .card .nao-selecionada`
  );

  for (let i = 0; i < nao_selecionada_display.length; i++) {
    nao_selecionada_display[i].style.display = "initial";
    nao_selecionada_clique[i].parentElement.removeAttribute("onclick");
  }
  //conferencia se a resposta é certa ou não

  conferirRespostas(resposta);
}

// conferir respostas:
let respostas_certas = 0; //variável global para contabilizar quantas das respostas seleciondas são === true
let perguntas_respondidas = 0;
let cardSelecionado; //para scrollar pagina
function conferirRespostas(resposta) {
  let selecionada = resposta;
  let espacoSelecao = selecionada.parentElement.classList[1];
  cardSelecionado = resposta;
  //conferir se a resposta selecionada é a resposta certa
  let resposta_selecionada = document.querySelector(
    `.${espacoSelecao} .selecionada .resposta-card`
  ).innerText;
  // console.log(resposta_selecionada==selecionada);
  console.log(resposta_selecionada);
  console.log(resposta_selecionada === "true");
  if (resposta_selecionada === "true") {
    // alert("você acertou!");
    respostas_certas++;
  }

  let cards_conferir = document.querySelectorAll(
    `.${espacoSelecao} .card .resposta-card`
  );
  //com isso eu consigo um vetor com todas as respostas já de forma relacionada aos seus cards.

  for (let i = 0; i < cards_conferir.length; i++) {
    if (cards_conferir[i].innerText === "true") {
      let titulo_card = cards_conferir[i].parentElement;
      titulo_card.classList.add("resposta-certa");
    } else {
      let titulo_card = cards_conferir[i].parentElement;
      titulo_card.classList.add("resposta-errada");
    }
  }
  //eu tenho que saber quantas perguntas no total tem, pra ver se eu já respondi todas elas

  let numero_perguntas = document.querySelectorAll(".pergunta-caixa").length;
  //cada vez que a função é chamada, uma função foi respondida

  perguntas_respondidas++;

  //alert(`você terminou o quiz! você acertou:\n ${respostas_certas} perguntas\n de um total de: ${perguntas_respondidas}`);
  if (perguntas_respondidas === numero_perguntas) {
    console.log("entrou no if");
    setTimeout(mostraResultado, 2000);
    console.log("saiu do if");
  }
  setTimeout(scrollPagina, 2000);

  console.log("respostas_certas:", respostas_certas);
  console.log("perguntas_respondidas:", perguntas_respondidas);
}

function scrollPagina() {
  let proximoCard =
    cardSelecionado.parentNode.parentNode.parentNode.nextElementSibling;
  if (proximoCard == null) return;
  console.log("card selecionado : ", proximoCard);
  proximoCard.scrollIntoView({ behavior: "smooth" });
}

function mostraResultado() {
  console.log("entrouu");
  console.log(quizzPerguntar);
  resultado = (respostas_certas / perguntas_respondidas) * 100;
  console.log("resultado:", resultado);
  let resultadoLoading = document.querySelector(".embrulho-quizz-tela2");
  console.log(resultadoLoading.innerHTML);
  for (let i = quizzPerguntar.levels.length - 1; i >= 0; i--) {
    console.log(quizzPerguntar.levels[i].minValue);
    if (resultado >= quizzPerguntar.levels[i].minValue) {
      resultadoLoading.innerHTML += `<div class="resultado-embrulho">
      <div class="resultado-caixa">
        <div class="resultado-titulo">
          <p>${resultado}% de acerto: ${quizzPerguntar.levels[i].title}</p> 
        </div>
        <div class="resultado-card">
          <img class="resultado-card-image" src="${quizzPerguntar.levels[i].image}"  height = "273px"  width="364px"/>
          <div class="resultado-card-titulo">
            <p>${quizzPerguntar.levels[i].text}</p>
          </div>
        </div>
      </div>
</div>
      <button class="reiniciar-quizz-button text-button" onclick="reiniciarQuizz(this)">
         <p>Reiniciar Quizz</p>
      </button>
      <button onclick="voltarParaHome(this)"class="voltar-home-button text-button">
        <p>Voltar para home</p>
      </button>`;
      scrollResultado();
      return;
    }
  }
  scrollResultado();
}
function scrollResultado() {
  let scrollToResultado = document.querySelector(".resultado-embrulho");
  if (scrollToResultado == null) return;
  scrollToResultado.firstElementChild.scrollIntoView({ behavior: "smooth" });
}
function reiniciarQuizz(answer) {
  let scrollInto = document.querySelector(`.embrulho-quizz-tela2`);
  scrollInto.firstElementChild.scrollIntoView();
  scrollInto.innerHTML = "";
  respostas_certas = 0;
  perguntas_respondidas = 0;
  quizzLoading(reloadPage);
}
/*****************************************
 *         COnfigurações tela 3:          *
 ******************************************/

function validarInformacoesBasicas() {
  console.log("estou funcionando");

  let tituloQuiz = document.querySelector("#titulo").value;
  let URLquiz = document.querySelector("#urlImagem").value;
  let quantPerguntas = document.querySelector("#numeroPerguntas").value;
  let quantNiveis = document.querySelector("#numeroNiveis").value;

  let isValidHttpUrl = (URLquiz) => {
    let url;

    try {
      url = new URL(URLquiz);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  if (tituloQuiz.length < 20 || tituloQuiz.length > 65) {
    alert(
      "Validação falhou, titulo do quiz deve ter no mínimo 20 e no máximo 65 caracters"
    );
  } else if (!isValidHttpUrl || URLquiz.length < 2) {
    alert("Validação falhou, url deve ter formato válido");
  } else if (
    parseInt(quantPerguntas) < 3 ||
    parseInt(quantPerguntas) !== parseInt(quantPerguntas)
  ) {
    alert("Validação falhou, o quiz deve ter no mínimo 3 perguntas");
  } else if (
    parseInt(quantNiveis) < 2 ||
    parseInt(quantNiveis) !== parseInt(quantNiveis)
  ) {
    alert("Validação falhou, o quiz deve ter no mínimo 2 níveis");
  } else {
    console.log("passei");
    numero_perguntas = quantPerguntas;
    numero_niveis = quantNiveis;
    tituloQuizNovo = tituloQuiz;
    bannerQuizNovo = URLquiz;

    criarPerguntas();
    passarProximaFormulario();
  }
}

criarPerguntas();
function criarPerguntas() {
  numero_perguntas = 1; //TIRAR DEPOIS
  let espaco_perguntas = document.querySelector(".tela32 .espaco-perguntas");
  for (let i = 0; i < numero_perguntas; i++) {
    espaco_perguntas.innerHTML += `
    <form class="caixa novaPergunta pergunta_numero${i}">
        <p class = "perguntas-impressas")>Pergunta ${i + 1}</p>
        <img class = "lembrete" src="https://img.icons8.com/metro/26/000000/create-new.png" alt="dor do coração do Yann" />
        <input class="textoPergunta" type="text" placeholder="Texto da pergunta" />
        <input class="corFundo" type="text" placeholder="Cor de fundo da pergunta" />

        <p class = "respostaID">Resposta correta</p>
        <input class ="texto-correta" type="text" placeholder="Resposta correta" />
        <input class ="imagem-correta" type="text" placeholder="URL da imagem" />

        <p>Resposta incorreta</p>
        <input class = "texto-incorreta inc_0" type="text" placeholder="Resposta incorreta 1" />
        <input class = "imagem-incorreta inc_0" type="text" placeholder="URL da imagem 1" /><br />
        <input class = "texto-incorreta inc_1" type="text" placeholder="Resposta incorreta 2" />
        <input class = "imagem-incorreta inc_1" type="text" placeholder="URL da imagem 2" /><br />
        <input class = "texto-incorreta inc_1"  type="text" placeholder="Resposta incorreta 3" />
        <input class = "imagem-incorreta inc_2" type="text" placeholder="URL da imagem 3" />
        
      </form>`;
  }
}

function validarPerguntaseRespostas() {

  let perguntasTotal = document.querySelectorAll(".novaPergunta");

for(let j = 0; j<perguntasTotal.length;j=j+1){
const todosInput = perguntasTotal[j].querySelectorAll("input");
let textoPergunta = todosInput[0].value;
// console.log(textoPergunta);
let corFundo = todosInput[1].value;
// console.log(todosInput);

if (textoPergunta.length < 20 || textoPergunta === "") {
  alert("Validação falhou, a pergunta deve ter no mínimo 20 caracteres");
  break
} else if (corFundo.match(/^#[a-f0-9]{6}$/i) === null) {
  alert("Validação falhou, cor em formato inválido, \n por favor utilize o seguinte formato: #XXXXXX");
  break
}
console.log(textoPergunta);

for(let i=2; i<todosInput.length;i=i+2){
  console.log(i);
  let textoResposta =todosInput[i].value;
  let urlImagemResposta = todosInput[i+1].value;


  let isValidHttpUrl = (urlImagemResposta) => {
    let url;
    try {
      url = new URL(urlImagemResposta);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  // agora é outro loop para as verificacoes de perguntas

    if (textoResposta === "") {
    alert("Validação falhou, o texto da resposta não pode estar vazio");
    break
  } else if (!isValidHttpUrl || urlImagemResposta === "") {
    alert("Validação falhou, url deve ter formato válido");
    break
  } 

}

}

  let numero_perguntas = document.querySelectorAll(
    ".tela32 .espaco-perguntas .perguntas-impressas"
  ).length;
  for (let j = 0; j < numero_perguntas; j++) {
    let respostas = [];
    //o primeiro for abre as perguntas
    let pergunta_atual_texto = document.querySelector(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .textoPergunta`
    ).value;
    let pergunta_atual_cor = document.querySelector(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .corFundo`
    ).value;
    let contagem_respostas = document.querySelectorAll(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .texto-incorreta`
    ).length;
    //respostas está aqui porque cada vez que começar um for para uma nova pergunta eu tenho que zerar ele
    let resposta_correta_texto = document.querySelector(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .texto-correta`
    ).value;
    let resposta_correta_imagem = document.querySelector(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .imagem-correta`
    ).value;

    let resposta_correta = {
      text: resposta_correta_texto,
      imagem: resposta_correta_imagem,
      isCorrectAnswer: true,
    };

    respostas.push(resposta_correta);
    for (let i = 0; i < contagem_respostas; i++) {
      //o loop é só para as respostas erradas
      let resposta_incorreta_texto = document.querySelector(
        `.tela32 .espaco-perguntas .pergunta_numero${j}`);
        console.log(j);

      console.log(resposta_incorreta_texto.value);
      let resposta_incorreta_imagem = document.querySelector(
        `.tela32 .espaco-perguntas .pergunta_numero${j} .imagem-incorreta .inc_${i}`
      );

      if (resposta_incorreta_texto !== null && resposta_incorreta_imagem !== null) {
        let resposta_incorreta = {
          text: resposta_incorreta_texto.value,
          imagem: resposta_incorreta_imagem.value,
          isCorrectAnswer: true,
        };
        console.log("estou sendo chamado");
        respostas.push(resposta_incorreta);
      }
    } 

    console.log(respostas);

    let pergunta_preenchida = {
      title: pergunta_atual_texto,
      color: pergunta_atual_cor,
      answers: respostas,
    };
    perguntasQuizNovo.push(pergunta_preenchida);
  } 
  criarNiveis();
  // passarProximaFormulario();
}
//fecha a funcao
criarNiveis();

function criarNiveis() {
  numero_niveis = 2;
  let espaco_niveis = document.querySelector(".tela33 .espaco-niveis");
  for (let i = 0; i < numero_niveis; i++) {
    espaco_niveis.innerHTML += `
    <form class="caixa novoNivel">
    <p>Nível ${i + 1}</p>
    <img src="https://img.icons8.com/metro/26/000000/create-new.png hide" alt="" />
    <input id="tituloNivel${i + 1}" type="text" placeholder="Título do nível" />
    <input id="porcentagemAcerto${
      i + 1
    }" type="text" placeholder="% de acerto mínima" />
    <input id="urlImagemNivel${
      i + 1
    }" type="text" placeholder="URL da imagem do nível" />
    <input id="descricaoNivel${
      i + 1
    }" type="text" placeholder="Descrição do nível" />
  </form>
    `;
  }
}

function validarNiveis() {

  niveisQuizNovo = [];

  let totalNiveis = document.querySelectorAll(".novoNivel");
  for(let j = 0;j<totalNiveis.length;j++){
  const todosInput = totalNiveis[j].querySelectorAll("input");

  let tituloNivel = todosInput[0].value;
  let porcentagemAcerto = todosInput[1].value;
  let urlImagemNivel = todosInput[2].value;
  let descricaoNivel = todosInput[3].value;

  let isValidHttpUrl = (urlImagemNivel) => {
  
    try {
      new URL(urlImagemNivel);
    } catch (_) {
      return false;
    }
    return true
  };

  if (tituloNivel.length < 10 || tituloNivel === "") {
    alert(
      "Validação falhou, o título do nível precisa ter no mínimo 10 caracteres"
    );
    break
  } else if (
    parseInt(porcentagemAcerto) < 0 ||
    parseInt(porcentagemAcerto) > 100 ||
    porcentagemAcerto === ""
  ) {
    alert("Validação falhou, porcentagem precisa estar entre 0 e 100%");
    break
  } else if (!isValidHttpUrl(urlImagemNivel
    ) || urlImagemNivel === "") {
    alert("Validação falhou, o texto da resposta não pode estar vazio");
    break
  } else if (descricaoNivel.length < 30 || descricaoNivel === "") {
    alert(
      "Validação falhou, descrição do nível deve ter no mínimo 30 caracteres"
    );
    break
  } } //fecha o for de validação
   
    for (let i = 0; i < numero_niveis; i++) {
      let tituloNivel = document.getElementById(`tituloNivel${i + 1}`).value;
      let urlImagemNivel = document.getElementById(
        `urlImagemNivel${i + 1}`
      ).value;
      let descricaoNivel = document.getElementById(
        `descricaoNivel${i + 1}`
      ).value;
      let valorMinimo = document.getElementById(
        `porcentagemAcerto${i + 1}`
      ).value;

      let level_atual = {
        title: tituloNivel,
        image: urlImagemNivel, 
        text: descricaoNivel, 
        minValue: valorMinimo,
      };
      niveisQuizNovo.push(level_atual);
      console.log(niveisQuizNovo);
    }
  
  // passarProximaFormulario();
  // criarNovoQuizz();
}


// function criarNovoQuizz() {
//   const informacoesBasicasinput = document.querySelector(".informacoesBasicas");
//   console.log(informacoesBasicasinput);
//   tituloQuiz = informacoesBasicasinput.firstChild.value;
//   bannerQuiz = informacoesBasicasinput.secondChild.value;
//   console.log(Objeto_Vazio);
// }

/***********************************************
 *         COnfigurações Navegação Entre Telas *
 ***********************************************/

function voltarParaHome(clique) {
  respostas_certas = 0;
  perguntas_respondidas = 0;

  console.log("fui chamado para voltar pra tela1");
  let conferencia = clique.parentElement.classList;
  const localTela2 = "embrulho-quizz-tela2";
  const localTela3 = "tela34";
  if (conferencia == localTela2) {
    let tela_anterior = document.querySelector(".embrulho-quizz-tela2");
    tela_anterior.classList.toggle("hide");
    console.log(tela_anterior);
    let tela_atual = document.querySelector(".tela1");
    tela_atual.classList.toggle("hide");
    console.log("ok");
  } else if (conferencia.value == localTela3) {
    console.log("ok");
    let tela_anterior = document.querySelector(".tela34");
    tela_anterior.classList.toggle("hide");
    console.log(tela_anterior);
    let tela_atual = document.querySelector(".tela1");
    tela_atual.classList.toggle("hide");

    posicaoFormulario = 1;
  } else {
    console.log("tem algum lugar errado");
  }
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
