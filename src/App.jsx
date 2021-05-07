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

const issues = [
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
 */

class IssueTable extends React.Component {

    render() {
        const issueRows = issues.map(issue => <IssueRow key={issue.id} issue={issue}/>);

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

}

/*
Notice how the data passed to IssueRow in the IssueTable component has been used inside the `render()` method.
`this.props.children` refers to the child elements nested inside the react component. For this instance, it is just
a simple string, but can be a complex component too.
 */

class IssueRow extends React.Component {

    render() {
        const issue = this.props.issue;
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

}

class IssueAdd extends React.Component {

    render() {
        return (
            <div>This is a placeholder for the IssueAdd component</div>
        );
    }

}

class IssueList extends React.Component {

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </React.Fragment>
        );
    }

}

const element = <IssueList />

ReactDOM.render(element, document.getElementById('content'));