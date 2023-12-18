const form = document.querySelector("form");

const input_day = document.querySelector("input[name='day']");
const input_day_parent = input_day.parentElement;
const input_day_message = input_day_parent.querySelector(".input__message");

const input_month = document.querySelector("input[name='month']");
const input_month_parent = input_month.parentElement;
const input_month_message = input_month_parent.querySelector(".input__message");

const input_year = document.querySelector("input[name='year']");
const input_year_parent = input_year.parentElement;
const input_year_message = input_year_parent.querySelector(".input__message");

const year_span = document.querySelector(".years");
const month_span = document.querySelector(".months");
const day_span = document.querySelector(".days");

let d, m, y;

let year_curr = parseInt(new Date().getFullYear());
let month_curr = parseInt(new Date().getMonth() + 1);
let day_curr = parseInt(new Date().getDate());

let isFormValid = false;

// https://stackoverflow.com/a/1433119/1293256
// 2 helper functions
function daysInMonth(m, y) {
  // m is 0 indexed: 0-11
  switch (m) {
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
}

function isValid(d, m, y) {
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}

function isFuture(d, m, y) {
  let currentDate = new Date();
  let inputDate = new Date(`${y}-${m + 1}-${d}`);

  return inputDate > currentDate;
}

// add max to year input, which is dependant on current year
const setMaxYearValue = () => {
  input_year.max = year_curr;
};

const setInputMessage = (parent, message_container, message_value) => {
  parent.classList.add("input--error");
  message_container.innerHTML = message_value;
  isFormValid = false;
};

const validateDayValue = (e) => {
  if (input_day.validity.valid) {
    input_day_parent.classList.remove("input--error");
    isFormValid = true;
  }
  if (input_day.validity.valueMissing) {
    setInputMessage(
      input_day_parent,
      input_day_message,
      "This field is required"
    );
  }
  if (input_day.validity.rangeOverflow || input_day.validity.rangeUnderflow) {
    setInputMessage(input_day_parent, input_day_message, "Must be a valid day");
  }
};

const validateMonthValue = (e) => {
  if (input_month.validity.valid) {
    input_month_parent.classList.remove("input--error");
    isFormValid = true;
  }
  if (input_month.validity.valueMissing) {
    setInputMessage(
      input_month_parent,
      input_month_message,
      "This field is required"
    );
  }
  if (
    input_month.validity.rangeOverflow ||
    input_month.validity.rangeUnderflow
  ) {
    setInputMessage(
      input_month_parent,
      input_month_message,
      "Must be a valid month"
    );
  }
};

const validateYearValue = (e) => {
  if (input_year.validity.valid) {
    input_year_parent.classList.remove("input--error");
    isFormValid = true;
  }
  if (input_year.validity.valueMissing) {
    setInputMessage(
      input_year_parent,
      input_year_message,
      "This field is required"
    );
  }
  if (input_year.validity.rangeOverflow) {
    setInputMessage(
      input_year_parent,
      input_year_message,
      "Must be in the past"
    );
  }
  if (input_year.validity.rangeUnderflow) {
    setInputMessage(
      input_year_parent,
      input_year_message,
      "Must be later than 1900"
    );
  }
};

const validateDate = () => {
  d = input_day.value;
  m = input_month.value - 1;
  y = input_year.value;

  // check if date is valid
  if (!isValid(d, m, y)) {
    setInputMessage(input_day_parent, input_day_message, "Must be a valid day");
  }

  // check if date is in future
  if (isFuture(d, m, y)) {
    if (d > day_curr) {
      setInputMessage(
        input_day_parent,
        input_day_message,
        "Must be in the past"
      );
    }
    if (m > month_curr) {
      setInputMessage(
        input_month_parent,
        input_month_message,
        "Must be in the past"
      );
    }
    if (y > year_curr) {
      setInputMessage(
        input_year_parent,
        input_year_message,
        "Must be in the past"
      );
    }
  }
};

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

setMaxYearValue();

input_day.addEventListener("input", validateDayValue);
input_month.addEventListener("input", validateMonthValue);
input_year.addEventListener("input", validateYearValue);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // validate all fields in case of untouched fields
  validateDayValue(e);
  validateMonthValue(e);
  validateYearValue(e);
  // validate whole date
  validateDate();

  if (isFormValid) setNumbers();
});
