import { useEffect, useState } from "react";
import useUserInfo from "../../Utils/UserInfo";
import axios from "axios";
import OrderTableRow from "./OrderTableRow";

const MyOrder = () => {
  const [Alldata, setData] = useState([]);
  const { user } = useUserInfo();
  const email = user?.email;
  useEffect(() => {
    async function fetchProductsDetails() {
      const res = await axios.get(
        `https://book-bridge-server.vercel.app/myorders/${email}`
      );
      setData(res?.data);
    }
    fetchProductsDetails();
  }, [email]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {Alldata.map((data) => (
              <OrderTableRow key={data?._id} order={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
