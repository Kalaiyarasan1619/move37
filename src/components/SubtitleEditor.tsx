"use client";


import React, { useState } from 'react';

const SubtitleEditor: React.FC = () => {
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [position, setPosition] = useState('bottom');
  const [color, setColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(16);

  const handleAddSubtitle = () => {
    // In a real app, you'd dispatch an action to add the subtitle
    console.log('Adding subtitle:', {
      text,
      startTime,
      endTime,
      position,
      color,
      fontSize,
    });
    setText('');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-medium mb-4">Subtitle Editor</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subtitle Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter subtitle text"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time (s)</label>
            <input
              type="number"
              value={startTime}
              onChange={(e) => setStartTime(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time (s)</label>
            <input
              type="number"
              value={endTime}
              onChange={(e) => setEndTime(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min={startTime + 1}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Font Size</label>
            <input
              type="range"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="10"
              max="36"
              className="w-full"
            />
            <span className="text-xs">{fontSize}px</span>
          </div>
        </div>
        
        <button
          onClick={handleAddSubtitle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={!text}
        >
          Add Subtitle
        </button>
      </div>
    </div>
  );
};

export default SubtitleEditor;