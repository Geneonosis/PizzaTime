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
});
