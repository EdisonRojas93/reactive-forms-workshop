# FormsWorkshop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Instructions
1. Add (import) the ReactiveFormsModule to the main module
2. In the new-room.component create a form called newRoomForm with the following form controls:
 a. roomName
 b. numberOfRows
 c. avgSeatsInRow
3. Connect the form to the template. Hint: [formGroup] and formControlName
4. Add ngSubmit to the form - use the method save().
Do you need to pass arguments?
5. Pass the form value to the db method saveRoomConfig in save()
6. Add initial value (given as a const in the top of the file). 
There are several ways, which would you use?
7. Implement the reset method to patch the initial value
