import React from 'react';
import ReactDOM from 'react-dom';

function createDOM(id) {
  let divElem = document.createElement("div");
  divElem.id = id;
  document.body.appendChild(divElem);
  return divElem;
}

function App() {
  return <span>React App</span>;
}

ReactDOM.render(<App />, createDOM("is-app"));