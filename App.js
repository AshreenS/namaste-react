// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello World from React!!"
// ); // created a h1 tag

const parent = React.createElement("h1", { id: "parent" }, [
  React.createElement("div", { id: "child1" }, [
    React.createElement("h1", { id: "child" }, "Hello I am child"),
    React.createElement("h2", { id: "child" }, "Hello I am child"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", { id: "child" }, "Hello I am child"),
    React.createElement("h2", { id: "child" }, "Hello I am child"),
  ]),
]);

console.log(parent); // this is an object
const root = ReactDOM.createRoot(document.getElementById("root")); // to render on the browser
root.render(parent); //this render will convert the oject into h1 tag and display it on the browser
