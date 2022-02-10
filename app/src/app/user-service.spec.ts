import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserServiceService } from './user-service.service';
import { Observable, of } from "rxjs";


describe('AuthService', () => {
  let service: UserServiceService;
  const getCustomersHttp = { get: jest.fn(() => of([
    {"username": "admin","password": "1234","role": "admin"},{"username": "guest","password": "5678", "role": "guest"}
  ])) };
  const getUsersHttp = { get: jest.fn(() => of([
    {
        "id": 12,
        "email": "rachel.howell@reqres.in",
        "first_name": "Rachel",
        "last_name": "Howell",
        "avatar": "https://reqres.in/img/faces/12-image.jpg",
        "updated": "2021-12-28T18:25:43.511Z"
      }
  ])) };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [HttpHandler, HttpClient]
    });
    service = TestBed.inject(UserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCustomers', () => {
    service.getCustomers().subscribe(customers => {
        expect(getCustomersHttp.get).toBeCalledWith('http://localhost:3000/customers');
        expect(customers.length).toBe(2);
      });
  });

  it('should call getUsers', () => {
    service.getUsers().subscribe(users => {
        expect(getUsersHttp.get).toBeCalledWith('http://localhost:3000/users');
        expect(users.length).toBe(1);
      });
  });






});