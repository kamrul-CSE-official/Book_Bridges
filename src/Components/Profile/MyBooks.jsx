import { useEffect, useState } from "react";
import useUserInfo from "../../Utils/UserInfo";
import axios from "axios";

import MyBooksCard from "./MyBooksCard";

const MyBooks = () => {
  const [Alldata, setData] = useState([]);
  const { user } = useUserInfo();
  const email = user?.email;
  useEffect(() => {
    async function fetchProductsDetails() {
      const res = await axios.get(
        `https://book-bridge-server.vercel.app/myproducts/${email}`
      );
      setData(res?.data);
    }
    fetchProductsDetails();
  }, [email]);
  // console.log(Alldata);

  return (
    <div className="flex  flex-wrap gap-7 ">
      {Alldata?.map((data) => (
        <MyBooksCard key={data?._id} book={data} />
      ))}
    </div>
  );
};

export default MyBooks;
