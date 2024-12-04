import React, { useState, useEffect, useRef } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { ThemeToggle } from './components/ThemeToggle';
import { TrackingMessage } from './components/tracking/TrackingMessage';
import { TrackingForm } from './components/TrackingForm';
import { Message, UserInfo } from './utils/types';
import { sendMessage } from './utils/api';
import { getUserInfo } from './utils/userInfo';
import { Disclaimer } from './components/Disclaimer';
import { LogsViewer } from './components/LogsViewer';
import { logger } from './utils/logger';
import { LogEntry } from './types/logs';
import { SimpaButton } from './components/SimpaButton';
import { ReportingForm } from './components/ReportingForm';
import { LanguageToggle } from './components/LanguageToggle';
import { Language, translations } from './utils/i18n';
import { LanguageContext } from './contexts/LanguageContext';
import { Package, BookOpen, Calculator, Mic, AlertCircle, Flag, BarChart2, Type, Bold } from 'lucide-react';
import { KnowledgeBase } from './components/KnowledgeBase';
import { VoiceAssistant } from './components/VoiceAssistant';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showReportingForm, setShowReportingForm] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResponse | null>(null);
  const [logsPassword, setLogsPassword] = useState('');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isBold, setIsBold] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleLogsClick = () => {
    const password = prompt('Veuillez entrer le mot de passe pour accéder aux logs:');
    if (password === 'psg') {
      setShowLogs(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  useEffect(() => {
    const unsubscribe = logger.subscribe(setLogs);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUserInfo();

    setMessages([
      {
        id: '1',
        content: translations[language].welcome,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const isScrolledNearBottom = chatContainerRef.current.scrollTop > maxScroll - 100;
      
      if (isScrolledNearBottom) {
        scrollToBottom();
      }
    }
  }, [messages]);

  const handleFontSizeChange = (size: 'sm' | 'base' | 'lg') => {
    setFontSize(size);
    localStorage.setItem('chat-font-size', size);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await sendMessage(content, userInfo);
      const botMessage: Message = {
        id: Date.now().toString(),
        content: response.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Désolé, je rencontre des difficultés techniques. Pouvez-vous reformuler votre question?',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackingResult = (result: TrackingResponse) => {
    const message: Message = {
      id: Date.now().toString(),
      content: result.message,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage }}>
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 md:p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full shrink-0">
            <img
              src="https://static.wixstatic.com/media/ccfac3_79c3332854af4ce980bc58147f90741a~mv2.png"
              alt="Kapi Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold dark:text-white">KAPI</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setShowDisclaimer(true)}
            className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1.5"
          >
            <AlertCircle className="w-4 h-4 text-blue-500" />
            Avis
          </button>
          <button
            onClick={() => setShowReportingForm(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1.5"
          >
            <Flag className="w-4 h-4 text-blue-500" />
            {translations[language].report}
          </button>
          <button
            onClick={handleLogsClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1.5"
          >
            <BarChart2 className="w-4 h-4 text-blue-500" />
            {translations[language].logs} ({logs.length})
          </button>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          <div className="border-l dark:border-gray-700 h-6"></div>
          <LanguageToggle currentLang={language} onToggle={setLanguage} />
        </div>
      </header>

      <LogsViewer
        isOpen={showLogs}
        onClose={() => setShowLogs(false)}
        logs={logs}
        onClear={() => logger.clearLogs()}
      />
      <ReportingForm
        isOpen={showReportingForm}
        onClose={() => setShowReportingForm(false)}
      />
      {showTracking && (
        <div className="p-4">
          <TrackingForm onResult={handleTrackingResult} />
        </div>
      )}

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto py-2 md:py-4 space-y-3 md:space-y-4 chat-container scroll-smooth"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} fontSize={fontSize} isBold={isBold} />
        ))}
        {isLoading && (
          <div className="flex justify-start px-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 md:p-4 shadow-lg sticky bottom-0">
        <div className="flex items-center justify-end mb-2 gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
            {translations[language].textSize?.title || 'Taille du texte'}:
          </span>
          <button
            onClick={() => handleFontSizeChange('sm')}
            className={`p-1.5 rounded ${fontSize === 'sm' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title={translations[language].textSize?.small || 'Petit'}
          >
            <Type className="w-3 h-3" />
          </button>
          <button
            onClick={() => handleFontSizeChange('base')}
            className={`p-1.5 rounded ${fontSize === 'base' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title={translations[language].textSize?.medium || 'Moyen'}
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFontSizeChange('lg')}
            className={`p-1.5 rounded ${fontSize === 'lg' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title={translations[language].textSize?.large || 'Grand'}
          >
            <Type className="w-5 h-5" />
          </button>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-2" />
          <button
            onClick={() => setIsBold(!isBold)}
            className={`p-1.5 rounded ${isBold ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-3 md:mb-4">
          <button
            onClick={() => setShowTracking(!showTracking)}
            className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm transition-colors"
          >
            <Package className="w-4 h-4" />
            {showTracking ? translations[language].closeTracking : translations[language].trackingButton}
          </button>
          <button
            onClick={() => setShowKnowledgeBase(true)}
            className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {translations[language].knowledgeBase}
          </button>
          <button
            onClick={() => setShowVoiceAssistant(true)}
            className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm transition-colors"
          >
            <Mic className="w-4 h-4" />
            {translations[language].voiceAssistant}
          </button>
          <div className="w-full">
            <SimpaButton />
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
      
      <footer className="bg-white dark:bg-gray-800 p-3 md:p-4 border-t dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:flex md:items-center md:justify-center gap-4 md:gap-12 mb-4 md:mb-6">
            <a href="https://www.pak.cm" target="_blank" rel="noopener noreferrer" className="flex items-center h-10">
              <img
                src="https://image.jimcdn.com/app/cms/image/transf/none/path/s1084e755aa436055/image/i219e83c0dd65e597/version/1551566814/image.jpg"
                alt="PAK"
                className="h-10 w-auto object-contain"
              />
            </a>
            <a href="https://www.pakazure.com" target="_blank" rel="noopener noreferrer" className="flex items-center h-10">
              <img
                src="https://static.wixstatic.com/media/ccfac3_e82eb7f271cb42709c78ae85c0aaf01f~mv2.jpg/v1/fill/w_144,h_122,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/PAKAZURE_JPG.jpg"
                alt="Pakazure"
                className="h-10 w-auto object-contain"
              />
            </a>
            <a href="https://www.guichetunique.cm" target="_blank" rel="noopener noreferrer" className="flex items-center h-10">
              <img
                src="https://www.guichetunique.cm/wp-content/uploads/2022/08/cropped-logo-du-GUCE.png"
                alt="GUCE"
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} PAK. {translations[language].allRightsReserved}
            </p>
          </div>
        </div>
      </footer>
      
      <Disclaimer
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
      <KnowledgeBase
        isOpen={showKnowledgeBase}
        onClose={() => setShowKnowledgeBase(false)}
      />
      <VoiceAssistant
        isOpen={showVoiceAssistant}
        onClose={() => setShowVoiceAssistant(false)}
      />
    </div>
  </LanguageContext.Provider>
  );
}