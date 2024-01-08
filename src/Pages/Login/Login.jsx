import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../../assets/authImg.json";
import { Link, useLocation } from "react-router-dom";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const googleProvider = new GoogleAuthProvider();
  const history = useLocation();
  console.log("Location: ", history?.state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully login",
        showConfirmButton: false,
        timer: 1000,
      });
      
    });
  };

  const sendUserData = async (data) => {
    await axios
      .post("https://book-bridge-server.vercel.app/users", data)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully login",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        const user = {
          email: currentUser?.email,
          name: currentUser?.displayName,
          img: currentUser?.photoURL,
        };
        console.log("I am from signup: ", user);
        sendUserData(user);
      });
      return () => {
        unsubscribe();
      };
    });
  };

  return (
    <>
      <div className="hero mb-5">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div data-aos="fade-left" className="w-fit text-center m-2">
            <Lottie className="w-4/6 mx-auto" animationData={loginImg} />
          </div>
          <div
            data-aos="fade-right"
            className="card shrink-0 w-full md:w-1/2 m-2"
          >
            <h1 className="text-5xl font-bold mb-2">Please Login</h1>
            <button
              onClick={() => loginWithGoogle()}
              className="btn bg-green-200"
            >
              Login With Google <FcGoogle size={25} />
            </button>
            <div className=" shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type="password"
                    placeholder="password"
                    className={`input input-bordered ${
                      errors.password ? "input-error" : ""
                    }`}
                    required
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <Link to="/signup" className="text-blue-700 font-bold">
                  Create An Account
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
