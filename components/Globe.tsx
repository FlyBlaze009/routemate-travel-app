'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { GlobeMethods } from 'react-globe.gl';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeClient() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current) {
        const controls = globeRef.current.controls?.();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1;
          clearInterval(interval);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="rgba(0,0,0,0)"
      pointColor={() => '#FF5733'}
      pointLabel="name"
      pointRadius={0.5}
      pointAltitude={0.1}
      pointsMerge={true}
      height={1000}
      width={1200}
    />
  );
}
