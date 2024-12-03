const file = "input.txt";
const _test = "input.test.txt";

async function parse() {
  const input = Bun.file(_test);

  const str = await input.text();

  return str.split("\n").filter((line) => line.length > 0);
}

async function main() {
  const lines = await parse();

  const reports = lines.map((line) =>
    line.split(" ").map((char) => parseInt(char)),
  );

  const isReportSafe = (report, direction) => {
    for (let i = 0; i < report.length - 1; i++) {
      const curr = report[i];
      const next = report[i + 1];

      const delta = direction === "inc" ? next - curr : curr - next;

      if (delta < 1 || delta > 3) {
        return false;
      }
    }

    return true;
  };

  const safe = reports.filter((report) => {
    const inc = isReportSafe(report, "inc");
    const dec = inc || isReportSafe(report, "dec");

    return dec;
  });

  console.log(safe.length);
}

main();
