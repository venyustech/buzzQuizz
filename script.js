/*****************************************
*         COnfigurações gerais:          *
******************************************/


/*****************************************
*         COnfigurações tela 1:          *
******************************************/
// carregarQuizzes();


function carregarQuizzes() {
    console.log("tá indo aqui");
    const quizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    // quizzes.then(exibicaoDeQuizz);
    quizzes.then(buscarQuizzSelecionado);
    quizzes.catch(verificacaoDeErro);
}

function verificacaoDeErro(erro){
alert("deu ruim");
console.log(erro);
}

function exibicaoDeQuizz(resposta){

    let listagem_quizz = document.querySelector(".lista-quiz-disponivel");

    listagem_quizz.innerHTML = "";
//criacao do quizz
    for(let ii = 0;i<objeto_teste.length;ii++){
        listagem_quizz.innerHTML+=`<article class = "quizz" onclick = 'bucarQuizzSelecionado(this)'>
        <figure>
          <img src = '${resposta.data[ii].image}' = alt = "image da ap" />
          <span>${resposta.data[ii].title}</span>
        </figure>
      </article>`
    }
//fim criacao quizz
}

function brucarQuizzSelecionado(quizz){
    let identificacao = quizz.data.id;
    let quizz = axios(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identificacao}`);

    quizz.then(criarQuizzSelecionado);
    quizz.catch(verificacaoDeErro);
    
}

function criarQuizzSelecionado(resposta){
    // se o quizz existir, e ele for selecionado, a tela1 será escondida para abrir a "tela2" com o quizz
    let tela_anterior = document.querySelector(".tela1");
    tela_anterior.style.display = 'none';
    // mudar dispay tela 2
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


