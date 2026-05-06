import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "./api";
import ImageModal from "./ImageModal";
import LogoutButton from "./Logout";
import { Trash2 } from "lucide-react";

function Gallery({ refreshTrigger }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/display");
        setUploadedImages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImages();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;
    try {
      setUploadedImages((prev) => prev.filter((img) => img._id !== id));
      const res = await api.delete(`/delete/${id}`);
      toast.success(res.data.msg);
    } catch (err) {
      toast.error("Delete failed");
      console.log(err);
    }
  };

  return (
    /* Warm Sunset Gradient Background */
    <div 
    className="min-h-screen bg-from-rose-100 via-orange-50 to-amber-100 p-8">
      
      {/* Header*/}
      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-center">

  <div>
    <h2 className="text-4xl font-black text-slate-800">
      Welcome, {firstName || "User"}
    </h2>
    <div className="h-1.5 w-24 bg-gradient-to-r from-rose-500 to-orange-400 rounded-full mt-3"></div>
  </div>

  <LogoutButton />

</div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {uploadedImages.map((image, index) => (
          <div
            key={image._id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="
              group relative 
              animate-in fade-in slide-in-from-bottom-6 duration-700
              bg-white/50 backdrop-blur-md 
              rounded-[2.5rem] overflow-hidden 
              border border-white/80 shadow-xl 
              hover:shadow-rose-200/60 hover:shadow-2xl 
              hover:-translate-y-3 transition-all duration-500
            "
          >
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={image.imageURL}
                alt="uploaded"
                className="
                  w-full h-full object-cover
                  cursor-pointer transition-transform duration-1000 
                  group-hover:scale-110
                "
              />
            </div>

            {/* Warm Tint Overlay */}
            <div className="
              absolute inset-0 bg-gradient-to-t 
              from-rose-900/40 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-500 pointer-events-none
            " />

            {/* Admin Delete Button - Sunset Themed */}
            {isAdmin && (
              <button
                onClick={() => handleDelete(image._id)}
                className="
                  absolute top-5 right-5
                  w-10 h-10 flex items-center justify-center
                  rounded-2xl bg-white/90 text-rose-500
                  backdrop-blur-xl shadow-lg
                  hover:bg-rose-600 hover:text-white hover:rotate-90
                  transition-all duration-300 active:scale-90
                "
              >
                <Trash2 size={20} />
              </button>
            )}

            {/* View Button - Rose Glow */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button 
                  onClick={() => setSelectedImage(image.imageURL)}
                  className="px-6 py-2.5 bg-rose-500 text-white rounded-full text-xs font-bold tracking-widest shadow-lg shadow-rose-500/40 hover:bg-rose-600 transition-colors uppercase"
                >
                  View
                </button>
            </div>
          </div>
        ))}
      </div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default Gallery;