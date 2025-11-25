/***
 * instructions:
 * 1. npm install hls.js
 * 2. import Hls from "hls.js"
 * 3. add the following code to your component
 * 4. convert your video source to m3u8 using this command: ffmpeg -i home-hero.mp4 \ -profile:v baseline -level 3.0 -start_number 0 \ -hls_time 6 -hls_list_size 0 \ -f hls home-hero.m3u8
 * 5. add the home-hero.m3u8 source to your component
 * 
 * 
 */
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HLSVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({ src, poster, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS.js error:", data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      console.error("HLS not supported");
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      muted
      autoPlay
    />
  );
};

export default HLSVideoPlayer;
