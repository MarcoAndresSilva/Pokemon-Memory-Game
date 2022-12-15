/// iniicalizacion de variables
let cardsRotates = 0;
let temporizador = false;
let pares = 0;
let initialTimer = 40;
let timer = 40;
let successes = 0;
let movements = 0;

let showMovements = document.getElementById('movimientos');
let showSuccesses = document.getElementById('aciertos');
let showTimer = document.getElementById('t-restante');

let winAudio = new Audio('./sound/win.wav');
let loseAudio = new Audio("./sound/lose.wav");
let clickAudio = new Audio('./sound/click.wav')
let rightAudio = new Audio("./sound/right-pares.wav");
let wrongAudio = new Audio("./sound/wrong.wav");

// generacion de numeros aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
numbers = numbers.sort(() => {
  return Math.random() - 0.3
});
console.log(numbers);


// Funciones

// funcion contador de tiempo
function timerCounter() {
  regressiveTimeId = setInterval(() => {
     showTimer.innerHTML = `Tiempo Restante ${timer} segundos`;
    timer--;
    if (timer < 0) {
      clearInterval(regressiveTimeId);
      blockCards(numbers);
      loseAudio.play();
    }
  },1000, timer);
}

// funcion bloquear tarjetas
function blockCards(numbers) {
  for (let i = 0; i <= 19; i++) {
    let cardBlocked = document.getElementById(i);
    cardBlocked.innerHTML = `<img src="./img/${numbers[i]}.png" alt="">`;
    cardBlocked.disabled = true;
  }
}


// funcion voltear las tarjetas
function rotate(id) {

  // iniciar temporizador
  if ((temporizador == false)) {
    timerCounter();
    temporizador = true;
  }
  // console.log(cardsRotates);

  if (cardsRotates == 0) {
    // mostrar primer numero
    let card1 = document.getElementById(id);
    firstChoice = numbers[id];
    // los 20 botones se asocian alos 20 elementos del arreglo desordenado.
    card1.innerHTML = `<img src="./img/${firstChoice}.png" alt="">`;
    clickAudio.play();
    //deshabilitar el primer boton
    card1.disabled = true;
    cardsRotates++
    firstId = id;

  } else if (cardsRotates == 1) {
    // mostrar segundo numeros
    let card2 = document.getElementById(id);
    secondChoice = numbers[id];
    card2.innerHTML = `<img src="./img/${secondChoice}.png" alt="">`;
    clickAudio.play();
    card2.disabled = true;
    cardsRotates++;
    secondId = id;
    // incrementar movimientos
    movements++;
    showMovements.innerHTML = `Movimientos : ${movements}`;

    if (firstChoice == secondChoice) {
      cardsRotates = 0;
      //aumentar aciertos
      pares++;
      successes++
      showSuccesses.innerHTML = `Aciertos : ${successes}`;
      rightAudio.play();
    } else {
      wrongAudio.play();
      // mostrar momentaneamente valores y colver a voltar
      setTimeout(() => {
        card1 = document.getElementById(firstId);
        card2 = document.getElementById(secondId);
        card1.innerHTML = '';
        card2.innerHTML = '';
        card1.disabled = false;
        card2.disabled = false;
        cardsRotates = 0;
      }, 500);// pasa 80ms y se vuelven a tapar
    }
  }

  if (pares == 10) {
    winAudio.play();
    clearInterval(regressiveTimeId);
    showSuccesses.innerHTML = `Aciertos : ${successes} Ganaste`;
    showTimer.innerHTML = `Fantastico solo te demoraste : ${
      initialTimer - timer - 1} segundos `;
    showMovements.innerHTML = `Movimientos : ${movements}`;
  }

}