/*****************************************
 *         COnfigurações gerais:          *
 ******************************************/

let quizzesUsuarioArmazenados = 0; //variável global onde será alterado o valor se adicionado quizzes pelo usuário

/*****************************************
 *         COnfigurações tela 1:          *
 ******************************************/
carregarQuizzes();

function carregarQuizzes() {
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
  console.log(erro);
}

function exibicaoDeQuizz(resposta) {
  let nomes = [];
  let capas = [];
  let imprimir = 0;
  let listagem_quizz = document.querySelector(".lista_servidor");

  listagem_quizz.innerHTML = "";

  for (let ii = 0; ii < resposta.data.length; ii++) {
    if (nomes.includes(resposta.data[ii].title)) {
      console.log("já tem um quizz com esse nome");
      //verificar mais uma variável para ver se é mesmo o mesmo quizz
      imprimir = false;
    } else {
      nomes.push(resposta.data[ii].title);
      capas.push(resposta.data[ii].image);
      console.log("ok, é um quizz novo");
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
  console.log(nomes);
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
  console.log("selecionou um quizz");
  // se o quizz existir, e ele for selecionado, a tela1 será escondida para abrir a "tela2" com o quizz
  let tela_anterior = document.querySelector(".tela1");
  tela_anterior.classList.toggle("hide");
  console.log(tela_anterior);
  let tela_atual = document.querySelector(".embrulho-quizz-tela2");
  tela_atual.classList.toggle("hide");
  //criar o quiz com os itens da resposta
}

function tela1tela3(resposta) {
  let tela_anterior = document.querySelector(".tela1");
  tela_anterior.classList.toggle("hide");
  console.log(tela_anterior);
  let tela_atual = document.querySelector(".tela3-1");
  tela_atual.classList.toggle("hide");
  console.log("ok");
}

/*****************************************
 *         COnfigurações tela 2:          *
 ******************************************/

document.getElementById("c1").style.backgroundColor = "#434CA0";
document.getElementById("c2").style.backgroundColor = "#a0438d";
function abreQuizz() {
  document.getElementById("titulo1").style.backgroundImage =
    "url('assets/tela2/Rectangle 42.png')";
  document.getElementById("pergunta1").style.backgroundColor = "#434CA0";
  document.getElementById("pergunta2").style.backgroundColor = "red";

  const tituloDaPaginaLoading = document.querySelector(".quizz-titulo");
  tituloDaPaginaLoading.innerHTML += `<p>O quão PotterHead é você?</p>`;

  let tituloDaPergunta = document.querySelector("#pergunta1");
  tituloDaPergunta.innerHTML += `<p>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</p>`;

  tituloDaPergunta = document.querySelector("#pergunta2");
  tituloDaPergunta.innerHTML += `<p>Qual dos objetos abaixo NÃO é uma horcrux?</p>`;
}
abreQuizz();

/*****************************************
 *         COnfigurações tela 3:          *
 ******************************************/

//cria um novo quiz personalizado e envia informaçoes dele para o servidor
//  function criarNovoQuizz(){
const informacoesBasicas = document.querySelectorAll(".informacoesBasicas");
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

  let tituloQuiz = informacoesBasicas.firstChild.value;
  let URLquiz = informacoesBasicas.secondChild.value;
  let quantPerguntas = informacoesBasicas.thirdChild.value;
  let quantNiveis = informacoesBasicas.fourthChild.value


  if (tituloQuiz.length < 20 && tituloQuiz.length > 65) {
    alert('Validação falhou, titulo do quiz deve ter no mínimo 20 e no máximo 65 caracters');
  }
  else if (!isValidHttpUrl) {
    alert('Validação falhou, url deve ter formato válido');
  }
  else if (quantPerguntas < 3) {
    alert('Validação falhou, o quiz deve ter no mínimo 3 perguntas');
  }
  else if (quantNiveis < 2) {
    alert('Validação falhou, o quiz deve ter no mínimo 2 níveis');
  }
  else {
    console.log('passei');
  }

  let isValidHttpUrl = (URLquiz) => {
    let url;

    try {
      url = new URL(URLquiz);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}








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
