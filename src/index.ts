import yargs from "yargs";
import prng from "./prng";
import cipher from "./cipher";
import decipher from "./decipher";
import hash from "./hash";
import hmac from "./hmac";

const encoding = {
  alias: "enc",
  choices: [
    "ascii",
    "utf8",
    "utf-8",
    "utf16le",
    "utf-16le",
    "ucs2",
    "ucs-2",
    "base64",
    "base64url",
    "latin1",
    "binary",
    "hex",
  ] as const,
  default: "hex",
} as const;

const input = {
  alias: "i",
  type: "string",
  demandOption: true,
} as const;

const output = {
  alias: "o",
  type: "string",
  demandOption: true,
} as const;

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
      encoding,
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
        ...input,
        description: "The file to encrypt",
      },
      output: {
        ...output,
        description: "The file to output the encrypted file to",
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
        ...input,
        description: "The file to encrypt",
      },
      output: {
        ...output,
        description: "The file to output the encrypted file to",
      },
    },
  })
  .command({
    command: "hash",
    describe: "Hash a file",
    handler: ({ algorithm, encoding, input }) => {
      console.log(hash(algorithm, encoding, input));
    },
    builder: {
      algorithm: {
        alias: "a",
        description: "The algorithm to use",
        type: "string",
        demandOption: true,
        default: "sha256",
      },
      input: {
        ...input,
        description: "The file to hash",
      },
      encoding,
    },
  })
  .command({
    command: "hmac",
    describe: "Generate an HMAC for a file",
    handler: ({ algorithm, key, encoding, input }) => {
      console.log(hmac(algorithm, key, encoding, input));
    },
    builder: {
      algorithm: {
        alias: "a",
        description: "The algorithm to use",
        type: "string",
        default: "sha256",
      },
      input: {
        ...input,
        description: "The file to hmac",
      },
      key: {
        alias: "k",
        description: "The key to use",
        type: "string",
        demandOption: true,
      },
      encoding,
    },
  })
  .demandCommand(1, "You need at least one command before moving on")
  .help();

console.log(argv);