import { render } from "@testing-library/react";
import App from "./App";

const apiKey = "api_key"
jest.mock('../nav/nav', () => (props) => <div data-testid="Nav" className={props.apiKey}/>)

test("App renders a Div with App classname ", () => {
  const { container } = render(<App/>);  
  expect(container.firstChild).toHaveClass("App"); 
});

test("App renders a Nav component with apiKey prop", () => {
  const { getByTestId } = render(<App apiKey={apiKey}/>);  
  expect(getByTestId('Nav')).toBeInTheDocument();
  expect(getByTestId('Nav')).toHaveClass(apiKey);
});