import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from '../../_tools/endpoints';
import { Order } from '../../_tools/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  /**
   * get all orders
   * @returns all orders
   */
  getAllOrders() {
    return this.http.get(Endpoints.orders);
  }

  /**
   * get order by id
   * @param id - order id
   * @returns an order
   */
  getOrderById(id: string) {
    return this.http.get(`${Endpoints.orders}/${id}`);
  }

  /**
   * delete order by id
   * @param id - order id
   * @returns delete order
   */
  deleteOrderById(id: number) {
    return this.http.delete(`${Endpoints.orders}/${id}`);
  }

  /**
   * create order
   * @param order - order object
   * @returns create order
   */
  createOrder(order: Order): Observable<any> {
    const access_token = sessionStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    //send the post request with the headers by adding the headers object as the third argument
    return this.http.post(
      'https://pizza-api-app.herokuapp.com/api/orders',
      order,
      {
        headers,
      }
    );
  }
}
