import { useState } from "react";
import Upload from "./Components/Upload";
import Gallery from "./Components/Gallery";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshImages = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="
      min-h-screen 
      bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
      from-rose-100 via-orange-50 to-amber-100
      selection:bg-rose-200 selection:text-rose-900
    ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Animated Header Section */}
        <header className="relative mb-16 text-center">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-rose-300/20 blur-3xl rounded-full" />
          
          <h1 className="
            relative
            text-3xl md:text-6xl
            font-black
            tracking-tighter
            bg-gradient-to-br
            from-slate-800 via-rose-600 to-orange-600
            bg-clip-text
            text-transparent
            drop-shadow-sm
            mb-3
            p-5
          ">
            ImageGallery
          </h1>
          
          <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">
            •Capture • Curate • Share
          </p>
        </header>

        {/* Upload Section with Glass Container */}
        <div className="
          flex justify-center mb-16 
          animate-in fade-in zoom-in duration-1000
        ">
          <div className="
            w-full max-w-xl 
            p-1 bg-white/30 
            backdrop-blur-xl 
            rounded-[3rem] 
            shadow-2xl shadow-rose-200/40 
            border border-white/50
          ">
            <Upload refreshImages={refreshImages} />
          </div>
        </div>

        {/* Main Gallery Area */}
        <main className="relative">
          <Gallery refreshTrigger={refresh} />
        </main>
        
        {/* Subtle Footer Decor */}
        <footer className="mt-20 pb-10 text-center text-slate-400 text-sm font-light">
          Built with passion & precision
        </footer>
      </div>
    </div>
  );
}

export default App;