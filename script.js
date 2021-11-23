let quizzesUsuarioArmazenados = localStorage.getItem("quizz");
let quizzesUsuarioArmazenadosLocal;
let listaQuizzesUsuario;
if (quizzesUsuarioArmazenados === null) {
  listaQuizzesUsuario = [];
} else {
  quizzesUsuarioArmazenadosLocal = JSON.parse(quizzesUsuarioArmazenados);
  listaQuizzesUsuario = quizzesUsuarioArmazenadosLocal;
}

let tituloQuizNovo = "";
let bannerQuizNovo = "";
let perguntasQuizNovo = [];
let niveisQuizNovo = [];
let quizzPerguntar = [];
let reloadPage = 0;
let respostas_certas = 0;
let perguntas_respondidas = 0;
criarQuizzUsuario();
let posicaoFormulario = 1;

carregarQuizzes();

function carregarQuizzes() {
  console.log("tá indo aqui");
  let quizzes = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  quizzes.then(exibicaoDeQuizz);
  quizzes.catch(verificacaoDeErro);

  if (quizzesUsuarioArmazenadosLocal == null) {
    let listagem_quizz_usuario = document.querySelector(".quizzes-usuario");
    listagem_quizz_usuario.style.display = "none";
  } else {
    let cardsDoUser = document.querySelector(".quizzes-usuario");
    cardsDoUser.classList.remove("hide");
    let lista_vazia = document.querySelector(".criar-quiz");
    for (let i = 0; i < quizzesUsuarioArmazenadosLocal.length; i++) {
      let listagem_quizz = document.querySelector(
        ".tela1 .quizzes-usuario .lista-quiz-disponivel"
      );
      console.log(listagem_quizz);
      listagem_quizz.innerHTML += `<article class = "quizz" onclick = 'mostraQuizzUsuario(this)'>
        
        <figure>
        <div class = "degrade-escuro"></div>
          <img  src = '${quizzesUsuarioArmazenadosLocal[i].image}' = alt = "image da ap" />
          <span>${quizzesUsuarioArmazenadosLocal[i].title}</span>
          <span class = "identificacao"></span>
        </figure>
      </article>`;
    }
  }
}
function mostraQuizzUsuario() {
  alert("essa função está em construção! Ela exibirá o quizz do usuário :,)");
}
function verificacaoDeErro(erro) { }
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
      imprimir = true;
    }
    if (imprimir) {
      listagem_quizz.innerHTML += `<article class = "quizz" onclick = 'mostraQuizz(this)' data-identifier="quizz-card">
      
        <figure>
        <div class = "degrade-escuro"></div>
          <img  src = '${resposta.data[ii].image}' = alt = "image da ap" />
          <span>${resposta.data[ii].title}</span>
          <span class = "identificacao">${resposta.data[ii].id}</span>
        </figure>
      </article>`;
    }
  }
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
let id = 0;
function mostraQuizz(resposta) {
  console.log(resposta);
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

function quizzLoading(answer) {
  console.log("id:", id);
  quizzPerguntar = answer.data;
  console.log(quizzPerguntar);
  reloadPage = answer;
  const tituloDaPaginaLoading = document.querySelector(".embrulho-quizz-tela2");
  tituloDaPaginaLoading.innerHTML = `<div class="quizz-titulo" id="titulo${id} " >
  <img src="${quizzPerguntar.image}" alt="${quizzPerguntar.title}">
<p>${quizzPerguntar.title}</p>
</div>`;

  for (let i = 0; i < quizzPerguntar.questions.length; i++) {
    let embaralhador = [];
    let comprimento = quizzPerguntar.questions[i].answers.length;

    while (embaralhador.length < comprimento) {
      let numero = Math.floor(Math.random() * 4);
      if (!embaralhador.includes(numero)) embaralhador.push(numero);
    }
    tituloDaPaginaLoading.innerHTML += `<div class="pergunta-embrulho">
<div class="pergunta-caixa" id = "caixa${i + 1}">
  <div class="pergunta-titulo" id="c${i}" data-identifier="question"><p>${quizzPerguntar.questions[i].title
      }</p>
</div>
<div class="cards-embrulho conjunto-cards${i}">  </div>
`;
    let j = 0;
    while (j < comprimento) {
      let localRespostas = document.querySelector(`.conjunto-cards${i}`);
      localRespostas.innerHTML += `<div class="card" data-identifier="answer" onclick = "respostaSelecionada(this)"><div class = "nao-selecionada"></div>
<img class="card-image" src="${quizzPerguntar.questions[i].answers[embaralhador[j]].image
        }" height = "175.2px"  width="329.91px"/>
<div class="card-titulo"><p>${quizzPerguntar.questions[i].answers[embaralhador[j]].text
        }</p><span class = "resposta-card">${quizzPerguntar.questions[i].answers[embaralhador[j]].isCorrectAnswer
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
function respostaSelecionada(resposta) {
  let selecionada = resposta;

  console.log(selecionada.firstChild);
  selecionada.classList.add("selecionada");
  selecionada.removeAttribute("onclick");
  selecionada.firstChild.classList.remove("nao-selecionada");
  console.log(selecionada);

  let espacoSelecao = selecionada.parentElement.classList[1];
  console.log(espacoSelecao);
  let numeroRespostas = document.querySelectorAll(
    `.${espacoSelecao} .card`
  ).length;

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
  conferirRespostas(resposta);
}

let cardSelecionado;
function conferirRespostas(resposta) {
  let selecionada = resposta;
  let espacoSelecao = selecionada.parentElement.classList[1];
  cardSelecionado = resposta;
  let resposta_selecionada = document.querySelector(
    `.${espacoSelecao} .selecionada .resposta-card`
  ).innerText;
  console.log(resposta_selecionada);
  console.log(resposta_selecionada === "true");
  if (resposta_selecionada === "true") {
    respostas_certas++;
  }

  let cards_conferir = document.querySelectorAll(
    `.${espacoSelecao} .card .resposta-card`
  );

  for (let i = 0; i < cards_conferir.length; i++) {
    if (cards_conferir[i].innerText === "true") {
      let titulo_card = cards_conferir[i].parentElement;
      titulo_card.classList.add("resposta-certa");
    } else {
      let titulo_card = cards_conferir[i].parentElement;
      titulo_card.classList.add("resposta-errada");
    }
  }
  let numero_perguntas = document.querySelectorAll(".pergunta-caixa").length;
  perguntas_respondidas++;

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
  resultado = Math.round((respostas_certas / perguntas_respondidas) * 100);
  console.log("resultado:", resultado);
  let resultadoLoading = document.querySelector(".embrulho-quizz-tela2");
  console.log(resultadoLoading.innerHTML);
  for (let i = quizzPerguntar.levels.length - 1; i >= 0; i--) {
    console.log(quizzPerguntar.levels[i].minValue);
    if (resultado >= quizzPerguntar.levels[i].minValue) {
      resultadoLoading.innerHTML += `<div class="resultado-embrulho" data-identifier="quizz-result">
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

function validarInformacoesBasicas() {
  console.log("estou funcionando");

  let tituloQuiz = document.querySelector("#titulo").value;
  let URLquiz = document.querySelector("#urlImagem").value;
  let quantPerguntas = document.querySelector("#numeroPerguntas").value;
  let quantNiveis = document.querySelector("#numeroNiveis").value;

  let isValidHttpUrl = (URLquiz) => {
    try {
      new URL(URLquiz);
    } catch (_) {
      return false;
    }
    return true;
  };

  if (tituloQuiz.length < 20 || tituloQuiz.length > 65) {
    alert(
      "Validação falhou, titulo do quiz deve ter no mínimo 20 e no máximo 65 caracters"
    );
  } else if (!isValidHttpUrl(URLquiz) || URLquiz.length < 2) {
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

function criarPerguntas() {
  let espaco_perguntas = document.querySelector(".tela32 .espaco-perguntas");
  for (let i = 0; i < numero_perguntas; i++) {
    espaco_perguntas.innerHTML += `
    <form class="caixa novaPergunta pergunta_numero${i}">
      <div class = "titulo-perguntas" >
        <p class = "perguntas-impressas">Pergunta ${i + 1}</p>
        <img class = "lembrete" onclick = "escondePerguntas(this)"src="https://img.icons8.com/metro/26/000000/create-new.png" alt="dor do coração do Yann" />
      </div>
      <div class = "perguntas hide" >
        <input class="textoPergunta" type="text" placeholder="Texto da pergunta" />
        <input class="corFundo" type="text" placeholder="Cor de fundo da pergunta" />

        <p class = "respostaID">Resposta correta</p>
        <input class ="texto-correta" type="text" placeholder="Resposta correta" />
        <input class ="imagem-correta" type="text" placeholder="URL da imagem" />

        <p class = "resposta-incorreta-text">Resposta incorreta</p>
        <input class = "texto-incorreta0" type="text" placeholder="Resposta incorreta 1" />
        <input class = "imagem-incorreta0" type="text" placeholder="URL da imagem 1" /><br />
        <input class = "texto-incorreta1" type="text" placeholder="Resposta incorreta 2" />
        <input class = "imagem-incorreta1" type="text" placeholder="URL da imagem 2" /><br />
        <input class = "texto-incorreta2"  type="text" placeholder="Resposta incorreta 3" />
        <input class = "imagem-incorreta2" type="text" placeholder="URL da imagem 3" />
      </div>  
    </form>`;
  }
}

function validarPerguntaseRespostas() {
  let perguntasTotal = document.querySelectorAll(".novaPergunta");

  for (let j = 0; j < perguntasTotal.length; j++) {
    const todosInput = perguntasTotal[j].querySelectorAll("input");
    let textoPergunta = todosInput[0].value;
    let corFundo = todosInput[1].value;
    if (textoPergunta.length < 20 || textoPergunta === "") {
      alert("Validação falhou, a pergunta deve ter no mínimo 20 caracteres");
      break;
    } else if (corFundo.match(/^#[a-f0-9]{6}$/i) === null) {
      alert(
        "Validação falhou, cor em formato inválido, \n por favor utilize o seguinte formato: #XXXXXX"
      );
      break;
    }

    for (let m = 2; m < todosInput.length; m = m + 2) {
      let textoResposta = todosInput[m].value;
      let urlImagemResposta = todosInput[m + 1].value;

      let isValidHttpUrl = (urlImagemResposta) => {
        try {
          new URL(urlImagemResposta);
        } catch (_) {
          return false;
        }
        return true;
      };

      if (textoResposta === "" && m < 5) {
        alert("Validação falhou, o texto da resposta não pode estar vazio");
        break;
      } else if (
        (!isValidHttpUrl(urlImagemResposta) || urlImagemResposta === "") &&
        m < 5
      ) {
        alert("Validação falhou, url deve ter formato válido");
        break;
      }
    }
  }

  let numero_perguntas = document.querySelectorAll(
    ".tela32 .espaco-perguntas .perguntas-impressas"
  ).length;
  for (let j = 0; j < numero_perguntas; j++) {
    let respostas = [];
    let pergunta_atual_texto = document.querySelector(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .textoPergunta`
    ).value;
    let pergunta_atual_cor = document.querySelector(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .corFundo`
    ).value;
    let resposta_correta_texto = document.querySelector(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .texto-correta`
    ).value;
    let resposta_correta_imagem = document.querySelector(
      `.tela32 .espaco-perguntas .pergunta_numero${j} .imagem-correta`
    ).value;

    let resposta_correta = {
      text: resposta_correta_texto,
      image: resposta_correta_imagem,
      isCorrectAnswer: true,
    };

    respostas.push(resposta_correta);
    let contagem_respostas = 3;
    for (let i = 0; i < contagem_respostas; i++) {
      console.log(i);
      let resposta_incorreta_texto = document.querySelector(
        `.tela32 .espaco-perguntas .pergunta_numero${j} .texto-incorreta${i}`
      );

      let resposta_incorreta_imagem = document.querySelector(
        `.tela32 .espaco-perguntas .pergunta_numero${j} .imagem-incorreta${i}`
      );
      console.log(resposta_incorreta_texto.value == "");
      console.log(resposta_incorreta_imagem);
      if (
        resposta_incorreta_texto.value !== "" &&
        resposta_incorreta_imagem.value !== ""
      ) {
        let resposta_incorreta = {
          text: resposta_incorreta_texto.value,
          image: resposta_incorreta_imagem.value,
          isCorrectAnswer: false,
        };
        console.log("estou sendo chamado");
        respostas.push(resposta_incorreta);
      }
    }

    let pergunta_preenchida = {
      title: pergunta_atual_texto,
      color: pergunta_atual_cor,
      answers: respostas,
    };
    perguntasQuizNovo.push(pergunta_preenchida);
  }
  console.log(perguntasQuizNovo);
  console.log(perguntasQuizNovo[0].title.value);
  console.log(perguntasQuizNovo[0].title.value === "");
  let prosseguir = 0;

  criarNiveis();
  passarProximaFormulario();
}

function criarNiveis() {
  let espaco_niveis = document.querySelector(".tela33 .espaco-niveis");

  for (let i = 0; i < numero_niveis; i++) {
    espaco_niveis.innerHTML += `
    <form class="caixa novoNivel">
    <div class = "titulo-perguntas">
      <p>Nível ${i + 1}</p>
      <img class = "lembrete2" onclick = "escondePerguntas(this)"src="https://img.icons8.com/metro/26/000000/create-new.png" alt="dor do coração do Yann" />
    </div>
    <img src="https://img.icons8.com/metro/26/000000/create-new.png hide" alt="" />
    <input id="tituloNivel${i + 1}" type="text" placeholder="Título do nível" />
    <input id="porcentagemAcerto${i + 1
      }" type="text" placeholder="% de acerto mínima" />
    <input id="urlImagemNivel${i + 1
      }" type="text" placeholder="URL da imagem do nível" />
    <input id="descricaoNivel${i + 1
      }" type="text" placeholder="Descrição do nível" />
  </form>
    `;
  }
}

function validarNiveis() {
  niveisQuizNovo = [];

  let totalNiveis = document.querySelectorAll(".novoNivel");
  for (let j = 0; j < totalNiveis.length; j++) {
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
      return true;
    };

    if (tituloNivel.length < 10 || tituloNivel === "") {
      alert(
        "Validação falhou, o título do nível precisa ter no mínimo 10 caracteres"
      );
      break;
    } else if (
      parseInt(porcentagemAcerto) < 0 ||
      parseInt(porcentagemAcerto) > 100 ||
      porcentagemAcerto === ""
    ) {
      alert("Validação falhou, porcentagem precisa estar entre 0 e 100%");
      break;
    } else if (!isValidHttpUrl(urlImagemNivel) || urlImagemNivel === "") {
      alert("Validação falhou, o texto da resposta não pode estar vazio");
      break;
    } else if (descricaoNivel.length < 30 || descricaoNivel === "") {
      alert(
        "Validação falhou, descrição do nível deve ter no mínimo 30 caracteres"
      );
      break;
    }
  }

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

  passarProximaFormulario();
  sucessoDoQuizz();
}

function sucessoDoQuizz() {
  let telaFinal = document.querySelector(".tela34");
  telaFinal.innerHTML += `
     <div class="titulo-form">Seu quizz está pronto!</div>
        <div class="card">
          <figure>
            <div class="card-image">
              <img src="${bannerQuizNovo}" />
              <span>${tituloQuizNovo}</span>
            </div>
          </figure>
        </div>
        <button><span>Acessar Quizz</span></button>
        <button onclick="voltarParaHome(this)" class="botao-voltar-home">
          Voltar para home
        </button>`;
  criarQuizzUsuario();
}

function criarQuizzUsuario() {
  if (!localStorage.quizz) {
    localStorage.setItem("quizz", JSON.stringify({ quizz: [] }));
  }
  console.log("fui chamado aqui ó");

  let Objeto_Novo = {
    title: tituloQuizNovo,
    image: bannerQuizNovo,
    questions: perguntasQuizNovo,
    levels: niveisQuizNovo,
  };
  console.log("ok");

  console.log(Objeto_Novo);

  const novoQuizz = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    Objeto_Novo
  );
  novoQuizz.then(() => deuTudoCerto(Objeto_Novo));
  novoQuizz.catch(verificacaoDeErro);
}
function deuTudoCerto(quizzCriado) {
  localStorage.setItem("quizz", JSON.stringify(quizzCriado));
  alert(
    "o quizz foi enviado para o servidor! Atualize a página principal para o ver!"
  );
  carregarQuizzes();
}

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

    let tela_atual = document.querySelector(".tela1");
    tela_atual.classList.toggle("hide");
  } else if (conferencia.value == localTela3) {
    let tela_anterior = document.querySelector(".tela34");
    tela_anterior.classList.toggle("hide");
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

function escondePerguntas(answer) {
  let selecionado = answer.parentNode.nextElementSibling;
  selecionado.classList.toggle("hide");
}
