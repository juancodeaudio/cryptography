import * as crypto from 'crypto';
import { PathLike, read, readFileSync } from 'fs';

const sign = (
  algorithm: string,
  input: PathLike,
  privateKey: PathLike,
  encoding: BufferEncoding,
  passphrase: string
) => {
  const sign = crypto.createSign(algorithm);
  sign.update(readFileSync(input));
  sign.end();
  return sign
    .sign({
      key: readFileSync(privateKey),
      passphrase
    })
    .toString(encoding);
}

export default sign;