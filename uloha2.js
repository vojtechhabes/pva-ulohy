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
    console.log("Neplatný vstup: Musíte zadat právě tři body.");
    return false;
  } else {
    for (let i = 0; i < 3; i++) {
      if (points[i].length !== 2) {
        console.log(
          "Neplatný vstup: Každý bod musí mít dvě souřadnice (x, y)."
        );
        return false;
      }
    }
    // Zkontrolujte, zda body splývají (mají stejné souřadnice)
    const [point1, point2, point3] = points;
    if (
      (point1[0] === point2[0] && point1[1] === point2[1]) ||
      (point1[0] === point3[0] && point1[1] === point3[1]) ||
      (point2[0] === point3[0] && point2[1] === point3[1])
    ) {
      console.log(
        "Neplatný vstup: Zadané body splývají (mají stejné souřadnice)."
      );
      return false;
    }
    return true;
  }
};

const distance = (point1, point2) => {
  return Math.sqrt(
    Math.abs(point1[0] - point2[0]) ** 2 + Math.abs(point1[1] - point2[1]) ** 2
  );
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

const findMiddlePoint = (points) => {
  return [
    (points[0][0] + points[1][0] + points[2][0]) / 3,
    (points[0][1] + points[1][1] + points[2][1]) / 3,
  ];
};

const main = async () => {
  for (let testNum = 0; testNum <= 6; testNum++) {
    console.log(`Test ${testNum}:`);
    const input = await fs.readFileSync(
      path.join(__dirname, `/test/uloha2/000${testNum}_in.txt`),
      "utf8"
    );
    const points = parseText(input);

    if (!validate(points)) {
      console.log();
      continue;
    }

    const output = await fs.readFileSync(
      path.join(__dirname, `/test/uloha2/000${testNum}_out.txt`),
      "utf8"
    );

    if (isOnLine(points)) {
      if (output.includes("Body lezi")) {
        console.log("na přímce: ano (passed)");
      } else {
        console.log("na přímce: ano (failed)");
      }

      const middlePoint = findMiddlePoint(points);
      const distance1 = distance(points[0], points[1]);
      const distance2 = distance(points[0], points[2]);
      const distance3 = distance(points[1], points[2]);
      const middleDistance = distance(middlePoint, points[0]);

      if (Math.abs(middleDistance - distance1) < 0.0001) {
        console.log("prostřední: A (passed)");
      } else if (Math.abs(middleDistance - distance2) < 0.0001) {
        console.log("prostřední: B (passed)");
      } else if (Math.abs(middleDistance - distance3) < 0.0001) {
        console.log("prostřední: C (passed)");
      } else {
        console.log("prostřední: Nebyl možno určit (failed)");
      }
    } else {
      if (output.includes("na přímce")) {
        console.log("na přímce: ne (failed)");
      } else {
        console.log("na přímce: ne (passed)");
      }
    }

    console.log();
  }
};

main();
