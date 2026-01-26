'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function VerticalAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="mx-auto flex items-center justify-center" style={{minWidth: '300px', minHeight: '600px'}}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5214845531760839"
          data-ad-slot="3290987981"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
    </div>
  );
}
