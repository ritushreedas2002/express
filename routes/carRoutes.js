const express = require("express");
const {
  createCar,
  getCars,
  updateCar,
  deleteCar,
  getCarById,
} = require("../controllers/carController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               year:
 *                 type: number
 *               mileage:
 *                 type: number
 *               fuelType:
 *                 type: string
 *               transmission:
 *                 type: string
 *               description:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Car created successfully
 *       500:
 *         description: Server error
 */
router.post("/", auth, createCar);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars for the authenticated user
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cars retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   model:
 *                     type: string
 *                   price:
 *                     type: number
 *                   year:
 *                     type: number
 *                   mileage:
 *                     type: number
 *                   fuelType:
 *                     type: string
 *                   transmission:
 *                     type: string
 *                   description:
 *                     type: string
 *                   features:
 *                     type: array
 *                     items:
 *                       type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get("/", auth, getCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   patch:
 *     summary: Update a car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               year:
 *                 type: number
 *               mileage:
 *                 type: number
 *               fuelType:
 *                 type: string
 *               transmission:
 *                 type: string
 *               description:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 model:
 *                   type: string
 *                 price:
 *                   type: number
 *                 year:
 *                   type: number
 *                 mileage:
 *                   type: number
 *                 fuelType:
 *                   type: string
 *                 transmission:
 *                   type: string
 *                 description:
 *                   type: string
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", auth, updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Car deleted"
 *       404:
 *         description: Car not found
 *       401:
 *         description: Not authorized to delete this car
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, deleteCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Car details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 model:
 *                   type: string
 *                 price:
 *                   type: number
 *                 year:
 *                   type: number
 *                 mileage:
 *                   type: number
 *                 fuelType:
 *                   type: string
 *                 transmission:
 *                   type: string
 *                 description:
 *                   type: string
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Car not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get("/:id", auth, getCarById);

module.exports = router;
