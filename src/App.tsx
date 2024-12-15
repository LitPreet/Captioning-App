import React, { useCallback, useState } from "react";
import CaptionForm from "./components/CaptionForm";
import VideoPlayer from "./components/VideoPlayer";
import { Caption } from "./utils";
import { Timer, Trash } from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Empty from "./assets/images/empty-box.png";

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const toastForNotif = (msg: string) =>
    toast(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      type: "success",
    });
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [videoDuration, setVideoDuration] = useState<number>(0); 

  const addCaption = useCallback((caption: Caption) => {
    setCaptions((prevCaptions) => [...prevCaptions, caption]);
    toastForNotif("Caption Added Successfully!");
  }, []);

  const replaceCaption = (updatedCaption: Caption) => {
    setCaptions((prevCaptions) =>
      prevCaptions.map((caption) =>
        caption.id === updatedCaption.id ? updatedCaption : caption
      )
    );
  };

  const removeCaption = useCallback((id: number) => {
    setCaptions((prevCaptions) =>
      prevCaptions.filter((caption) => caption.id !== id)
    );
    toastForNotif("Caption Removed Successfully!");
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleDuration = useCallback((duration: number) => {
    setVideoDuration(duration);
  }, []);

  return (
    <div className="p-4 max-w-5xl w-full mx-auto flex items-center flex-col">
      <ToastContainer />
      <main className="w-full  flex items-center flex-col ">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">CAPTION APP</h1>

        {/* Input for video URL */}
        <input
          type="text"
          value={videoUrl}
          onChange={handleUrlChange}
          placeholder="Enter video URL"
          className="p-2 outline-none border border-gray-700 focus:border-blue-500 rounded mb-2 w-full max-w-xl"
        />
      </main>
      {/* If the URL is valid, show the content */}
      {videoUrl.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {/* Video Player Section */}
          <div className="order-1 md:order-2">
            <VideoPlayer
              videoUrl={videoUrl}
              captions={captions}
              onDuration={handleDuration}
            />

            {/* Caption Form Component */}
            <CaptionForm
              addCaption={addCaption}
              replaceCaption={replaceCaption}
              videoDuration={videoDuration}
              existingCaptions={captions}
            />
          </div>

          {/* Caption List Section */}
          <div className="order-2 md:order-1  h-[450px] bg-gray-300 rounded-md">
            <h2 className="text-xl font-semibold my-2 text-center">
              Caption List
            </h2>
      
            <div className="mt-4 flex flex-col w-full md:w-[96%] p-3 items-center  overflow-y-auto">
              <ul className="space-y-4 w-full">
                {captions.length > 0 ? (
                  captions.map((caption) => (
                    <li
                      key={caption.id}
                      className="flex justify-between items-center p-4 bg-gray-100 rounded shadow w-full"
                    >
                      <div>
                        <p className="font-semibold my-2 text-sm">
                          {caption.text}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center gap-2">
                          <Timer className="w-4 h-4 text-gray-600" />
                          {`${caption.start}s`}
                          <span>-</span>
                          <Timer className="w-4 h-4 text-gray-600" />
                          {`${caption.end}s`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeCaption(caption.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={20} />
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="flex items-center flex-col h-[300px] gap-2 justify-center w-full">
                    <img src={Empty} className="w-14" />
                    <p className="text-sm text-black">No caption Found!</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
