import { render, fireEvent, waitFor } from "@testing-library/react";
import Weather from "./weather";
import { TempType } from "../../utils";

let originalFetch;

beforeEach(() => {
  originalFetch = global.fetch;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          main: { temp: 283 },
        }),
    })
  );
});

afterEach(() => {
  global.fetch = originalFetch;
});

test("Weather renders with initial values ", () => {
  const {
    container,
    getByPlaceholderText,
    getByLabelText,
    getByTestId,
  } = render(<Weather />);
  expect(container.querySelector("h2").textContent).toBe("Weather");
  expect(getByLabelText(TempType.KELVIN).checked).toEqual(true);
  expect(getByLabelText(TempType.CELCIUS).checked).toEqual(false);
  expect(getByLabelText(TempType.FARENHEIT).checked).toEqual(false);
  expect(container.querySelector("button").textContent).toBe("Check Weather");
  expect(container.querySelector("button")).toHaveProperty("disabled", false);
  expect(container.querySelector('input[type="text"]')).toHaveProperty(
    "placeholder",
    "City Name"
  );
  expect(getByPlaceholderText("City Name")).toHaveValue("");
  expect(container.querySelector("p")).toHaveTextContent(
    "The current weather is:"
  );
  expect(getByTestId("temperature").textContent).toBe("");
});

test("City Name changes correctly.", () => {
  const { getByPlaceholderText } = render(<Weather />);
  const inputEl = getByPlaceholderText("City Name");
  fireEvent.change(inputEl, {
    target: {
      value: "New York",
    },
  });

  expect(inputEl.value).toBe("New York");
});

test("Temperature Type changes correctly.", () => {
  const { getByLabelText } = render(<Weather />);
  const kelvinEl = getByLabelText(TempType.KELVIN);
  const celciusEl = getByLabelText(TempType.CELCIUS);
  const farenheitEl = getByLabelText(TempType.FARENHEIT);

  fireEvent.click(kelvinEl);
  expect(kelvinEl.checked).toEqual(true);
  expect(celciusEl.checked).toEqual(false);
  expect(farenheitEl.checked).toEqual(false);

  fireEvent.click(celciusEl);
  expect(kelvinEl.checked).toEqual(false);
  expect(celciusEl.checked).toEqual(true);
  expect(farenheitEl.checked).toEqual(false);

  fireEvent.click(farenheitEl);
  expect(kelvinEl.checked).toEqual(false);
  expect(celciusEl.checked).toEqual(false);
  expect(farenheitEl.checked).toEqual(true);
});

test("Click button to get weather info and change temperature types", async () => {
  const { container, getByPlaceholderText, getByTestId, getByLabelText } = render(<Weather />);
  const btnEl = container.querySelector("button");
  const inputEl = getByPlaceholderText("City Name");
  const kelvinEl = getByLabelText(TempType.KELVIN);
  const celciusEl = getByLabelText(TempType.CELCIUS);
  const farenheitEl = getByLabelText(TempType.FARENHEIT);

  fireEvent.click(kelvinEl);
  fireEvent.change(inputEl, {
    target: {
      value: "New York",
    },
  });
  
  fireEvent.click(btnEl);
  expect(container.querySelector("button")).toHaveProperty("disabled", true)
  await waitFor(() =>
    expect(container.querySelector("button")).toHaveProperty("disabled", false)
  );
  expect(getByTestId("temperature").textContent).toBe("283");

  fireEvent.click(celciusEl);
  expect(getByTestId("temperature").textContent).toBe("10");

  fireEvent.click(farenheitEl);
  expect(getByTestId("temperature").textContent).toBe("50");
});
