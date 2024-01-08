import { useEffect, useState } from "react";
import ProductCart from "../../Components/Share/ProductCart";
import axios from "axios";
import Loding from "../../Components/Share/Loding";

const AllBooks = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get(
        "https://book-bridge-server.vercel.app/products"
      );
      // console.log("All: ", res.data.data);
      setProducts(res.data.data);
      setProductsData(res.data.data);
    }
    fetchProducts();
  }, []);
  const [productsData, setProductsData] = useState([]);
  const [priceRange, setPriceRange] = useState(150);
  const handlePriceRange = (event) => {
    setPriceRange(event.target.value);
    setProductsData(
      products.filter((product) => parseInt(product.price) <= priceRange)
    );
  };
  const handleStock = (event) => {
    const checked = event.target.checked;
    // console.log(`switch to ${checked}`, checked);
    if (checked) {
      setProductsData(products.filter((product) => product.state === checked));
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}

            {products ? (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                {productsData.map((product) => (
                  <ProductCart key={product._id} book={product} />
                ))}
              </div>
            ) : (
              <div className="m-10">
                <Loding />
              </div>
            )}
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <li>
                <h4 className="text-xl font-extrabold mx-auto">AVAILABILITY</h4>
              </li>
              <li className="mt-10">
                <h4 className="text-xl font-bold">Is stock?</h4>
              </li>
              <li>
                <p>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    onChange={handleStock}
                  />
                  <span className="text-xl font-bold ml-4"> Stock</span>
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold">PRICE RANGE</h4>
              </li>
              <li>
                <p className="w-full">
                  <input
                    type="range"
                    min={1}
                    max="600"
                    value={priceRange}
                    className="range range-accent w-full border"
                    onChange={handlePriceRange}
                  />
                  <span className="text-xl font-bold ml-5">{priceRange}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllBooks;
