// This file is used to seed our database

const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {

});

// check if there is an error and print database connected if not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

// Delete everything in the database
const seedDB = async () => {
    await Campground.deleteMany({});
    const c = new Campground({ title: 'purple field' });
    await c.save();
}

seedDB();