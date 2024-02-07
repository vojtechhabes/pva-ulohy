const fs = require("fs");
const path = require("path");

const parseText = (text) => {
  const lines = text.split("\n");
  let points = [];

  lines.forEach((line) => {
    if (line === "") {
      return;
    }
    const point = line.split(" ").map(Number);
    points.push(point);
  });

  return points;
};

const validate = (points) => {
  if (points.length !== 3) {
    console.log("Neplatný vstup.");
    return false;
  } else {
    for (let i = 0; i < 3; i++) {
      if (points[i].length !== 2) {
        console.log("Neplatný vstup.");
        return false;
      }
    }
    return true;
  }
};

const distance = (point1, point2) => {
  return Math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2);
};

const isOnLine = (points) => {
  const distance1 = distance(points[0], points[1]);
  const distance2 = distance(points[1], points[2]);
  const distance3 = distance(points[0], points[2]);

  return (
    distance1 + distance2 === distance3 ||
    distance1 + distance3 === distance2 ||
    distance2 + distance3 === distance1
  );
};

const main = async () => {
  const testNum = 1;

  const input = await fs.readFileSync(
    path.join(__dirname, `/test/uloha2/000${testNum}_in.txt`),
    "utf8"
  );
  const points = parseText(input);

  if (!validate(points)) {
    return;
  }

  if (isOnLine(points)) {
    console.log("Body leží na jedné přímce.");

    distance1 = distance(points[0], points[1]);
    distance2 = distance(points[0], points[2]);
    distance3 = distance(points[1], points[2]);

    if (distance1 > distance2 && distance1 > distance3) {
      console.log("Prostřední bod je bod C.");
    } else if (distance2 > distance1 && distance2 > distance3) {
      console.log("Prostřední bod je bod B.");
    } else {
      console.log("Prostřední bod je bod A.");
    }
  } else {
    console.log("Body neleží na jedné přímce.");
  }
};

main();
