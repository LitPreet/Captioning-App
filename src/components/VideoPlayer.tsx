import React, { useState, useRef, useCallback } from "react";
import ReactPlayer from "react-player";
import { Caption } from "../utils";

interface VideoPlayerProps {
  videoUrl: string;
  captions: Caption[];
  onDuration?: (duration: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  captions, 
  onDuration 
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const handleProgress = useCallback(({ playedSeconds }: { playedSeconds: number }) => {
    setPlayedSeconds(playedSeconds);
  }, []);

  const handleDuration = useCallback((duration: number) => {
    onDuration?.(duration);
  }, [onDuration]);

  const getCurrentCaption = () => {
    return captions.find(
      (caption) => 
        playedSeconds >= caption.start && 
        playedSeconds <= caption.end
    );
  };

  return (
    <div className="relative w-full max-w-xl mx-auto bg-black">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        controls
        width="100%"
        height="auto"
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        progressInterval={500}
        className="relative z-10"
      />
      {getCurrentCaption() && (
        <div 
          className="
            absolute 
            bottom-[10%] 
            left-0 
            w-full 
            flex 
            justify-center 
            px-2 
            z-20 
            pointer-events-none
          "
        >
          <div 
            className="
              text-white 
              text-center 
              bg-black 
              bg-opacity-50 
              p-2 
              rounded 
              max-w-[90%] 
              break-words 
              text-[min(4vw,24px)]
            "
          >
            {getCurrentCaption()?.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;