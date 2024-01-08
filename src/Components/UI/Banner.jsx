import Lottie from "lottie-react";
import bannerImg from "../../assets/BannerImg.json";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <>
    {/* banner */}
    <div className="flex flex-col md:flex-row items-center justify-around">
        <div
          data-aos="fade-left"
          
          className="flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-6xl font-black text-black">বুক ব্রিজ</h1>
          <p className="text-accent font-semibold text-xl">
            বুজ ব্রিজ-এ যুক্ত হন এবং আপনার পুরাতন বইগুলো বিক্রি করে অন্যদের কাছে
            নতুন জীবন দিন 🔖
          </p>
          <div className="mt-4 md:mt-8">
            <p>
              বইপ্রেমীদের জন্য এক অনন্য উদ্যোগ বই বিনিময় একটি অনলাইন প্ল্যাটফর্ম
              যেখানে আপনি আপনার পুরাতন বইগুলো অর্ধেক দামে বিক্রি করতে পারেন।
              আমাদের লক্ষ্য হলো বইপ্রেমীদের জন্য একটি সস্তা এবং সহজ উপায়ে বই
              কেনার সুযোগ তৈরি করা। বুজ ব্রিজ-এ আপনি যেকোনো ধরনের পুরাতন বই
              বিক্রি করতে পারেন।
            </p>
          </div>
          <Link to="/about">
            <button className="mt-5 btn btn-accent">Know More</button>
          </Link>
        </div>
        <div className="w-full md:w-[75%]" data-aos="fade-right" >
          <Lottie className="w-fit" animationData={bannerImg} />
        </div>
      </div>

    {/* features */}
    <div className="pt-6 pb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              data-aos="fade-right"
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                বইকে নতুন জীবন দিন <span className="text-5xl">🧬</span>
              </h3>
              <p className="text-gray-600">
                আপনার ধুলো জমা বইটি বিক্রয় করে অন্য জনের কাছে নুতন জীবন দান
                করুন।
              </p>
            </div>

            {/* Feature 2 */}
            <div
              data-aos="fade-up"
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                স্বল্প মূল্যে পুরাতন বই ক্রয়/বিক্রয়{" "}
                <span className="text-5xl">🤝</span>
              </h3>
              <p className="text-gray-600">
                অনেকে অর্থের অভাবে বাই কিনতে পারছে না। তাদের জন্য দারুণ একটা
                প্রয়াস আমাদের এই বুক-ব্রিজ ওয়েবসাইট।
              </p>
            </div>

            {/* Feature 3 */}
            <div
              data-aos="fade-left"             
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                সমগ্র বাংলাদেশে হোম ডেলিভারি{" "}
                <span className="text-5xl">🚚</span>
              </h3>
              <p className="text-gray-600">
                বাংলাদেশে কোন কোন জাইগায় আপনার বাড়িতে বই পৌছে দেয়ার দায়িত্ব
                আমাদের।
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
    
  )
}
