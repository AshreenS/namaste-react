import React from "react"; // import React library
import ReactDOM from "react-dom/client"; // import ReactDOM library
import Header from "./components/Header";
import Body from "./components/Body";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")); // to render on the browser
root.render(<AppLayout />); // this will render the ReactComponent
