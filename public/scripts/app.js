'use strict';

console.log('App.js is running');

// JSX - Javascript XML
var appName = "Todo List";
var template = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        appName.toUpperCase(),
        ' App'
    ),
    React.createElement(
        'p',
        null,
        'Hello World, welcome to the app!'
    )
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
