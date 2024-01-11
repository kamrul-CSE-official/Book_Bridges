import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart } from "../../redux/productSlice/productSlice";
import useUserInfo from "../../Utils/UserInfo";

export default function ProductCart({ book }) {
  const { user } = useUserInfo();

  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Book Successfully Added In Cart",
      showConfirmButton: false,
      timer: 1000,
    });
    dispatch(addToCart(item));
  };
  return (
    <div>
      <div className="card max-w-56 bg-base-100 shadow-xl hover:scale-95 duration-150">
        <figure>
          <Link to={`/productDetails/${book?._id}`}>
            <img
              className="w-full max-h-[200px]"
              src={book.img}
              alt={book.tilte}
            />
          </Link>
        </figure>
        <div className="p-5">
          <Link to={`/productDetails/${book?._id}`}>
            <h2 className="text-sm font-extrabold inline-block whitespace-nowrap">
              {book?.tilte}
            </h2>
            <p className="text-xs">{book.author}</p>
            <p>
              {book?.state ? (
                <span className="text-green-500">In Stock</span>
              ) : (
                <span className="text-red-500 font-bold">Out Of Stock</span>
              )}
            </p>
          </Link>
          <Link to={`/productDetails/${book?._id}`}>
            <p>{book.auther}</p>
          </Link>
          <Link to={`/productDetails/${book?._id}`}>
            <div className="badge badge-secondary text-xl font-bold">
              {book?.price <= 0 ? "0" : book.price}৳
            </div>
          </Link>
          <div className="card-actions justify-center">
            <button
              onClick={() => handleAddToCart(book)}
              disabled={
                user?.email === book?.user?.email || book?.state == false
                  ? true
                  : false
              }
              className="btn btn-warning text-black"
            >
              <FaCartArrowDown />
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
