# Create the project

Checked out node version in terminal `node -v`.
Checked npm version in terminal `npm -v` and updated it `npm i -g npm`.
Then checked yarn version `yarn --version`.

Created the project folder.

# Create a simple server

Installed locally live-server `yarn add live-server` and it createda node_modules folder, as well as package.json and yarn.lock files.

Created a gitignore file `touch .gitignore` with node modules inside.

Checked live-server was installed correctly `live-server -v`. It doesn't work because the path is not right. Let's create a script inside of package.json.

```json
{
  "scripts": {
    "serve": "live-server public/"
  },
  "dependencies": {
    "live-server": "^1.2.0"
  }
}

```

Can now use `yarn run serve` in terminal and it opens the app !

# Install react

Let's install React using a script tag and taking it from a CDN.

We need react and react-DOM (companion to render in the browser... not react for VR!) so let's add it in the body:
```html
<script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
```

Note: Later we'll be able to import React and ReactDOM using webpack.

We now need a file to boot our JS code. let's create `/scripts/app.js`.
Let's not forget to reference it in the body below our calls for react scripts
```html
<script src="/scripts/app.js"></script>
```

in the browser we can now check `React` and `ReactDOM` variables are available from the console.

# Render JSX to the browser

Let's add some JSX code to our app.js file
```js
// JSX - Javascript XML
var template = <p>JSX from app.js!</p>;
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

If we try to render to the screen it will fail since the browser cannot read JSX. We need to compile it down as plain old javascript. We'll use Babel, a javascript compiler that takes new techniques and bring them don to ES5 javascript.

Babel will translate our JSX into `React.createElement()` calls. The browser understands regular function calls on the React object we've made available in our scripts.

Let's install Babel locally. We will need to install plugins and presets (groups of plugins) like the "react" preset and also "env" that gives us access to "es2015", "es2016", "es2017" and "latest".

Let's shutdown the app server with `ctrl + C`, and install Babel locally with `yarn add babel-cli`.
We can also install our 2 presets with `yarn add babel-preset-react babel-preset-env`.

And at last, we can add a new script to run babel from a source folder (create `src` in the root, and inside duplicate the old app.js containing the JSX) and output the compiled version in our public/scripts one. 

The package.json should look like this (note we could run `yarn install` to reinstall all of our node_modules:
```json
{
  "scripts": {
    "serve": "live-server public/",
    "build": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "live-server": "^1.2.0"
  }
}
```

Now we can start our `yarn run build` and in another window `yarn run serve`... and it should all work out.

Now we can have fun writing JSX, for instance
```js
var appName = "Todo List"
var template = (
    <div>
        <h1>{appName.toUpperCase()} App</h1>
        <p>Hello World, welcome to the app!</p>
    </div>
);
```
Note how we can use () to format code nicely.

# Installing Webpack

Webpack is going to create one single "bundle" javascript file that will contain all dependencies and application code. There will just be one single script tag in our HTML, and our website will be able to make on single request - much faster!

Now with webpack we're not relying on the global javascript namespace, having to require the scripts one after the other in the correct order. Our app will be structures with the following folders:
- public/ for serving assets (index.html and our bundle.js made by Webpack)
- src/ for our client-side javascript (app.js and all of our javascript files)
- node_modules/ for third-party dependencies (react.js react-dom.js ...)

We're not just concatenating and minifying the multiple javascript files like Gulp or Grunt, instead we can create a multitude of javascript files that can communicate with `import` and `export` ES6 syntax.

We will also be able to import third-party dependencies (that live in the npm_modules folder) in each of these files, from yarn and npm.

In the terminal we can `yarn add webpack` it will install the dependencies into node_modules, and we can now access it via scripts in our package.json and create a build command for running webpack. The scripts run by the webpack command will be defined next and it's going to be much more manageable than having everything into our package.json scripts.

```json
{
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "live-server": "^1.2.0",
    "webpack": "^3.11.0"
  }
}
```
Note we renamed our babel script, we're not actually going to need it anymore as webpack will be in charge of running Babel.

Let's create a configuration file for our webpack command: `webpack.config.js` in the root of our folder. This is actually a node script. In there, we create a module export with an object that will be made available to webpack, containing an input (where to take the file to process) and output (where to put the bundled version).


Note the `output` takes a path relative to our machine for the public folder of our app. We can use `__direname` to print the name of our current location. We'll use node `path.join()` javascript method to make sure the paths can be concatenated neatly. 

Making sure we comment out any JSX code (we don't have the babel setup yet in our webpack config), we can run `yarn run build` and voila: a now have a `bundle.js` file in our public folder. Also with the `--watch` parameter it will now wait for updates and rebundle anytime the source file gets saved.

We can remove our scripts folder, and also reference our single javascript file in out index.html with `<script src ="/bundle.js"></script>` (note the root of the webserver is `public/`).

Now we can restart our server with `yarn run serve` and check our app is working with this minimal webmack setup!

## Adding Babel

We'll use a loader for Babel. We will use `babel-core` (`babel-cli` was for using Babel inside the CLI). Let's `yarn add babel-core` and also add `yarn add babel-loader` (a webpack plugin to teach webpack how to treat certain files and use Babel on them).

In our webpack file, we can create a [module](https://webpack.js.org/concepts/loaders/) for our loader, and use regular expression to ask it to process all files finishing with .js except those in node_modules (already ready for production).

```js
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    }
}
```

And now we need to configure babel with our presets, we'll create a `.babelrc` json file containing the reference to the env and react presets we need.
```json
{
  "presets": [
    "env",
    "react"
  ]
}
```

Let's now work on our app.js and import React and ReactDOM.
We can `yarn add react react-dom` in the terminal and then update our app.js file to import both npm modules

```js
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
```

We can now uncomment our JSX code, `yarn run build`, `yarn run serve` and check out our browser ... yay, all systems operational!

## Adding sourcemaps

Let's add source maps by adding a `devtool` line to our webpack config file. It will make debugging faster!
```js
devtool: 'cheap-module-eval-source-map'
```

## Installing the dev server

Let's add it `yarn add webpack-dev-server` and use `contentBase` in our webpack.config.js so that it knows where to find our public folder.
```js
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
```

We can now change our package.json file to setup the dev server
- we can remove the babel-build (don't need it anymore since webpack takes care of Babel)
- let's stop `--watch` on our build, we'll only use it for production now
- lets add a "dev-server" script to take care of running the server

We don't need to run a build and a server anymore, this new script will take care of the 2 jobs.

```json
{
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack",
    "dev-server": "webpack-dev-server"
  },
  ...
}  
```
We can now run `yarn run dev-server` and access our new page. Now note that the bundle.js file is only generated by our `yarn run build`, whereas the dev server makes it available from memory. We will use build only for production.

# Styling React

We'll use SCSS, inside a new `src/styles/` directory. Let's create a styles.css file in there.

In our webpack config we will create a new module with a test and a css-loader (import the css into a javascript representation) and style-loader (inject into the dom with a `<style>` tag.) : `yarn add style-loader css-loader`.

In our webpack config we'll use `use` with an array of loaders.
```js
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}
```

We can now import our style.css file into our app.js src file with `import './styles/styles.css';`.

Now when we'll `yarn run build` it will add our CSS.

## Improving with SCSS
We need a loader for SCSS to process `.scss files` into regular CSS.

Let's update our test to look for SCSS files: `test: /\.scss$/`, and write some SCSS code to test it our in style.scss (rename the file)

```scss
$main-color: red;

