/*
This is a simple JSX file that is translated into pure JS using babel, and whose output is used by index.html.
The code snippet under `const element` looks like HTML but is in fact JSX.
 */

const continents = ['Africa', 'North America', 'South America', 'Asia', 'Australia', 'Europe'];
const helloContinents = Array.from(continents, continent => `Hello, ${continent}!`);
const message = helloContinents.join(' ');

const element = (
    <div id="Outer Div">
        <h1>{message}</h1>
    </div>
);

ReactDOM.render(element, document.getElementById('content'));