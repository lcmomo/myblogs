
export interface UserDto {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  notice?: string;
  role?: number;
  github?: string;
  code?: string | number;
  account?: string,
  avatar?: string,
  userId?: number
}

export interface UserQueryParams {
  username?: string
  type?: number | string;
  rangeDate?: Array<any>,
  page?: number,
  pageSize?: number
}