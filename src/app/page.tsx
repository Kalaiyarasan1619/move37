
'use client';


import { Provider } from 'react-redux';
import { store } from '@/store';
import VideoUpload from '@/components/VideoUpload';
import VideoPlayer from '@/components/VideoPlayer';
import Timeline from '@/components/Timeline';
import AudioEditor from '@/components/AudioEditor';
import SubtitleEditor from '@/components/SubtitleEditor';
import ImageOverlayEditor from '@/components/ImageOverlayEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toast } from '@/components/ui/toast';

export default function Home() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Video Editing Platform</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <VideoPlayer />
              
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                  <TabsTrigger value="subtitles">Subtitles</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit">
                  <Timeline />
                </TabsContent>
                
                <TabsContent value="audio">
                  <AudioEditor />
                </TabsContent>
                
                <TabsContent value="subtitles">
                  <SubtitleEditor />
                </TabsContent>
                
                <TabsContent value="images">
                  <ImageOverlayEditor />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <VideoUpload />
              
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-4">Export Options</h3>
                <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  Render Video
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Estimated time: 2 minutes
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toast />
    </Provider>
  );
}