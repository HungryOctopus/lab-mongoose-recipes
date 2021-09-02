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

  //Iteration 2: add a receipe
  .then(() => {
    console.log('Existing receipes have been removed');
    return (
      Recipe.create({
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
        created: new Date()
      })
        .then(() => {
          console.log('Receipe was added');
        })
        // Iteration 3: insert multiple receipe
        .then(() => {
          return Recipe.insertMany(data).then(() => {
            console.log('Those receipes were added: ', data);
          });
        })

        //Iteration 4: update

        .then(() => {
          return Recipe.findOneAndUpdate(
            { title: 'Rigatoni alla Genovese' },
            { duration: 100 }
          );
        })
        .then(() => {
          console.log('The duration of the Rigatoni was changed');
        })

        //Iteration 5: delete
        .then(() => {
          return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
        })

        .then(() => {
          console.log('The Carrot Cake was deleted');
        })

        .then(() => {
          return mongoose.disconnect();
        })
        // Iteration 6: close the database
        .then(() => {
          console.log('Connection has been destroyed');
        })
    );
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
