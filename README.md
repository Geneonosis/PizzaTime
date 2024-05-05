# PizzaTime

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

# Description and Purpose

This project is a simple pizza ordering application. The purpose of this project is to demonstrate the use of Angular and NG Bootstrap to create a simple application that allows users to order pizza. The application allows the user to login, and order n number of pizzas while choosing their pizza's size, crust, and flavor. The user also chooses a table number to which the order will be delivered. The user can also view their order history and cancel/delete any orders that they have made.

This project is built for the sole purpose of being evaluated by the HEB team as part of the interview process.

## Development server

Run `ng serve -o` for a dev server. This should automatically navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Docker local deployment

to run the project locally with docker, you need to have docker installed on your machine. Then you can run the following commands:

`docker build -t pizza-time:latest .` to build the image

`docker run -d -p 8080:80 pizza-time:latest` to run the container

Navigate to `http://localhost:8080/` to see the application running

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --configuration=production` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
