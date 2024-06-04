const express = require('express');
const Tour = require('../Model/Tour');
const router = express.Router();

// lấy tất cả tour
router.get('/tours', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    try {
        const tours = await Tour.find().skip(skip).limit(limit);
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // try {
    //     const tours = await Tour.find();
    //     res.json(tours);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
});

// lấy tour theo id
router.get('/tours/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.json(tour)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// create tour 
router.post('/tours', async (req, res) => {
    const tour = new Tour({
        name: req.body.name,
        title: req.body.title,
        location: req.body.location,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const newTour = await tour.save();
        res.status(201).json(newTour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update tour 
router.patch('/tours/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (req.body.name) {
            tour.name = req.body.name;
        }
        if (req.body.location) {
            tour.location = req.body.location;
        }
        if (req.body.image) {
            tour.image = req.body.image;
        }
        if (req.body.title) {
            tour.title = req.body.title;
        }
        if (req.body.description) {
            tour.description = req.body.description;
        }

        const updatedTour = await tour.save();
        res.json(updatedTour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// delete tour
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
