import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import makeToast from "../Toaster";
import Error from "./Error";
import { MainContext } from "../mainContext";
import { SocketContext } from "../socketContext";

const Sidebar = (props) => {
  const { user } = useContext(MainContext);
  const socket = useContext(SocketContext);
  const [newChat, setNewChat] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (newChat === "") {
      setError("Please fill room name!");
    } else {
      let body = {
        name: newChat,
        _id: user.id,
      };
      fetch("http://localhost:5000/api/rooms/create", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then(function (json) {
          if (json.room === undefined) {
            setError(json.message);
          } else {
            makeToast("success", "Create Success");
            setError("");
            setCreateModal(false);
            socket.emit(
              "login",
              { username: user.username, room: newChat },
              (error) => {
                if (error) {
                  makeToast("error", error);
                } else {
                  makeToast("success", "Connected to Chat");
                }
              }
            );
            props.history.push("/chat/" + json.room._id);
          }
        });
    }
  };

  const handleJoin = () => {
    if (newChat === "") {
      setError("Please fill room name!");
    } else {
      let body = {
        name: newChat,
        _id: user.id,
      };
      fetch("http://localhost:5000/api/rooms/join", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then(function (json) {
          if (json.room === undefined) {
            setError(json.message);
          } else {
            makeToast("success", "Join Success");
            setError("");
            setJoinModal(false);
            socket.emit(
              "login",
              {
                username: [user.id, user.username, user.avatar],
                room: newChat,
              },
              (error) => {
                if (error) {
                  makeToast("error", error);
                } else {
                  makeToast("success", "Connected to Chat");
                }
              }
            );
            props.history.push("/chat/" + json.room._id);
          }
        });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    makeToast("success", "Successfully Logged Out!");
    props.history.push("/");
  };
  return (
    <div className="flex flex-row flex-shrink-0 w-40 p-4 bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col items-center flex-shrink-0 w-32 py-4 bg-indigo-800 rounded-3xl">
        <button
          className="flex items-center justify-center w-12 h-12 text-indigo-800 transition ease-in bg-indigo-100 rounded-full focus:outline-none"
          onClick={() => props.history.push("/dashboard")}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
        </button>
        <ul className="flex flex-col mt-12 space-y-2">
          <li>
            <button
              className="flex items-center py-2 transition duration-200 ease-in hover:text-indigo-300 focus:outline-none"
              onClick={() => setCreateModal(true)}
            >
              <svg
                className="w-6 h-6 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create
            </button>
          </li>
          <li>
            <button
              className="flex items-center py-2 transition duration-200 ease-in hover:text-indigo-300 focus:outline-none"
              onClick={() => setJoinModal(true)}
            >
              <svg
                className="w-6 h-6 mr-2 -ml-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="butt"
                strokeLinejoin="bevel"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
              </svg>
              Join
            </button>
          </li>
          <li>
            <button
              className="flex items-center py-2 transition duration-200 ease-in hover:text-indigo-300 focus:outline-none"
              onClick={() => props.history.push("/dashboard")}
            >
              <svg
                className="w-6 h-6 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              Settings
            </button>
          </li>
        </ul>
        <button
          className="flex items-center justify-center w-10 h-10 mt-auto text-indigo-100 hover:text-indigo-300 focus:outline-none"
          onClick={() => logout()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="butt"
            strokeLinejoin="bevel"
          >
            <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
          </svg>
        </button>
      </div>
      {createModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative max-w-3xl mx-auto my-6 w-80">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="text-xl font-semibold text-center dark:text-gray-50">
                    Create Room
                  </h3>
                  <div className="absolute mt-1 right-4 top-4">
                    <button
                      className="bg-transparent border border-transparent"
                      onClick={() => setCreateModal(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-700"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <form>
                  <div className="relative flex-auto p-6">
                    <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-50">
                      {error && <Error error={error} setError={setError} />}
                      <label className="block font-medium leading-relaxed tracking-tighter text-center text-gray-700 text-md dark:text-gray-100">
                        Chat Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Chat Name ..."
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                        autoFocus
                        autoComplete="true"
                        required
                        onChange={(e) => setNewChat(e.target.value.trim())}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none background-transparent focus:outline-none"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => setCreateModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => handleCreate()}
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
      {joinModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-80 max-w-80">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="text-xl font-semibold text-center dark:text-gray-50">
                    Join Room
                  </h3>
                  <div className="absolute mt-1 right-4 top-4">
                    <button
                      className="bg-transparent border border-transparent"
                      onClick={() => setJoinModal(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-700"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <form>
                  <div className="relative flex-auto p-6">
                    <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-50">
                      {error && <Error error={error} setError={setError} />}
                      <label className="block font-medium leading-relaxed tracking-tighter text-center text-gray-700 text-md dark:text-gray-100">
                        Chat Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Chat Name ..."
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                        autoFocus
                        autoComplete="true"
                        required
                        onChange={(e) => setNewChat(e.target.value.trim())}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none background-transparent focus:outline-none"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => setJoinModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => handleJoin()}
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </div>
  );
};

export default withRouter(Sidebar);
