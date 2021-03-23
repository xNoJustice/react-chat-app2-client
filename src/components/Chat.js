import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MainContext } from "../mainContext";
import { SocketContext } from "../socketContext";
import makeToast from "../Toaster";
import Sidebar from "./Sidebar";
import UserBar from "./UserBar";

const Chat = (props) => {
  const { id } = useParams();
  const { user } = useContext(MainContext);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      makeToast("error", "Please Login!");
      props.history.push("/");
    }
  });

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  });

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });
  });

  useEffect(() => {
    const abortController = new AbortController();
    fetch(
      "http://localhost:5000/api/rooms/messages/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      },
      { signal: abortController.signal }
    )
      .then((res) => res.json())
      .then(function (json) {
        if (json.room !== undefined) {
          setRoom(json.room);
          setMessages(json.messages);
        }
      });
    return () => {
      abortController.abort();
    };
  }, [id]);

  const handleNewMessage = () => {
    if ((message !== "", () => setMessage(""))) {
      socket.emit("sendMessage", message);
    } else {
      makeToast("error", "Message can't be empty!");
    }
  };
  return (
    <div className="flex flex-row h-screen min-w-full min-h-screen antialiased text-gray-800 dark:text-gray-50">
      <Sidebar />
      <UserBar users={users} />
      <div className="flex flex-col w-full h-full px-4 py-6 bg-white dark:bg-gray-900 dark:text-gray-800">
        <div className="flex flex-row items-center px-6 py-4 shadow rounded-2xl dark:bg-gray-800">
          <div className="flex flex-col ml-3">
            <div className="text-sm font-semibold dark:text-gray-50">
              {room.name}
            </div>
          </div>
        </div>
        <div className="h-full py-4 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-12 gap-y-2">
              {messages.map((message, i) => (
                <div
                  className={
                    message.user.username === user.username
                      ? "col-start-6 col-end-13 p-3 rounded-lg"
                      : "col-start-1 col-end-8 p-3 rounded-lg"
                  }
                  key={i}
                >
                  <div
                    className={
                      message.user.username === user.username
                        ? "flex flex-row-reverse items-center justify-start"
                        : "flex flex-row items-center"
                    }
                  >
                    <img
                      src={
                        message.user.avatar !== ""
                          ? "http://localhost:5000/" + message.user.avatar
                          : "https://ui-avatars.com/api/?&background=0D8ABC&color=fff&name=" +
                            message.user.username
                      }
                      className="object-cover w-8 h-8 mr-3 rounded-full"
                      alt={message.user.avatar}
                    />
                    <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl dark:bg-gray-100">
                      <div>{message.message}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center w-full h-10 border rounded-3xl">
            <div className="w-full">
              <input
                type="text"
                className="flex items-center w-full h-10 px-3 border border-transparent rounded-3xl focus:outline-none text-md"
                placeholder="Type your message...."
                value={message}
                onChange={(e) => setMessage(e.target.value.trim())}
              />
            </div>
          </div>
          <div className="ml-6">
            <button
              className="flex items-center justify-center w-10 h-10 text-indigo-800 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => handleNewMessage()}
            >
              <svg
                className="w-5 h-5 -mr-px transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
