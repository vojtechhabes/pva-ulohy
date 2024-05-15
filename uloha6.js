const fs = require("fs");
const path = require("path");

const parseRacks = (input) => {
  const racks = [];
  const lines = input[0].trim().split("\n");

  let currentRack = null;

  for (const line of lines) {
    if (line.match(/^#\d+$/)) {
      if (currentRack !== null) {
        currentRack += 1;
      } else {
        currentRack = 0;
      }
      racks[currentRack] = [];
    } else {
      racks[currentRack].push(line);
    }
  }

  return racks;
};

const parseLists = (input) => {
  input.shift();
  const listsArr = input.map((list) => list.trim().split("\n"));
  return listsArr;
};

const main = async () => {
  for (let testNum = 0; testNum <= 2; testNum++) {
    console.log(`Test ${testNum}:`);

    const input = await fs.readFileSync(
      path.join(__dirname, `/test/uloha6/000${testNum}_in.txt`),
      "utf8"
    );

    const inputArr = input.split("\n\n");
    if (inputArr.length < 2) {
      console.log("Neplatny vstup\n");
      continue;
    }

    const racks = parseRacks(inputArr);
    const lists = parseLists(inputArr);
  }
};

main();
