const express = require('express');
const Tour = require('../Model/Tour'); // Correct import for the Tour model
const router = express.Router();

// Route to get all tours
router.get('/tours', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a specific tour
router.get('/tours/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.json(tour)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new tour
router.post('/tours', async (req, res) => {
    const tour = new Tour({
        name: req.body.name,
        place: req.body.place,
        image: req.body.image,
        title: req.body.title
    });

    try {
        const newTour = await tour.save();
        res.status(201).json(newTour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to update a tour
router.patch('/tours/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (req.body.name) {
            tour.name = req.body.name;
        }
        if (req.body.place) {
            tour.place = req.body.place;
        }
        if (req.body.image) {
            tour.image = req.body.image;
        }
        if (req.body.title) {
            tour.title = req.body.title;
        }

        const updatedTour = await tour.save();
        res.json(updatedTour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Route to delete a tour
router.delete('/tours/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        await tour.remove();
        res.json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
