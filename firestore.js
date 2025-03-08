// Initialize Firestore
const db = firebase.firestore();

// Save User Profile
function saveUserProfile(userId, profileData) {
  return db
    .collection("users")
    .doc(userId)
    .set(profileData)
    .then(() => {
      console.log("Profile saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving profile:", error);
    });
}

// Get User Profile
function getUserProfile(userId) {
  return db
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such profile found!");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error getting profile:", error);
    });
}

// Create Event
function createEvent(eventData) {
  return db
    .collection("events")
    .add(eventData)
    .then(() => {
      console.log("Event created successfully!");
    })
    .catch((error) => {
      console.error("Error creating event:", error);
    });
}

// Get Events
function getEvents() {
  return db
    .collection("events")
    .get()
    .then((querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      return events;
    })
    .catch((error) => {
      console.error("Error getting events:", error);
    });
}

// Send Chat Message
function sendChatMessage(messageData) {
  return db
    .collection("messages")
    .add(messageData)
    .then(() => {
      console.log("Message sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}

// Get Chat Messages
function getChatMessages() {
  return db
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get()
    .then((querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      return messages;
    })
    .catch((error) => {
      console.error("Error getting messages:", error);
    });
}

// Real-Time Chat Listener
function listenForChatMessages(callback) {
  return db
    .collection("messages")
    .orderBy("timestamp", "asc")
    .onSnapshot((querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      callback(messages);
    });
}