* {
    color: $main-color;
}
```

We need to modify our import statement `import './styles/styles.scss';`.

We need to install `yarn add sass-loader` (to enable us to import the sass files) and `yarn add node-sass` (converts scss to css). We just then need to add our `sass-loader` to our `use` array.

```js
...
module: {
    rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
    }, {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    }]
}
...
```

## SCSS architecture and production setup

We can create a `styles/base/` folder to host our SCSS partials (using the _ syntax), let's create `_base.scss` and `_settings.scss` (for our colors, sizes...) and dump some basic styling in the base file.
```scss
// 1 rem = 16px means 16px*.625 = 10px enabling us to work on base 10
// 2.2rem = 22px now
html {
  font-size: 62.5%;
}

body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1.6rem;
}

h1 {
    font-size: 2.2rem;
}
```

We can now import this partial into our main root styles.scss file with the path to this partial `@import './base/base';`.

We can also create another folder to style our components, like `styles/components/_header.scss` and import it with `@import './components/header'` in our styles.scss file.

Note: we can use the [BEM](http://getbem.com/) syntax to avoid complex nesting
- Block: something big like a `.header` block
- Element: something that goes inside the block like `.header__title`
- Modifier: a variation of an element like, `.header__title--unselected`

We can also add a CSS reset with "normalize css": `yarn add normalize-css` and import it in the app.js file (above the main CSS import) `@import 'normalize-css/normalize.css';` (reference to the normalize-css folder in node_modules). Now we just need to change our test to also accept and load CSS files `test: /\.s?css$/`.

## Favicon bonus
Let's add a favicon by creating an images folder: `public/images/` and loading the dummy react favicon.

We can now add it from our index.html with a link
```html
<link rel="icon" type="image/x-icon" href="/images/favicon.ico">
```
Note if the icon was a png we could use `type="image/png"`.

## Mobile considerations
Currently if we use the chrome mobile view we'll see the website zooms out around /3, this hasn't been optimized for the phone... it uses by default a virtual viewport and tries to fit the iphone default 980px width to 320px. We need to tell mobiles to use the mobile actual width for displaying our content.

We can use a viewport meta tag with `width=device-width` (overrides the 980px default on iOS devices) and also the `initial-scale=1`. In our index.html file:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Now we can use media queries to handle small devices, for example:
```css
@media (min-width: 45rem) {
  * {
    color: red;
  }
}
```

# One react component per file

We can store our component files in a `src/components/` folder.
Each component file will export (default or named export) and then from the main app.js file we can import (in curly braces for named exports, and with any name for a default export). We can leave the .js extension because we're using webpack.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'normalize-css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<App />, document.getElementById('app'));
```

