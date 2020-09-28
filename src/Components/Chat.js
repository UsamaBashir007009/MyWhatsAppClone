import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CSS_Files/Chat.css";
import db from "../MyFirebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function Chat() {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [roomName, setRoomname] = useState("");
  const [input, setInput] = useState("");
  useEffect(() => {
    if (roomId) {
      setMessages([]);
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomname(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  function sendMessage(e) {
    e.preventDefault();
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    console.log("you typed :" + input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: today.toUTCString(),
    });
    setInput("");
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`http://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat__header__info">
          <h3>{roomName}</h3>
          <p>
            {messages[messages.length - 1]?.timestamp
              ? `Last Seen ${messages[messages.length - 1]?.timestamp}`
              : `Last Seen`}
          </p>
        </div>
        <div className="chat__header__right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chatmessage_receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="message__time">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            send message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
