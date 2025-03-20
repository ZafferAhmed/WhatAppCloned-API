const { admin, db } = require("../utilities/firebase");

exports.registerOrLogin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
      res.status(200).json({
        success: true,
        user,
        message: "User logged in successfully",
      });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        user = await admin.auth().createUser({
          email,
          password,
          displayName: name,
        });
        await db.collection("users").doc(user.uid).set({
          name,
          email,
          uid: user.uid,
          status: "offline",
        });

        res.status(201).json({
          success: true,
          user,
          message: "User registered successfully",
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};