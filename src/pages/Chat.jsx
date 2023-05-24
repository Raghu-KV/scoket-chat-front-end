import { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

const BACK_END_URL = "https://scoket-chat-back-end.onrender.com";
//const BACK_END_URL = "http://localhost:4000";
const socket = io.connect(BACK_END_URL);

function Chat() {
  const { name, room } = queryString.parse(useLocation().search);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setMessageList((prvMessage) => [...prvMessage, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("recived_message", (data) => {
      setMessageList((prvMessage) => [...prvMessage, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("joinded_successfully", (data) => {
      //console.log(data);
      setLoading(false);
    });
  }, []);

  if (!loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen border-3 bg-gray-200 ">
        <div className="w-5/6 md:w-2/3">
          <div className="chat-header bg-gray-500 py-3 rounded-t-xl">
            <p className=" text-center text-2xl font-bold text-white">
              Live chat
            </p>
          </div>
          <div className="chat-body h-[30rem] 2xl:h-[40rem] border-2 border-gray-500">
            <ScrollToBottom className="h-[29rem] 2xl:h-[39rem]">
              {messageList.map((message, index) => (
                <div key={index}>
                  <div
                    className={`flex flex-col ${
                      message.name === name ? "items-start" : "items-end"
                    } `}
                  >
                    <p
                      className={`max-w-[70%] md:max-w-[40%] break-words mx-1 my-2 py-2 px-2 rounded-lg inline-block ${
                        message.name === name ? " bg-green-600" : "bg-blue-500"
                      } text-white `}
                    >
                      {message.message}
                    </p>
                    <p className="text-xs mx-1">
                      {message.time} {message.name}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollToBottom>
          </div>
          <div className="chat-footer flex mt-2">
            <input
              type="text"
              value={currentMessage}
              placeholder="enter your message..."
              onChange={(event) => setCurrentMessage(event.target.value)}
              className="w-full block px-4 py-3 border-2 border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:drop-shadow-xl rounded-l-lg bg-gray-200 "
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
  } else {
    return <h1 className="font-bold text-center mt-52">Loading...</h1>;
  }
}

export default Chat;
