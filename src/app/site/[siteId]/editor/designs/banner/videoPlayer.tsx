import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
  height?: string;
  onEnd?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  height,
  onEnd,
}) => {
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(true);
    setMuted(false);
    setShowPlayButton(false);
    setShowControls(true);
  };

  const handleVideoEnd = () => {
    setPlaying(false);
    setMuted(true);
    setShowPlayButton(true);
    if (onEnd) onEnd();
  };

  return (
    <div
      className="relative rounded-md overflow-hidden w-full"
      style={{ maxWidth: "100%" }}
    >
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        <ReactPlayer
          key={showControls ? "controls-on" : "controls-off"}
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          loop={false}
          controls={showControls}
          onEnded={handleVideoEnd}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Play Button */}
      {showPlayButton && (
        <button
          className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-background flex items-center justify-center focus:outline-none transition-transform transform hover:scale-110"
          onClick={handlePlayButtonClick}
          aria-label="Play video"
        >
          <svg
            className="w-6 h-6 text-primary fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
