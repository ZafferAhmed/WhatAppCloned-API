const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");
const uploadController = require("../controllers/uploadController");
const { admin, db } = require("../utilities/firebase");

/**
 * @swagger
 * /api/register-or-login:
 *   post:
 *     summary: Register a new user or log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register-or-login", authController.registerOrLogin);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all registered users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all registered users
 *       400:
 *         description: Bad request
 */
router.get("/users", authController.getUsers);

/**
 * @swagger
 * /api/send-message:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *               receiverId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 */
router.post("/send-message", messageController.sendMessage);

/**
 * @swagger
 * /api/messages/{user1}/{user2}:
 *   get:
 *     summary: Get messages between two users
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: user1
 *         required: true
 *         schema:
 *           type: string
 *         description: First user ID
 *       - in: path
 *         name: user2
 *         required: true
 *         schema:
 *           type: string
 *         description: Second user ID
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       400:
 *         description: Bad request
 */
router.get("/messages/:user1/:user2", messageController.getMessages);

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/upload",
  uploadController.upload.single("file"),
  uploadController.uploadFile
);



module.exports = router;