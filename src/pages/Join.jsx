// import io from "socket.io-client";
import { Link } from "react-router-dom";
import { useState } from "react";

// const socket = io.connect("http://localhost:4000");

function Join() {
  const [name, setName] = useState("");
  const [roomNum, setRoomNum] = useState(1);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 ">
      <div className="border-2 bg-gray-200 rounded-2xl w-5/6 md:w-1/2 drop-shadow-2xl">
        <h1 className="font-bold text-3xl text-center mb-6 mt-16 text-gray-500">
          {" "}
          Scoket Chat
        </h1>

        <input
          type="text"
          placeholder="Enter your username..."
          className="w-5/6 mx-auto block bg-gray-200 border-2 border-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:border-2 focus:ring-1 focus:drop-shadow-xl  mb-5  text-gray-500 text-lg duration-100"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />

        <input
          type="number"
          placeholder="Enter your room number..."
          className="w-5/6 mx-auto block bg-gray-200 border-2 border-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:border-2 focus:ring-1 focus:drop-shadow-xl mb-5 text-gray-500 text-lg duration-100"
          onChange={(event) => setRoomNum(event.target.value)}
          value={roomNum}
        />
        <Link
          to={`/chat?name=${name}&room=${roomNum}`}
          onClick={(event) =>
            !name || !roomNum ? event.preventDefault() : null
          }
        >
          <button className="w-5/6 bg-blue-500 block mx-auto text-white px-4 py-3 rounded-lg mb-16 text-lg hover:bg-blue-600 duration-150">
            Go to Chat!{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
