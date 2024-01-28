const fs = require("fs");

const sideLength = 184;
const point1 = [21, 37, 0];
const point2 = [96, 55, 184];

const isPointValid = (point) => {
  let numAxisOnSides = 0;
  for (let i = 0; i < 3; i++) {
    if (point[i] < 0 || point[i] > sideLength) {
      return false;
    } else if (point[i] === 0 || point[i] === sideLength) {
      numAxisOnSides++;
    }
  }

  if (numAxisOnSides !== 1) {
    return false;
  }

  return true;
};

const isOnOppositeSide = (point1, point2) => {
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

const calculatePipes = (point1, point2) => {
  if (isOnOppositeSide(point1, point2)) {
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
          calculatePipesTest(imaginaryPoint1, point2) + distanceSide1
        );
        distances.push(
          calculatePipesTest(imaginaryPoint2, point2) + distanceSide2
        );
      }
    }

    return Math.min(...distances);
  } else {
    const xDistance = Math.abs(point1[0] - point2[0]);
    const yDistance = Math.abs(point1[1] - point2[1]);
    const zDistance = Math.abs(point1[2] - point2[2]);

    const finalDistance = xDistance + yDistance + zDistance;

    return finalDistance;
  }
};

const calculatePipesTest = (point1, point2) => {
  const xDistance = Math.abs(point1[0] - point2[0]);
  const yDistance = Math.abs(point1[1] - point2[1]);
  const zDistance = Math.abs(point1[2] - point2[2]);

  const finalDistance = xDistance + yDistance + zDistance;

  return finalDistance;
};

const calculateHoses = (point1, point2) => {
  if (isOnOppositeSide(point1, point2)) {
  } else {
    if (isOnLine(point1, point2)) {
      return calculatePipes(point1, point2);
    } else {
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
    }
  }
};

const main = () => {
  if (isPointValid(point1) && isPointValid(point2)) {
    const pipes = calculatePipes(point1, point2);
    const hoses = calculateHoses(point1, point2);

    console.log(`Potřebujeme ${pipes} metrů potrubí.`);
    console.log(`Potřebujeme ${hoses} metrů hadic.`);
  } else {
    console.log("Špatný vstup.");
  }
};

main();