Our App.js stateless functional component can look like this (note how the function is the equivalent to `render()`)
```js
import React from 'react';

const App = () => {
    return (
        <div>
            <h1>App</h1>
            <p>Hello World! Welcome to the app!</p>
        </div>
    )
};

export default App;
```
Note: in a functional component we can't use state, but we can use props. Remember functional components don't have access to `this`, instead we pass a `props` object as an argument of the function. For instance we could call `<App name="Boilerplate" />` and use the props in the component like so:
```js
import React from 'react';

const App = (props) => {
    return (
        <div>
            <h1>{props.name} App</h1>
            <p>Hello World! Welcome to the app!</p>
        </div>
    )
};

export default App;
```

Or if we prefer we can already create a class component (note it's always uppercase letter to signify it's a component), but of course with so little functonalities it's an overkill and not so great for performance (it has the overhead of extending the class).
```js
import React from 'react';

class App extends React.Component {
    render() {
      return (
        <div>
            <h1>App</h1>
            <p>Hello World! Welcome to the app!</p>
        </div>
      )
    };
};

export default App;
```


*Note that for functional/presentational components, it is better to use the const syntax and give the component a name, since this will be used in the react devtools to identify the component.*

```js
import React from 'react';
// don't do this
export default (props) => {
  ...
};

// do this
export const Component = (props) => {
  ...
};

// or do this
const Component = (props) => {
  ...
};
export default Component;
```

# React Router

Let's install `yarn add react-router-dom` (more specific to building a web app than the general `react-router`).

Let's import named exports from react-dom by adding the import to our opening app.js root file.
```js
import { BrowserRouter, Route } from 'react-router-dom';
```
`BrowserRouter` will be used once to create our router, and `Route` will be used to create each of our routes.

We can now create our router and routes. Note `<BrowserRouter>` takes one single `<div>` containing all routes. We can just make sure to have our components imported and actually defined.

```js
const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/contact" component={ContactPage}/>
    </div>
  </BrowserRouter>
);
```
Note we have a 404 default page.

Now if we access the /contact page we wouldn't be able to access it and would be welcomed by a `Cannot GET /contact`. We need to tell our dev-server that the routing will be handled on the client side, and that it can return the index.html for any page, that will load the bundle.js and then the router will render /create. For this we can add in our webpack devServer config:
```js
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
```
We need to restart the dev-server for this to work. We will change that later on for production.

