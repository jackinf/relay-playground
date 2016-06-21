class User {
  constructor(id, name, username, website) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.website = website;
  }
}

class Feature {
  constructor(id, name, description, url) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
  }
}

class Todo {
  constructor(id, text, complete) {
    this.id = id;
    this.text = text;
    this.complete = complete;
  }
}

const lvarayut = new User('1', 'Varayut Lerdkanlayanawat', 'lvarayut', 'https://github.com/lvarayut/relay-fullstack');
const features = [
  new Feature('1', 'React', 'A JavaScript library for building user interfaces.', 'https://facebook.github.io/react'),
  new Feature('2', 'Relay', 'A JavaScript framework for building data-driven react applications.', 'https://facebook.github.io/relay'),
  new Feature('3', 'GraphQL', 'A reference implementation of GraphQL for JavaScript.', 'http://graphql.org'),
  new Feature('4', 'Express', 'Fast, unopinionated, minimalist web framework for Node.js.', 'http://expressjs.com'),
  new Feature('5', 'Webpack', 'Webpack is a module bundler that packs modules for the browser.', 'https://webpack.github.io'),
  new Feature('6', 'Babel', 'Babel is a JavaScript compiler. Use next generation JavaScript, today.', 'https://babeljs.io'),
  new Feature('7', 'PostCSS', 'PostCSS. A tool for transforming CSS with JavaScript.', 'http://postcss.org'),
  new Feature('8', 'MDL', 'Material Design Lite lets you add a Material Design to your websites.', 'http://www.getmdl.io')
];

// Fake database is here lol
const todosById = {};
let nextTodoId = 0;

function getUser(id) {
  return id === lvarayut.id ? lvarayut : null;
}

function getFeature(id) {
  return features.find(w => w.id === id);
}

function getFeatures() {
  return features;
}

function getTodo(id) {
  return todosById[id];
}

function getTodos() {
  return Object.values(todosById);
}

function addTodo(text) {
  const todo = new Todo(`${nextTodoId++}`, text, false);
  todosById[todo.id] = todo;
  return todo.id;
}

function changeTodoStatus(id, complete) {
  const todo = getTodo(id);
  todo.complete = complete;
}

function renameTodo(id, text) {
  const todo = getTodo(id);
  todo.text = text;
}

function removeTodo(id) {
  delete todosById[id];
}

/**
 * Add mock data
 */
addTodo('Say hello');
addTodo('Say goodbye');
addTodo('Dance');

export {
  User,
  Feature,
  Todo,
  getUser,
  getFeature,
  getFeatures,
  getTodo,
  getTodos,
  addTodo,
  changeTodoStatus,
  renameTodo,
  removeTodo
};
