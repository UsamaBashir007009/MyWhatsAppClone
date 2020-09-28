import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS_Files/SidebarChat.css";
import db from "../MyFirebase";
import TextTruncate from "react-text-truncate";

function addNewChatClick() {
  const groupName = prompt("Please enter name for the Room");
  if (groupName) {
    db.collection("rooms").add({
      name: groupName,
    });
  }
}
function SidebarChat({ id, name, AddNewChat }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapsopt) => {
          if (snapsopt.docs.length > 0) {
            setMessage(snapsopt.docs[0].data());
          }
          // snapsopt.docs.map((doc) => {
          //   console.log(doc.data());
          //   break;
          // });
        });
    }
  }, [id]);

  return !AddNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sideBarChats">
        <Avatar src={`http://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="sideBarChats__info">
          <h2>{name}</h2>

          <p>
            {message
              ? `${message.name} : ${message.message?.substring(0, 20)}`
              : `New Room`}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sideBarChats" onClick={addNewChatClick}>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
