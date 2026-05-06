function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-[9999]
        bg-black/80 backdrop-blur-md
        flex items-center justify-center
        p-2 sm:p-4
        transition-all duration-300
      "
    >
      {/* Close Button - Optimized for Mobile Tapping */}
      <button
        onClick={onClose}
        className="
          absolute top-4 right-4 sm:top-8 sm:right-8
          z-[10000]
          w-12 h-12 flex items-center justify-center
          bg-white/10 hover:bg-white/20 
          text-white text-2xl rounded-full
          backdrop-blur-md border border-white/20
          transition duration-200
          active:scale-90
        "
        aria-label="Close modal"
      >
        ✕
      </button>

      <div className="relative max-w-full max-h-full flex items-center justify-center">
        <img
          src={image}
          alt="preview"
          onClick={(e) => e.stopPropagation()}
          className="
            max-h-[85vh] sm:max-h-[90vh]
            max-w-[95vw] sm:max-w-[90vw]
            rounded-lg sm:rounded-2xl
            shadow-2xl
            object-contain
            transition-transform duration-300
          "
        />
      </div>
    </div>
  );
}

export default ImageModal;