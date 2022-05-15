const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '627ec4ef2a8c68cd5d96ba1f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ea magni aut cumque. Suscipit perferendis doloribus culpa consequatur repudiandae ea sit iste distinctio fugiat earum, exercitationem error esse nisi quos?',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsp1g2bgv/image/upload/v1652496164/YelpCamp/ovhty6eroeearfqy1b2w.jpg',
                    filename: 'YelpCamp/ovhty6eroeearfqy1b2w',
                },
                {
                    url: 'https://res.cloudinary.com/dsp1g2bgv/image/upload/v1652496155/YelpCamp/jxpqojyer07d1tmuthhk.jpg',
                    filename: 'YelpCamp/jxpqojyer07d1tmuthhk',
                }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})