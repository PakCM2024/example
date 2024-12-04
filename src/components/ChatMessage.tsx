import React, { useContext } from 'react';
import { Message } from '../utils/types';
import { User, Copy, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatMessageProps {
  message: Message;
  fontSize?: 'sm' | 'base' | 'lg';
  isBold?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, fontSize = 'base', isBold = false }) => {
  const isUser = message.sender === 'user';
  const { translations, language } = useLanguage();
  
  const handleCopy = async () => {
    navigator.clipboard.writeText(message.content);
    const button = document.getElementById(`copy-${message.id}`);
    if (button) {
      button.classList.add('text-green-500');
      setTimeout(() => {
        button.classList.remove('text-green-500');
      }, 1000);
    }
  };

  const handleEmail = async () => {
    const subject = isUser ? 'Mon message' : 'Réponse de Kapi';
    const body = `${message.content}\n\n---\nEnvoyé le ${new Date(message.timestamp).toLocaleString()}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    const button = document.getElementById(`email-${message.id}`);
    if (button) {
      button.classList.add('text-blue-500');
      setTimeout(() => {
        button.classList.remove('text-blue-500');
      }, 1000);
    }
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 px-3 md:px-6 group`}>
      <div className={`flex items-start max-w-[90%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md overflow-hidden ${
          isUser ? 'bg-blue-500 ml-3' : 'bg-white dark:bg-gray-700 mr-3 p-1'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
          ) : (
            <img 
              src="https://static.wixstatic.com/media/ccfac3_79c3332854af4ce980bc58147f90741a~mv2.png"
              alt="Kapi Bot"
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div className={`px-5 py-3 rounded-2xl relative group shadow-sm ${
          isUser ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
        }`}>
          <p className={`whitespace-pre-wrap break-words mb-2 ${
            fontSize === 'sm' ? 'text-sm' : 
            fontSize === 'lg' ? 'text-lg' : 
            'text-base'
          } leading-relaxed ${isBold ? 'font-semibold' : 'font-normal'}`}>
            {message.content}
          </p>
          <div className="flex items-center justify-end gap-2 mt-2 text-xs">
            <div className="flex items-center gap-1.5">
            <button
              id={`copy-${message.id}`}
              onClick={handleCopy}
              className={`p-1 rounded transition-colors ${
                isUser ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              title={translations[language].copyMessage}
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              id={`email-${message.id}`}
              onClick={handleEmail}
              className={`p-1 rounded transition-colors ${
                isUser ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              title={translations[language].sendByEmail}
            >
              <Mail className="w-4 h-4" />
            </button>
            </div>
            <span className={`select-none border-l pl-2 ${
              isUser ? 'border-white/20 text-white/80' : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
            }`}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};