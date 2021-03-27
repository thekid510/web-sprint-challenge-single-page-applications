import { worker } from './axios/browser'

import React from "react";
import { render} from "react-dom";

import "./index.css";
import App from "./pages/App";
worker.start()

render(<App />, document.getElementById("root"));
