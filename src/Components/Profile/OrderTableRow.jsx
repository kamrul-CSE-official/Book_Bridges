import { Link } from "react-router-dom";

const OrderTableRow = ({ order }) => {
  return (
    <tr className="border border-green-500">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask  w-20 h-20 rounded">
              <img src={order?.img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td className="font-bold text-1xl">{order?.title}</td>
      <td>
        {" "}
        <p className="text-3xl text-green-600">
          {" "}
          {order?.price <= 0 ? "0" : order.price}৳
        </p>
      </td>
      <td>
        <Link to={`/productDetails/${order?._id}`}>
          <button className="bg-green-400 hover:bg-green-700 hover:text-white px-5 py-2 rounded-md font-bold  ">
            Book dettails
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default OrderTableRow;
