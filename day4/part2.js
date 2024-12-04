const file = "input.txt";
const _test = "input.test.txt";

async function parse() {
  const input = Bun.file(file);

  const str = await input.text();

  return str.split("\n").filter((line) => line.length > 0);
}

const word = "MAS";
const reversed = "SAM";

const diagonals = {
  bl: [-1, 1],
  br: [1, 1],
  tl: [-1, -1],
  tr: [1, -1],
};

const dirs = [
  [diagonals.bl, diagonals.tr],
  [diagonals.br, diagonals.tl],
];

const isValidCross = (matrix, x, y) =>
  dirs.reduce((acc, [[deltaX1, deltaY1], [deltaX2, deltaY2]]) => {
    const section = [
      matrix?.[y + deltaY1]?.[x + deltaX1] ?? null,
      matrix[y][x],
      matrix?.[y + deltaY2]?.[x + deltaX2] ?? null,
    ].join("");

    return acc && (section === word || section === reversed);
  }, true);

async function main() {
  const lines = await parse();

  const matrix = lines.map((line) => line.split(""));

  const total = matrix.reduce((total, row, rowIndex) => {
    const rowCount = row.reduce((rowCount, _cell, cellIndex) => {
      const isXmas =
        matrix[rowIndex][cellIndex] === word[1] &&
        isValidCross(matrix, cellIndex, rowIndex);

      return rowCount + (isXmas ? 1 : 0);
    }, 0);

    return total + rowCount;
  }, 0);

  console.log(total);
}

main();
