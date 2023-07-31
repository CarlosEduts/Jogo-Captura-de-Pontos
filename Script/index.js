const jogador = document.querySelector('.jogador');
const comida = document.querySelector('.comida');
const score = document.querySelector('.score');
const gameOver = document.querySelector('.endGameContainer');

const cenarioWidth = 330;

const atributosJogador = {
  leftMoviment: 30,
  topMoviment: 30,
  positionMoviment: '',
  speedMoviment: 1,
};

const atributosComida = {
  leftPosition: '',
  topPosition: '',
  quantComida: 0,
};

addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      atributosJogador.positionMoviment = 'Right';
      break;

    case 'ArrowLeft':
      atributosJogador.positionMoviment = 'Left';
      break;

    case 'ArrowDown':
      atributosJogador.positionMoviment = 'Down';
      break;

    case 'ArrowUp':
      atributosJogador.positionMoviment = 'Up';
  }
});

const gerarAleatorio = (max) => {
  return Math.ceil(Math.random() * max);
};

const randomColor = () => {
  let r = gerarAleatorio(255),
    g = gerarAleatorio(255),
    b = gerarAleatorio(255);

  return `rgb(${r}, ${g}, ${b})`;
};

const movimentacaoJogador = (left, top) => {
  jogador.style.left = left + 'px';
  jogador.style.top = top + 'px';
};

const movimentCostJogador = () => {
  switch (atributosJogador.positionMoviment) {
    case 'Right':
      atributosJogador.leftMoviment =
        atributosJogador.leftMoviment + atributosJogador.speedMoviment;
      break;
    case 'Left':
      atributosJogador.leftMoviment =
        atributosJogador.leftMoviment - atributosJogador.speedMoviment;
      break;
    case 'Down':
      atributosJogador.topMoviment =
        atributosJogador.topMoviment + atributosJogador.speedMoviment;
      break;
    case 'Up':
      atributosJogador.topMoviment =
        atributosJogador.topMoviment - atributosJogador.speedMoviment;
  }
  movimentacaoJogador(
    atributosJogador.leftMoviment,
    atributosJogador.topMoviment
  );
};

const movimentacaoComida = () => {
  atributosComida.leftPosition = gerarAleatorio(cenarioWidth);
  atributosComida.topPosition = gerarAleatorio(cenarioWidth);
  comida.style.left = atributosComida.leftPosition + 'px';
  comida.style.top = atributosComida.topPosition + 'px';
  comida.style.backgroundColor = randomColor();
};

const testeVelocidade = () => {
  switch (atributosComida.quantComida) {
    case 5:
      atributosJogador.speedMoviment = 2;
      break;
    case 10:
      atributosJogador.speedMoviment = 3;
      break;
    case 20:
      atributosJogador.speedMoviment = 4;
      break;
    case 40:
      atributosJogador.speedMoviment = 6;
      break;
    case 50:
      atributosJogador.speedMoviment = 7;
      break;
    case 70:
      atributosJogador.speedMoviment = 8;
      break;
  }
};

const testeColisao = () => {
  if (
    atributosJogador.leftMoviment >= cenarioWidth ||
    atributosJogador.leftMoviment < 0 ||
    atributosJogador.topMoviment >= cenarioWidth ||
    atributosJogador.topMoviment < 0
  ) {
    gameOver.style.display = 'flex';
    atributosJogador.positionMoviment = '';
  }
};

const testeQuantComida = () => {
  if (
    atributosJogador.leftMoviment + 5 >= atributosComida.leftPosition &&
    atributosJogador.leftMoviment <= 5 + atributosComida.leftPosition &&
    atributosJogador.topMoviment + 5 >= atributosComida.topPosition &&
    atributosJogador.topMoviment <= 5 + atributosComida.topPosition
  ) {
    movimentacaoComida();
    atributosComida.quantComida = atributosComida.quantComida + 1;
    score.innerText = String(atributosComida.quantComida).padStart(2, '0');
  }
};

const jogarNovamente = () => {
  atributosJogador.leftMoviment = 30;
  atributosJogador.topMoviment = 30;
  atributosJogador.ositionMoviment = '';
  atributosJogador.speedMoviment = 1;
  atributosComida.quantComida = 0;
  gameOver.style.display = 'none';
  score.innerText = String(atributosComida.quantComida).padStart(2, '0');
};

setInterval(() => {
  movimentCostJogador();
  testeColisao();
  testeQuantComida();
  testeVelocidade();
}, 30);

movimentacaoComida();
