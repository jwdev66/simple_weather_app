export const TempType = {
  KELVIN: "kelvin",
  CELCIUS: "celcius",
  FARENHEIT: "farenheit",
};

export const getTempByType = (temp, tempType) => {
  let tempValue = parseFloat(temp);

  if (tempType === TempType.CELCIUS) tempValue = tempValue - 273.15;

  if (tempType === TempType.FARENHEIT)
    tempValue = ((tempValue - 273.15) * 9) / 5 + 32;

  return Math.round(tempValue);
};
