function ImageModal({ image, onClose }) {

  if (!image) return null;

  return (

    <div
      onClick={onClose}
      className="
      fixed inset-0 z-[9999]
      bg-black/60 backdrop-blur-sm
      flex items-center justify-center
      p-4
      transition-all duration-300
      "
    >

      <img
        src={image}
        alt="preview"

        onClick={(e) => e.stopPropagation()}

        className="
        max-h-[90vh]
        max-w-[90vw]
        rounded-2xl
        shadow-2xl
        object-contain
        transition-transform duration-300
        hover:scale-[1.01]
        "
      />

      <button
        onClick={onClose}
        className="
        absolute top-5 right-5
        text-white text-4xl
        hover:scale-110
        transition duration-200
        "
      >
        ✕
      </button>

    </div>
  );
}

export default ImageModal;