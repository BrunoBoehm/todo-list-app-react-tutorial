# Create the project

Checked out node version in terminal `node -v`.
Checked npm version in terminal `npm -v` and updated it `npm i -g npm`.
Then checked yarn version `yarn --version`.

Created the project folder.

# Create a simple server

Installed locally live-server `yarn add live-server` and it createda node_modules folder, as well as package.json and yarn.lock files.

Created a gitignore file `touch .gitignore` with node modules inside.

Checked live-server was installed correctly `live-server -v`. it doesn't work because the path is not right. Let's create a script inside of package.json.

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