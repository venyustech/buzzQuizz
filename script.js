/*****************************************
*         COnfigurações gerais:          *
******************************************/


/*****************************************
*         COnfigurações tela 1:          *
******************************************/
carregarQuizzes();


function carregarQuizzes() {
    console.log("tá indo aqui");
    const quizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    quizzes.then(exibicaoDeQuizz);
    quizzes.catch(verificacaoDeErro);
}

function verificacaoDeErro(erro){
alert("deu ruim");
console.log(erro);
}

function exibicaoDeQuizz(resposta){

    let listagem_quizz = document.querySelector(".lista_servidor");

    listagem_quizz.innerHTML = "";
//criacao do quizz
    for(let ii = 0;ii<resposta.data.length;ii++){
        listagem_quizz.innerHTML+=`<article class = "quizz" onclick = 'buscarQuizzSelecionado(this)'>
        <figure>
          <img src = '${resposta.data[ii].image}' = alt = "image da ap" />
          <span>${resposta.data[ii].title}</span>
          <span class = "identificacao">${resposta.data[ii].id}</span>
        </figure>
      </article>`
    }
//fim criacao quizz
}

function buscarQuizzSelecionado(id){ 

    let identificacao = id.querySelector(".identificacao").innerText;
    let quizz = axios(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identificacao}`);

    quizz.then(criarQuizzSelecionado);
    quizz.catch(verificacaoDeErro);
    
}

function criarQuizzSelecionado(resposta){
    console.log("selecionou um quizz");
    // se o quizz existir, e ele for selecionado, a tela1 será escondida para abrir a "tela2" com o quizz
    let tela_anterior = document.querySelector(".tela1");
    tela_anterior.classList.toggle("hide");
    console.log(tela_anterior);
    let tela_atual = document.querySelector(".embrulho-quizz-tela2");
    tela_atual.classList.toggle("hide");
    //criar o quiz com os itens da resposta
}




/*****************************************
*         COnfigurações tela 2:          *
******************************************/

document.getElementById("c1").style.backgroundColor="##434CA0";
document.getElementById("c2").style.backgroundColor="#a0438d";


/*****************************************
*         COnfigurações tela 3:          *
******************************************/


/*****************************************
*         COnfigurações Navegação Entre Telas      *
******************************************/

function voltarParaHome(clique){
    console.log("fui chamado para voltar pra tela1");
    let conferencia = clique.parentElement.classList;
    let localTela2 ="embrulho-quizz-tela2"
    
    if(conferencia==localTela2){
        let tela_anterior = document.querySelector(".embrulho-quizz-tela2");
        tela_anterior.classList.toggle("hide");
        console.log(tela_anterior);
        let tela_atual = document.querySelector(".tela1");
        tela_atual.classList.toggle("hide");
    }
    else{
        console.log("tem algum lugar errado");
    }
}