## 404
We can improve this with a 404 page, by using the <Switch> component, that will go and stop when it finds a match. We won't see the 404 if there's a match before.
```js
const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/contact" component={ContactPage}/>
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
```

Let's not forget to add switch to our import
```js
import { BrowserRouter, Route, Switch } from 'react-router-dom';
```

## Adding links
We can use the react-router `<Link>` and `<NavLink>` components.
```js
const NotFoundPage = () => {
    return (
        <p>This is the 404 page - <Link to="/">Go Home</Link></p>
    )
};
```
And not forget to add it to the named import `import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';`

We can improve this for more complex use like a navigation and active props, by using `<NavLink>`.
Let's import it `import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';`.

We can create a <Header> component and start using `activeClassName`
```js
const Header = () => (
  <header>
    <h1>Nav App Title</h1>
    <NavLink to="/" activeClassName="is-active" exact={true} >Homepage</NavLink>
    <NavLink to="/contact" activeClassName="is-active">Contact</NavLink>
  </header>
);
```
*Note we need to use `return` if we use {} on our function. If we're using the implicit return, we can use () for a better layout, but it's not technically needed.*

We can add a styling for `.is-active` in our `_base.scss`
```css
.is-active {
    font-weight: bold;
}
```
Now we've hijacked the browser way to handle links and we don't rely on the server anymore.

## Cleaning the routes
We can now clean this a little by putting our router to its specific file, and other pages components too.

In our `src/` folder we can create a new folder `src/routers/` containing a component file called `AppRouter.js`.
```js
import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={App} exact={true} />
                <Route path="/contact" component={ContactPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
```
Note how we use ES6 implicit function return.

We can also organize our pages components into a `src/pages/` folder to separate pages templates from componenets. Let's not forget to import and export all elements needed byt the pages. For example the Header component looks like
```js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
      <h1>Nav App Title</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Homepage</NavLink>
      <NavLink to="/contact" activeClassName="is-active" >Contact</NavLink>
    </header>
);

export default Header;
```

## Routes with params
We can pass params to our URLs, hashes, query strings... and get them from the props of the rendered component.

`<Route path="/edit/:id" component={EditPage} />` would enable the `EditPage` component to access `props.match.params.id`, like:
```js
const EditPage = (props) => {
  return (
    <div>
      Editing the id: {props.match.params.id}
    </div>
  )
}
```
Note how we need to pass in props to the arrow function to be able to access them inside. Also note that this is only available to components referenced inside of the `<Route />` component. 

# React and Redux INTRO
Lets connect our React app to the Redux store, by using connected components (components connected to the redux : the can fetch values from the store, and dispatch actions to the store - *reacting* to user interactions).

We can create 4 different folders inside of our `src/` folder:
- actions (actions only describe the fact that *something happened*) or more precisely action generators (functions that return an action)
- reducers (describe how the application's state changes in response to actions sent to the store), it is a pure function that takes the previous state and an action, and returns the next state `(previousState, action) => newState`
- store
- selectors (queries to the reduc store)

Let's also add redux to our project `yarn add redux`. Make sure to restart the dev server for changes to pick up `yarn run dev-server`

## Store
Let's create a `src/store` folder and create our store in there.

We need to import the `createStore` (named export) function from redux. It takes a functoin as argument, that itself takes `state` and an `action` as parameters. We're only going to call it once to kick things off, there is no state the first time the function gets called, but then it will evolve as soon as we dispatch actions and it gets called again.

The `state` argument takes a default, like the default object `{}` containing what we need. We don't neet a default value for the `action`.

Simplest configuration would be 
```js
import { createStore } from 'redux';

const store = createStore( ( state = {} ) => {
    return state;
});

console.log(store.getState());
```

We can use `store.getState();` to fetch/get the current state object, and check it by `console.log`.

Now we can configure the store to receive actions. We test for the action type using `action.type` and then return a new state object. Note we don't change the state directly, instead we return an object (the new state).

```js
import { createStore } from 'redux';

