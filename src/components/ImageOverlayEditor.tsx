"use client";


import React, { useState } from 'react';

const ImageOverlayEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [opacity, setOpacity] = useState(100);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    setPosition(prev => ({ ...prev, [axis]: value }));
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    setSize(prev => ({ ...prev, [dimension]: value }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-medium mb-4">Image Overlay Editor</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        
        {image && (
          <div className="border p-2 rounded">
            <div className="relative bg-gray-100" style={{ height: '300px' }}>
              <img 
                src={image} 
                alt="Overlay" 
                className="absolute border-2 border-blue-500"
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  width: `${size.width}px`,
                  height: `${size.height}px`,
                  opacity: opacity / 100,
                }}
              />
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1">Opacity: {opacity}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">X Position: {position.x}px</label>
            <input
              type="range"
              min="0"
              max="500"
              value={position.x}
              onChange={(e) => handlePositionChange('x', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Y Position: {position.y}px</label>
            <input
              type="range"
              min="0"
              max="500"
              value={position.y}
              onChange={(e) => handlePositionChange('y', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Width: {size.width}px</label>
            <input
              type="range"
              min="50"
              max="500"
              value={size.width}
              onChange={(e) => handleSizeChange('width', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height: {size.height}px</label>
            <input
              type="range"
              min="50"
              max="500"
              value={size.height}
              onChange={(e) => handleSizeChange('height', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageOverlayEditor;