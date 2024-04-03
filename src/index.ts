import yargs from "yargs";
import prng from "./prng";
import cipher from "./cipher";
import decipher from "./decipher";

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
        default: 0
      },
      max: {
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
      },
    },
  })
  .command({
    command: 'cipher',
    describe: 'Encrypt a message',
    handler: ({ password, salt, size, input, output }) => {
      cipher(password, salt, size, input, output);
    },
    builder: {
      password: {
        alias: "p",
        description: "The password to encrypt the file with",
        type: "string",
      },
      salt: {
        description: "The salt to encrypt the file with",
        type: "string",
      },
      size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
      },
      input: {
        alias: "i",
        description: "The file to encrypt",
        type: "string",
        demandOption: true,
      },
      output: {
        alias: "o",
        description: "The file to output the encrypted data to",
        type: "string",
        demandOption: true,
      },
    },
  })
  .command({
    command: "decipher",
    describe: "Decrypt a file",
    handler: ({ password, salt, size, input, output }) => {
      decipher(password, salt, size, input, output);
    },
    builder: {
      password: {
        alias: "p",
        description: "The password to decrypt the file with",
        type: "string",
      },
      salt: {
        description: "The salt to decrypt the file with",
        type: "string",
      },
      size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
      },
      input: {
        alias: "i",
        description: "The file to encrypt",
        type: "string",
        demandOption: true,
      },
      output: {
        alias: "o",
        description: "The file to output the encrypted data to",
        type: "string",
        demandOption: true,
      },
    },
  })
  .demandCommand(1, "You need at least one command before moving on")
  .help();

console.log(argv);