import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../../_services/orders/orders.service';
import { Order } from '../../_tools/interfaces';
import { Crust, Flavor, Size } from '../../_tools/enums';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  public orderForm: FormGroup;

  //turn the enums into arrays for the select options
  public crustOptions = Object.values(Crust);
  public flavorOptions = Object.values(Flavor);
  public sizeOptions = Object.values(Size);

  constructor(private ordersService: OrdersService) {
    this.orderForm = new FormGroup({
      Crust: new FormControl(this.crustOptions[0]),
      Flavor: new FormControl(this.flavorOptions[0]),
      Size: new FormControl(this.sizeOptions[0]),
      Table_No: new FormControl(1),
    });
  }

  onSubmit() {
    const order: Order = this.orderForm.value as Order;
    console.log(order);
    this.ordersService.createOrder(order).subscribe({
      next: (res) => {
        console.log('order created', res);
        alert('Order created successfully!');
        this.orderForm.reset();
      },
      error: (err) => {
        console.error('error creating order', err);
        alert('Error creating order!');
      },
    });
  }
}
