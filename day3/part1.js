const file = "input.txt";
const _test = "input.test.txt";

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => num.toString());

const isCloseParen = (char) => char === ")";
const isValid = (char) => [...nums, ","].includes(char);

async function parse() {
  const input = Bun.file(file);

  const str = await input.text();

  return str.split("\n").filter((line) => line.length > 0);
}

function parseSection(line) {
  let total = 0;

  for (let i = 0; i < line.length; i++) {
    if (line.substring(i, i + 4) !== "mul(") continue;

    const parens = {
      left: i + 3,
      right: i + 4,
    };

    while (!isCloseParen(line[parens.right]) && isValid(line[parens.right])) {
      parens.right += 1;
    }

    const [x, y] = isCloseParen(line[parens.right])
      ? line
          .substring(parens.left + 1, parens.right)
          .split(",")
          .map((char) => parseInt(char))
      : [0, 0];

    total += x * y;

    i = parens.right;
  }

  return total;
}

async function main() {
  const lines = await parse();

  const total = lines.map(parseSection).reduce((acc, curr) => acc + curr, 0);

  console.log(total);
}

main();
