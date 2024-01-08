import { useDispatch, useSelector } from "react-redux";
import useUserInfo from "../../Utils/UserInfo";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { removeAddToCart } from "../../redux/productSlice/productSlice";
import { useState } from "react";
import axios from "axios";

export default function AddToCart() {
  const { user } = useUserInfo();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  const [name, setName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  


  const handleCheckOut = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("yourEmail", yourEmail);
      formData.append("mobile", mobile);
      formData.append("address", address);
      formData.append("note", note);

      // Calculate total price
      const totalPrice =
        cart.reduce((previous, current) => {
          return parseInt(previous) + parseInt(current.price);
        }, 0) + 150;

      // Prepare checkout data
      const checkOutData = {
        name,
        email: yourEmail,
        mobile,
        address,
        note,
        user: user?.email,
        products: cart,
        totalItems: cart.length,
        totalPrice: totalPrice,
      };

      console.log(checkOutData);

      // Use Promise.all to wait for all requests to complete
      await Promise.all(
        cart.map((item) =>
          axios.patch(
            `https://book-bridge-server.vercel.app/orders/${item?._id}`,
            cart
          )
        )
      );

      window.location.href = "/checkout";

    } catch (error) {
      console.error("Checkout failed:", error);
    }
    setAddress("");
    setMobile("");
    setYourEmail("");
    setNote("");
    setName("");
  };
  


  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Add to Cart Page</h1>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* Delivery Information */}
        <form onSubmit={handleCheckOut}>
          <h2 className="text-xl font-bold">Delivery Information</h2>
          {/* 1 */}
          <div className="w-full flex items-center gap-2 my-3">
            <div className="w-full">
              <p>Your Name</p>
              <input
                type="name"
                required
                onChange={(e) => setName(e.target.value)}
                defaultValue={`${user?.email.substring(0, 5)}...`}
                placeholder="Your name"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="w-full">
              <p>Mobile Number</p>
              <input
                type="text"
                required
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          {/* 2 */}
          <div className="w-full flex items-center gap-2 my-3">
            <div className="w-full">
              <p>Your Email</p>
              <input
                type="email"
                required
                onChange={(e) => setYourEmail(e.target.value)}
                defaultValue={user?.email}
                placeholder="Your Email"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="w-full">
              <p>Your Address</p>
              <input
                type="text"
                required
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your Address"
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          {/* 3 */}
          <div className="w-full">
            <p>Note</p>
            <input
              type="text"
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write Somethind...."
              className="input input-bordered input-accent w-full"
            />
          </div>
          <button
            disabled={cart.length <= 0 ? true : false}
            type="submit"
            className="btn btn-primary w-full text-xl mt-10"
          >
            Checkout
          </button>
        </form>
        {/* products list & price details */}
        <div>
          {/* product list */}
          <div>
            <h2 className="text-xl font-bold">Products List</h2>
            {cart.length !== 0 ? (
              <div className="flex flex-col items-start gap-1 h-64 overflow-y-auto overflow-x-hidden">
                {cart.map((item) => (
                  <Product key={item?._id} book={item} dispatch={dispatch} />
                ))}
              </div>
            ) : (
              <p className="text-md text-pink-500 font-bold">
                [Empty] Please Add To Cart Any Products!
              </p>
            )}
          </div>
          {/* Order Summery */}
          <div className="my-5">
            <div className="text-xl flex items-center justify-between my-2">
              <h4>Subtotal</h4>
              <h4>
                {cart.reduce((previous, current) => {
                  return parseInt(parseInt(previous) + parseInt(current.price));
                }, 0)}{" "}
                ৳
              </h4>
            </div>
            <div className="text-xl flex items-center justify-between my-2">
              <h4>Delivery</h4>
              <h4>150 ৳</h4>
            </div>
            <div className="text-2xl font-bold flex items-center justify-between">
              <h4>Total</h4>
              <h4>
                {cart.reduce((previous, current) => {
                  return parseInt(parseInt(previous) + parseInt(current.price));
                }, 0) + 150}
                ৳
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Product = ({ book, dispatch }) => {
  return (
    <>
      <div className="flex items-center gap-5 border-2 m-2 w-full relative">
        <img className="w-1/6" src={book?.img} alt="book img" />
        <div>
          <h5 className="font-extrabold">{book?.tilte}</h5>
          <p>{book?.price} ৳</p>
          <button
            onClick={() => dispatch(removeAddToCart(book))}
            className="btn btn-error"
          >
            <RiDeleteBin5Fill color="white" size={25} />
          </button>
        </div>
      </div>
    </>
  );
};