const store = createStore( ( state = { count: 0 }, action ) => {
    if (action.type === 'INCREMENT') {
        return {
            count: state.count + 1
        };
    } else {
        return state;
    }
} );

console.log(store.getState());
// Object { count: 0}

store.dispatch({
    type: 'INCREMENT'
})

console.log(store.getState());
// Object { count: 1}
```

However it is often easier to use a `switch` statement, it is easier to scale and read.
```js
import { createStore } from 'redux';

const store = createStore( ( state = { count: 0 }, action ) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        default:
            return state;
    }
} );
```

### Subscribing to the store
To be able to rerender our application we can subscribe to the store (instead of manually calling `store.getState()`). Redux gives us `store.subscribe()` and it takes a function. It will be called each and every time the store changes. The simplest configuration would be.
```js
store.subscribe( () => {
    console.log(store.getState());
});
```
This will log the state each time an action is dispatched and the store changes.

To stop subscribing at some point we can just call it again, calling the return function of `subscribe()` without any argument.
```js
const unsubscribe = store.subscribe( () => {
    console.log(store.getState());
});

unsubscribe();
```

### Dynamic actions
Now note that if we need to pass dynamic values to our actions, we can write it like this
```js
store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
})
```

But now we need to update our store, and we can handle dynamic action value by testing `action.incrementBy` using the ternary operator to see if there is a value.
```js
import { createStore } from 'redux';

const store = createStore( ( state = { count: 0 }, action ) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + incrementBy
            };
        default:
            return state;
    }
} );
```

## Reducers
A reducer describes how to change the state based on an action. Let's refactor.
```js
import { createStore } from 'redux';

const countReducer = ( state = { count: 0 }, action ) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + incrementBy
            };
        default:
            return state;
    }
}

const store = createStore( countReducer );
// note we just reference it, and not calling it.
```

A reducer is a pure function. The output is only determined by the input : `state` and `action` (no external influence). For instance the following is not a pure function.
```js
let a = 10;
const add = (b) => {
    return a + b;
};
```

Note also the second rule of a reducer is that we never change/mutate directly state or action. We just return state in a new object instead.

### Combining reducers
When we have more complex apps and more complex state made of several parts, we need to use several reducers.
To do so we can use `combineReducers` from the Redux library: 
```js
import { createStore, combineReducers } from 'redux';

const store = createStore(
    combineReducers({
        todos: todosReducer,
        filters: filtersReducer
    })
);
```
CombineReducers takes an honest object with 
- keys as root property state name
- value is the reducer that handles it


## Actions & Actions generators
In the `src/actions` folder let's create a `todos.js` file to host our action generators.

Actions allow us to communicate with and change the redux store, like "create a note", “edit a note". Actions are an object that gets sent to the store, it has a payload of 
- the type of action we'd like to take like "walk", "stop_walking" and the convention is to write them UPPERCASE_ACTION.
- the content (dynamic information from user input)

We send an action the the store using the `dispatch()` function on the store.

We can improve all of our `dispatch()`calls using action generators and using object/array ES6 destructuring.
Action generators are function that return action objects. It will make the action shorter and less error prone (typing `type: 'INCREMENT'` is open to easy typos).

The action generator is a function that takes input in and returns the action as an object.
```js
const incrementCount = () => {
    return {
        type: 'INCREMENT'
    };
};
```
That can be rewritten using the shorthand syntax of implicit return (wrapping the return object in parentheses)
```js
const incrementCount = () => ({
    type: 'INCREMENT'
});
```
We can now call `store.dispatch(incrementCount());`.

Let's now make it work by calling it with an argument: `store.dispatch(incrementCount( { incrementBy: 5 } ));`.
To make this work we just need to update our action generator
```js
const = incrementCount = (payload = {}) => ({
    type: 'INCREMENT',
    incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});
```
We need the default in the action generator because if we don't and don't provide an argument, when we'll try to access the incrementBy property of the undefined payload, it will throw an error.

We can update our store switch to read the value from `action.incrementBy`.
```js
import { createStore } from 'redux';

