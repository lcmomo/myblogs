
enum ResultCode {
  SUCCESS = 200, // 成功
  FAIL = 400, // 失败
  UNAUTHORIZED = 401, // 未认证(签名)
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500 // 服务器内部错误
}


interface Result<T> {
  code: number;
  msg: string;
  data?: T;
}

// 响应结果生成工具
export class ResultGenerator<T> {
  private static DEFAULT_SUCCESS_MESSAGE = 'SUCCESS';
  public static genDefaultSuccessResult(): Result<null> {
    return {
      code: ResultCode.SUCCESS,
      msg: this.DEFAULT_SUCCESS_MESSAGE
    }
  }

  public static genSuccessResult<T>(data: T, msg?: string): Result<T> {
    return {
      code: ResultCode.SUCCESS,
      msg: msg || this.DEFAULT_SUCCESS_MESSAGE,
      data: data
    }
  }

  public static genDefaultFailResult(msg: string): Result<null> {
    return {
      code: ResultCode.FAIL,
      msg: msg
    }
  }
  public static genFailResult(code: number, msg: string): Result<null> {
    return {
      code,
      msg
    }
  }
}

