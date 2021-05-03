"use strict";

var continents = ['Africa', 'North America', 'South America', 'Asia', 'Australia', 'Europe'];
var helloContinents = Array.from(continents, continent => "Hello, ".concat(continent, "!"));
var message = helloContinents.join(' ');
var element = /*#__PURE__*/React.createElement("div", {
  id: "Outer Div"
}, /*#__PURE__*/React.createElement("h1", null, message));
ReactDOM.render(element, document.getElementById('content'));