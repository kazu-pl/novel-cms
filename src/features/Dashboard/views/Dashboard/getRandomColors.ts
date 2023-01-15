const backgrounds = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const borders = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

const getRandomIndex = (arrayLength: number) =>
  Math.floor(Math.random() * arrayLength);

const getRandomColors = (amountOfColors: number, mode: "bg" | "border") => {
  const colorsArray = [];

  for (let i = 0; i < amountOfColors; i++) {
    let selectedColorItem = "";

    if (mode === "bg") {
      selectedColorItem =
        backgrounds[i] === undefined
          ? backgrounds[getRandomIndex(backgrounds.length)]
          : backgrounds[i];
    } else {
      selectedColorItem =
        borders[i] === undefined
          ? borders[getRandomIndex(borders.length)]
          : borders[i];
    }

    colorsArray.push(selectedColorItem);
  }

  return colorsArray;
};

export default getRandomColors;
