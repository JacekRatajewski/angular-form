# Angular Forms
Repository was created for recruitment task. To start a local development server, run:

```bash
npm install
npm start
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version **19.2.1**.
This project was generated on node **22.14.0** which was current LTS version.

## Phase 1 - Design Web Page
On the start of assignment I decided to create simple wireframes & mock-ups for future reference while creating application.

### MOBILE LOGIN
![enter image description here](https://i.imgur.com/B53iruu.png)
![enter image description here](https://i.imgur.com/Zl1rw1K.png)
### DESKTOP LOGIN
![enter image description here](https://i.imgur.com/d565sTw.png)
![enter image description here](https://i.imgur.com/CqZy1Gv.png)
### HOME MOBILE
![enter image description here](https://i.imgur.com/zJs9PEL.png)
![enter image description here](https://i.imgur.com/djVmXZu.png)
### HOME DESKTOP
![enter image description here](https://i.imgur.com/mrFucCK.png)
![enter image description here](https://i.imgur.com/2kRWc4I.png)

 ## Phase 2 - Init Project
Next I initialized angular project. I choose to use Sass for style pre-processor and added angular material for basic components. I changed default **app.component** from standalone and used module based architecture for future project expansion. I decided to use **BEM** with hyphen separation naming standard for css, also i created styles folder with reduced **7-1 Architecture**, for Angular standards.

### FOLDER STRUCTURE
![enter image description here](https://i.imgur.com/O0NGnwZ.png)

## Phase 3 - Sign In Page, Validation, Error Component, Msw.js with token generation, Routes Guard
Firstly when developing the assignment:
- I implemented **sign-in-page.component** with Angular ReactiveForms for E-mail and Password and Sign-In button.
- I used *pattern* function to not use native *email* Validator as in assignment.
- I created standalone **error.component** in shared folder to present correct error messages when form fields have validation errors.
- I implemented [Msw.js](https://mswjs.io/) worker for simulation of sign-in request & in response i generated token from random characters - method can be found in **src\mock\handlers\sign-in.ts**. This way i can implement **sign-in.service** correctly and use **HttpClient** as service should.
- I implemented **auth.guard** and **localstorage.service** to correctly check if signed user can or cannot access routes as in assignment. I decided to make **LocalstorageService** generic, this way we can have correct type as returned value from *get* method.

Additionally:
- I created mixin *getTypography* - to easliy set and customize my fonts, I did it for little excercise with scss mixins.
- I created mixin *respond* - to easliy get around RWD uses of **@media** queries.
- I set up custom material theming and generated my custom theme with: ```bash ng generate @angular/material:theme-color```
- I made sure that assets are in .svg format.

## Phase 4 - Home Page, Json data source, RWD finishing touches, Unit tests
Secondly when developing the assignment:
- I implemented **home-page.component** with simple **user.service** to get data from json file as in specifications.
- I implemented *logOut* function which is accessible after portrait click where I used **mat-menu**.
- I finished Responsive Web Design implementation with **mat-drawer** component for smaller devices.
- I wrote unit tests for each component.

Additionally:
- I created more mixins to encapsulate some of recurring display styles.

## Future Plans for Development
- Create Layout Components(footer,navigation,side-bar) to use as routing layout for Home & future pages.
- Create Error Page
- Change storing user related data in localstorage and use indexed db, change service to not be generic(in future as application will grow multiple service module imports are not welcome, with indexed db service we can create rxjs based service with mapping resolved in *subscribe* functions)
- Make more Validation for password and email inside MSW handler to represent diffrent responses from API.
- Change token generation to JWT and remove json user data and make proper http request for it, additionally use MSW for development process.
- Add env.local for possible api urls or sercrets.
- Add eslint, stylelint and other static code analyzers.