import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg m-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
        />
      </div>
      <button
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};