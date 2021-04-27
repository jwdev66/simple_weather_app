import { render } from "@testing-library/react";
import Home from "./home";

test("Home renders with strings ", () => {
  const {container} = render(<Home />);
  expect(container.querySelector('h2').textContent).toBe("Home");
  expect(container.querySelector('p').textContent).toBe("Welcome to the Tugboat Logic WEather App!");
});
