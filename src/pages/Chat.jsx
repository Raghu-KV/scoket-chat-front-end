import { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function Chat() {
  const { name, room } = queryString.parse(useLocation().search);
  const [currentMessage, setCurrentMessage] = useState("");

  socket.emit("join_room", room);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        name: name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    socket.on("recived_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="flex flex-col justify-center items-center h-screen border-3 ">
      <div className="w-2/3">
        <div className="chat-header bg-gray-500 py-3 rounded-t-xl">
          <p className=" text-center text-2xl font-bold text-white">
            Live chat
          </p>
        </div>
        <div className="chat-body h-[30rem] md:h-[40rem] border-2 border-gray-500"></div>
        <div className="chat-footer flex mt-2">
          <input
            type="text"
            placeholder="enter your message..."
            onChange={(event) => setCurrentMessage(event.target.value)}
            className="w-full block px-4 py-3 border-2 border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:drop-shadow-xl rounded-l-lg"
          />
          <button
            className="px-3 md:px-10 bg-blue-500 text-white rounded-r-lg"
            onClick={sendMessage}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
