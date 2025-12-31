import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 2026 Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-400/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mb-8 flex justify-center">
          <span className="rounded-full px-4 py-1.5 text-xs font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 uppercase">
            Nepal's Premium IT Partner
          </span>
        </div>

        <h1 className="text-6xl font-black tracking-tight text-slate-900 sm:text-8xl mb-8">
          IT Solutions in <br />
          <span className="text-gradient underline decoration-blue-100">One Bucket.</span>
        </h1>

        <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto font-medium">
          Providing enterprise-grade hardware, software, and support across Nepal. 
          From cloud infrastructure to high-end hardware.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            to="/services" 
            className="w-full sm:w-auto rounded-2xl bg-slate-900 px-10 py-5 text-sm font-black text-white shadow-2xl hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
          >
            Explore Services
          </Link>
          <Link 
            to="/contact" 
            className="w-full sm:w-auto rounded-2xl bg-white border border-slate-200 px-10 py-5 text-sm font-black text-slate-900 hover:bg-slate-50 transition-all"
          >
            Request a Quote
          </Link>
        </div>

        {/* Floating Trust Badge */}
        <div className="mt-20 pt-10 border-t border-slate-200/50 flex flex-wrap justify-center gap-12 opacity-50 grayscale">
           <span className="font-black text-xl">HARDWARE</span>
           <span className="font-black text-xl">SOFTWARE</span>
           <span className="font-black text-xl">SUPPORT</span>
        </div>
      </div>
    </div>
  );
}
