import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {
    this.orderForm = new FormGroup({
      Crust: new FormControl(this.crustOptions[0]),
      Flavor: new FormControl(this.flavorOptions[0]),
      Size: new FormControl(this.sizeOptions[0]),
      Table_No: new FormControl(1),
    });
  }

  ngOnInit() {
    console.log('crusts', this.crustOptions);
  }

  onSubmit() {
    console.log(this.orderForm.value);
    //TODO: submit to the orders endpoint
    // WHEN I SEND THIS it says it is missing an authorization header. i need to add the access token to the header
    // i can do this by accessing the session storage and pulling the access token, then adding it to the header

    //get the access token from session storage
    const access_token = sessionStorage.getItem('access_token');
    console.log('access token', access_token);
    //add the access token to the header by creating a new header object
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    //send the post request with the headers by adding the headers object as the third argument
    this.http
      .post(
        'https://pizza-api-app.herokuapp.com/api/orders',
        this.orderForm.value,
        {
          headers,
        }
      )
      .subscribe({
        next: (res) => {
          console.log('Order submitted');
          console.log(res);
          this.router.navigate(['/orderSubmitted']);
        },
        error: (err) => {
          console.error('Error submitting order', err);
        },
      });
  }
}

/**
 * @enum Crust types
 */
enum Crust {
  Thin = 'Thin',
  Thick = 'Thick',
  Stuffed = 'Stuffed',
  DeepDish = 'Deep Dish',
}

/**
 * @enum Flavor types
 */
enum Flavor {
  Cheese = 'Cheese',
  Pepperoni = 'Pepperoni',
  Sausage = 'Sausage',
  Veggie = 'Veggie',
  Supreme = 'Supreme',
  Hawaiian = 'Hawaiian',
  ChikenParm = 'Chicken Parm',
}

/**
 * @enum Size types
 */
enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'Extra Large',
}
