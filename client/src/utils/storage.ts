/**
 * 读取localStorage
 * @param key 
 */
export const get = (key: string) => {
  const value = localStorage.getItem(key);
  if (!value) return null;

  return JSON.parse(value);
}

/**
 * 设置localStorage
 * @param key 
 * @param value 
 */
export const save = (key: string, value: object) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value;
  localStorage.setItem(key, data);
}

export const remove = (key: string) => {
  localStorage.removeItem(key);
}

export const clear = () => {
  localStorage.clear();
}
