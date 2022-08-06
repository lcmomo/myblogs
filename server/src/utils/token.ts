import { TOKEN } from '../config';
import * as jwt from 'jsonwebtoken';
import { Jwt } from 'jsonwebtoken';

// 生成token
export function createToken(info: any) {
  const token = jwt.sign(info, TOKEN.secret, { expiresIn: TOKEN.expiresIn });
  return token;
}

// 解析token
export function decodeToken (token: string) {
  try {
    const { payload } = jwt.decode(token, {complete: true}) as Jwt;
    return payload;
  } catch(e) {

    return null;
  }
}

// 是否过期
export function isExpired(expiredIn: Number) {
  if (!expiredIn) return true;
  return expiredIn < Math.floor((new Date().getTime() / 1000));
}