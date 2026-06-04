import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        'ios-src'?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'ar-placement'?: string;
        'camera-controls'?: boolean;
        'touch-action'?: string;
        'shadow-intensity'?: string;
        exposure?: string;
        'environment-image'?: string;
        'auto-rotate'?: boolean;
        loading?: string;
        reveal?: string;
        alt?: string;
        style?: React.CSSProperties;
      };
    }
  }
}
