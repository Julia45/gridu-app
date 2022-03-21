import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './auth.service';
import { AuthInterceptor } from './interceptor';
import { UserServiceService } from './user-service.service';

describe('Interceptor', () => {
  let service: UserServiceService;
  let authService: AuthenticationService
  let client: HttpClient
  let controller: HttpTestingController
  let httpMock: HttpTestingController;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ],
    })

    authService = TestBed.inject(AuthenticationService)
    client = TestBed.inject(HttpClient)
    httpMock = TestBed.inject(HttpTestingController);
    controller = TestBed.inject(HttpTestingController)
    service = TestBed.inject(UserServiceService)
    httpHandler = TestBed.inject(HttpHandler)
  })

  it('should create an instance', () => {
    expect(AuthInterceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    jest
    .spyOn(localStorage.__proto__, 'getItem')
    .mockReturnValue(
      'sampleToken'
    );

    service.deleteUser(1).subscribe(response => {
      expect(response).toBeTruthy();
    });
    client.delete('/users/1');
    const req = httpMock.expectOne('http://localhost:8000/users/1');

    req.flush({});
    expect(req.request.headers.get("authorization")).toBe('sampleToken')
  });
});
