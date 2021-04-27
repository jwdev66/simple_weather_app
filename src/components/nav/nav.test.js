import { render } from "@testing-library/react";
import Nav from "./nav";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const routes = {
  home: "/",
  weather: "/weather",
};

const renderWithRouter = (ui, { route = "/" }) => {
  window.history.pushState({}, "Page", route);

  return render(ui, { wrapper: BrowserRouter });
};

const apiKey = "api_key";
jest.mock("../pages/home", () => (props) => (
  <div data-testid="Home" className={props.apiKey} />
));
jest.mock("../pages/weather", () => (props) => (
  <div data-testid="Weather" className={props.apiKey} />
));

test("Nav renders 2 nav items with routes", () => {
  const { container } = render(<Nav />);
  expect(container.querySelectorAll("a").length).toBe(2);
  const homeLink = container.querySelectorAll("a")[0];
  const weatherLink = container.querySelectorAll("a")[1];

  expect(homeLink.textContent).toBe("Home");
  expect(weatherLink.textContent).toBe("Weather");

  expect(homeLink).toHaveAttribute("href", routes.home);
  expect(weatherLink).toHaveAttribute("href", routes.weather);
});

test("Clicking Home Nav Item renders Home component", () => {
  const { container, getByTestId } = renderWithRouter(<Nav apiKey={apiKey} />, {
    route: routes.weather,
  });
  const homeLink = container.querySelectorAll("a")[0];
  const weatherLink = container.querySelectorAll("a")[1];

  const leftClick = { button: 0 };
  userEvent.click(homeLink, leftClick);

  expect(homeLink.classList.contains("active")).toBe(true);
  expect(weatherLink.classList.contains("active")).toBe(false);

  expect(getByTestId("Home")).toBeInTheDocument();
  expect(getByTestId("Home")).toHaveClass(apiKey);
});

test("Clicking Weather Nav Item renders Weather component", async () => {
  const { container, getByTestId } = renderWithRouter(<Nav apiKey={apiKey} />, {
    route: routes.home,
  });
  const homeLink = container.querySelectorAll("a")[0];
  const weatherLink = container.querySelectorAll("a")[1];

  const leftClick = { button: 0 };
  await userEvent.click(weatherLink, leftClick);

  expect(homeLink.classList.contains("active")).toBe(false);
  expect(weatherLink.classList.contains("active")).toBe(true);

  expect(getByTestId("Weather")).toBeInTheDocument();
  expect(getByTestId("Weather")).toHaveClass(apiKey);
});

test("Nav renders a Home component with Home route", () => {
  const { container, getByTestId } = renderWithRouter(<Nav />, {
    route: routes.home,
  });

  const homeLink = container.querySelectorAll("a")[0];
  const weatherLink = container.querySelectorAll("a")[1];

  expect(homeLink.classList.contains("active")).toBe(true);
  expect(weatherLink.classList.contains("active")).toBe(false);

  expect(getByTestId("Home")).toBeInTheDocument();
});

test("Nav renders a Weather component with Weathar route", () => {
  const { container, getByTestId } = renderWithRouter(<Nav />, {
    route: routes.weather,
  });

  const homeLink = container.querySelectorAll("a")[0];
  const weatherLink = container.querySelectorAll("a")[1];

  expect(homeLink.classList.contains("active")).toBe(false);
  expect(weatherLink.classList.contains("active")).toBe(true);

  expect(getByTestId("Weather")).toBeInTheDocument();
});
