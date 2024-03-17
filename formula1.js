/*
function init() {
  const div = document.getElementById("ferrari");
  div.style.transform = "translate(" + 20 + "px, " + 0 + "px)";
} 
*/
// Initialize variables field 
let winnerCar = null;
let balance = 100;
let bets = []; 


function init() {
  document.getElementById("balance").textContent = balance;
}

function startRace() {
  // get the div from the html document
  const ferrari = document.getElementById("ferrari");
  const redbull = document.getElementById("redbull");
  const astonmartin = document.getElementById("aston-martin");
  const mercedes = document.getElementById("mercedes");
  const mclaren = document.getElementById("mc-laren");

  // Declareted a array of cars to deal with velocity of every vehicle
  const cars = [ferrari, redbull, astonmartin, mercedes, mclaren];

  const raceTrackWidth = document.querySelector(".pista").offsetWidth - 100 // the number  100 is the size of car, because of that, we use race track width  - 100
  let winnerDeclared = false; // variable to deal with the winner are declareted

  const moveCar = (car, speed, onFinish) => {
    let currentPosition = 0; // define the inicial position = 0 when starts the race
    const intervalId = setInterval(() => {
      currentPosition += speed; // move the car if the velocity
      if (currentPosition <= raceTrackWidth && !winnerDeclared) {
        car.style.transform = `translateX(${currentPosition}px)`;
      } else {
        clearInterval(intervalId); // LClear the interval when the race ends
        if (!winnerDeclared) {
          onFinish(car); // Call the function to show the winner
          winnerDeclared = true; // update the state of the winner var
        }
      }
    }, 50); // time interval to update the position
  };

  cars.forEach((car) => {
    const speed = Math.floor(Math.random() * 10) + 1; // random speed 1 up to 10
    moveCar(car, speed, determineWinner);
  });
}

function determineWinner(car) {
  let winningCar = null;

  // validate wwith the bet car == winner car
  bets.forEach((bet) => {
      if (bet.car === car.id) {
          winningCar = car.id;
          // pays the double of the bet
          balance += bet.amount * 2;
      }
  });

  if (winningCar) {
      document.getElementById("result-message").textContent = `The car ${winningCar} was win the race! You won R$ ${(balance - 100).toFixed(2)}!`;
  } else {
      document.getElementById("result-message").textContent = `The car ${car.id} was win the race, but you lose the bet.`;
  }

  // Updates the balance
  document.getElementById("balance").textContent = balance.toFixed(2);
}

function placeBet() {
  const betAmount = parseFloat(document.getElementById("bet-amount").value);
  const selectedCar = document.getElementById("bet-car").value;

  if (betAmount >= 5 && betAmount <= balance && selectedCar) {
      balance -= betAmount;
      document.getElementById("balance").textContent = balance.toFixed(2);

      // this code will clear the array from previous bets, and after that, will push new value
      bets = [];
      bets.push({ car: selectedCar, amount: betAmount });

      document.getElementById("result-message").textContent = "Bet maked successfully";
  } else {
      alert("Please, enter a bet amount and select a car.");
  }
}