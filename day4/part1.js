const file = "input.txt";
const _test = "input.test.txt";

async function parse() {
  const input = Bun.file(file);

  const str = await input.text();

  return str.split("\n").filter((line) => line.length > 0);
}

const word = "XMAS";

const dirs = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

const enumerateCell = (matrix, x, y) => {
  const createWord = (deltaX, deltaY) =>
    word
      .split("")
      .map(
        (_char, index) =>
          matrix?.[y + deltaY * index]?.[x + deltaX * index] ?? null,
      )
      .join("");

  const count = dirs.reduce(
    (count, [deltaX, deltaY]) =>
      createWord(deltaX, deltaY) === word ? count + 1 : count,
    0,
  );

  return count;
};

async function main() {
  const lines = await parse();

  const matrix = lines.map((line) => line.split(""));

  const total = matrix.reduce((total, row, rowIndex) => {
    const rowCount = row.reduce((rowCount, _cell, cellIndex) => {
      const cellCount = enumerateCell(matrix, cellIndex, rowIndex);

      return rowCount + cellCount;
    }, 0);

    return total + rowCount;
  }, 0);

  console.log(total);
}

main();
