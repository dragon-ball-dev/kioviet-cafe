import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useUserContext } from "../context/UserContext";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import '../style.css'

const Input = () => {
  const [text, setText] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.sub;
  const { selectedUser, setSelectedUser } = useUserContext();

  const [stompClient, setStompClient] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      console.log("Old currentId: ")
      console.log(currentId)
      console.log("vô được nè");
      console.log("SelectedUser:");
      console.log(selectedUser);
      if (userId == selectedUser.sender.id) setCurrentId(selectedUser.receiver.id)
      else setCurrentId(selectedUser.sender.id);
      console.log(currentId);
    }
  }, [selectedUser]);

  useEffect(() => {
    connect();
    // scrollToBottom();
  }, [userId, currentId]);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    const stompClient = over(Sock);
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/messages', onMessageReceived);
      setStompClient(stompClient);

    }, onError);
  };



  const onMessageReceived = (message) => {
    if (selectedUser) {
      const selectedUserId = selectedUser.sender.id;
      const newId = userId === selectedUserId ? selectedUser.receiver.id : selectedUserId;
      setCurrentId(newId);
    }
    console.log("Received message:", message.body);
    console.log("UserId: " + userId)
    console.log("CurrentId: " + currentId)

    const messageParts = message.body.split(" ");
    if (messageParts.length === 2) {
      const firstNumber = parseInt(messageParts[0]);
      const secondNumber = parseInt(messageParts[1]);


      if (firstNumber == userId && secondNumber == currentId) {
        fetchMessageData(secondNumber);
      }
      else if (firstNumber == currentId && secondNumber == userId) {
        fetchMessageData(firstNumber);
      }
    }
  };
  const onError = (err) => {
    console.log(err);
  };
  const fetchMessageData = async (sendId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/message-chat/${sendId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data);
      } else {
        console.error("Error fetching message data");
      }
    } catch (error) {
      console.error("Error fetching message data:", error);
    }
  };

  const handleSend = () => {
    if (!stompClient) {
      console.log("Stomp client is not connected.");
      return;
    }

    const sendMessageData = {
      id: 1,
      content: text,
      sentAt: new Date(),
      read: false,
      sendBy: false,
    };

    setText("");

    const destination = `/app/user/message-chat/${userId}/${currentId}`;
    stompClient.send(destination, {}, JSON.stringify(sendMessageData));
  };

  return (
    <>

      <div className="flex-grow-0 py-3 px-4 border-top">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Nhập tin nhắn của bạn"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            value={text}
            style={{ width: "300px" }}
          />
          <button className="btn btn-primary" onClick={handleSend}>Send</button>
        </div>
      </div>


    </>
  );

}


export default Input;
