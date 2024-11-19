// import React, { useState } from 'react';
// import ImageIcon from '@mui/icons-material/Image';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';

// const InputText = ({ addMessage }) => {
//   const [message, setMessage] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [audioFile, setAudioFile] = useState(null);

  
//   const sendMessage = () => {
//     if (message.trim()) {
//       addMessage(message);
//       setMessage('');
//     }
//   };


//   const handleImageClick = () => {
//     document.getElementById('imageInput').click();
//   };

  
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(URL.createObjectURL(file)); 
//       console.log(file); 
//     }
//   };

  
//   const handleAttachFileClick = () => {
//     document.getElementById('fileInput').click();
//   };

  
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       console.log(file); 
//     }
//   };

 
//   const handleMicClick = () => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then((stream) => {
//           const mediaRecorder = new MediaRecorder(stream);
//           mediaRecorder.start();

//           const audioChunks = [];
//           mediaRecorder.ondataavailable = (event) => {
//             audioChunks.push(event.data);
//           };

//           mediaRecorder.onstop = () => {
//             const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//             const audioUrl = URL.createObjectURL(audioBlob);
//             setAudioFile(audioUrl); 
//             console.log(audioBlob); 
//           };

         
//           setTimeout(() => {
//             mediaRecorder.stop();
//           }, 5000);
//         })
//         .catch((err) => {
//           console.error("Error accessing the microphone:", err);
//         });
//     } else {
//       console.error("Browser does not support audio recording");
//     }
//   };

//   return (
//     <div className="inputtext_container">
//       <div className="container">
        
//         <ImageIcon className="input-icon" onClick={handleImageClick} />
        
//         <AttachFileIcon className="input-icon" onClick={handleAttachFileClick} />
        
//         <MicTwoToneIcon className="input-icon" onClick={handleMicClick} />
//       </div>

      
//       <input
//         type="file"
//         id="imageInput"
//         style={{ display: 'none' }}
//         accept="image/*"
//         onChange={handleImageChange}
//       />

      
//       <input
//         type="file"       
//         id="fileInput"
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />

     
//       {audioFile && (
//         <div className='audioFile'>
//           <audio controls>
//             <source src={audioFile} type="audio/wav" />
//           </audio>
//         </div>
//       )}

     
//       {imageFile && (
//         <div>
//           <img src={imageFile} alt="Selected" width="100" height="100" />
//         </div>
//       )}

     
//       <textarea
//         name="message"
//         rows="6"
//         placeholder="Input Message ..."
//         onChange={(e) => setMessage(e.target.value)}
//         value={message}
//       ></textarea>

//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default InputText;

import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);

 
  const sendMessage = () => {
    if (message.trim() || imageFile || audioFile || attachedFile) {
     
      const messageData = {
        text: message.trim(),
        image: imageFile,
        audio: audioFile,
        file: attachedFile,
      };
      
      addMessage(messageData);  
      setMessage('');          
      setImageFile(null);      
      setAudioFile(null);       
      setAttachedFile(null);    
    }
  };

  
  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

 
  const handleAttachFileClick = () => {
    document.getElementById('fileInput').click();
  };

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file); 
    }
  };

  
  const handleMicClick = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();

          const audioChunks = [];
          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioFile(audioUrl);  
          };

          
          setTimeout(() => {
            mediaRecorder.stop();
          }, 5000);
        })
        .catch((err) => {
          console.error("Error accessing the microphone:", err);
        });
    } else {
      console.error("Browser does not support audio recording");
    }
  };

  return (
    <div className="inputtext_container">
      
      {audioFile && (
        <div className='audioFile'>
          <audio controls>
            <source src={audioFile} type="audio/wav" />
          </audio>
        </div>
      )}

     
      {imageFile && (
        <div className="imagePreview">
          <img src={imageFile} alt="Selected" width="100" height="100" />
        </div>
      )}

     
      {attachedFile && (
        <div className="filePreview">
          <p>{attachedFile.name}</p> 
        </div>
      )}

      <div className="container">
        
        <ImageIcon className="input-icon" onClick={handleImageClick} />
        
        <AttachFileIcon className="input-icon" onClick={handleAttachFileClick} />
       
        <MicTwoToneIcon className="input-icon" onClick={handleMicClick} />
      </div>

      
      <input
        type="file"
        id="imageInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageChange}
      />

      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      
      <textarea
        name="message"
        rows="6"
        placeholder="Input Message ..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>

      
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default InputText;

