/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const MediaSection = ({ setFormData, formData, imageUrls }) => {
  const [files, setFiles] = useState([]);
  const uploadRef = useRef(files);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          // setFilePerc(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageSubmit = () => {
    setImageUploadError(false);
    if (files.length >= 0 && files.length < 6 && imageUrls.length < 6) {
      setImageUploadError(false);

      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: imageUrls.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    handleImageSubmit();
  }, [files, uploadRef]);
  return (
    <>
      <div className="flex  outline-dashed outline-[#1ABC9C] justify-center items-center my-3">
        <div className="hidden">
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            ref={uploadRef}
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <button
          className={`flex flex-col items-center p-10 gap-5 text-[#1ABC9C] cursor-pointer
          disabled:opacity-50 
          `}
          onClick={() => uploadRef.current.click()}
          disabled={uploading}
          type="button"
        >
          <FaCloudUploadAlt className=" text-7xl" />
          <span className="text-xl ">
            {uploading ? "Uploading...." : "Click Here Or Drop Files To Upload"}
          </span>
        </button>
      </div>
      <div>
        <div className="flex flex-wrap gap-3 pt-3 justify-center">
          {imageUrls.length > 0 &&
            imageUrls.map((url, index) => (
              <div className="flex relative " key={url}>
                <img
                  src={url}
                  alt="property image"
                  className="w-32 h-20 object-cover rounded-lg"
                  aria-label="image"
                />
                <RiDeleteBin2Fill
                  className="absolute z-10 bg-white mt-3 ml-2 p-1 text-2xl rounded cursor-pointer"
                  aria-label="Delete Image"
                  onClick={() => handleRemoveImage(index)}
                />
              </div>
            ))}
        </div>
        {imageUploadError && (
          <p className="text-red-500 font-semibold text-lg text-center">
            {imageUploadError}
          </p>
        )}
      </div>
    </>
  );
};

export default MediaSection;
