import "./App.css";
import React from "react";
import LayoutA from "./components/LayoutA";
import { UserProvider } from "./UserContext";

const App = () => {
  return <UserProvider><LayoutA /></UserProvider>;
};

export default App;
