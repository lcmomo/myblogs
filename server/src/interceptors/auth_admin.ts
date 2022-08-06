
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { decodeToken } from "@/utils/token";
import { USER_ROLES } from '@/config'

@Injectable()
export class AuthAdmin implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];
    const jsonToken = decodeToken(token);
    if (jsonToken?.role !== USER_ROLES.ADMIN ) {
      throw new HttpException({code: 403, msg: '普通用户无法访问该接口数据'}, 403);
    }
    return next.handle();
  }
}
