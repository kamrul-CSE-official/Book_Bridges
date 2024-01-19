import { useDispatch, useSelector } from "react-redux";
import useUserInfo from "../../Utils/UserInfo";
import { setProfileState } from "../../redux/Features/profileSlice";
import MyBooks from "../../Components/Profile/MyBooks";
import MyOrder from "../../Components/Profile/MyOrder";
import AllOrder from "../../Components/Profile/AllOrder";

const Profile = () => {
  const { user } = useUserInfo();
  const profilePhoto = user?.photoURL;
  const { profileState } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  console.log(profileState);

  return (
    <div>
      <div className=" rounded-lg mx-auto  shadow-md  ]  shadow-[#00bba6] mt-5  ">
        <div className="p-10">
          <div className="flex justify-center">
            <img className="rounded-full" alt="user image" src={profilePhoto} />
          </div>
          <h3 className="text-center text-3xl mt-5">
            WelCome{" "}
            <span className="text-[#00bba6] font-bold">
              {user?.displayName}
            </span>{" "}
          </h3>
        </div>
        <div>
          <div className="flex   bg-gray-400 gap-5">
            <button
              onClick={() => dispatch(setProfileState(1))}
              className={`${
                profileState == 1 && "bg-green-900"
              }    bg-green-700 rounded-md text-white font-semibold px-4  py-1`}
            >
              My Books
            </button>
            <button
              onClick={() => dispatch(setProfileState(2))}
              className={`${
                profileState == 2 && "bg-green-900"
              }    bg-green-700 rounded-md text-white font-semibold px-4  py-1`}
            >
              My Order
            </button>
            <button
              onClick={() => dispatch(setProfileState(3))}
              className={`${
                profileState == 3 && "bg-green-900"
              }    bg-green-700 rounded-md text-white font-semibold px-4  py-1`}
            >
              All Order
            </button>
          </div>
        </div>
        <div>
          <div className="p-10">
            {profileState == 1 && <MyBooks />}
            {profileState == 2 && <MyOrder />}
            {profileState == 3 && <AllOrder />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
