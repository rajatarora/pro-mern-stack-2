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
This is the list of issues we will use for dynamic composition
 */


var initialIssues = [{
  id: 1,
  status: 'New',
  owner: 'Rajat',
  effort: 5,
  created: new Date('2021-05-07'),
  due: undefined,
  title: 'Error in console when clicking Add'
}, {
  id: 2,
  status: 'Assigned',
  owner: 'Sudhan',
  effort: 14,
  created: new Date('2021-05-01'),
  due: new Date('2021-05-24'),
  title: 'Missing bottom border on panel'
}];
var sampleIssue = {
  status: 'New',
  owner: 'Ashik',
  effort: 6,
  title: 'Completion date should be optional'
};
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
    console.log("Inside Render()");
    var issueRows = this.props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    }));
    return /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Due"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
  }

}
/*
Notice how the data passed to IssueRow in the IssueTable component has been used inside the `render()` method.
`this.props.children` refers to the child elements nested inside the react component. For this instance, it is just
a simple string, but can be a complex component too.
 */


class IssueRow extends React.Component {
  render() {
    var issue = this.props.issue;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.created ? issue.created.toDateString() : ''), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toDateString() : ''), /*#__PURE__*/React.createElement("td", null, issue.title));
  }

}

class IssueAdd extends React.Component {
  constructor() {
    super();
    /*
    This binding is to be done because `this` will be set to the object generating the event, typically the
    `window` object.
     */

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "owner",
      placeholder: "Owner"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "title"
    }), /*#__PURE__*/React.createElement("button", null, "Add"));
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    var issue = {
      owner: form.owner.value,
      title: form.title.value,
      status: 'New'
    };
    console.log(issue);
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
  }

}

class IssueList extends React.Component {
  /*
  The constructor of this component is setting the initial state of issues, equal to the `initialIssues` array
  defined above, and the render method is in turn reading the issue list from the state variable.
    The component will be redrawn if the state changes.
    The state can only be assigned value in the constructor of a component. After that, the state can be modified using
  this.setState() method, which takes the state object as a param.
   */
  constructor() {
    super();
    this.state = {
      issues: []
    };
    /*
    The binding is to be done because:
    - createIssue, defined in IssueList, is called from IssueAdd
    - If binding is not done, `this` will refer to IssueAdd component, where `this.state.issues` will be undefined,
      which is accessed inside createIssue method.
     */

    this.createIssue = this.createIssue.bind(this);
  }
  /*
  This method is simply emulating an api call at the moment.
   */


  loadData() {
    setTimeout(() => {
      this.setState({
        issues: initialIssues
      });
    }, 500);
  }
  /*
  This method is modifying the existing state of the component. Note how the state variable is updated:
  - Create a shallow copy of this.state.issues
  - Add the newly created issue into the shallow copy
  - Call this.setState with the shallow copy as input
    You can't do this.state.issues.push() directly because issues is a plain JS variable. A React component's state
  should always be treated as immutable. Right now creating a shallow copy works. But for more complex states, consider
  using immutable.js (https://facebook.github.io/immutable-js/)
   */


  createIssue(issue) {
    /*
    Object.assign is a way to copy objects in JS.
     */
    var newIssue = Object.assign({}, issue);
    newIssue.id = this.state.issues.length + 1;
    newIssue.created = new Date();
    var newIssueList = this.state.issues.slice();
    newIssueList.push(newIssue);
    this.setState({
      issues: newIssueList
    });
  }
  /*
  This is one of React's lifecycle methods.
   */


  componentDidMount() {
    this.loadData();
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
      createIssue: this.createIssue
    }));
  }

}

var element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('content'));