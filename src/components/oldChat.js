import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../mainContext";
import { SocketContext } from "../socketContext";
import { UsersContext } from "../usersContext";
import logo from "./logo.svg";
import "./logo.css";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = () => {
  const { name, room, setName, setRoom } = useContext(MainContext);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { users } = useContext(UsersContext);
  const history = useHistory();

  useEffect(() => {
    if (!name) return history.push("/");
  }, [history, name]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [socket]);

  useEffect(() => {
    return () => {
      setName("");
      setRoom("");
      socket.emit("disconnet", name);
      history.push("/");
      history.go(0);
    };
  }, [history, name, setName, setRoom, socket]);

  const handleSendMessage = () => {
    socket.emit("sendMessage", message, () => setMessage(""));
    setMessage("");
  };

  const logout = () => {
    setName("");
    setRoom("");
    socket.emit("disconnet", name);
    history.push("/");
    history.go(0);
  };

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-8 mx-auto lg:px-4">
        <div className="flex flex-col w-full mb-12 text-left lg:text-center">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 text-black bg-gray-700 rounded-full">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <h5 className="mb-6 text-2xl font-semibold tracking-tighter text-black dark:text-white sm:text-5xl title-font">
            React Socket IO Chat APP
          </h5>
          <div>
            <div className="min-w-full max-w-3xl">
              <div className="px-5 py-5 flex justify-between items-center bg-indigo-300 dark:bg-gray-900 dark:text-white">
                <div className="font-semibold text-2xl">
                  {room.slice(0, 1).toUpperCase() + room.slice(1)}
                </div>
                <div className="w-1/2"></div>
                <button
                  className="px-2 py-1 bg-gray-600 dark:bg-indigo-600 text-gray-100 font-bold rounded hover:bg-indigo-500"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
              <div className="flex flex-row justify-between rounded-lg shadow-2xl bg-gray-200 dark:bg-gray-800  dark:text-white">
                <div className="flex flex-col w-2/5 border-r-2 overflow-y-scroll max-h-80">
                  <div className="border-b-2 py-4 px-2">
                    <div className="px-6 py-4 bg-white dark:bg-blue-800 font-bold uppercase">
                      Online Users ({users.length})
                    </div>
                  </div>
                  {users &&
                    users.map((user) => {
                      return (
                        <div
                          className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
                          key={user.id}
                        >
                          <div className="w-2/4">
                            <img
                              src={
                                "https://ui-avatars.com/api/?&background=0D8ABC&color=fff&name=" +
                                user.name
                              }
                              className="object-cover h-12 w-12 rounded-full"
                              alt="user"
                            />
                          </div>
                          <div className="w-full">
                            <div className="text-lg font-semibold">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="w-full px-5 flex flex-col justify-between">
                  <div className="flex flex-col mt-5">
                    <ScrollToBottom
                      debug={false}
                      className="h-80 min-w-min max-h-80 max-w-2xl"
                    >
                      {messages.length > 0 ? (
                        messages.map((msg, i) => (
                          <div key={i}>
                            {msg.user === name ? (
                              <div className="flex justify-end mb-4">
                                <div className="mr-2 py-3 px-4 bg-blue-400 dark:bg-green-900 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white break-all">
                                  {msg.text}
                                </div>
                                <img
                                  src={
                                    "https://ui-avatars.com/api/?&background=0D8ABC&color=fff&name=" +
                                    msg.user
                                  }
                                  className="object-cover h-8 w-8 rounded-full mt-2 mr-2"
                                  alt=""
                                />
                              </div>
                            ) : (
                              <div className="flex justify-start mb-4">
                                <img
                                  src={
                                    "https://ui-avatars.com/api/?&background=0D8ABC&color=fff&name=" +
                                    msg.user
                                  }
                                  className="object-cover h-8 w-8 rounded-full mt-2"
                                  alt=""
                                />
                                <span className="font-semibold text-sm mt-3 ml-1 mr-2">
                                  {msg.user}
                                </span>
                                <div className="ml-2 py-3 px-4 bg-gray-400 dark:bg-gray-700 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white break-all">
                                  {msg.text}
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div>
                          <div>-----</div>
                          <div>No messages</div>
                          <div>-----</div>
                        </div>
                      )}
                    </ScrollToBottom>
                  </div>
                  <div className="m-4 flex">
                    <input
                      className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-600 bg-white"
                      placeholder="Enter Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      className="px-8 py-2 ml-2 font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                      onClick={handleSendMessage}
                      disabled={message === "" ? true : false}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
