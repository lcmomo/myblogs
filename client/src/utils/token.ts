
import * as jwt from 'jsonwebtoken';
export function decodeToken (token: string) {
  try {
    const { payload } = jwt.decode(token, {complete: true});
    return payload;
  } catch(e) {

    return null;
  }
}