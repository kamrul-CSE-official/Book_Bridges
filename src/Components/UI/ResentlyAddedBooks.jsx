import { useEffect, useState } from "react";
import ProductCart from "../Share/ProductCart";
import Aos from "aos";
import axios from "axios";
import Loding from "../Share/Loding";

export default function ResentlyAddedBooks() {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get(
        "https://book-bridge-server.vercel.app/products"
      );
      setBookData(res.data.data);
    }
    fetchProducts();

    Aos.init();
  }, []);

  const shuffledBookData = shuffleArray([...bookData]);
  const randomProducts = shuffledBookData.slice(0, 12);
  const products = randomProducts.filter((product) => product.state == true);

  return (
    <div>
      <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
        Recently Added Book
      </h3>
      {bookData ? (
        <div
          data-aos="fade-up"
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {products.map((book, i) => (
            <ProductCart book={book} key={book?._id + i} />
          ))}
        </div>
      ) : (
        <Loding />
      )}
    </div>
  );
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
//
