"use client";

import React, { useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCurrentTime } from '@/store/slices/timelineSlice';
import ReactPlayer from 'react-player';

const VideoPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { url, thumbnail } = useAppSelector((state) => state.video);
  const { currentTime } = useAppSelector((state) => state.timeline);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(currentTime, 'seconds');
    }
  }, [currentTime]);

  const handleProgress = (state: { playedSeconds: number }) => {
    dispatch(setCurrentTime(state.playedSeconds));
  };

  if (!url) {
    return (
      <div className="flex items-center justify-center bg-gray-200 rounded-lg aspect-video">
        <p className="text-gray-500">Upload a video to begin editing</p>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        controls
        light={thumbnail || false}
        onProgress={handleProgress}
      />
    </div>
  );
};

export default VideoPlayer;