import Lottie from "lottie-react";
import loginImg from "../../assets/authImg.json";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";
import auth from "../../firebase/firebase.config";

export default function SignUp() {
  const googleProvider = new GoogleAuthProvider();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [isError, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate image type
    if (image && !image.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match");
      return;
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=8e666ea9b130e21c9f6ef96674fb7220`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const imageData = await response.json();
        const imageUrl = imageData.data.url;

        const userData = {
          name: name,
          email: email,
          password: password,
          img: imageUrl,
        };

        axios.post("http://localhost:5001/users", userData).then((res) => {
          if (res) {
            createUserWithEmailAndPassword(
              auth,
              userData?.email,
              userData?.password
            ).then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Create An Account",
                showConfirmButton: false,
                timer: 1000,
              });
              window.location.href = "/";
            });
          }
        });
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
        window.location.href = "/";
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    }
  };

  const sendUserData = async (data) => {
    await axios.post("http://localhost:5001/users", data).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfullty created",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };
  const signUpWithGoogle = () => {
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
          <div data-aos="fade-right" className="w-fit text-center m-2">
            <Lottie className="w-4/6 mx-auto" animationData={loginImg} />
          </div>
          <div
            data-aos="fade-left"
            className="card shrink-0 w-full md:w-1/2 m-2"
          >
            <h1 className="text-5xl font-bold mb-2">Create An Account</h1>
            <button
              onClick={() => signUpWithGoogle()}
              className="btn bg-green-200"
            >
              SignUp With Google <FcGoogle size={25} />
            </button>
            <div className=" shadow-2xl bg-base-100">
              {isError && <h4 className="text-red-500">Error: {isError}</h4>}
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="name"
                    placeholder="Name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="input input-bordered"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Profile Image</span>
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
                <Link to="/login" className="text-blue-700 font-bold">
                  Please Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
