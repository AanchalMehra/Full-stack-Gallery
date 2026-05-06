import { useState } from "react";
import Upload from "./Components/Upload";
import Gallery from "./Components/Gallery";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshImages = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-orange-50 to-amber-100 selection:bg-rose-200 selection:text-rose-900">
      {/* Container: Changed px-3 to px-4 and simplified vertical padding */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        
        <header className="relative mb-10 sm:mb-16 text-center">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-rose-300/20 blur-3xl rounded-full" />
          <h1 className="relative text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-slate-800 via-rose-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm mb-2 p-2">
            ImageGallery
          </h1>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-[10px] sm:text-xs">
            • Capture • Curate • Share
          </p>
        </header>

        {/* Upload Section: Refined rounded corners and shadow */}
        <div className="flex justify-center mb-12 sm:mb-20 animate-in fade-in zoom-in duration-1000 px-2">
          <div className="w-full max-w-xl p-1 bg-white/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/40">
            <Upload refreshImages={refreshImages} />
          </div>
        </div>

        <main className="relative">
          <Gallery refreshTrigger={refresh} />
        </main>
        
        <footer className="mt-16 pb-10 text-center text-slate-400 text-xs sm:text-sm font-light">
          Built with passion & precision
        </footer>
      </div>
    </div>
  );
}

export default App;