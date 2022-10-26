// This file is used to seed our database

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {

});

// check if there is an error and print database connected if not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

// Pass in an array and return a random element from that array
const sample = array => array[Math.floor(Math.random() * array.length)];

// Delete everything in the database
const seedDB = async () => {
    await Campground.deleteMany({});
    // create a loop to add 50 random cities in database
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            // Create a title comprising of random descriptor and random place
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

// Close the database connection after executing seedDB()
seedDB().then(() => {
    mongoose.connection.close();
})