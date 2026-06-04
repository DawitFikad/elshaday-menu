"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Camera, AlertCircle, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ARButtonProps {
  modelSrc: string;
  iosSrc?: string;
  title: string;
  className?: string;
}

export const ARButton: React.FC<ARButtonProps> = ({ modelSrc, iosSrc, title, className }) => {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    // Check for AR support
    const checkSupport = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      if (isIOS) {
        // iOS Quick Look support check
        const a = document.createElement('a');
        const supported = !!(a.relList && a.relList.supports && a.relList.supports('ar'));
        setIsSupported(supported);
      } else if (isAndroid) {
        // WebXR support check
        if ('xr' in navigator) {
          (navigator as any).xr.isSessionSupported('immersive-ar')
            .then((supported: boolean) => setIsSupported(supported))
            .catch(() => setIsSupported(false));
        } else {
          setIsSupported(false);
        }
      } else {
        setIsSupported(false);
      }
    };

    checkSupport();
  }, []);

  const handleARClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // For iOS, we need to handle the quick-look link specifically for a professional feel
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && iosSrc) {
      const anchor = document.createElement('a');
      anchor.setAttribute('rel', 'ar');
      anchor.setAttribute('href', iosSrc);
      const img = document.createElement('img');
      anchor.appendChild(img);
      anchor.click();
      return;
    }

    if (modelViewerRef.current) {
      modelViewerRef.current.activateAR();
    }
  };

  // If AR is definitely not supported, don't show the button
  if (isSupported === false) {
    return null;
  }

  return (
    <div className={cn("w-full h-[52px] relative", className)}>
      {/* Hidden model-viewer - fixed dimensions to prevent layout shifts */}
      <model-viewer
        ref={modelViewerRef}
        src={modelSrc}
        ios-src={iosSrc}
        ar
        ar-modes="scene-viewer quick-look webxr"
        ar-placement="floor"
        ar-scale="fixed"
        camera-controls
        touch-action="none"
        alt={`A 3D model of ${title}`}
        style={{ 
          position: 'absolute', 
          width: '1px', 
          height: '1px', 
          pointerEvents: 'none',
          opacity: 0 
        }}
      >
        <button
          slot="ar-button"
          onClick={handleARClick}
          className="w-full h-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
        >
          <Camera size={18} />
          <span>View on your table</span>
        </button>
      </model-viewer>

      {/* Fallback button shown while checking support or if model-viewer button is not ready */}
      <button
        onClick={handleARClick}
        className="w-full h-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
      >
        <Camera size={18} />
        <span>View on your table</span>
      </button>
    </div>
  );
};

