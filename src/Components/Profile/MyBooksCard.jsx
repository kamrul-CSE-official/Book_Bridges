import { Link } from "react-router-dom";

const MyBooksCard = ({ book }) => {
  return (
    <div>
      <div className="w-[250px]    duration-150 shadow-lg shadow-green-600   rounded-lg ">
        <div className="p-1">
          <img
            className="w-full max-h-[200px] rounded"
            src={book.img}
            alt={book.tilte}
          />
        </div>
        <div className="my-3 px-3">
          <h2 className="font-bold">{book?.title}</h2>
          <p className="text-3xl text-green-600">
            {" "}
            {book?.price <= 0 ? "0" : book.price}৳
          </p>
        </div>
        <div className="px-3 pb-2">
          <Link to={`/productDetails/${book?._id}`}>
            <button className="bg-green-400 hover:bg-green-700 hover:text-white w-full  px-5 py-1 rounded-md font-bold text-gray-500 ">
              Book dettails
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyBooksCard;
