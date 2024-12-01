const delim = "   ";

async function parse() {
  const input = Bun.file("input.txt");

  const str = await input.text();

  return str.split("\n").filter((line) => line.length > 0);
}

async function main() {
  const lines = await parse();

  const [left, right] = [[], []];

  lines.forEach((line) => {
    const [l, r] = line.split(delim).map((num) => parseInt(num));

    left.push(l);
    right.push(r);
  });

  const frequency = right.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }

    return acc;
  }, {});

  const score = left.reduce((acc, curr) => {
    return acc + curr * (frequency[curr] ?? 0);
  }, 0);

  console.log(score);
}

main();
