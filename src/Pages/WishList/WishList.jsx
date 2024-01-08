import { useDispatch, useSelector } from "react-redux";
import { IoCloseCircleSharp } from "react-icons/io5";
import ProductCart from "../../Components/Share/ProductCart";
import { removeWishList } from "../../redux/productSlice/productSlice";
import Lottie from "lottie-react";
import emptyImg from "../../assets/empty.json";

export default function WishList() {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.products.wish);
  console.log(wishList);
  return (
    <div>
      <h2 className="text-2xl font-bold my-5">Wish List 💝</h2>
      {wishList.length !== 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {wishList.map((product) => (
            <div key={product?._id} className="relative">
              <ProductCart book={product} />
              <button
                onClick={() => dispatch(removeWishList(product))}
                className="btn btn-circle bg-error text-white absolute top-0 right-0"
              >
                <IoCloseCircleSharp size={30} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h4><span className="text-red-600">Empty!</span> Please Add Some Wish😊</h4>
          <Lottie className="w-1/5" animationData={emptyImg} />
        </div>
      )}
    </div>
  );
}
