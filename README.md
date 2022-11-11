# Travel Planner

## Project Details
* The project is built around the idea of planning your future travels and picking spots of interest, this was built for an interview assessment task, spec inside SPEC.txt
* We made use of a toggle inside the Countries Store that controls whether we interact with the api or go on the first load of the page, definitely not there because I miss-read the scope and thought that I could improve the cost of transactions.... 
* To similate some form of persistence, we implemented a stub option, which will call the api for some items and pre populate our list with "liked" countries, off by default as per the spec
* The project started off with the idea of implementing a cookie system, where we would store our personally liked items in the application cookies and reference them later but to meet the deadline and allow myself to be okay with an MVP, I am calling it a v2 solution

Checkout the live site [here](https://travelplanner-4ac13.web.app) hosted on Firebase

My CSS loaders were shamelessly stolen off of codepen:
* Busy: [https://codepen.io/kartar_developer/pen/abGGYgN](https://codepen.io/kartar_developer/pen/abGGYgN)
* Success: [https://codepen.io/kizzo/pen/bMPVPW](https://codepen.io/kizzo/pen/bMPVPW)
* Error: [https://codepen.io/geluk/pen/yLBjgrv](https://codepen.io/geluk/pen/yLBjgrv)

And project design was derived from Dribbble
* [https://dribbble.com/shots/9551899-Dashboard-CleanMac](https://dribbble.com/shots/9551899-Dashboard-CleanMac)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Deploying
```
nvm use v16.4.0
```
```
npm run build
```
Commit the work
```
firebase login
```
```
firebase deploy
```

## Funny experiences to investigate after MVP
* When chrome dev tools are open and you click on the next button, the text flickers and bugs out... Important to note that it does not occur when the tools are closed or in Firefox [Related Link](https://css-tricks.com/forums/topic/can-i-stop-flickering-on-hover/)
* Fix GitHub Actions Work flow