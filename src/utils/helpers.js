export function formatDate(dateString) {
  const months = [
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

  // Split the date string into year, month, and day
  const [year, monthIndex, day] = dateString.split("-");

  // Get the month name from the months array
  const month = months[parseInt(monthIndex, 10) - 1];

  // Convert day to integer and check for suffix
  let dayWithSuffix;
  const dayInt = parseInt(day, 10);
  if (dayInt === 1 || dayInt === 21 || dayInt === 31) {
    dayWithSuffix = dayInt + "st";
  } else if (dayInt === 2 || dayInt === 22) {
    dayWithSuffix = dayInt + "nd";
  } else if (dayInt === 3 || dayInt === 23) {
    dayWithSuffix = dayInt + "rd";
  } else {
    dayWithSuffix = dayInt + "th";
  }

  // Return the formatted date string
  return `${dayWithSuffix} ${month} ${year}`;
}

export function getCurrentDateTime() {
  const now = new Date();

  // Get current date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");

  // Get current time components
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Assemble the date and time in the desired format
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
