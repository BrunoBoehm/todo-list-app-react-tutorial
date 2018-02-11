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