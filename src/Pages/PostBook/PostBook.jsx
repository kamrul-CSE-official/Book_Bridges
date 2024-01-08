import Lottie from "lottie-react";
import postImag from "../../assets/postImg.json";
import { useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import useUserInfo from "../../Utils/UserInfo";

export default function PostBook() {
  const {user} = useUserInfo();

  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [edithion, setEdition] = useState("");
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("bookTitle", bookTitle);
    formData.append("author", author);
    formData.append("edithion", edithion);
    formData.append("price", price);
    formData.append("comment", comment);
    formData.append("image", image);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=8e666ea9b130e21c9f6ef96674fb7220`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const imageData = await response.json();
        const imageUrl = imageData.data.url;

        const bookData = {
          img: imageUrl,
          title: bookTitle,
          author: author,
          price: parseInt(price) + 10,
          state: true,
          edithion: edithion,
          comment: comment,
          time: moment().format("Do MMMM YYYY, h:mm:ss a"),
          user: user,
        };

        console.log(bookData);
        await axios
          .post("https://book-bridge-server.vercel.app/products", bookData)
          .then((res) => {
            if (res) {
              Swal.fire({
                title: "Successfully Created",
                icon: "success",
              });
            }
            setLoading(false);
            setBookTitle("");
            setAuthor("");
            setPrice("");
            setEdition("");
            setComment("");
            setImage(null);
          });

        setBookTitle("");
        setAuthor("");
        setPrice("");
        setEdition("");
        setComment("");
        setImage(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="/">Go Home</a>',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          আপনার পুরাতন ধুলা মাখা অব্যবহৃত বইটি হয়তো অন্য কারো বিশেষ প্রয়জন
        </h2>
        <p>
          আমাদের প্রধান উদ্দিশ্য মানুষের কাছে স্বল্প মূল্যে বই পৌছে দেয়া। আপনার
          কাছে মৃতপ্রয় বইটি অন্যনের কাছে দিয়ে নতুন জীবন দান করুন।
        </p>
      </div>
      <div className="absolute w-1/6 top-1 right-2">
        <Lottie animationData={postImag} />
      </div>
      {!loading ? (
        <form onSubmit={handleSubmit}>
          {/* 1 */}
          <div className="flex items-center w-full gap-3">
            <div className="flex flex-col w-full">
              <label>Book Title</label>
              <input
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                type="text"
                required
                placeholder="Book Title"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Author</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                required
                placeholder="Author Name"
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          {/* 2 */}
          <div className="flex items-center w-full gap-3">
            <div className="flex flex-col w-full">
              <label>Edition </label>
              <input
                value={edithion}
                onChange={(e) => setEdition(e.target.value)}
                type="text"
                required
                placeholder="Edition"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                required
                placeholder="Price"
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          {/* 3 */}
          <div className="flex items-center w-full gap-3">
            <div className="flex flex-col w-full">
              <label>Book Image </label>
              <input
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                type="file"
                required
                placeholder="Book Image"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Comment</label>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                required
                placeholder="Comment"
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          <input
            className="btn btn-primary text-xl mx-auto w-full my-4"
            type="submit"
            title="Submit"
          />
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-extrabold">Data Uploading...</h2>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </div>
  );
}
