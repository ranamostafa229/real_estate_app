import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  signOutUserFaliure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFaliure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { BsPersonAdd } from "react-icons/bs";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [uploadError, setUploadError] = useState();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(currentUser);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setUploadError(error.message);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFaliure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFaliure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.message === false) {
        dispatch(signOutUserFaliure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFaliure(error.message));
    }
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  useEffect(() => {
    if (error === "Access denied") {
      handleSignOut();
    }
  }, [error]);
  return (
    <div className=" flex flex-col h-screen  bg-[#f7f8f9] max-xl:px-5 max-sm:w-screen">
      <div
        className="flex flex-col justify-center items-center 
        w-full max-w-lg  mx-auto mt-10  bg-white gap-4"
      >
        <h1 className="text-xl font-semibold pt-4 pl-4 self-start">
          Profile Details
        </h1>
        <hr className="border-1 w-full" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 m-5 p-7 w-full"
        >
          <input
            type="file"
            ref={fileRef}
            accept="image/.*"
            name="avatar"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          {formData.avatar || currentUser.avatar ? (
            <img
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full h-20 w-20 self-center cursor-pointer"
              onClick={() => fileRef.current.click()}
            />
          ) : (
            <div
              className="rounded-full border-4 border-[#C0BFBE] p-2  self-center cursor-pointer  "
              onClick={() => fileRef.current.click()}
            >
              <BsPersonAdd className="h-20 w-20 text-[#C0BFBE] " />
            </div>
          )}
          <p>
            {uploadError ? (
              <span className="text-red-700">Falied to upload Image</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc} %`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Image successfully uploded</span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            className="outline outline-1 outline-gray-100 p-2 focus:border-none  rounded-sm
        focus:outline-[#00aeff] focus:shadow-sm focus:shadow-[#00aeff]
          text-[#8A8A8A]  "
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            className="outline outline-1 outline-gray-100 p-2 focus:border-none  rounded-sm
          focus:outline-[#00aeff] focus:shadow-sm focus:shadow-[#00aeff]
           text-[#8A8A8A]  "
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="outline outline-1 outline-gray-100 p-2 focus:border-none  rounded-sm
          focus:outline-[#00aeff] focus:shadow-sm focus:shadow-[#00aeff] focus:drop-shadow-md"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-[#FF385C] text-white p-1
           text-lg rounded-md font-semibold hover:opacity-90 transition-all ease-in-out 
         "
          >
            {loading ? "Loading" : "Update"}
          </button>
        </form>

        <p className="text-lg pb-10 text-[#8A8A8A] ">
          {updateSuccess ? "User is updated successfully" : ""}
        </p>
      </div>
    </div>
  );
};

export default Profile;
