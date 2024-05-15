const fs = require("fs");
const path = require("path");

const getDistances = (planes) => {
  const distances = [];

  for (let i = 0; i < planes.length; i++) {
    let distance = 0;
    for (let j = i + 1; j < planes.length; j++) {
      const x = Math.abs(planes[i].coords[0] - planes[j].coords[0]);
      const y = Math.abs(planes[i].coords[1] - planes[j].coords[1]);
      distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      distances.push({ distance, id1: planes[i].id, id2: planes[j].id });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);

  return distances.sort((a, b) => a.distance - b.distance);
};

const printSmallestDistances = (distances) => {
  const smallestDistance = distances[0].distance;
  const smallestDistances = [];

  for (let i = 0; i < distances.length; i++) {
    if (distances[i].distance === smallestDistance) {
      smallestDistances.push(distances[i]);
    } else {
      break;
    }
  }

  console.log("Vzdalenost nejblizsich letadel: " + smallestDistance);
  console.log("Nalezenych dvojic: " + smallestDistances.length);

  for (let i = 0; i < smallestDistances.length; i++) {
    console.log(`${smallestDistances[i].id1} - ${smallestDistances[i].id2}`);
  }

  console.log();
};

const main = async () => {
  for (let testNum = 0; testNum <= 6; testNum++) {
    console.log(`Test ${testNum}:`);

    const input = await fs.readFileSync(
      path.join(__dirname, `/test/uloha5/000${testNum}_in.txt`),
      "utf8"
    );
    const output = await fs.readFileSync(
      path.join(__dirname, `/test/uloha5/000${testNum}_out.txt`),
      "utf8"
    );

    const inputLines = input.trim().split("\n");
    const planes = [];

    let invalidInput = false;

    for (const plane of inputLines) {
      const split = plane.split(": ");
      const coords = split[0].split(",").map((coord) => parseFloat(coord));
      if (coords.some((coord) => isNaN(coord))) {
        invalidInput = true;
        break;
      }
      const id = split[1];
      if (!id) {
        invalidInput = true;
        break;
      }
      planes.push({ coords, id });
    }

    if (invalidInput) {
      console.log("Neplatny vstup\n");
      continue;
    }

    if (planes.length < 2) {
      console.log("Neplatny vstup\n");
      continue;
    }

    const distances = getDistances(planes);
    console.log(planes);
    printSmallestDistances(distances);
  }
};

main();
