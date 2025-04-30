import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { rearrangeScenes, setCurrentTime } from '@/store/slices/timelineSlice';
import { useDrag, useDrop } from 'react-dnd';

interface SceneItemProps {
  scene: {
    id: string;
    start: number;
    end: number;
  };
  index: number;
  moveScene: (fromIndex: number, toIndex: number) => void;
}

const SceneItem: React.FC<SceneItemProps> = ({ scene, index, moveScene }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SCENE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'SCENE',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveScene(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className={`p-2 m-1 bg-blue-100 rounded cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      Scene {index + 1} ({scene.start}s - {scene.end}s)
    </div>
  );
};

const Timeline: React.FC = () => {
  const dispatch = useAppDispatch();
  const { scenes } = useAppSelector((state) => state.timeline);
  const { duration } = useAppSelector((state) => state.video);

  const moveScene = (fromIndex: number, toIndex: number) => {
    dispatch(rearrangeScenes({ fromIndex, toIndex }));
  };

  const handleAddScene = () => {
    const newScene = {
      id: `scene-${Date.now()}`,
      start: scenes.length > 0 ? scenes[scenes.length - 1].end : 0,
      end: scenes.length > 0 ? scenes[scenes.length - 1].end + 5 : 5,
    };
    // In a real app, you'd dispatch an action to add the scene
    console.log('Adding scene:', newScene);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Timeline</h3>
        <button 
          onClick={handleAddScene}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Add Scene
        </button>
      </div>
      
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.1"
          onChange={handleTimeChange}
          className="w-full"
        />
      </div>
      
      <div className="flex flex-wrap">
        {scenes.map((scene, index) => (
          <SceneItem
            key={scene.id}
            index={index}
            scene={scene}
            moveScene={moveScene}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;