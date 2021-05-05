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
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow issue_id="1" issue_title="Title of the first issue" />
                    <IssueRow issue_id="2" issue_title="Title of the second issue" />
                </tbody>
            </table>
        );
    }

}

/*
Notice how the data passed to IssueRow in the IssueTable component has been used inside the `render()` method.
 */

class IssueRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.issue_id}</td>
                <td>{this.props.issue_title}</td>
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