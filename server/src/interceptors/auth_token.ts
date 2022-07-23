import { ResultGenerator } from "../core/result_generator";
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthToken implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];
    if (token === undefined) {
      throw new HttpException('身份过期', 401);
    }
    return next.handle();
  }
}
