# Travel Planner

## Project Details
The project is built around the idea of planning your future travels. It features custom persisted data via Cookies and allows you to manage them yourself. You can also mark off places you would like to travel to and where you have been with Vuex.

We also made use of a toggle inside the Countries Store that controls whether we interact with the api or go on the first load of the page, definitely not there because I miss-read the scope and thought that I could improve the cost of transactions.... 

Checkout the live site [here](https://www.google.com)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Funny experiences to investigate after MVP
* When chrome dev tools are open and you click on the next button, the text flickers and bugs out... Important to note that it does not occur when the tools are closed or in Firefox [Related Link](https://css-tricks.com/forums/topic/can-i-stop-flickering-on-hover/)
