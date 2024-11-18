import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      addMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="inputtext_container">
      {/* Icons */}
      <div className='container'>
      <ImageIcon className="input-icon" />
      <AttachFileIcon className="input-icon" />
      <MicTwoToneIcon className="input-icon" />
      </div>

      {/* Textarea for input message */}
      <textarea 
        name="message"
        rows="6"
        placeholder="Input Message ..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>

      {/* Send button */}
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default InputText;
