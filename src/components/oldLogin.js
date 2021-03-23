import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../mainContext";
import { SocketContext } from "../socketContext";
import { UsersContext } from "../usersContext";

const Login = () => {
  const socket = useContext(SocketContext);
  const { name, setName, room, setRoom } = useContext(MainContext);
  const history = useHistory();
  const { setUsers } = useContext(UsersContext);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });
  });

  const handleClick = () => {
    socket.emit("login", { name, room }, (error) => {
      if (error) {
        setError(error);
      } else {
        setError("");
        history.push("/chat");
      }
    });
  };

  return (
    <div className="container px-8 pt-48 pb-24 mx-auto lg:px-4">
      <div className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-300 dark:border-transparent rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0 dark:bg-indigo-900">
        <h5 className="mb-6 text-2xl font-semibold tracking-tighter text-black dark:text-white sm:text-3xl title-font text-center">
          React Socket IO Chat APP
        </h5>
        {error && (
          <h6 className="text-md text-black dark:text-white bg-red-600 p-2 sm:text-md text-center mb-3">
            {error}
          </h6>
        )}
        <div className="relative ">
          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mb-4 text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg mr-4text-base focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
          />
        </div>
        <div className="relative ">
          <input
            type="text"
            placeholder="Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-4 py-2 mb-4 text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg mr-4text-base focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
          />
        </div>
        <button
          onClick={handleClick}
          className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-900 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default Login;
