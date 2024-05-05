import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticateService } from './authenticate.service';

describe('AuthenticateService', () => {
  let service: AuthenticateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticateService],
    });
    service = TestBed.inject(AuthenticateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', () => {
    const mockUser = { access_token: 'mockToken' };
    const mockUsername = 'test';
    const mockPassword = 'test';

    service.authenticate(mockUsername, mockPassword).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      'https://pizza-api-app.herokuapp.com/api/auth'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: mockUsername,
      password: mockPassword,
    });
    req.flush(mockUser);
  });
});
