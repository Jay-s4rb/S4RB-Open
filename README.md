# ReportingPortal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Notes

I decided to use Angular 5 because of Angular's opinionated nature making it easier for other developers who already know Angular to jump on the project. As this is part of a much larger interconnected project it made sense to make it as easy as possible for other developers to jump straight in and the modularity of Angular allows it to scale nicely into a larger project. Angular-CLI also makes it extremely quick to get started by generating the boilerplate with tests built in by default.

The 'complaints-per-million-units' component gets and displays the cpmu data. The toggle component (to toggle between monthly and quarterly) is a shared compnent to make it easily reusable throughout making future development faster.

The calls to the rest API are in the complaints-per-million-units service it also contains methods to calculate CPMU (montly and quarterly), to fill in any missing months in the data, and a method to sort the data into a quarterly structure which is easier to iterate over in the template.

I have also written some basic unit tests for the service and two components. 


## API

Run `json-server --watch db.json` to start API on http://localhost:3000/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