const store = createStore( ( state = { count: 0 }, action ) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        default:
            return state;
    }
} );
```

Thanks to destructuring `{ incrementBy = 1 }` (and default value) we can even take it one step further...
```js
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
    // similar to 
    // incrementBy: incrementBy
});
```
It is now way easier to make these funciton calls (action generators) instead of writing the action over and over again.

# Setuping Redux

## Store
Our state would look something like
```js
const demoState = {
    todos: [{
        id: 'kejfnjefn',
        title: 'Homework', 
        description: 'Do my homework',
        priority: 10,
        createdAt: 0
    }],
    filters: {
        text: 'homework',
        sortBy: 'priority',
        startDate: undefined,
        endDate: undefined
    }
}
```

Let's create a `configureStore.js` file in our `src/store/` folder.
```js
import { createStore, combineReducers } from 'redux';
import todosReducer from '../reducers/todos';
import filtersReducer from '../reducers/filters';

// const store = createStore( todosReducer );

export default () => {
    const store = createStore(
        combineReducers({
            todos: todosReducer,
            filters: filtersReducer
        })
    );
    return store;
}

// console.log(store.getState());
```
The `combineReducers` setup will enable us to add several reducers.

Let's call our store from the root `app.js` file
```js
import configureStore from './store/configureStore';
```
As we set it up, calling configureStore like const `store = configureStore();` will setup the store and return the store as an object.

## Reducers Basic setup
Let's create a `todos.js` and `filters.js` file in our `src/reducers` folder.

Inside of `todos.js` we can setup the basics:
```js
const todosReducerDefaultState = [];

const todosReducer = ( state = todosReducerDefaultState, action ) => {
    switch (action.type) {
        default:
            return state;
    };
};

export default todosReducer;
```

Inside of `filters.js`:
```js
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'priority',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = ( state = filtersReducerDefaultState, action ) => {
    switch (action.type) {
        default: 
            return state;
    };
};

export default filtersReducer;
```
Now when we log the initial state with `console.log(getState());` we return an object with two properties thanks to `combineReducers` (todos and filters).
Of course make sure both reducers are exported and imported...

## Dispatching actions with action generators
Inside of our `src/actions` folder, let's create action generators.

For our `todos.js` file we can setup 3 action generators and export them using named exports.
```js
import uuid from 'uuid';

// ADD_TODO
export const addTodo = ( { title = '', description ='', priority = 0, createdAt = 0 } = {} ) => ({
    type: 'ADD_TODO',
    todo: {
        id: uuid(),
        title, 
        description,
        priority,
        createdAt
    }
});

// REMOVE_TODO
export const removeTodo = ( {id } = {} ) => ({
    type: 'REMOVE_TODO',
    id
});

// EDIT_TODO
export const editTodo = ( { id, updates } = {} ) => ({
    type: 'EDIT_TODO',
    id, 
    updates
});
```
Note we destructure the firts argument of the action generator, and if it doesn't exist we destructure an empty object.

## Improving our reducers to handle dispatched actions
Inside of `todos.js`:
```js
const todosReducerDefaultState = [];

const todosReducer = ( state = todosReducerDefaultState, action ) => {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat(action.todo);
        default:
            return state;
    };
};

export default todosReducer;
```
Remember we don't want to mutate/change the state directly, we just want to read off of it. This is why we never use `state.push()`. The non-destructive method is `state.concat()` that combines the previous state and adds another item and returns a new array.

There is actually another way to do it using the ES6 spread operator.
```js
const todosReducerDefaultState = [];

const todosReducer = ( state = todosReducerDefaultState, action ) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.todo];
        case 'REMOVE_TODO':
            return state.filter( ({ id }) => id !== action.id );
        case 'EDIT_TODO':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {...expense, ...action.updates};
                } else {
                    return expense;
                };
            });
        default:
            return state;
    };
};

export default todosReducer;
```
We also use for the 'REMOVE_TODO' the `filter()` function, that returns a new array, and takes a function that returns true (and keeps the item) or false. We take in an array of `todo` items that we destructure and only take the first parameter `{ id }`. We can even simplify it further using implicit return.
```js
// from
return state.filter((  { id } ) => {
    return id !== action.id
});   

