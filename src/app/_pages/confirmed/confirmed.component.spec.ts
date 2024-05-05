import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedComponent } from './confirmed.component';
import { OrdersService } from '../../_services/orders/orders.service';
import { Order } from '../../_tools/interfaces';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfirmedComponent', () => {
  let component: ConfirmedComponent;
  let fixture: ComponentFixture<ConfirmedComponent>;
  let ordersService: OrdersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedComponent, HttpClientTestingModule],
      providers: [OrdersService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete an order when deleteOrder(order: Order) is called', () => {
    const mockOrder: Order = {
      Order_ID: 10,
      Crust: 'THIN',
      Flavor: 'PEPPERONI',
      Size: 'L',
      Table_No: 1,
    };

    const deleteOrderSpy = spyOn(
      ordersService,
      'deleteOrderById'
    ).and.returnValue(of(mockOrder));

    component.deleteOrder(mockOrder);

    if (mockOrder.Order_ID === undefined) {
      expect(deleteOrderSpy).toThrowError('Order ID is required');
    }

    expect(deleteOrderSpy).toHaveBeenCalledWith(10);
  });
});
