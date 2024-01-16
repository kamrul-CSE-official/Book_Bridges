export default function Profile() {
  const isAdmin = true;
  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-md shadow-md">
        <div className="flex items-center justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">John Doe</h2>
          {isAdmin && <p className="text-blue-500">Admin</p>}
          <p className="text-gray-600">Web Developer</p>
          <p className="text-gray-600">john.doe@example.com</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">About Me</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
            lorem ut libero malesuada feugiat. Vivamus accumsan dui sit amet
            ultrices vestibulum.
          </p>
          {isAdmin && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Admin Information</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quis lorem ut libero malesuada feugiat. Vivamus accumsan dui sit
                amet ultrices vestibulum.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
