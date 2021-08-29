let opciones = [
  {
    name: "rock",
    beats: ["scissors"],
  },
  {
    name: "paper",
    beats: ["rock"],
  },
  {
    name: "scissors",
    beats: ["paper"],
  },
];

let score = 0;

const renderOpciones = (opciones, containerId) => {
  const crearOpcion = (opcion) => {
    let div = document.createElement("div");
    div.classList.add("option", `icon-${opcion}`);
    div.setAttribute("name", opcion);
    div.innerHTML = `<img src="./images/icon-${opcion}.svg" alt="" />`;
    return div;
  };
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  
  opciones.forEach((opcion) => {
    console.log("renderizando : ", opcion);
    container.appendChild(crearOpcion(opcion.name));
  });
  
  if (opciones.length === 2) {
    container.classList.add("bg-none");
    document.querySelector('.option').classList.add('animation')
  }
  
};

const renderizadoInicial = () => {
  renderOpciones(opciones, "containerOptions");
  asignarPlayEvent(play, opciones);
renderScore(score, "scoreNumber");

}

const renderOutcome = (title, containerId) => {
  const container = document.getElementById(containerId);
  const outcomeContainer = document.createElement('div')
  outcomeContainer.className = 'outcome-container'

  const outcome = document.createElement('p');
  outcome.className = "outcome-title";
  outcome.innerText = title;

  const buttonPlayAgain = document.createElement('button')
  buttonPlayAgain.className = 'btn-play-again';
  buttonPlayAgain.innerText = 'PLAY AGAIN';
  buttonPlayAgain.addEventListener('click', () => renderizadoInicial())

  outcomeContainer.appendChild(outcome)
  outcomeContainer.appendChild(buttonPlayAgain)

  container.appendChild(outcomeContainer)

}


const play = (optionUsuario, opciones) => {
  // Encontrar el obj usuario
  const objOptionUsuario = opciones.find(option => option.name === optionUsuario);
  
  // Elegimos de forma aleatoria alguna de las opciones disponibles
  let opcionesDisponibles = opciones.filter(
    (option) => option.name !== optionUsuario
  );
  let objOpcionMaquina = opcionesDisponibles[Math.round(Math.random())];

  // Renderizamos las opciones 
  renderOpciones([objOptionUsuario, objOpcionMaquina], "containerOptions");

  // Mostrar el ganador
    if (objOptionUsuario.beats.includes(objOpcionMaquina.name)) {
      score++;
      renderScore(score, "scoreNumber");
      renderOutcome("YOU WIN", 'containerOptions');

    } else {

      renderOutcome("YOU LOSE", 'containerOptions');

    }
    


};


const renderScore = (score, scoreContainerId) => {
  const container = document.getElementById(scoreContainerId);
  container.innerHTML = score;
};

const asignarPlayEvent = (play, opciones) => {
  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () =>
      play(option.getAttribute("name"), opciones)
    );
  });
};

renderizadoInicial();

//  2. SELECCIONAR OPCION DE JUEGO

//  3. EL BOT SELECCIONA SU OPCION DE JUEGO
//  4. MOSTRAR LA OPCION SELECCIONADA DEL BOT
//  5. CALCULAR EL GANADOR
//  6. MOSTRAR MENSAJE DEL RESULTADO
//  7.
