import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch } from '@/store/hooks';
import { setUploading, setUploadProgress, setVideo, setThumbnail } from '@/store/slices/videoSlice';

const VideoUpload: React.FC = () => {
  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    dispatch(setUploading(true));
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      dispatch(setUploadProgress(progress));
      if (progress >= 100) {
        clearInterval(interval);
        dispatch(setUploading(false));
        
        // Create object URL for the video
        const url = URL.createObjectURL(file);
        
        // Create thumbnail (mock - in a real app, you'd generate this properly)
        const thumbnail = '/placeholder-thumbnail.jpg';
        
        // Get video duration (mock - in a real app, you'd use the video element)
        const duration = 120; // 2 minutes
        
        dispatch(setVideo({ url, name: file.name, duration }));
        dispatch(setThumbnail(thumbnail));
      }
    }, 200);
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  return (
    <div className="p-6 border-2 border-dashed rounded-lg">
      <div 
        {...getRootProps()} 
        className={`p-8 text-center cursor-pointer ${isDragActive ? 'bg-blue-50' : 'bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-600">
            {isDragActive ? (
              'Drop the video file here'
            ) : (
              'Drag & drop a video file here, or click to select'
            )}
          </p>
          <p className="text-xs text-gray-500">Supports MP4, MOV, AVI (Max 500MB)</p>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;