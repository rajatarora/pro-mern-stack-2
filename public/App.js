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
/*
From this point forward we're making a simple Issue Tracker with React. The tracker will have the ability to add issues,
list them, and filter them. In the following lines we have defined different React Components:
- Issue Filter
- Issue Table
- Issue Row
- Issue Add
- Issue List -- which is a composition of the above components
 */


class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for IssueFilter component");
  }

}
/*
Notice how IssueRow has some data passed to it.
 */


class IssueTable extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement(IssueRow, {
      issue_id: "1"
    }, "This issue 1 was rendered using Children Properties"), /*#__PURE__*/React.createElement(IssueRow, {
      issue_id: "2"
    }, "This issue 2 was rendered using Children Properties")));
  }

}
/*
Notice how the data passed to IssueRow in the IssueTable component has been used inside the `render()` method.
`this.props.children` refers to the child elements nested inside the react component. For this instance, it is just
a simple string, but can be a complex component too.
 */


class IssueRow extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, this.props.issue_id), /*#__PURE__*/React.createElement("td", null, this.props.children));
  }

}

class IssueAdd extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the IssueAdd component");
  }

}

class IssueList extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, null));
  }

}

var element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('content'));