"use strict";

/*
This is a simple React Component. Every component must extend `React.Component` and must have a `render()` method.
Without the `render()` method the component won't display anything on screen. The `render()` method returns JSX.

The method should only return ONE outer element like <div>. If you need to return multiple elements, wrap them inside
`<React.Fragment> </React.Fragment>` or simply `<> </>`
 */
class HelloWorld extends React.Component {
  render() {
    var continents = ['Africa', 'North America', 'South America', 'Asia', 'Australia', 'Europe'];
    var helloContinents = Array.from(continents, continent => "Hello, ".concat(continent, "!"));
    var message = helloContinents.join(' ');
    return /*#__PURE__*/React.createElement("div", {
      id: "Outer Div"
    }, /*#__PURE__*/React.createElement("h1", null, message));
  }

}

var element = /*#__PURE__*/React.createElement(HelloWorld, null);
ReactDOM.render(element, document.getElementById('content'));