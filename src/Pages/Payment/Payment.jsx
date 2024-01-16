import Aos from "aos";
import { useEffect, useState } from "react";
import { FaCreditCard, FaRegMoneyBillAlt } from "react-icons/fa";

export default function Payment() {
  const [type, setType] = useState("card");
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({
      ...creditCard,
      [name]: value,
    });
  };

  const success = () => {
    window.location.href = "/checkout";
  };

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="container mx-auto mt-8">
      {/*  */}
      <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap bg-pink-500 text-black">
        <a
          onClick={() => setType("card")}
          rel="noopener noreferrer"
          href="#"
          className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg ${
            type == "card" ? "text-gray-50" : "text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Card Payment</span>
        </a>

        <a
          onClick={() => setType("cash")}
          rel="noopener noreferrer"
          href="#"
          className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg ${
            type == "cash" ? "text-gray-50" : "text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Cash Payment</span>
        </a>

        <a
          onClick={() => setType("mobileBanking")}
          rel="noopener noreferrer"
          href="#"
          className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg ${
            type == "mobileBanking" ? "text-gray-50" : "text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>Mobile Banking</span>
        </a>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Credit Card Payment */}
        {type === "card" ? (
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center mb-4">
              <FaCreditCard className="text-4xl mr-4 text-blue-500" />
              <h3 className="text-xl font-semibold">Credit Card</h3>
            </div>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-600"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={creditCard.cardNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="**** **** **** ****"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cardHolder"
                  className="block text-sm font-medium text-gray-600"
                >
                  Card Holder
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={creditCard.cardHolder}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="expirationDate"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    value={creditCard.expirationDate}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-600"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={creditCard.cvv}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="123"
                  />
                </div>
              </div>
            </form>
            <button
              onClick={() => success()}
              className="btn btn-success text-white mx-auto"
            >
              Done
            </button>
          </div>
        ) : type === "cash" ? (
          <div data-aos="fade-up" className="bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center mb-4">
              <FaRegMoneyBillAlt className="text-4xl mr-4 text-green-500" />
              <h3 className="text-xl font-semibold">Cash</h3>
              <button
                onClick={() => success()}
                className="btn btn-success text-white mx-auto"
              >
                Done
              </button>
            </div>
            {/* Cash payment details go here */}
            <p>Cash payment details go here...</p>
          </div>
        ) : (
          <div data-aos="fade-up" className="bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center mb-4">
              <FaRegMoneyBillAlt className="text-4xl mr-4 text-green-500" />
              <h3 className="text-xl font-semibold">Mobile Banking</h3>
            </div>
            <img
              src="https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2019/07/11/bkash_logo_0.jpg"
              alt="bkash"
              className="w-1/3"
            />
            <img
              src="https://tds-images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2022/04/03/nagad.jpg"
              className="w-1/6"
              alt=""
            />
            <p>Cash payment details go here...</p>
            <button
              onClick={() => success()}
              className="btn btn-success text-white mx-auto"
            >
              Done
            </button>
          </div>
        )}

        {/* Cash Payment */}
      </div>
    </div>
  );
}
