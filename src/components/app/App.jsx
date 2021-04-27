import Nav from "../nav/nav";
import "./App.css";
import React from "react";

export default function App({ apiKey}) {
  return (
    <div className="App">
      <Nav apiKey={apiKey} />
    </div>
  );
}
