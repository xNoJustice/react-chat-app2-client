import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center">
      <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-8">
        <div className="flex flex-col">
          <h1 className="font-light w-full uppercase text-center text-4xl sm:text-5xl dark:text-white text-gray-800">
            Chat APP
          </h1>
          <h2 className="font-light max-w-2xl mx-auto w-full text-xl dark:text-white text-gray-500 text-center py-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </h2>
          <div className="flex items-center justify-center mt-4">
            <Link
              to="/register"
              className="uppercase py-2 px-4 bg-gray-700 dark:bg-indigo-700 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="uppercase py-2 px-4 bg-gray-700 dark:bg-indigo-700 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
