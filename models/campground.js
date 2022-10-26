const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
})