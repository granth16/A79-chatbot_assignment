import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import "./chatbox.css";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp?: string;
    status?: string;
  }
  interface MessageContextPayload {
    
    text: string;
}
   interface MessagePublic {
    created_at?: string;
    updated_at?: string;
    content: string;
    role?: string;
    conversation_id?: number;
    id: number;
    message_context: MessageContextPayload;

}

 
const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1,
      text: "What is this document about?", 
      sender: "user" 
    },
    {
      id: 2,
      text: "This document serves as a comprehensive introduction to my personal webpage, designed to provide an overview of who I am, showcase my professional and creative work, and offer an easy way to get in touch. It includes sections about my background, skills, and experiences, a portfolio.",
      sender: "bot",
    },
  ]);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

  const [inputValue, setInputValue] = useState("");
  const mockSendMessage = (payload: Message): MessagePublic => {
    const response: MessagePublic = {
      id: Math.floor(Math.random() * 1000),  // Simulate a unique ID
      content: `Received: ${payload.text}`,  // Content from the payload text
      role: 'bot',  
      conversation_id: 1,  // Default 1 
      created_at: new Date().toISOString(),  
      updated_at: new Date().toISOString(),
      message_context: {
        text: "This is a demo response" 
      },
    };
  
    return response;
  };
  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id); // Set the copied message ID
    setTimeout(() => {
      setCopiedMessageId(null); // Reset the copied message ID after 2 seconds
    }, 2000);
  };
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      const botResponse = mockSendMessage(newMessage);
      const botsMessage: Message = {
        id: botResponse.id,
        text: botResponse.message_context.text,  // Take text from message_context
        sender: "bot",
      };
      setMessages([...messages, newMessage, botsMessage]);
      console.log(botResponse,"MessagePublic");  //The Message public response from the mock function
      setInputValue("");
    }
  };

  return (
    <div className='chatbox'>
      <div className='messages-container'>
        {messages.map((message) => (
          <React.Fragment key={message.id}>
          <div className={`message ${message.sender}`}>
            <div className='profile-pic'>N</div>
            <p>{message.text}</p>
          </div>
          {message.sender === "bot" && (
            <div className='copy-button-container'>
              <button
                className='copy-button'
                onClick={() => handleCopy(message.text, message.id)}
              >
                <MdContentCopy className='copy-icon' />
                {copiedMessageId === message.id && (
                  <span className='copied-text'>Copied! </span>
                )}
              </button>
            </div>
          )}
        </React.Fragment>
        ))}
      </div>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Ask A79...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;