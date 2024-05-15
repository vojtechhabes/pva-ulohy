const fs = require("fs");
const path = require("path");

const getSums = (numbersArr) => {
  const sums = [];

  for (let i = 0; i < numbersArr.length; i++) {
    let sum = numbersArr[i];
    for (let j = i + 1; j < numbersArr.length; j++) {
      sum += numbersArr[j];
      sums.push(sum);
    }
  }

  return sums;
};

const sameSums = (sums) => {
  let count = 0;

  for (let i = 0; i < sums.length; i++) {
    for (let j = i + 1; j < sums.length; j++) {
      if (sums[i] === sums[j]) {
        count++;
        continue;
      }
    }
  }

  return count;
};

const main = async () => {
  for (let testNum = 0; testNum <= 5; testNum++) {
    console.log(`Test ${testNum}:`);

    let input = await fs.readFileSync(
      path.join(__dirname, `/test/uloha4/000${testNum}_in.txt`),
      "utf8"
    );
    const output = await fs.readFileSync(
      path.join(__dirname, `/test/uloha4/000${testNum}_out.txt`),
      "utf8"
    );

    input = input.trim().replaceAll("\n", " ");
    const inputRegex = /^-?\d+( -?\d+)*$/;

    if (!inputRegex.test(input)) {
      console.log("Invalid input\n");
      continue;
    }

    const numbersArr = input.split(" ").map((num) => parseInt(num));

    if (numbersArr.length > 0 || numbersArr.length <= 2000) {
      const sums = getSums(numbersArr);
      const sumCount = sameSums(sums);
      console.log(sumCount);

      if (
        sumCount ===
        parseInt(
          output
            .trim()
            .replaceAll("\n", "")
            .replaceAll("Posloupnost:Pocet dvojic: ", "")
        )
      ) {
        console.log("Test passed\n");
      } else {
        console.log("Test failed\n");
      }
    } else {
      console.log("Invalid input\n");
      continue;
    }
  }
};

main();
