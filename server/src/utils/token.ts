import { TOKEN } from '../config';
import * as jwt from 'jsonwebtoken';

export function createToken(info: any) {
  const token = jwt.sign(info, TOKEN.secret, { expiresIn: TOKEN.expiresIn });
  return token;
}

