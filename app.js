
// Constantes
const max = 10;
const randomNumber = Math.floor(Math.random() * max) + 1; // Numero aleatorio
const button = document.getElementById("submit-button"); // Para registrar eventos del tipo click
const answer = document.getElementById("answer-wrapper"); // Para modificar este div del DOM
const entry = document.getElementById("number"); // Para registrar eventos de tipo key

// Variables
let attemptsField = document.getElementById("attempts"); // Se obtiene el campo de los intentos
let availableAttempts = 3; // Intentos disponibles

// Seteo en DOM de la variable
attemptsField.innerHTML = availableAttempts; // Se inicializa los intentos en 3


// Funcion para ejecutar el juego
const guessNumber = () => {
    // Se muestra el cuadro de pistas
    // Se obtiene el numero introducido y lo convierte a entero
    let selectedNumber = parseInt(document.getElementById("number").value);

    // Si el numero introducido no esta vacio y es positivo
    if( selectedNumber != "" && selectedNumber >= 0 && selectedNumber <= max) {
        answer.style.display = "block";
        answer.classList.add("hints");
        // Si el numero es menor al numero aleatorio
        if(selectedNumber < randomNumber) {
            availableAttempts -= 1; // Se le resta uno a los intentos disponibles
            answer.innerHTML = `${selectedNumber} es muy chico, el Número aleatorio es más grande`;
            attemptsField.innerHTML = availableAttempts; // Se refresca el campo de los intentos
        }
        // Si es mayor al numero aleatorio
        else if(selectedNumber > randomNumber) {
            availableAttempts -= 1;
            answer.innerHTML = `${selectedNumber} es muy grande, el Número aleatorio es más chico`;
            attemptsField.innerHTML = availableAttempts;
        }
        // Caso en que gane
        else if(selectedNumber === randomNumber) {
            answer.classList.add("won") // Se le agrega la clase .won a el div, y eso permite hacer color condicional
            answer.innerHTML = `¡El número que elegiste es correcto!, es el Número: ${randomNumber}...`;
            button.disabled = true; // No se deja presionar mas el boton, y despues de 3segs se recarga página
            setInterval(()=>{window.location.reload()}, 4000)
        }
        // Mostrar en rojo cuando los intentos sean menores a 1
        if(availableAttempts < 2) {
            let warningLabel = document.getElementById("attempts")
            warningLabel.classList.remove("normal");
            warningLabel.classList.add("warning");
        }

        // Caso en que se agoten los intentos
        if(availableAttempts === 0) {
            answer.classList.add("lose")
            answer.innerHTML = `Perdiste, el Número era ${randomNumber}`;
            button.disabled = true; // No se deja presionar mas el boton, y despues de 3segs se recarga página
            setInterval(()=>{window.location.reload()}, 2500)
        }
    }
    else {
        return window.alert(`¡Error! El número debe ser positivo, mayor a 1 y menor o igual a ${max}`);
    }
}

// Eventos: click al botón 
button.addEventListener("click", (event)=> {
    event.preventDefault();
    guessNumber();
});

// Eventos: tecla enter en input
entry.addEventListener("keydown", (e)=> {
    if(e.keyCode === 13) {
        guessNumber();
    }
})

