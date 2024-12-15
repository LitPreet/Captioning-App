// import React, { useState } from "react";
// import { Caption } from "../utils";

// interface CaptionFormProps {
//   addCaption: (caption: Caption) => void;
//   replaceCaption: (caption: Caption) => void;
//   videoDuration: number; // Video duration passed from the parent
//   existingCaptions: Caption[]; // Existing captions to check timestamps
// }

// const CaptionForm: React.FC<CaptionFormProps> = ({
//   addCaption,
//   replaceCaption,
//   videoDuration,
//   existingCaptions,
// }) => {
//   const [text, setText] = useState<string>("");
//   const [start, setStart] = useState<number>(0);
//   const [end, setEnd] = useState<number>(0);
//   const [error, setError] = useState<string>("");

//   const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     if (value <= end) {
//       setStart(value);
//       setError(""); // Clear error if the start time is valid
//     } else {
//       setError("Start time cannot be greater than end time.");
//     }
//   };

//   const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     if (value >= start) {
//       setEnd(value);
//       setError(""); // Clear error if the end time is valid
//     } else {
//       setError("End time cannot be less than start time.");
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (start < end) {
//       const existingCaption = existingCaptions.find(
//         (caption) => caption.start === start && caption.end === end
//       );

//       if (existingCaption) {
//         const confirmReplace = window.confirm(
//           `A caption already exists for the timestamp (${start}s - ${end}s). Do you want to replace it?`
//         );

//         if (confirmReplace) {
//           replaceCaption({ text, start, end, id: existingCaption.id });
//         }
//       } else {
//         addCaption({ text, start, end, id: Date.now() }); // Add a new caption
//       }

//       // Reset the form
//       setText("");
//       setStart(0);
//       setEnd(0);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl my-2">
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Caption text"
//         className="p-2 border outline-none focus:border-blue-400 rounded"
//       ></textarea>
//       <div className="flex gap-4">
//         <div className="w-1/2">
//           <label>Start time</label>
//           <input
//             type="range"
//             value={start}
//             onChange={handleStartChange}
//             max={videoDuration} // Max set to video duration
//             className="w-full"
//           />
//           <input
//             type="number"
//             value={start}
//             onChange={handleStartChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="w-1/2">
//           <label>End time</label>
//           <input
//             type="range"
//             value={end}
//             onChange={handleEndChange}
//             max={videoDuration}
//             className="w-full"
//           />
//           <input
//             type="number"
//             value={end}
//             onChange={handleEndChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </div>
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       <button
//         type="submit"
//         className="mt-4 p-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-700"
//         disabled={start >= end || text.length === 0} 
//       >
//         Add Caption
//       </button>
//     </form>
//   );
// };

// export default CaptionForm;
import React, { useState } from "react";
import { Caption } from "../utils";

interface CaptionFormProps {
  addCaption: (caption: Caption) => void;
  replaceCaption: (caption: Caption) => void;
  videoDuration: number;
  existingCaptions: Caption[];
}

const CaptionForm: React.FC<CaptionFormProps> = ({
  addCaption,
  replaceCaption,
  videoDuration,
  existingCaptions,
}) => {
  const [text, setText] = useState<string>("");
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setStart(value);
    if (value > end) {
      setError("Start time cannot exceed end time.");
    } else {
      setError("");
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setEnd(value);
    if (value < start) {
      setError("End time cannot be less than start time.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (start >= end || text.trim() === "") {
      setError("Please enter valid start and end times with non-empty text.");
      return;
    }

    const existingCaption = existingCaptions.find(
      (caption) => caption.start === start && caption.end === end
    );

    if (existingCaption) {
      const confirmReplace = window.confirm(
        `A caption already exists for the timestamp (${start}s - ${end}s). Do you want to replace it?`
      );
      if (confirmReplace) {
        replaceCaption({ text, start, end, id: existingCaption.id });
      }
    } else {
      addCaption({ text, start, end, id: Date.now() });
    }

    setText("");
    setStart(0);
    setEnd(0);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl my-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Caption text"
        className="p-2 border outline-none focus:border-blue-400 rounded"
      />
      <div className="flex gap-4">
        <div className="w-1/2">
          <label>Start time</label>
          <input
            type="range"
            value={start}
            onChange={handleStartChange}
            max={videoDuration}
            className="w-full"
          />
          <input
            type="number"
            value={start}
            onChange={handleStartChange}
            max={videoDuration}
            className="w-full p-2 border rounded outline-none focus:border-blue-400"
          />
        </div>
        <div className="w-1/2">
          <label>End time</label>
          <input
            type="range"
            value={end}
            onChange={handleEndChange}
            max={videoDuration}
            className="w-full"
          />
          <input
            type="number"
            value={end}
            onChange={handleEndChange}
            max={videoDuration}
            className="w-full p-2 outline-none focus:border-blue-400 border rounded"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        disabled={start >= end || text.trim() === ""}
      >
        Add Caption
      </button>
    </form>
  );
};

export default CaptionForm;
