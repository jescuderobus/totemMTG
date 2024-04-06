document.addEventListener("DOMContentLoaded", () => {
    const dices = document.querySelectorAll(".dice");
    
    // Números iniciales para cada dado
    const initialDiceNumbers = [101, 102, 103, 104, 105, 106, 107, 108, 109];
  
    // Establece los números iniciales para cada dado
    dices.forEach((dice, index) => {
      // Asegura que hay un dado en blanco
      if (!dice.querySelector(".plain_dice")) {
        const plainDice = document.createElement("img");
        plainDice.src = "./images/plain_dice.png";
        plainDice.classList.add("plain_dice");
        dice.appendChild(plainDice);
      }
      
      // Establece el número inicial
      const number = document.createElement("img");
      const diceNumber = initialDiceNumbers[index % initialDiceNumbers.length]; // Usa el número inicial
      number.src = `./images/story_dice${diceNumber}.png`;
      number.classList.add("number");
      dice.appendChild(number);
    });
  
    // Añade funcionalidad al botón para cambiar los números
    const rollDiceButton = document.getElementById("rollDice");
    rollDiceButton.addEventListener("click", () => {
      dices.forEach(dice => {
        // Elimina el número actual
        const currentNumber = dice.querySelector(".number");
        if (currentNumber) {
          dice.removeChild(currentNumber);
        }
  
        // Agrega un nuevo número aleatorio
        const number = document.createElement("img");
        const randomNumber = Math.floor(Math.random() * 50) + 1; // Genera número entre 1 y 6
        number.src = `./images/story_dice${randomNumber}.png`;
        number.classList.add("number");
        dice.appendChild(number);
      });
    });
  });
  