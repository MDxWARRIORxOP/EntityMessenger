/* TODO: 1. add users support, 2. private dms */

/* global constants */
import { nanoid } from "nanoid";

const socket = io("https://fierce-ridge-30030.herokuapp.com/");
const qs = require("qs");

const form = document.getElementById("sendForm");
const messageInput = document.getElementById("messageInput");

const messageContainer = document.querySelector(".messages");
const onlineContainer = document.querySelector(".users");

const users = [];
/* functions */

form.addEventListener("submit", (site) => {
  try {
    site.preventDefault();
    const msg = messageInput.value;

    appendMessage(user.name, msg);

    socket.emit("sendMessage", {
      name: user.name,
      message: msg,
      room: user.room,
    });

    messageInput.value = "";
  } catch (e) {
    console.error(e);
  }
});

let appendMessage = (username, message) => {
  try {
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

    let id = nanoid();
    // sorry for messy html
    let divText = `
    <span id="messageName">${username}</span>
    &nbsp;
    <span id="messageTime">&#32; at ${time}
    </span>
    &nbsp;&nbsp;
    <button id="editButton" onclick="editButtonEvent()">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button id="deleteButton" onclick='deleteButtonEvent()'>
      <i class="fa-solid fa-trash"></i>
    </button>
    <br>
    <span id="messageMessage">${message}</span>`;

    divElement.innerHTML = divText;

    messageContainer.append(divElement);
  } catch (e) {
    console.error(e);
  }
};

let addToOnline = (username) => {
  try {
    let liElement = document.createElement("li");
    liElement.innerText = username;

    liElement.classList.add("liElement");

    onlineContainer.append(liElement);
  } catch (e) {
    console.error(e);
  }
};

let getUser = () => {
  try {
    let locationSearchArr = location.search.split("?");
    let usernameAndRoomObj = qs.parse(locationSearchArr[1]);
    let usernameAndRoomObjStringified = qs.stringify(usernameAndRoomObj);

    let usernameAndRoomArr = usernameAndRoomObjStringified.split("&");

    let usernameArr = usernameAndRoomArr[0].split("=");
    let userRoomArr = usernameAndRoomArr[1].split("=");

    let username = usernameArr[1];
    let userRoom = userRoomArr[1];

    const user = {
      name: username,
      room: userRoom,
    };

    return user;
  } catch (e) {
    console.error(`error: ${e}`);
    return "someName", "someRoom";
  }
};

/* getting the user */
const user = getUser();
users.push(user);

// socket.io stuff
socket.emit("newUserJoined", user);

socket.on("userJoin", (user) => {
  try {
    appendMessage("Team Yayai", `${user.name} has joined the chat!`);
    addToOnline(user.name);
  } catch (e) {
    console.error(e);
  }
});

socket.on("userLeave", (userName) => {
  try {
    appendMessage("Team Yayai", `${userName} has left the chat!`);
  } catch (e) {
    console.error(e);
  }
});

socket.on("receiveMessage", (data) => {
  try {
    appendMessage(data.name, data.message);
  } catch (e) {
    console.error(e);
  }
});
