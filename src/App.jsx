/*
This is a simple React Component. Every component must extend `React.Component` and must have a `render()` method.
Without the `render()` method the component won't display anything on screen. The `render()` method returns JSX.

The method should only return ONE outer element like <div>. If you need to return multiple elements, wrap them inside
`<React.Fragment> </React.Fragment>` or simply `<> </>`
 */

class HelloWorld extends React.Component {

    render() {
        const continents = ['Africa', 'North America', 'South America', 'Asia', 'Australia', 'Europe'];
        const helloContinents = Array.from(continents, continent => `Hello, ${continent}!`);
        const message = helloContinents.join(' ');

        return (
            <div id="Outer Div">
                <h1>{message}</h1>
            </div>
        );
    }

}

/*
This is the list of issues we will use for dynamic composition
 */

const initialIssues = [
    {
        id: 1,
        status: 'New',
        owner: 'Rajat',
        effort: 5,
        created: new Date('2021-05-07'),
        due: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Sudhan',
        effort: 14,
        created: new Date('2021-05-01'),
        due: new Date('2021-05-24'),
        title: 'Missing bottom border on panel'
    }
]

const sampleIssue = {
    status: 'New',
    owner: 'Ashik',
    effort: 6,
    title: 'Completion date should be optional'
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
        return (
            <div>This is a placeholder for IssueFilter component</div>
        );
    }

}

/*
Notice how IssueRow has some data passed to it.

Later tag: as IssueTable is a stateless component, it can be implemented using a function
 */

function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>);

    return (
        <table className="bordered-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Effort</th>
                <th>Created</th>
                <th>Due</th>
                <th>Title</th>
            </tr>
            </thead>
            <tbody>
            {issueRows}
            </tbody>
        </table>
    );
}

/*
Notice how the data passed to IssueRow in the IssueTable component has been used inside the `render()` method.
`this.props.children` refers to the child elements nested inside the react component. For this instance, it is just
a simple string, but can be a complex component too.

Later tag: IssueRow is a stateless component, so it can be modified to fit a function instead of a class
 */

function IssueRow(props) {
    const issue = props.issue;
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.effort}</td>
            <td>{issue.created ? issue.created.toDateString() : ''}</td>
            <td>{issue.due ? issue.due.toDateString() : ''}</td>
            <td>{issue.title}</td>
        </tr>
    );
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
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="title" />
                <button>Add</button>
            </form>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
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
        }

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
            this.setState({ issues: initialIssues });
        }, 500)
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
        const newIssue = Object.assign({}, issue);
        newIssue.id = this.state.issues.length + 1;
        newIssue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(newIssue);
        this.setState({ issues: newIssueList });
    }

    /*
    This is one of React's lifecycle methods.
     */
    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </React.Fragment>
        );
    }

}

const element = <IssueList />

ReactDOM.render(element, document.getElementById('content'));