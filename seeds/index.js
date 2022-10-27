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
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            // Create a title comprising of random descriptor and random place
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/random/900x600?camping,${i}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium corporis maxime voluptas quam consectetur ipsum molestiae. Repellendus dolorem inventore et ipsam esse? Corporis libero suscipit sequi eius doloremque ipsam debitis?',
            price
        })
        await camp.save();
    }
}

// Close the database connection after executing seedDB()
seedDB().then(() => {
    mongoose.connection.close();
})