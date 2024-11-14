const Car = require("../models/Car");

exports.createCar = async (req, res) => {
  try {
    console.log('Creating car with data:', req.body);
    console.log('User from token:', req.user);

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const carData = {
      user: req.user.userId,
      ...req.body
    };

    const car = new Car(carData);
    await car.save();
    
    console.log('Car created successfully:', car);
    res.status(201).json(car);
  } catch (err) {
    console.error('Error creating car:', err);
    res.status(500).json({ 
      message: "Server Error", 
      error: err.message 
    });
  }
};


exports.getCars = async (req, res) => {
    try {
      const cars = await Car.find(); 
      res.json(cars);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  };

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    res.json(car);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deleteCar = async (req, res) => {
  try {
    console.log("deleted car id",req.params.id);
    await Car.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    res.json({ msg: "Car deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({ 
            _id: req.params.id,
            user: req.user.userId 
        });

        if (!car) {
            return res.status(404).json({ 
                message: "Car not found or you don't have permission to view it" 
            });
        }

        res.json({
            message: "Car details retrieved successfully",
            car: car
        });
    } catch (err) {
        console.error('Error fetching car details:', err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ 
                message: "Invalid car ID format" 
            });
        }
        res.status(500).json({ 
            message: "Server Error", 
            error: err.message 
        });
    }
};
