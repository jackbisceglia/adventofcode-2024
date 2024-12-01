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

  const sortFn = (a, b) => a - b;
  const lSorted = left.sort(sortFn);
  const rSorted = right.sort(sortFn);

  console.log(lSorted);
  console.log(rSorted);

  let total = 0;

  for (let i = 0; i < lSorted.length; i++) {
    total += Math.abs(lSorted[i] - rSorted[i]);
  }

  console.log(total);
}

main();
