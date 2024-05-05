import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OrdersService } from './orders.service';
import { Order } from '../../_tools/interfaces';
import { Endpoints } from '../../_tools/endpoints';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService],
    });
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all orders', () => {
    const mockOrders: Order[] = [
      {
        Order_ID: 1,
        Crust: 'Thin',
        Flavor: 'Cheese',
        Size: 'Small',
        Table_No: 1,
      },
    ];
    service.getAllOrders().subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });
    const req = httpMock.expectOne(Endpoints.orders);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should fetch order by id', () => {
    const mockOrder: Order = {
      Order_ID: 1,
      Crust: 'Thin',
      Flavor: 'Cheese',
      Size: 'Small',
      Table_No: 1,
    };
    service.getOrderById('1').subscribe((order) => {
      expect(order).toEqual(mockOrder);
    });
    const req = httpMock.expectOne(`${Endpoints.orders}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrder);
  });

  it('should create order', () => {
    const mockOrder: Order = {
      Order_ID: 1,
      Crust: 'Thin',
      Flavor: 'Cheese',
      Size: 'Small',
      Table_No: 1,
    };
    service.createOrder(mockOrder).subscribe((order) => {
      expect(order).toEqual(mockOrder);
    });
    const req = httpMock.expectOne(
      'https://pizza-api-app.herokuapp.com/api/orders'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockOrder);
  });
});
