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

}



/******************************************
 *         COnfigurações tela 2:          *
 ******************************************/
let id = 0;

function mostraQuizz(resposta) {
  criarQuizzSelecionado();//ele tá aqui só pra  mudar de tela. Provavelmente poderia ser uma arrow function

  let id = resposta.querySelector(".identificacao").innerText;
  	console.log(id);
  // id = idt;
  const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
  promisse.then(quizzLoading);
  promisse.catch(loadingQuizzError);

  
}

// mostraQuizz(id);

/*********************************************************
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
    let embaralhador = [];
let comprimento = quizzPerguntar.questions[i].answers.length;

while(embaralhador.length<comprimento){
  let numero = Math.floor(Math.random() * 4);
  if(!embaralhador.includes(numero)){
embaralhador.push(numero);
  }
}
tituloDaPaginaLoading.innerHTML += `<div class="pergunta-embrulho">
<div class="pergunta-caixa">
  <div class="pergunta-titulo" id="c${i + 1}"><p>${quizzPerguntar.questions[i].title}</p>
</div>
<div class="cards-embrulho${i}">  </div>
`
let ii=0;
while (ii<comprimento){
let localRespostas = document.querySelector(`.cards-embrulho${i}`);
localRespostas.innerHTML+= `<div class="card ${ii}" onclick = "respostaSelecionada(this)">
<img class="card-image" src="${quizzPerguntar.questions[i].answers[embaralhador[ii]].image}" height = "175.2px"  width="329.91px"/>
<div class="card-titulo"><p>${quizzPerguntar.questions[i].answers[embaralhador[ii]].text}</p></div>
</div>`
ii++
}

  }
  for (i = 0; i < quizzPerguntar.questions.length; i++) {
    document.getElementById(`c${i + 1}`).style.backgroundColor = `${quizzPerguntar.questions[i].color}`;
  }
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

  if (tituloQuiz.length < 20 ||tituloQuiz.length > 65 ) {
    alert('Validação falhou, titulo do quiz deve ter no mínimo 20 e no máximo 65 caracters');
  }
  else if (!isValidHttpUrl ||URLquiz.length<2) {
    alert('Validação falhou, url deve ter formato válido');
  }
  else if (parseInt(quantPerguntas) < 3 || parseInt(quantPerguntas)!==parseInt(quantPerguntas)) {
    alert('Validação falhou, o quiz deve ter no mínimo 3 perguntas');
  }
  else if (parseInt(quantNiveis) < 2 || parseInt(quantNiveis)!==parseInt(quantNiveis)) {
    alert('Validação falhou, o quiz deve ter no mínimo 2 níveis');
  }
  
  else {
    console.log('passei');
    passarProximaFormulario();
  }

  //se passou, essas informacoes tem que ser armazenadas em forma de objeto para depoir criarem o novo quizz. E o botão deve chamar a próxima página
}








/***********************************************
 *         COnfigurações Navegação Entre Telas *
 ***********************************************/
 let posicaoFormulario=1; //variavel global para poder conferir a passagem dos formularios

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



function passarProximaFormulario(){
 if(posicaoFormulario<4){
   let tela_atual = document.querySelector(`.tela3${posicaoFormulario}`);
   let proxima_tela = document.querySelector(`.tela3${posicaoFormulario+1}`);
   tela_atual.classList.toggle("hide");
   proxima_tela.classList.toggle("hide");
  posicaoFormulario++;
 }

}