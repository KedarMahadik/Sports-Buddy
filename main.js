// Profile Page Logic
if (window.location.pathname.includes("profile.html")) {
    const profileForm = document.getElementById("profile-form");
    const nameInput = document.getElementById("name");
    const sportInput = document.getElementById("sport");
    const skillLevelInput = document.getElementById("skill-level");
  
    // Load User Profile
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUserProfile(user.uid).then((profile) => {
          if (profile) {
            nameInput.value = profile.name || "";
            sportInput.value = profile.sport || "";
            skillLevelInput.value = profile.skillLevel || "";
          }
        });
      }
    });
  
    // Save User Profile
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (user) {
        const profileData = {
          name: nameInput.value,
          sport: sportInput.value,
          skillLevel: skillLevelInput.value,
        };
        saveUserProfile(user.uid, profileData).then(() => {
          alert("Profile saved successfully!");
        });
      }
    });
  }
  
  // Events Page Logic
  if (window.location.pathname.includes("events.html")) {
    const eventList = document.getElementById("event-list");
    const createEventForm = document.getElementById("create-event-form");
    const eventNameInput = document.getElementById("event-name");
    const eventDateInput = document.getElementById("event-date");
    const eventLocationInput = document.getElementById("event-location");
  
    // Load Events
    auth.onAuthStateChanged((user) => {
      if (user) {
        getEvents().then((events) => {
          eventList.innerHTML = events
            .map(
              (event) => `
              <div class="card mb-3 shadow">
                <div class="card-body">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                  <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                  <p class="card-text"><strong>Organizer:</strong> ${event.organizer}</p>
                  <a href="#" class="btn btn-primary">Join Event</a>
                </div>
              </div>
            `
            )
            .join("");
        });
      }
    });
  
    // Create Event
    createEventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (user) {
        const eventData = {
          name: eventNameInput.value,
          date: eventDateInput.value,
          location: eventLocationInput.value,
          organizer: user.email,
        };
        createEvent(eventData).then(() => {
          alert("Event created successfully!");
          createEventForm.reset();
        });
      }
    });
  }
  
  // Chat Page Logic
  if (window.location.pathname.includes("chat.html")) {
    const chatWindow = document.getElementById("chat-window");
    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message-input");
  
    // Load Chat Messages
    auth.onAuthStateChanged((user) => {
      if (user) {
        getChatMessages().then((messages) => {
          chatWindow.innerHTML = messages
            .map(
              (message) => `
              <div class="message">
                <strong>${message.sender}:</strong> ${message.text}
              </div>
            `
            )
            .join("");
        });
  
        // Listen for New Messages
        listenForChatMessages((messages) => {
          chatWindow.innerHTML = messages
            .map(
              (message) => `
              <div class="message">
                <strong>${message.sender}:</strong> ${message.text}
              </div>
            `
            )
            .join("");
          chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
        });
      }
    });
  
    // Send Chat Message
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (user) {
        const messageData = {
          sender: user.email,
          text: messageInput.value,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
        sendChatMessage(messageData).then(() => {
          messageInput.value = ""; // Clear the input field
        });
      }
    });
  }