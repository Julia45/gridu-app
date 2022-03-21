import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
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

  it.skip('should add an Authorization header', () => {
    let interceptor = new AuthInterceptor(authService);
    service.deleteUser(1).subscribe(response => {
      expect(response).toBeTruthy();
    });
    // let request: HttpRequest = {
    //     url: 'http://localhost:8000/users/1',
    //     body: null,
    //     clone: jest.fn(),
    //     serializeBody: jest.fn(), 
    //     detectContentTypeHeader: jest.fn(),
    //     reportProgress: false,
    //     withCredentials: false,
    //     responseType: 'json',
    //     method: 'DELETE',
    //     headers: {
    //       normalizedNames: {},
    //       lazyUpdate: null,
    //       headers: {},
    //       lazyInit: null,
    //       has: jest.fn(),
    //       get: jest.fn(),
    //       set: jest.fn(),
    //       append: jest.fn(),
    //       getAll: jest.fn(),
    //       keys: null,
    //       delete: jest.fn(),
    //       maybeSetNormalizedName: jest.fn(),
    //       init: jest.fn(),
    //       copyFrom: jest.fn(), 
    //       clone: jest.fn(), 
    //       applyUpdate: jest.fn(),
    //     },
    //     context: { },
    //     params: {
    //       updates: null,
    //       cloneFrom: null,
    //       encoder: {},
    //       map: null
    //     },
    //     urlWithParams: 'http://localhost:8000/users/1'
    //   }
    client.delete('/users/1').subscribe();
    const req = httpMock.expectOne('/users/1');
    expect(req.request.headers.get('authorization')).toEqual(
      'HttpInterceptor',
    );

    // interceptor.intercept({
    //   url: 'http://localhost:8000/users/1',
    //   body: null,
    //   clone: jest.fn(),
    //   // @ts-ignore
    //   context: {},
    //   // @ts-ignore
    //   headers: {
    //           set: jest.fn(),
    //   },}, httpHandler)

  });
});
