import yargs from "yargs";

const { argv } = yargs
  .options({})
  .command({
    command: 'prng',
    describe: 'Generate a pseudo-random number',
    handler: () => {},
    builder: {
      type: {
        choices: ["bytes", "int", "uuid"] as const,
        description: '',
        demandOption: true
      },
      sixe: {
        alias: 's',
        description: 'Random number size',
        default: 16
      },
      max: {
        type: 'number',
        default: 0
      },
      min: {
        type: 'number',
        default: 100
      },
      encoding: {
        alias: 'enc',
        choices: [
          "ascii",
          "utf8",
          "utf-8",
          "utf16le",
          "utf16-le",
          "ucs2",
          "ucs-2",
          "base64",
          "base64url",
          "latin1",
          "binary",
          "hex"
        ] as const,
        default: "hex"
      }
    }
  })
  .demandCommand(1, "You need at least one command before moving on")
  .help();

console.log(argv);