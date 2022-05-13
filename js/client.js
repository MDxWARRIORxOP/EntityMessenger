/* TODO: 1. add users support, 2. private dms */

/* global constants */
const socket = io("https://fierce-ridge-30030.herokuapp.com/");
const qs = require("qs");

const form = document.getElementById("sendForm");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".messages");

const onlineContainer = document.querySelector(".users");

const users = {};
/* functions */

form.addEventListener("submit", (site) => {
  site.preventDefault();
  const msg = messageInput.value;

  appendMessage(user.name, msg);

  socket.emit("sendMessage", {
    name: user.name,
    message: msg,
    room: user.room,
  });

  messageInput.value = "";
});

let appendMessage = (username, message) => {
  if (!message.includes("has joined the chat!")) {
    if (!message) {
      return;
    }

    if (message.length > 85) {
      window.alert("Please dont send msgs with more than 85 characters");
      return;
    }
  }

  let divElement = document.createElement("div");
  divElement.classList.add("message");

  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let time = `${hours}:${minutes}`;

  let divText = `<span id="messageName">${username}</span> <span id="messageTime">&#32; at ${time}</span><br>
  <span id="messageMessage">${message}</span>`;

  divElement.innerHTML = divText;

  messageContainer.append(divElement);
};

let addToOnline = (username) => {
  let pElement = document.createElement("p");
  pElement.innerHTML = username;

  onlineContainer.append(pElement);
};

/* getting the users name */
let locationSearchArr = location.search.split("?");
let usernameAndRoomObj = qs.parse(locationSearchArr[1]);
let usernameAndRoomObjStringified = qs.stringify(usernameAndRoomObj);

let usernameAndRoomArr = usernameAndRoomObjStringified.split("&");

let usernameArr = usernameAndRoomArr[0].split("=");
let userRoomArr = usernameAndRoomArr[1].split("=");

let username = usernameArr[1];
let userRoom = userRoomArr[1];

/* creating the user variable */
const user = {
  name: username,
  room: userRoom,
  id: socket.id,
};

socket.emit("newUserJoined", user);

socket.on("userJoin", (user) => {
  appendMessage("Team Yayai", `${user.name} has joined the chat!`);
  addToOnline(user.name);
});

socket.on("userLeave", (userName) => {
  appendMessage("Team Yayai", `${userName} has left the chat!`);
});

socket.on("receiveMessage", (data) => {
  appendMessage(data.name, data.message);
});
