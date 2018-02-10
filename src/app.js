import React from 'react';
import ReactDOM from 'react-dom';

console.log('App.js is running!!');

const appName = "Todo List"
const template = (
    <div>
        <h1>{appName.toUpperCase()} App</h1>
        <p>Hello World, welcome to the app!</p>
    </div>
);

const appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);