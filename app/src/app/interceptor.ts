import { HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS,  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const nextRequest = request.clone({
            headers: request.headers.set("authorization", this.authService.token)
        })
        return next.handle(nextRequest)
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true
} 
