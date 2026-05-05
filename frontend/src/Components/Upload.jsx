import { useState } from "react";
import { toast } from "react-toastify";
import api from "./api";

function Upload({ refreshImages }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }

    try {
      const respond = api.post("/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
      toast.success(respond.data.message);
      refreshImages();
      setFiles([]);
      setPreview([]);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong ❌";
      toast.error(msg);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreview = preview.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreview(newPreview);
  };

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col items-center gap-8 w-full p-6"
    >
      {/* CHOOSE FILE BUTTON - Styled as a soft pill */}
      <label
        htmlFor="fileInput"
        className="
          cursor-pointer 
          bg-white/80 hover:bg-rose-500 
          text-rose-600 hover:text-white 
          px-8 py-4 rounded-full 
          font-bold tracking-wide shadow-lg shadow-rose-100 
          border border-rose-100
          transition-all duration-300 hover:-translate-y-1 active:scale-95
          flex items-center gap-2
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Images
      </label>

      <input
        type="file"
        multiple
        id="fileInput"
        className="hidden"
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files);
          const remainingSlots = 3 - files.length;

          if (remainingSlots <= 0) {
            toast.error("You can only upload 3 images");
            e.target.value = null;
            return;
          }

          const filesToAdd = selectedFiles.slice(0, remainingSlots);
          setFiles((prev) => [...prev, ...filesToAdd]);
          const previewUrls = filesToAdd.map((file) => URL.createObjectURL(file));
          setPreview((prev) => [...prev, ...previewUrls]);
        }}
      />

      {/* PREVIEW SECTION - Added glass cards */}
      <div className="flex justify-center gap-4 flex-wrap">
        {preview.map((src, index) => (
          <div key={index} className="relative group animate-in zoom-in duration-300">
            <div className="p-1 bg-white rounded-[1.5rem] shadow-xl border border-rose-50">
              <img
                src={src}
                alt="preview"
                className="w-28 h-28 object-cover rounded-[1.2rem]"
              />
            </div>

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="
                absolute -top-2 -right-2 
                w-8 h-8 rounded-full 
                bg-rose-600 text-white 
                shadow-lg border-2 border-white
                flex items-center justify-center
                hover:bg-rose-700 transition-colors
              "
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* UPLOAD BUTTON - Large, lively gradient */}
      {files.length > 0 && (
        <button
          type="submit"
          disabled={loading}
          className="
            relative overflow-hidden
            bg-gradient-to-r from-rose-500 to-orange-500 
            text-white px-12 py-4 rounded-3xl
            font-black uppercase tracking-widest shadow-2xl shadow-rose-200
            hover:shadow-rose-400/40 hover:-translate-y-1 
            transition-all duration-300 active:scale-95
            disabled:opacity-50
          "
        >
          {loading ? "Processing..." : "Finish Upload"}
        </button>
      )}

      {/* LOADING - Warm overlay */}
      {loading && (
        <div className="fixed inset-0 bg-rose-900/20 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl flex flex-col items-center gap-4 border border-rose-50">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-rose-500 border-r-transparent"></div>
            <p className="font-bold text-rose-950">Uploading your memories...</p>
          </div>
        </div>
      )}
    </form>
  );
}

export default Upload;