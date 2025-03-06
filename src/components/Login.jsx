export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="relative flex w-3/4 h-3/4 bg-white rounded-2xl shadow-lg overflow-hidden">
        
       
        <div className="hidden md:flex md:w-1/2 bg-blue-500 relative">
          <div className="absolute bottom-0 left-0 w-full h-full bg-blue-600 clip-path-wave"></div>
        </div>


        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-blue-600 text-center">Log in</h2>

          <form className="mt-6">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Log in
            </button>

            <p className="mt-4 text-center text-gray-600">
              No account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
