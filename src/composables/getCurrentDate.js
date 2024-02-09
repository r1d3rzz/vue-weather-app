const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day_names = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//format date
let day_name = day_names[currentDate.getDay()];
let day_num = currentDay < 10 ? "0" + currentDay : currentDay;
let month = month_names[currentMonth];
let year = currentYear;

let getCurrentDate = () => {
  let date = day_name + " " + day_num + " " + month + " " + year;

  return { date };
};

export default getCurrentDate;
