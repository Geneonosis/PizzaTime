import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import { OrdersService } from '../../_services/orders/orders.service';
import { of, throwError } from 'rxjs';
import { Order } from '../../_tools/interfaces';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let ordersService: OrdersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComponent, ReactiveFormsModule],
      providers: [
        {
          provide: OrdersService,
          useValue: jasmine.createSpyObj('OrdersService', ['createOrder']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
