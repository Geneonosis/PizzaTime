import { Component } from '@angular/core';
import { Order } from '../../_tools/interfaces';
import { OrdersService } from '../../_services/orders/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.css',
})
export class ConfirmedComponent {
  public confirmedOrders: Order[] = [];
  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.checkForExistingOrders();
  }

  checkForExistingOrders() {
    this.ordersService.getAllOrders().subscribe({
      next: (res) => {
        console.log('orders', res);
        const orders = res as Order[];
        this.confirmedOrders = orders;
      },
      error: (err) => {
        console.error('error getting orders', err);
      },
    });
  }

  deleteOrder(order: Order) {
    if (order?.Order_ID === undefined) {
      console.error('order id is undefined');
      alert('Error deleting order');
      return;
    }
    this.ordersService.deleteOrderById(order.Order_ID).subscribe({
      next: (res) => {
        console.log('order deleted', res);
        //call checkForExistingOrders to update the list
        alert('Order deleted successfully!');
        this.checkForExistingOrders();
      },
      error: (err) => {
        console.error('error deleting order', err);
        alert('Error deleting order');
      },
    });
  }
}