// to
return state.filter((  { id } ) => id !== action.id );
```

To setup the edit action, we also use the object spread operator by adding it `yarn add babel-plugin-transform-object-rest-spread` and adding it to our plugins in `.babelrc`.
```js
    "plugins": [
      "transform-object-rest-spread"
    ]
```
We then use the `map()` function to return a new array containing all of the todos, including the edited one. We take all existing properties of the item to edit, and spread out the properties that need to be updated.

We can also add the actions genetors for filters inside of `src/action/filters.js`
```js
// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SORT_BY_PRIORITY
export const sortByPriority = () => ({
    type: 'SORT_BY_PRIORITY'
})

// SET_END_DATE
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})
```

And we can create the reducer for filters inside of `src/reducers/filters.js`
```js
const filtersReducerDefaultState = {
    text: 'homework',
    sortBy: 'priority',
    endDate: undefined
}

const filtersReducer = ( state = filtersReducerDefaultState, action ) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_PRIORITY':
            return {
                ...state,
                sortBy: 'priority'
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default: 
            return state;
    };
};

export default filtersReducer;
```

## Creating the Selectors
Let's create a `src/selectors/todos.js` file and a basic setup would be
```js
export default ( todos, filters ) => {
    return todos;
}
```

Now if we import it with `import getVisibleTodos from './selectors/todos';` and subscribe to the store like so
```js
store.subscribe(() => {
    const state = store.getState();
    const visibleTodos = getVisibleTodos( state.todos, state.filters );
    console.log(visibleTodos);
});
```
We will be able to see printed the `return` of all `todos`... let's make it filter them! The state gets updated with parameters to filter, and then we print the results.

We can destructure `filters` and then use the `filter()` function to only return the item of the `state.todos` array if all filtering conditions are `true`. Let's only filter, we'll order after.
```js
export default ( todos, {text, sortBy, endDate} ) => {
    return todos.filter((todo) => {
        const textMatch = todo.description.toLowerCase().includes(text.toLowerCase());
        const endDateMatch = typeof endDate !== 'number' || todo.createdAt <= endDate ;

        return textMatch && endDateMatch;
    });
};
```

Timestamps are counted in milliseconds taken from January 1st 1970 (unix epoch).
If the endDate is not a number, the `typeof` will evaluate to true and the item will pass the filter test.
If the endDate is a number, the `typeof` will evaulate to false, and the second test will determine if the item should be filtered out or not.
We have and `endDate` match if the endDate is not equal to a number or if the timing conditions is right.

We can now put some sorting in place, using `sort()`. We need to define a compare function to be able to sort our array of objects.

```js
export default ( todos, {text, sortBy, endDate} ) => {
    return todos.filter( (todo) => {
        const textMatch = todo.description.toLowerCase().includes(text.toLowerCase());
        const endDateMatch = typeof endDate !== 'number' || todo.createdAt <= endDate ;

        return textMatch && endDateMatch;
    }).sort( (a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1 ;
        }

        if (sortBy === 'priority') {
            return a.priority < b.priority ? 1 : -1 ;
        }
    });
};
```


## Testing it out
Now we have our action generators in place, we can test it out and dispatch some test actions like so, in `app.js`:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addTodo, removeTodo, editTodo } from './actions/todos';
import { setTextFilter, sortByDate, sortByPriority, setEndDate } from './actions/filters';
import getVisibleTodos from './selectors/todos';
import 'normalize-css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    const visibleTodos = getVisibleTodos( state.todos, state.filters );
    console.log(visibleTodos);
});

const todoOne = store.dispatch( addTodo({ title: 'First Title', description: 'First Description'}) );
const todoTwo = store.dispatch( addTodo({ title: 'Second Title', description: 'Second Description'}) );

store.dispatch( removeTodo({ 
    id: todoOne.todo.id 
}));
store.dispatch( editTodo({ 
    id: todoTwo.todo.id,
    updates: { title: 'Edited Todo Two' }
}));
store.dispatch( setTextFilter('sprint') );
store.dispatch( sortByPriority() );
store.dispatch( sortByDate() );
store.dispatch( setEndDate(15789) );

ReactDOM.render(<AppRouter />, document.getElementById('app'));
```