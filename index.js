const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log('Existing receipes have been removed');
    return Recipe.create({
      title: 'Ratatouille',
      level: 'Easy Peasy',
      ingredients: [
        'onions',
        'eggplants',
        'zucchinis',
        'pepperonis',
        'tomatoes'
      ],
      cuisine: 'french',
      dishType: 'main_course',
      creator: 'Amélie',
      created: ''
    })
      .then(() => {
        console.log('Receipe was added');
        return mongoose.disconnect();
      })
      .then(() => {
        console.log('Connection has been destroyed');
      });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
