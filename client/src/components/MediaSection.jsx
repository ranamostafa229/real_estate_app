/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

const MediaSection = ({ setFormData, formData, imageUrls }) => {
  const [files, setFiles] = useState([]);
  const uploadRef = useRef(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleImageSubmit = async () => {
    setImageUploadError(false);
    if (files.length >= 0 && files.length < 6 && imageUrls.length < 6) {
      setUploading(true);
      try {
        const formDataToSend = new FormData();
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append("images", files[i]);
        }

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formDataToSend,
        });
        const data = await res.json();
        if (data.success === false) {
          setImageUploadError(data.message || "Upload failed");
        } else {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(data.urls),
          });
        }
      } catch (err) {
        console.error(err);
        setImageUploadError("Image upload failed (2 mb max per image)");
      } finally {
        setUploading(false);
      }
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
    if (files && files.length > 0) handleImageSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);
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
