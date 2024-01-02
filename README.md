# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](./assets/images/screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://github.com/KamQuoss/age-calculator-app)
- Live Site URL: [Add live site URL here](https://kamquoss.github.io/age-calculator-app/)

## My process

### Built with

- Semantic HTML5 markup
- built-in form validation
- CSS compiled with SASS
- Flexbox
- SVG Sprites
- vanilla JS
- BEM naming convention

### What I learned

I've learned tha working with Date object is not obvious, and additional calculations must be made. For example 31th of february is valid date, but it is converted to 2nd march. So to solve this problem I've used nickf function presented on [stackoverflow](https://stackoverflow.com/a/1433119/1293256) to find if date is valid.

Also counting years, months and days is a little bit tricky. At first I've just calculated number of second between two dates (current and past) and calculate how meny years, months, and seconds this is in this result. But during this calculations, I've noticed that you have to assume that year is 365 days (365 days x 24 hours x 60 minutes x 1000 ms), month is 30 days (30 days x 24 hours x 60 minutes x 1000 ms). That gives false calculations, because in reality we have: leap year, shorter february, months with 30 or 31 days. So to show proper numbers, based on common understanding of difference between two dates I've constructed this function:

```js
// current date calculated with build-in methods of Date
let year_curr = parseInt(new Date().getFullYear());
let month_curr = parseInt(new Date().getMonth() + 1);
let day_curr = parseInt(new Date().getDate());

// calculates difference in years, months and days regarding to which day is now
const setNumbers = () => {
  let days_diff = day_curr - d;
  let months_diff = month_curr - 1 - m;
  let years_diff = year_curr - y;

  if (days_diff < 0) {
    days_diff = 31 - Math.abs(days_diff);
    months_diff--;
    if (months_diff < 0) {
      months_diff = 12 - 1;
      years_diff--;
    }
  }

  year_span.innerHTML = years_diff;
  month_span.innerHTML = months_diff;
  day_span.innerHTML = Math.abs(days_diff);
};
```

### Useful resources

- [SVG sprites](https://medium.com/@hayavuk/complete-guide-to-svg-sprites-7e202e215d34) - Useful guide to understand and prepare SVG Sprites.
- [rule order](https://9elements.com/css-rule-order/) - Guide to rationally organize css rules in stylesheet. I think it is a good practice to have order in code.
- [PX to REM converter](https://nekocalc.com/px-to-rem-converter) - Nice and easy calculater to convert pixels to REM. It was helpful for me, because I haven't got Figma project with properties.

## Author

- Frontend Mentor - [@KamQuoss](https://www.frontendmentor.io/profile/KamQuoss)
- LinkedIn - [@Kamila Kłosek](https://www.linkedin.com/in/kamila-klosek/)
