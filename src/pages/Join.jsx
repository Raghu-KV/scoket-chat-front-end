import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function Join() {
  return <div>Join</div>;
}

export default Join;
