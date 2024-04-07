import { AES, enc } from 'crypto-ts';
import { WordArray } from 'crypto-ts/src/lib/WordArray';
import { err, fromThrowable, ok } from 'neverthrow';
import { decode, encode, trim } from 'url-safe-base64';

type TokenType = 'account' | 'password' | 'email';

interface TokenPayload {
  type: TokenType;
  email: string;
  expiration: Date;
}

const safeAESEncrypt = fromThrowable(AES.encrypt, () => 'encryption error');

const safeAESDecrypt = (token: string, secret: string) => {
  const safeDecrypt = fromThrowable(AES.decrypt, () => 'decryption error');

  const safeToString = fromThrowable(
    (bytes: WordArray) => bytes.toString(enc.Utf8),
    () => 'decoding error'
  );

  const safeParse = fromThrowable(
    (str: string) => JSON.parse(str) as TokenPayload,
    () => 'parsing error'
  );

  const decryptedBytes = safeDecrypt(token, secret);
  if (decryptedBytes.isErr()) {
    return decryptedBytes;
  }

  const payloadString = safeToString(decryptedBytes.value);
  if (payloadString.isErr()) {
    return payloadString;
  }

  return safeParse(payloadString.value);
};

export const encodeToken = (type: TokenType, email: string) => {
  const expiration = new Date(new Date().getTime() + 3600 * 1000);
  const payload = {
    type: type,
    email: email,
    expiration: expiration,
  } as TokenPayload;

  const encryptResult = safeAESEncrypt(JSON.stringify(payload), 'secret');
  if (encryptResult.isErr()) {
    return err(encryptResult.error);
  }

  const base64 = encode(encryptResult.value.toString());
  const trimmed = trim(base64);
  return ok(trimmed);
};

export const decodeToken = (base64: string) => {
  const token = decode(base64);
  const payload = safeAESDecrypt(token, 'secret');
  if (payload.isErr()) {
    return err(payload.error);
  }

  return ok(payload.value);
};
