const file = "input.txt";
const _test = "input.test.2.txt";

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => num.toString());

const identifiers = {
  mul: "mul(",
  do: "do(",
  dont: "don't(",
};

const matchIdentifier = (line, i) => {
  const matches = Object.values(identifiers).filter((ident) => {
    return line.substring(i, i + ident.length) === ident;
  });

  const identifier = matches?.[0] ?? null;

  return identifier
    ? {
        identifier,
        nextIndex: i + identifier.length,
      }
    : null;
};

const isCloseParen = (char) => char === ")";
const isValid = (char) => [...nums, ","].includes(char);

async function parse() {
  const input = Bun.file(file);

  const str = await input.text();

  return str.split("\n").filter((line) => line.length > 0);
}

function parseSection(line) {
  let total = 0;
  let flag = true;

  for (let i = 0; i < line.length; i++) {
    const match = matchIdentifier(line, i);

    switch (match?.identifier) {
      case identifiers.do:
      case identifiers.dont:
        if (isCloseParen(line[match.nextIndex])) {
          flag = match.identifier === identifiers.do;
        }

        i = match.nextIndex;
        break;

      case identifiers.mul:
        const parens = {
          left: i + 3,
          right: i + 4,
        };

        while (
          !isCloseParen(line[parens.right]) &&
          isValid(line[parens.right])
        ) {
          parens.right += 1;
        }

        const [x, y] = isCloseParen(line[parens.right])
          ? line
              .substring(parens.left + 1, parens.right)
              .split(",")
              .map((char) => parseInt(char))
          : [0, 0];

        if (flag) {
          total += x * y;
        }

        i = parens.right;
        break;
    }
  }

  return total;
}

async function main() {
  const section = (await parse()).join("");

  const total = parseSection(section);

  console.log(total);
}

main();
