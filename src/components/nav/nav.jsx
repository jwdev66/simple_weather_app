import React from "react";
import "./nav.css";
import Home from "../pages/home";
import Weather from "../pages/weather";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    main: (props) => <Home {...props} />,
  },
  {
    path: "/weather",
    main: (props) => {
      return <Weather {...props} />;
    },
  },
];

export default function Nav ({apiKey}) {
    return (
      <Router>
        <div className="container">
          <div className="sidebar_container">
            <ul className="sidebar">
              <li>
                <NavLink exact to="/">Home</NavLink>
              </li>
              <li>
                <NavLink exact to="/weather">Weather</NavLink>
              </li>
            </ul>
          </div>
          <div className="page_container">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main apiKey={apiKey} />}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    );
}
