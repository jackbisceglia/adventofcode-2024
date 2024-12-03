const file = "input.txt";
const _test = "input.test.txt";

async function parse() {
  const input = Bun.file(file);

  const str = await input.text();

  return str.split("\n").filter((line) => line.length > 0);
}

async function main() {
  const lines = await parse();

  const reports = lines.map((line) =>
    line.split(" ").map((char) => parseInt(char)),
  );

  const isReportSafe = (report, direction) => {
    const isStepSafe = (curr, next, direction) => {
      const getDelta = (curr, next, direction) => {
        return direction === "inc" ? next - curr : curr - next;
      };

      const delta = getDelta(curr, next, direction);
      if (delta < 1 || delta > 3) {
        return false;
      }

      return true;
    };

    const doesCurrAlterDirection = (curr, next, direction) => {
      return (
        curr === next ||
        (curr > next && direction === "inc") ||
        (curr < next && direction === "dec")
      );
    };

    let skipUsed = false;

    for (let i = 0; i < report.length - 1; i++) {
      const curr = report[i];
      const next = report[i + 1];

      if (!isStepSafe(curr, next, direction)) {
        if (skipUsed) {
          return false;
        }

        if (i === 0) {
          if (
            !isStepSafe(
              direction === "inc" ? next - 1 : next + 1,
              next,
              direction,
            )
          ) {
            return false;
          }
        } else if (i === report.length - 2) {
          if (
            !isStepSafe(
              curr,
              direction === "inc" ? curr + 1 : curr - 1,
              direction,
            )
          ) {
            return false;
          }
        } else {
          if (!doesCurrAlterDirection(curr, next, direction)) {
            return false;
          }

          i += 1;
        }

        skipUsed = true;
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
