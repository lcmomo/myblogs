import { ResultGenerator } from "../core/result_generator";
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { decodeToken, isExpired } from "@/utils/token";


@Injectable()
export class AuthToken implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];
    if (token === undefined || token === null) {
      throw new HttpException({code: 401, msg: '未授权用户'}, 401);
      // return ResultGenerator.genFailResult(401, '身份过期')
    }
    const jsonToken = decodeToken(token);
    console.log("decdL ", jsonToken?.exp, new Date().getTime() /1000)
    if (!jsonToken?.exp || isExpired(jsonToken.exp)) {
      throw new HttpException({code: 401, msg: '身份过期，请重新登录'}, 401);
    }
    return next.handle();
  }
}
