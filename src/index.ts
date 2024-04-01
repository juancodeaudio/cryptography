import yargs from "yargs";
import prng from "./prng";

const { argv } = yargs
  .options({})
  .command({
    command: 'prng',
    describe: 'Generate a pseudo-random number',
    handler: ({ type, size, min, max, encoding }) => {
      console.log(prng(type, size, min, max, encoding));
    },
    builder: {
      type: {
        choices: ['bytes', 'int', 'uuid'] as const,
        description: '',
        demandOption: true
      },
      size: {
        alias: 's',
        description: 'Random number size',
        default: 16
      },
      min: {
        type: 'number',
        default: 100
      },
      max: {
        type: 'number',
        default: 0
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
      },
    },
  })
  .demandCommand(1, "You need at least one command before moving on")
  .help();

console.log(argv);