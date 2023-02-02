const getReleaseDate = date => {
  // const date = releaseDate;
  const monthArr = [
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
  const getMonth = Math.floor(+date.substring(5, 7));
  let alphaMonth = "";
  monthArr.forEach((val, index) => {
    if (index === getMonth) {
      alphaMonth = val;
    }
  });
  const fullDate =
    alphaMonth + " " + date.substring(8, 10) + ", " + date.substring(0, 4);
  return(fullDate)
};

export default getReleaseDate
