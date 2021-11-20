/*****************************************
 *         COnfigurações gerais:          *
 ******************************************/

let quizzesUsuarioArmazenados = 0; //variável global onde será alterado o valor se adicionado quizzes pelo usuário

/*****************************************
 *         COnfigurações tela 1:          *
 ******************************************/
carregarQuizzes();

function carregarQuizzes() {
  //console.log("tá indo aqui");
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

      listagem_quizz.innerHTML += `<article class = "quizz" onclick = 'buscarQuizzSelecionado(this)'>
      
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

function buscarQuizzSelecionado(id) {
  let identificacao = id.querySelector(".identificacao").innerText;
  let quizz = axios(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identificacao}`
  );

  quizz.then(criarQuizzSelecionado);
  quizz.catch(verificacaoDeErro);
}

function criarQuizzSelecionado(resposta) {
  //console.log("selecionou um quizz");
  // se o quizz existir, e ele for selecionado, a tela1 será escondida para abrir a "tela2" com o quizz
  let tela_anterior = document.querySelector(".tela1");
  tela_anterior.classList.toggle("hide");
  //console.log(tela_anterior);
  let tela_atual = document.querySelector(".embrulho-quizz-tela2");
  tela_atual.classList.toggle("hide");
  //criar o quiz com os itens da resposta
}

function tela1tela3(resposta) {
  let tela_anterior = document.querySelector(".tela1");
  tela_anterior.classList.toggle("hide");
  //console.log(tela_anterior);
  let tela_atual = document.querySelector(".tela3-1");
  tela_atual.classList.toggle("hide");
  //console.log("ok");
}

/******************************************
 *         COnfigurações tela 2:          *
 ******************************************/
let id = 0;
function mostraQuizz(idt) {
  id = idt;
  const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
  promisse.then(quizzLoading);
  promisse.catch(loadingQuizzError);
}
mostraQuizz(1);  /*********************************************************
                  *     mostraQuizz(idt) precisa ser chamado na função    *
                  *     que abre o quizz (recebendo o id como parametro)  *
                  *********************************************************/
function loadingQuizzError(error) {
  alert("error#1 - Não foi possivel carregar esse quizz");
}
function quizzLoading(answer) {
  const quizzPerguntar = answer.data;
  //console.log(quizzPerguntar);
  //console.log(quizzPerguntar.questions.length);
  const tituloDaPaginaLoading = document.querySelector(".embrulho-quizz-tela2");
  tituloDaPaginaLoading.innerHTML = `<div class="quizz-titulo" id="titulo${id}">
<p>${quizzPerguntar.title}</p>
</div>`;
  document.querySelector(".quizz-titulo").style.backgroundImage = `url('${quizzPerguntar.image}')`;

  for (let i = 0; i < quizzPerguntar.questions.length; i++) {
    tituloDaPaginaLoading.innerHTML += `<div class="pergunta-embrulho">
    <div class="pergunta-caixa">
      <div class="pergunta-titulo" id="c${i + 1}"><p>${quizzPerguntar.questions[i].title}</p>
    </div>
    <div class="cards-embrulho">
      <div class="card">
        <img class="card-image" src="${quizzPerguntar.questions[i].answers[0].image}" height = "175.2px"  width="329.91px"/>
        <div class="card-titulo"><p>${quizzPerguntar.questions[i].answers[0].text}</p></div>
      </div>
      <div class="card">
        <img class="card-image" src="${quizzPerguntar.questions[i].answers[1].image}" height = "175.2px"  width="329.91px"/>
        <div class="card-titulo"><p>${quizzPerguntar.questions[i].answers[1].text}</p></div>
      </div>
      <div class="card">
        <img class="card-image" src="${quizzPerguntar.questions[i].answers[2].image}"  height = "175.2px"  width="329.91px"/>
        <div class="card-titulo"><p>${quizzPerguntar.questions[i].answers[2].text}</p></div>
      </div>
      <div class="card">
        <img class="card-image" src="${quizzPerguntar.questions[i].answers[3].image}" height = "175.2px"  width="329.91px"/>
        <div class="card-titulo"><p>${quizzPerguntar.questions[i].answers[3].text}</p></div>
      </div>
    `
  }
  for (i = 0; i < quizzPerguntar.questions.length; i++) {
    document.getElementById(`c${i + 1}`).style.backgroundColor = `${quizzPerguntar.questions[i].color}`;
  }
}

/*****************************************
 *         COnfigurações tela 3:          *
 ******************************************/

/*****************************************
 *         COnfigurações Navegação Entre Telas      *
 ******************************************/
/*
function voltarParaHome(clique){
    console.log("fui chamado para voltar pra tela1");
    let conferencia = clique.parentElement.classList;
    console.log(conferencia);
    console.log(conferencia.value);
    console.log(typeof(conferencia.value));


//  ESTÁ FUNCIONANDO PARA A TELA 2, MAS NÃO PARA A TELA 3. AINDA NÃO SEI O PORQUE. NAO COMENTEI ESSA PARTE PORQUE ELA NÃO ESTÁ AFETANDO O RESTANTE
    const localTela2 ="embrulho-quizz-tela2";
    const localTela3 = 'tela3-4';

    console.log(conferencia==localTela3);
    console.log(conferencia.value==localTela3);

    console.log(conferencia.value);
    console.log(localTela3);
    console.log(typeof(conferencia.value));
    console.log(typeof(localTela3));

    if(conferencia==localTela2){
        let tela_anterior = document.querySelector(".embrulho-quizz-tela2");
        tela_anterior.classList.toggle("hide");
        console.log(tela_anterior);
        let tela_atual = document.querySelector(".tela1");
        tela_atual.classList.toggle("hide");
        console.log("ok");
    }
    else if(conferencia.value==localTela3){
        console.log("ok");
        let tela_anterior = document.querySelector(".tela3-4");
        tela_anterior.classList.toggle("hide");
        console.log(tela_anterior);
        let tela_atual = document.querySelector(".tela1");
        tela_atual.classList.toggle("hide");

    }

    else{ console.log("tem algum lugar errado");}
}*/
