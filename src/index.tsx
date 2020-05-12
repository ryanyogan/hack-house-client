import React from "react";
import { render } from "react-dom";
import { Listings } from "./sections/Listings";
import * as serviceWorker from "./serviceWorker";

render(
  <React.StrictMode>
    <Listings title="HackHouse Listings" />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
