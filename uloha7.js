const readlineSync = require("readline-sync");

class User {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  rollDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  rollDice() {
    const die1 = this.rollDie();
    const die2 = this.rollDie();
    return [die1, die2];
  }

  updateScore(diceValues) {
    const [die1, die2] = diceValues;
    if (die1 === 1 && die2 === 1) {
      this.score = 0;
    } else if (die1 === 1 || die2 === 1) {
      // keep the current score
    } else {
      this.score += die1 + die2;
    }
  }
}

class Game {
  constructor(targetScore = 100) {
    this.players = [];
    this.targetScore = targetScore;
    this.currentPlayerIndex = 0;
  }

  addUser(user) {
    this.players.push(user);
  }

  currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  nextPlayer() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  checkWinCondition() {
    return this.players.some((player) => player.score >= this.targetScore);
  }
}

const game = new Game();

while (true) {
  const name = readlineSync.question(
    "Jméno hráče (prázdný řetězec pro konec): "
  );
  if (name === "") {
    break;
  }
  game.addUser(new User(name));
}

if (game.players.length === 0) {
  console.log("Hra nemá žádné hráče.");
  process.exit();
} else if (game.players.length < 2 || game.players.length > 5) {
  console.log("Hra musí mít 2-5 hráčů.");
  process.exit();
}

console.log();

while (true) {
  const currentPlayer = game.currentPlayer();
  console.log(`Na tahu: ${currentPlayer.name} (skóre: ${currentPlayer.score})`);

  readlineSync.question("Enter pro hod...");
  const diceValues = currentPlayer.rollDice();
  console.log(`Hod: ${diceValues[0]}, ${diceValues[1]}`);

  currentPlayer.updateScore(diceValues);
  console.log(`Nové skóre: ${currentPlayer.score}`);
  console.log();

  if (game.checkWinCondition()) {
    break;
  }

  game.nextPlayer();
}

const winner = game.currentPlayer();
console.log(`Vítězem je hráč ${winner.name} s celkovým skóre ${winner.score}.`);
