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

const optimizeLists = (racks, lists) => {
  const optimizedLists = [];

  for (const list of lists) {
    const optimizedList = [];

    for (const item of list) {
      let found = false;
      for (const rack of racks) {
        for (const rackItem of rack) {
          if (rackItem.toLowerCase() === item.toLowerCase()) {
            optimizedList.push({
              newName: rackItem,
              originalName: item,
              rackNumber: racks.indexOf(rack),
            });
            found = true;
            break;
          }
        }

        if (found) {
          break;
        }
      }

      if (!found) {
        for (const rack of racks) {
          for (const rackItem of rack) {
            if (rackItem.toLowerCase().includes(item.toLowerCase())) {
              optimizedList.push({
                newName: rackItem,
                originalName: item,
                rackNumber: racks.indexOf(rack),
              });
              found = true;
              break;
            }
          }

          if (found) {
            break;
          }
        }
      }

      if (!found) {
        optimizedList.push({
          newName: item,
          originalName: item,
          rackNumber: null,
        });
      }
    }

    optimizedList.sort((a, b) => {
      if (a.rackNumber === null) {
        return 1;
      } else if (b.rackNumber === null) {
        return -1;
      } else {
        return a.rackNumber - b.rackNumber;
      }
    });

    optimizedLists.push(optimizedList);
  }

  return optimizedLists;
};

const printOptimizedLists = (optimizedLists) => {
  for (let i = 0; i < optimizedLists.length; i++) {
    console.log(`Seznam ${i + 1}:`);

    for (let j = 0; j < optimizedLists[i].length; j++) {
      const item = optimizedLists[i][j];

      if (item.rackNumber === null) {
        console.log(`${j}. ${item.originalName} -> N/A`);
        continue;
      }
      console.log(
        `${j}. ${item.originalName} -> #${item.rackNumber} ${item.newName}`
      );
    }

    console.log();
  }
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

    const optimizedLists = optimizeLists(racks, lists);
    printOptimizedLists(optimizedLists);
  }
};

main();
