import DomainException from '@core/domain/@shared/exceptions/domain.exception';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpException,
    HttpStatus,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => this.handleException(err))
        );
    }

    private handleException(err: any): Observable<never> {
        if (err instanceof DomainException) {
            return this.throwHttpException(HttpStatus.BAD_REQUEST, err.message, err.errors.map((e) => e.toPlainObject()));
        }

        if (err instanceof UnauthorizedException) {
            return this.throwHttpException(HttpStatus.UNAUTHORIZED, err.message);
        }

        if (err instanceof ConflictException) {
            return this.throwHttpException(HttpStatus.CONFLICT, err.message);
        }

        return throwError(() => err);
    }

    private throwHttpException(status: HttpStatus, message: string, errors?: any): Observable<never> {
        const response = {
            statusCode: status,
            message: message,
            errors: errors ?? null,
        };

        return throwError(() => new HttpException(response, status));
    }
}