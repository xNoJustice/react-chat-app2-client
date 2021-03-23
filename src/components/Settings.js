import React, { useContext, useState } from "react";
import Error from "./Error";
import makeToast from "../Toaster";
import { MainContext } from "../mainContext";
import { withRouter } from "react-router-dom";

const Settings = (props) => {
  const { user } = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [email, setMail] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    let password;
    if (
      oldpassword !== "" &&
      newpassword !== "" &&
      oldpassword !== newpassword
    ) {
      password = newpassword;
    }
    let body = {
      user: user.id,
      username: username,
      email: email,
      password: password,
    };
    fetch("http://localhost:5000/api/users/update", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(function (json) {
        if (json.token === undefined) {
          setError(json.message);
        } else {
          makeToast("success", "Update Successfully Completed!");
          localStorage.setItem("token", json.token);
          window.location.reload();
        }
      });
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChangePhoto = (e) => {
    if (image === "") {
      setError("Add Photo!");
    } else {
      const formData = new FormData();
      formData.append("image", image, image.name);
      fetch("http://localhost:5000/api/users/profile", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then(function (json) {
          if (json.token === undefined) {
            setError(json.message);
          } else {
            makeToast("success", "New Profile Photo Successfully Added!");
            localStorage.setItem("token", json.token);
            window.location.reload();
          }
        });
    }
  };
  return (
    <div className="flex flex-col w-full max-h-full px-4 py-6 bg-white dark:bg-gray-900 dark:text-gray-800">
      <div className="flex flex-row items-center px-6 py-4 shadow rounded-2xl dark:bg-gray-800">
        <div className="flex flex-col ml-3">
          <div className="text-sm font-semibold dark:text-gray-50">
            Settings
          </div>
        </div>
      </div>
      <section className="h-screen bg-gray-100 bg-opacity-50 dark:bg-gray-900">
        <div className="container max-w-2xl mx-auto my-20 shadow-md md:w-3/4">
          <div className="p-4 mb-5 bg-gray-100 rounded-lg bg-opacity-5">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center">
                <img
                  src={
                    user.avatar !== ""
                      ? "http://localhost:5000/" + user.avatar
                      : "https://ui-avatars.com/api/?&background=0D8ABC&color=fff&name=" +
                        user.username
                  }
                  className="object-cover w-8 h-8 mr-3 rounded-full"
                  alt="user"
                />
                <h1 className="text-gray-600 dark:text-gray-100">
                  {user.username}
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-white border-gray-800 rounded-lg dark:bg-gray-800 border-3 dark:border-indigo-500">
            {error && <Error error={error} setError={setError} />}
            <div className="items-center w-full p-4 text-gray-500 dark:text-gray-100 md:inline-flex">
              <h2 className="max-w-sm mx-auto md:w-4/12">Username</h2>
              <div className="w-full max-w-sm mx-auto md:w-5/12 md:inline-flex">
                <div className="relative">
                  <input
                    type="text"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="New Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                  />
                </div>
              </div>
            </div>
            <div className="items-center w-full p-4 text-gray-500 dark:text-gray-100 md:inline-flex">
              <h2 className="max-w-sm mx-auto md:w-4/12">Email Address</h2>
              <div className="w-full max-w-sm mx-auto md:w-5/12 md:inline-flex">
                <div className="relative">
                  <input
                    type="mail"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="New Email"
                    value={email}
                    onChange={(e) => setMail(e.target.value.trim())}
                  />
                </div>
              </div>
            </div>
            <div className="items-center w-full p-4 text-gray-500 dark:text-gray-100 md:inline-flex">
              <h2 className="max-w-sm mx-auto md:w-4/12">Password</h2>
              <div className="w-full max-w-sm mx-auto space-y-5 md:w-5/12">
                <div className="relative">
                  <input
                    type="password"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Old Password"
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value.trim())}
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="New Password"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value.trim())}
                  />
                </div>
              </div>
            </div>
            <div className="items-center w-full p-4 text-gray-500 dark:text-gray-100 md:inline-flex">
              <h2 className="max-w-sm mx-auto md:w-4/12">Profile Photo</h2>
              <div className="w-full max-w-sm mx-auto md:w-5/12 md:inline-flex">
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => onFileChange(e)}
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <button
                    onClick={(e) => handleChangePhoto(e)}
                    className="float-right px-4 py-2 mt-1 text-base font-semibold text-center text-white transition duration-200 ease-in bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Update Profile Photo
                  </button>
                </div>
              </div>
            </div>
            <div className="float-right text-center md:w-3/12 md:pl-6">
              <button
                type="button"
                onClick={() => handleSave()}
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withRouter(Settings);
