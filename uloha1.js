const fs = require("fs");
const path = require("path");

const isPointValid = (point, sideLength) => {
  let numAxisOnSides = 0;
  for (let i = 0; i < 3; i++) {
    if (point[i] < 0 || point[i] > sideLength) {
      return false;
    } else if (point[i] === 0 || point[i] === sideLength) {
      numAxisOnSides++;
    } else if (point[i] < 20 || point[i] > sideLength - 20) {
      return false;
    }
  }

  if (numAxisOnSides !== 1) {
    return false;
  }

  return true;
};

const isOnOppositeSide = (point1, point2, sideLength) => {
  if (Math.abs(point1[0] - point2[0]) === sideLength) {
    return true;
  }

  if (Math.abs(point1[1] - point2[1]) === sideLength) {
    return true;
  }

  if (Math.abs(point1[2] - point2[2]) === sideLength) {
    return true;
  }

  return false;
};

const isOnLine = (point1, point2) => {
  if (point1[0] === point2[0]) {
    return true;
  }

  if (point1[1] === point2[1]) {
    return true;
  }

  if (point1[2] === point2[2]) {
    return true;
  }

  return false;
};

const calculatePipes = (point1, point2, sideLength) => {
  if (isOnOppositeSide(point1, point2, sideLength)) {
    let index = 0;

    for (let i = 0; i < 3; i++) {
      if (point1[i] === 0 || point1[i] === sideLength) {
        index = i;
        break;
      }
    }

    let distances = [];
    for (let i = 0; i < 3; i++) {
      if (i !== index) {
        const distanceSide1 = Math.abs(point1[i]);
        const distanceSide2 = Math.abs(point1[i] - sideLength);

        let imaginaryPoint1 = [...point1];
        imaginaryPoint1[i] = 0;

        let imaginaryPoint2 = [...point1];
        imaginaryPoint2[i] = sideLength;

        distances.push(
          calculatePipesNotOnOppositeSide(imaginaryPoint1, point2) +
            distanceSide1
        );
        distances.push(
          calculatePipesNotOnOppositeSide(imaginaryPoint2, point2) +
            distanceSide2
        );
      }
    }

    return Math.min(...distances);
  } else {
    return calculatePipesNotOnOppositeSide(point1, point2);
  }
};

const calculatePipesNotOnOppositeSide = (point1, point2) => {
  const xDistance = Math.abs(point1[0] - point2[0]);
  const yDistance = Math.abs(point1[1] - point2[1]);
  const zDistance = Math.abs(point1[2] - point2[2]);

  const finalDistance = xDistance + yDistance + zDistance;

  return finalDistance;
};

const calculateHosesNotOnOppositeSide = (point1, point2, sideLength) => {
  const xDistance = Math.abs(point1[0] - point2[0]);
  const yDistance = Math.abs(point1[1] - point2[1]);
  const zDistance = Math.abs(point1[2] - point2[2]);

  let index = 0;

  for (let i = 0; i < 3; i++) {
    if (
      (point1[i] !== 0 || point1[i] !== sideLength) &&
      (point2[i] !== 0 || point2[i] !== sideLength)
    ) {
      index = i;
      break;
    }
  }

  if (index === 0) {
    return Math.sqrt((yDistance + zDistance) ** 2 + xDistance ** 2);
  } else if (index === 1) {
    return Math.sqrt((xDistance + zDistance) ** 2 + yDistance ** 2);
  } else {
    return Math.sqrt((xDistance + yDistance) ** 2 + zDistance ** 2);
  }
};

const calculateHoses = (point1, point2, sideLength) => {
  if (isOnOppositeSide(point1, point2, sideLength)) {
  } else {
    if (isOnLine(point1, point2)) {
      return calculatePipes(point1, point2, sideLength);
    } else {
      return calculateHosesNotOnOppositeSide(point1, point2, sideLength);
    }
  }
};

const parseText = (content) => {
  try {
    const lines = content.trim().split("\n");
    const sideLength = parseInt(lines[0], 10);
    const point1 = lines[1].split(" ").map(Number);
    const point2 = lines[2].split(" ").map(Number);

    return {
      sideLength,
      point1,
      point2,
    };
  } catch (error) {
    return false;
  }
};

const main = async () => {
  for (let testNum = 0; testNum <= 6; testNum++) {
    const input = await fs.readFileSync(
      path.join(__dirname, `/test/uloha1/000${testNum}_in.txt`),
      "utf8"
    );
    const { sideLength, point1, point2 } = parseText(input);

    if (!sideLength || !point1 || !point2) {
      console.log(`Test ${testNum}:`);
      console.log("Neplatný vstup");
      console.log();
      continue;
    }

    console.log(`Test ${testNum}:`);

    if (isPointValid(point1, sideLength) && isPointValid(point2, sideLength)) {
      const pipes = calculatePipes(point1, point2, sideLength);
      const hoses = calculateHoses(point1, point2, sideLength);

      const output = await fs.readFileSync(
        path.join(__dirname, `/test/uloha1/000${testNum}_out.txt`),
        "utf8"
      );
      const lines = output.trim().split("\n");

      const pipesOutput = parseInt(lines[3].replace("Delka potrubi: ", ""), 10);
      const hosesOutput = parseInt(lines[4].replace("Delka hadice: ", ""), 10);

      if (Math.round(pipes) === Math.round(pipesOutput)) {
        console.log(`potrubí: ${pipes} (passed)`);
      } else {
        console.log(`potrubí: ${pipes} (failed, expected ${pipesOutput})`);
      }

      if (Math.round(hoses) === Math.round(hosesOutput)) {
        console.log(`hadice: ${hoses} (passed)`);
      } else {
        console.log(`hadice: ${hoses} (failed, expected ${hosesOutput})`);
      }
    } else {
      console.log("Neplatný vstup");
    }

    console.log();
  }
};

main();
