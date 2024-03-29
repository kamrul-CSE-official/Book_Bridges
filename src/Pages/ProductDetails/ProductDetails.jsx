import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { BsCartCheckFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Loding from "../../Components/Share/Loding";
import { useDispatch } from "react-redux";
import { addToCart, wishList } from "../../redux/productSlice/productSlice";
import useUserInfo from "../../Utils/UserInfo";
import moment from "moment";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from "../../redux/Api/publicApi";

export default function ProductDetails() {
  const { user } = useUserInfo();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);

  const { data: bookData } = useGetCommentsQuery(id);

  // Move the following lines inside the useEffect
  useEffect(() => {
    setData(bookData?.data);
    setComments(bookData?.data?.comments);
  }, [bookData]);

  console.log("Book details: ", data);
  const dispatch = useDispatch();

  const [postComment] = usePostCommentMutation();
  const handleComments = async (e) => {
    e.preventDefault();
    const userComment = e.target.comment.value;

    if (userComment.length >= 1) {
      const newComment = {
        _id: Date.now(),
        comment: userComment,
        time: moment().format("Do MMMM YYYY, h:mm a"),
      };

      try {
        await postComment({ comment: newComment, id: id });
        // setComments((prevComments) => [...prevComments, newComment]);
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  return (
    <>
      {data ? (
        <div className="container mx-auto mt-8">
          <div className="mx-auto bg-white p-8 shadow-md rounded-md flex flex-col md:flex-row items-center justify-center gap-3">
            <img
              src={data?.img}
              alt={data?.title}
              className="w-full h-fit md:max-h-[550px] object-cover mb-4"
            />

            <div>
              <h2 className="text-3xl font-bold mb-2">
                {data?.title}{" "}
                <small className="text-xs text-red-500">
                  {data?.state == false && "Out of stock"}
                </small>
              </h2>
              <p className="text-gray-600 mb-1">Author: {data?.author}</p>
              <p className="text-gray-600 mb-4">Edition: {data?.edithion}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                ${data?.price}
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Description:</h3>
                <p className="text-gray-700">{data?.comment}</p>
              </div>

              <div className="text-gray-600 text-sm mb-4">
                <p>Posted on: {data?.time}</p>

                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span className="text-xs">
                        <img
                          src={
                            data?.photoURL
                              ? data?.photoURL
                              : "https://thumbs.dreamstime.com/b/user-profile-icon-flat-vector-illustration-design-user-profile-icon-flat-vector-illustration-design-isolated-white-background-158416637.jpg"
                          }
                          alt=""
                        />
                      </span>
                    </div>
                  </div>{" "}
                  <p>Posted by: {data?.user?.email}</p>
                </div>
              </div>
              <button
                disabled={
                  user?.email === data?.user?.email || data?.state == false
                    ? true
                    : false
                }
                onClick={() => dispatch(wishList(data))}
                className="btn bg-black hover:bg-pink-700 text-white"
              >
                Wish list <FcLike size={20} />
              </button>
              <button
                disabled={
                  user?.email === data?.user?.email || data?.state == false
                    ? true
                    : false
                }
                onClick={() => dispatch(addToCart(data))}
                className="btn bg-purple-700 hover:bg-pink-700 text-white"
              >
                Add To Cart <BsCartCheckFill size={20} />
              </button>
            </div>
          </div>
          {/* comment */}
          <div>
            <form
              onSubmit={handleComments}
              className="flex items-center justify-center gap-2"
            >
              <input
                type="text"
                name="comment"
                placeholder="Write a Comment..."
                className="input input-bordered input-info w-full"
              />
              <button
                disabled={user ? false : true}
                type="submit"
                className="btn btn-secondary"
              >
                Comment
              </button>
            </form>
            <div>
              {comments?.map((item) => (
                <div key={item?._id} className="chat chat-end">
                  <div className="chat-bubble chat-bubble-success w-full text-white">
                    {item?.comment} <br />
                    <small className="text-black">{item?.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loding />
      )}
    </>
  );
}
