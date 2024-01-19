import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import auth from "../../firebase/firebase.config";
import useUserInfo from "../../Utils/UserInfo";
import { useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";

export default function Navbar() {
  const cart = useSelector((state) => state.products.cart);
  const wish = useSelector((state) => state.products.wish);

  const location = useLocation();
  const { user } = useUserInfo();
  const profilePhoto = user?.photoURL;
  const navItems = [
    {
      name: "🏠 Home",
      path: "/",
    },
    {
      name: "🌸 All Books",
      path: "/allBooks",
    },
    {
      name: "📯 Book Post",
      path: "/postBook",
    },
    {
      name: "🧮 About",
      path: "/about",
    },
  ];

  return (
    <>
      <div className="navbar m-0 p-0 bg-gray-50 customNav container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems?.map((item) => (
                <Link to={item.path} key={item.path} className="m-2">
                  <li>{item.name}</li>
                </Link>
              ))}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-md font-extrabold">
            Book Bridge
          </Link>
        </div>
        <div className="navbar-center">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navItems?.map((item) => (
                <Link
                  to={item.path}
                  key={item.path}
                  className="mx-5 font-semibold btn text-sm"
                >
                  <li>{item.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          <Link to="/wish">
            <button className="btn btn-circle relative">
              <FcLike size={20} />{" "}
              <span className="badge badge-sm indicator-item absolute top-1 right-0">
                {wish.length}
              </span>
            </button>
          </Link>
          <div className="flex items-center justify-center">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cart.length}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[10] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <div className="badge badge-secondary font-bold text-lg">
                    {cart.length} Items
                  </div>
                  <span className="text-black font-extrabold">
                    Subtotal: ৳{" "}
                    {cart.reduce((previous, current) => {
                      return parseInt(
                        parseInt(previous) + parseInt(current.price)
                      );
                    }, 0)}
                  </span>
                  <div className="card-actions">
                    <Link to="/addToCart" className="w-full">
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2"
                >
                  <div className="w-10 rounded-full">
                    <img alt="user image" src={profilePhoto} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li
                    className="text-red-500"
                    onClick={() => {
                      signOut(auth);
                    }}
                  >
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link to="/login" className="btn btn-error text-white">
                  Login/SignUp
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {location.pathname === "/allBooks" && (
        <div>
          <div>
            <div className="navbar bg-cyan-300">
              <div className="flex-1" htmlFor="my-drawer">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost text-xl bg-cyan-600 text-white"
                >
                  Filter 👁️
                </label>
                <Marquee>
                  <p className="text-xl font-bold mx-4">
                    বুক ব্রিজ এই প্রজেক্টটি আমাদের সমাজে যারা অর্থের অভাবে বই
                    কিনতে পারছে না তারা যাতে অন্যের অব্যবহৃত বইটি সস্থায় কিনতে
                    পারে সেটার প্রয়াস মাত্র।😊{" "}
                  </p>
                  <p className="text-xl font-bold mx-4">
                    {" "}
                    আমরা চাই প্রতিটি মানুষের একে অপরের মধ্যে সম্পর্ক গড়ে উঠুক বই
                    এর মধ্যমে যার ফলে আমরা আমাদের প্রজেক্ট এর নাম দিয়েছি
                    বুক-ব্রিজ
                  </p>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
