const tela = {
  pergunta: document.querySelector(".area-pergunta"),
  escolhas: document.querySelector(".grade-escolhas"),
  acoes: document.querySelector(".area-acoes"),
  final: document.querySelector(".area-final"),
  textoFinal: document.querySelector(".texto-final"),
  progresso: document.querySelector(".preenchimento-progresso"),
};

const roteiro = [
  {
    pergunta:
      "Você encontra uma ferramenta de IA capaz de responder perguntas, criar imagens e organizar ideias. Qual é sua primeira reação?",
    opcoes: [
      {
        texto: "Quero entender melhor antes de confiar.",
        resumo: "Você preferiu observar a tecnologia com calma antes de usar.",
      },
      {
        texto: "Quero testar agora e descobrir o que ela faz.",
        resumo: "Você escolheu experimentar a IA para aprender na prática.",
      },
    ],
  },
  {
    pergunta:
      "Na escola, surge um trabalho sobre IA em sala de aula. Como você decide começar a pesquisa?",
    opcoes: [
      {
        texto: "Uso a IA como apoio, mas comparo as respostas com outras fontes.",
        resumo: "Você usou IA como apoio, sem deixar a pesquisa depender só dela.",
      },
      {
        texto: "Faço primeiro minhas anotações e depois peço ajuda para revisar.",
        resumo: "Você colocou suas ideias primeiro e deixou a IA como revisão.",
      },
    ],
  },
  {
    pergunta:
      "Durante um debate, a turma fala sobre IA e profissões. Qual ponto você defende?",
    opcoes: [
      {
        texto: "A tecnologia pode abrir caminhos, desde que as pessoas aprendam a usá-la.",
        resumo: "Você viu a IA como oportunidade ligada ao aprendizado.",
      },
      {
        texto: "As mudanças precisam ser cuidadosas para não prejudicar trabalhadores.",
        resumo: "Você destacou a importância de proteger pessoas no futuro do trabalho.",
      },
    ],
  },
  {
    pergunta:
      "Você precisa criar uma imagem para representar sua opinião sobre IA. Que caminho escolhe?",
    opcoes: [
      {
        texto: "Faço uma arte manual no computador, escolhendo cada detalhe.",
        resumo: "Você preferiu construir a imagem com controle criativo próprio.",
      },
      {
        texto: "Uso um gerador de imagem e ajusto o resultado depois.",
        resumo: "Você combinou IA com ajustes pessoais no resultado final.",
      },
    ],
  },
  {
    pergunta:
      "Um colega entrega um texto feito por IA sem revisar. O que você faz no grupo?",
    opcoes: [
      {
        texto: "Aviso que o texto precisa ser conferido e reescrito com a visão do grupo.",
        resumo: "Você defendeu revisão, autoria e participação do grupo.",
      },
      {
        texto: "Sugiro aproveitar só as ideias principais e escrever uma nova versão.",
        resumo: "Você transformou a ajuda da IA em ponto de partida, não em resposta pronta.",
      },
    ],
  },
];

let etapa = 0;
const caminho = [];

function iniciarMissao() {
  etapa = 0;
  caminho.length = 0;
  renderizarEtapa();
}

function renderizarEtapa() {
  atualizarBarra();
  esconderResultado();
  limpar(tela.escolhas);
  limpar(tela.acoes);

  if (etapa === roteiro.length) {
    renderizarFinal();
    return;
  }

  const cena = roteiro[etapa];
  renderizarPergunta(`Etapa ${etapa + 1} de ${roteiro.length}`, cena.pergunta);
  renderizarOpcoes(cena.opcoes);
  renderizarAcoes();
}

function atualizarBarra() {
  const porcentagem = (etapa / roteiro.length) * 100;
  tela.progresso.style.width = `${porcentagem}%`;
}

function renderizarPergunta(rotulo, texto) {
  limpar(tela.pergunta);

  const passo = criarElemento("span", "passo-atual", rotulo);
  const enunciado = criarElemento("p", "enunciado", texto);

  tela.pergunta.appendChild(passo);
  tela.pergunta.appendChild(enunciado);
}

function renderizarOpcoes(opcoes) {
  for (const opcao of opcoes) {
    const botao = criarBotao(opcao.texto, "botao-escolha", () =>
      selecionarOpcao(opcao)
    );
    tela.escolhas.appendChild(botao);
  }
}

function renderizarAcoes() {
  if (etapa === 0) {
    return;
  }

  const botaoVoltar = criarBotao("Voltar", "botao-secundario", voltarEtapa);
  tela.acoes.appendChild(botaoVoltar);
}

function selecionarOpcao(opcao) {
  caminho.push(opcao.resumo);
  etapa++;
  renderizarEtapa();
}

function voltarEtapa() {
  if (etapa === 0) {
    return;
  }

  etapa--;
  caminho.pop();
  renderizarEtapa();
}

function renderizarFinal() {
  atualizarBarra();
  renderizarPergunta("Missão concluída", "Suas decisões formaram este caminho:");
  limpar(tela.acoes);
  tela.final.style.display = "block";
  tela.textoFinal.textContent =
    "Você terminou a missão pensando sobre tecnologia, responsabilidade e criatividade.";
  tela.final.appendChild(criarListaResumo());
  tela.final.appendChild(criarBotao("Reiniciar missão", "botao-principal", iniciarMissao));
}

function criarListaResumo() {
  const lista = criarElemento("ol", "resumo-escolhas");

  for (const item of caminho) {
    lista.appendChild(criarElemento("li", "", item));
  }

  return lista;
}

function esconderResultado() {
  tela.final.style.display = "none";
  tela.textoFinal.textContent = "";
  tela.final.querySelector(".resumo-escolhas")?.remove();
  tela.final.querySelector(".botao-principal")?.remove();
}

function criarBotao(texto, classe, aoClicar) {
  const botao = criarElemento("button", classe, texto);
  botao.addEventListener("click", aoClicar);
  return botao;
}

function criarElemento(tag, classe, texto = "") {
  const elemento = document.createElement(tag);

  if (classe) {
    elemento.classList.add(classe);
  }

  elemento.textContent = texto;
  return elemento;
}

function limpar(elemento) {
  elemento.innerHTML = "";
}

iniciarMissao();
