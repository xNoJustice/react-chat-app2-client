const UserBar = ({ users }) => {
  return (
    <div className="flex flex-row flex-shrink-0 w-40 p-4 bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col items-center flex-shrink-0 w-32 py-4 bg-indigo-800 rounded-3xl">
        <h1 className="text-2xl text-center word-break">
          Users <br /> in Chat
        </h1>
        <ul className="flex flex-col mt-12 space-y-2">
          {users.map((user, i) => (
            <div key={i} className="flex justify-center">
              <svg
                className="bg-green-400 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="butt"
                strokeLinejoin="bevel"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <span className="ml-2 -mt-1">{user.username[1]}</span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserBar;
