import CryptoJS from 'crypto-js';
import { PUB_KEY } from '@/config';

//加密
/**
 * 
 * @param word 
 */
export const encrypt = (word: string) => {
  const key =CryptoJS.enc.Utf8.parse(PUB_KEY);
  const srcSecret = CryptoJS.enc.Utf8.parse(word);
  const encryptedWord = CryptoJS.AES.encrypt(srcSecret, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedWord.toString();
}

// 解密
/**
 * 
 */
export const decrypt = (word: string) => {
 const key = CryptoJS.enc.Utf8.parse(PUB_KEY);
 const decryptedWord = CryptoJS.AES.decrypt(word, key, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
 });
 return CryptoJS.enc.Utf8.stringify(decryptedWord).toString();
}
