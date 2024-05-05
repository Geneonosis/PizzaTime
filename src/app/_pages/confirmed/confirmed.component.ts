import { Component } from '@angular/core';
import { Order } from '../../_tools/interfaces';
import { OrdersService } from '../../_services/orders/orders.service';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Crust, Flavor, Size } from '../../_tools/enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmed',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.css',
})
export class ConfirmedComponent {
  public confirmedOrders: Order[] = [];
  public confirmedOrdersFiltered: Order[] = [];
  private subscriptions: Subscription[] = []; // array of subscriptions to unsubscribe from

  public crustOptions: any[] = Object.values(Crust);
  public flavorOptions: any[] = Object.values(Flavor);
  public sizeOptions: any[] = Object.values(Size);

  //gonna refactor some stuff into a formgroup
  public searchForm = new FormGroup({
    crust: new FormControl(''),
    flavor: new FormControl(''),
    size: new FormControl(''),
    tableNo: new FormControl(0),
  });

  constructor(private ordersService: OrdersService) {
    //add empty option to the select options
    this.crustOptions.unshift('');
    this.flavorOptions.unshift('');
    this.sizeOptions.unshift('');
  }

  ngOnInit() {
    this.checkForExistingOrders();
  }

  checkForExistingOrders() {
    const sub = this.ordersService.getAllOrders().subscribe({
      next: (res) => {
        console.log('orders', res);
        const orders = res as Order[];
        this.confirmedOrders = orders;
        this.confirmedOrdersFiltered = this.confirmedOrders;
      },
      error: (err) => {
        console.error('error getting orders', err);
      },
    });
    this.subscriptions.push(sub); //add the subscription to the array
  }

  deleteOrder(order: Order) {
    if (order?.Order_ID === undefined) {
      console.error('order id is undefined');
      alert('Error deleting order');
      return;
    }
    const sub = this.ordersService.deleteOrderById(order.Order_ID).subscribe({
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
    this.subscriptions.push(sub); //add the subscription to the array
  }

  onSubmit() {
    console.log('search values:', this.searchForm.value);
    const searchValues = this.searchForm.value;
    this.confirmedOrdersFiltered = this.confirmedOrders.filter((order) => {
      if (
        (searchValues.crust === '' || order.Crust === searchValues.crust) &&
        (searchValues.flavor === '' || order.Flavor === searchValues.flavor) &&
        (searchValues.size === '' || order.Size === searchValues.size) &&
        (searchValues.tableNo === 0 || order.Table_No === searchValues.tableNo)
      ) {
        return true;
      }
      return false;
    });
  }

  ngOnDestroy() {
    this.confirmedOrders = [];
    this.confirmedOrdersFiltered = [];
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe(); //unsubscribe from all subscriptions
    });
  }
}
