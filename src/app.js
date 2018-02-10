console.log('App.js is running');

// JSX - Javascript XML
var appName = "Todo List"
var template = (
    <div>
        <h1>{appName.toUpperCase()} App</h1>
        <p>Hello World, welcome to the app!</p>
    </div>
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);