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
    <div className="w-full bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 p-1 sm:p-4">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-800">
            Welcome, {firstName || "User"}
          </h2>
          <div className="h-1 w-12 sm:w-24 bg-gradient-to-r from-rose-500 to-orange-400 rounded-full mt-1"></div>
        </div>
        <LogoutButton />
      </div>

      
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
        {uploadedImages.map((image, index) => (
          <div
            key={image._id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="
              group relative 
              animate-in fade-in slide-in-from-bottom-4 duration-500
              bg-white/50 backdrop-blur-md 
             rounded-xl sm:rounded-3xl overflow-hidden 
              border border-white/80 shadow-md sm:shadow-xl 
              hover:-translate-y-2 active:scale-95 sm:active:scale-100 transition-all duration-500
            "
          >
            {/* Image Container */}
            <div className="aspect-square sm:aspect-[4/5] overflow-hidden">
              <img
                src={image.imageURL}
                alt="uploaded"
                onClick={() => setSelectedImage(image.imageURL)}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>

            {/* Admin Delete Button */}
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(image._id);
                }}
                className="
                  absolute top-2 right-2 sm:top-5 sm:right-5
                  w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center
                  rounded-lg sm:rounded-2xl bg-white/90 text-rose-500
                  backdrop-blur-xl shadow-md z-10 hover:bg-rose-500 hover:text-white transition-colors
                "
              >
                <Trash2 size={14} className="sm:w-5 sm:h-5" />
              </button>
            )}

            {/* "View" Button - Hidden on Mobile, Hover-only on Desktop */}
            <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="px-6 py-2.5 bg-rose-500 text-white rounded-full text-xs font-bold tracking-widest shadow-lg">
                  VIEW
                </div>
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