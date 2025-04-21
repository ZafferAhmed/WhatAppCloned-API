const { admin, db } = require("../utilities/firebase");

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const throttleDocRef = db.collection("throttle").doc(senderId);
    const throttleDoc = await throttleDocRef.get();

    const now = Date.now();

    if (throttleDoc.exists) {
      const lastSent = throttleDoc.data().lastSent;
      if (lastSent && now - lastSent < 1000) {
        return res
          .status(429)
          .json({ error: "Too many messages. Please wait." });
      }
    }
    const timestamp = Date.now();

    const msg = {
      senderId,
      receiverId,
      message,
      timestamp,
    };

    await db.collection("messages").add(msg);

    await throttleDocRef.set({ lastSent: now });

    res.json({ success: true, ...msg });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await db
      .collection("messages")
      .where("senderId", "==", user1)
      .where("receiverId", "==", user2)
      .orderBy("timestamp", "asc")
      .get();

    const messagesReverse = await db
      .collection("messages")
      .where("senderId", "==", user2)
      .where("receiverId", "==", user1)
      .orderBy("timestamp", "asc")
      .get();

    const chat = [...messages.docs, ...messagesReverse.docs].map((doc) =>
      doc.data()
    );
    chat.sort((a, b) => a.timestamp - b.timestamp);
    res.json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
