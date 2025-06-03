/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import StreamText from "./StreamText";
import { useState, useEffect, useRef } from "react";
import { IoSend, IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { chatbotTrialService, chatbotService } from "../services";

function RenderChatbot({ name, userExpression, isTrial = true, userId = "" }) {
  const scrollbarStyle = `
    .scrollbar-hide::-webkit-scrollbar {
      width: 5px;
    }
    .scrollbar-hide::-webkit-scrollbar-track {
      background: transparent;
    }
    .scrollbar-hide::-webkit-scrollbar-thumb {
      background-color: rgba(212, 160, 23, 0.3);
      border-radius: 20px;
    }
    .scrollbar-hide:hover::-webkit-scrollbar-thumb {
      background-color: rgba(212, 160, 23, 0.6);
    }
  `;

  const moodMessages = {
    happy: "kamu sedang bersemangat dan penuh energi positif",
    surprise: "kamu terlihat terkejut dengan sesuatu yang menarik perhatianmu",
    sad: "kamu mungkin sedang melalui momen yang kurang menyenangkan",
    anger: "kamu sedang menghadapi hal yang membuatmu kesal",
    disgust: "kamu sepertinya kurang nyaman dengan sesuatu",
    fear: "kamu mungkin sedang merasa khawatir atau cemas",
    neutral: "kamu tampak tenang dan seimbang",
  };
  
  const greetingMessages = {
    happy: `Hai ${name}! Senang melihatmu`,
    surprise: `Hai ${name}! Wah,`,
    sad: `Hai ${name}! Aku disini untukmu,`,
    anger: `Hai ${name}! Sepertinya`,
    disgust: `Hai ${name}! Hmm,`,
    fear: `Hai ${name}! Jangan khawatir,`,
    neutral: `Hai ${name}!`,
  };
  
  const moodMessage = moodMessages[userExpression];
  const greeting = greetingMessages[userExpression];
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const buttonTexts = {
    happy: "Yuk, berbagi kebahagiaan!",
    surprise: "Ceritakan padaku!",
    sad: "Aku siap mendengarkan",
    anger: "Tenangkan pikiran yuk",
    disgust: "Mari diskusikan bersama",
    fear: "Bicarakan kecemasanmu",
    neutral: "Obrolan sejenak?",
  };

  const buttonText = buttonTexts[userExpression];
  
  const moodEmoji = {
    happy: "😊",
    surprise: "😲",
    sad: "😔",
    anger: "😠",
    disgust: "😒",
    fear: "😨",
    neutral: "😐",
  }

  const emojiMoodText = moodEmoji[userExpression];
  
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", message: "Halo! Apa yang ingin kamu diskusikan hari ini?" },
    { sender: "user", message: "Aku ingin berbicara tentang perasaanku" },
    { sender: "bot", message: "Tentu, aku siap mendengarkan. Apa yang sedang kamu rasakan?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [reachedTrialLimit, setReachedTrialLimit] = useState(false);
  const TRIAL_MESSAGE_LIMIT = 3;
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    
    if (isTrial && userMessageCount >= TRIAL_MESSAGE_LIMIT) {
      setReachedTrialLimit(true);
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        message: "Terima kasih telah mencoba layanan kami! Untuk melanjutkan percakapan, silakan sign in terlebih dahulu."
      }]);
      setInputMessage("");
      return;
    }
    
    const userMessage = inputMessage.trim();
    setChatMessages([...chatMessages, { sender: "user", message: userMessage }]);
    setInputMessage("");
    setIsLoading(true);
    
    if (isTrial) {
      setUserMessageCount(prev => prev + 1);
    }
    
    try {
      const serviceFunction = isTrial ? chatbotTrialService : chatbotService;
      const result = await serviceFunction(
        name, 
        userMessage, 
        chatMessages,
        userExpression
      );
      
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        message: result.response || "Maaf, saya tidak dapat memproses permintaan saat ini."
      }]);
      
      if (isTrial && userMessageCount + 1 >= TRIAL_MESSAGE_LIMIT) {
        setTimeout(() => {
          setChatMessages(prev => [...prev, { 
            sender: "bot", 
            message: "Anda telah mencapai batas percakapan trial. Untuk melanjutkan, silakan sign in."
          }]);
          setReachedTrialLimit(true);
        }, 1000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        message: "Maaf, terjadi kesalahan saat berkomunikasi dengan server."
      }]);
    } finally {
      setIsLoading(false);
    }
  };    
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading && !(isTrial && reachedTrialLimit)) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="flex flex-col items-center p-6 max-w-2xl mx-auto h-full">
      <style>{scrollbarStyle}</style>
      {!isChatbotOpen ? (
        <>
          <motion.div 
            key="render-chatbot"
            className="flex flex-col items-center justify-center gap-4 w-full text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >  
            <motion.div
              className="text-4xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {emojiMoodText}
            </motion.div>
            
            <motion.div 
              className="font-medium text-xl text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <StreamText 
                text={`${greeting} ${moodMessage} hari ini.`} 
                speed={40} 
                autoNext={true}
              />
            </motion.div>
          </motion.div>
          
          <motion.button
            className="px-6 py-2 mt-4 rounded-lg text-white font-medium bg-[#D4A017] hover:bg-[#C09016] transition-colors shadow-sm cursor-pointer"
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            onClick={() => setIsChatbotOpen(true)}
          >
            {buttonText}
          </motion.button>
        </>
      ) : (        
        <div className="flex flex-col h-full w-full">
          <motion.div 
            className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D4A017] text-xl text-white">
                {emojiMoodText}
              </div>
              <div className="font-medium text-gray-800">
                {`${greeting} ${moodMessage} hari ini.`}
              </div>
            </div>            
            <button 
              onClick={() => setIsChatbotOpen(false)}
              className="text-gray-500 cursor-pointer hover:text-gray-700 bg-gray-100/50 hover:bg-gray-100 rounded-full p-2 transition-colors"
            >
              <IoClose size={18} />
            </button>
          </motion.div>
          <motion.div 
            className="flex flex-col flex-grow min-h-[50vh] max-h-[calc(100vh-250px)] border-t border-b border-gray-100 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >            
          <div className="flex-grow overflow-y-auto p-4 scrollbar-hide" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#D4A017 transparent',
            }}>              
            {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-[#D4A017] text-white flex items-center justify-center mr-2 self-end">
                      <RiRobot2Fill size={18} />
                    </div>
                  )}
                  <div 
                    className={`max-w-[75%] p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-[#D4A017] text-white rounded-2xl rounded-br-sm shadow-sm' 
                        : 'bg-white/90 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100'
                    }`}
                  >
                    {msg.message}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center ml-2 self-end">
                      <FaRegUser size={14} />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#D4A017] text-white flex items-center justify-center mr-2 self-end">
                    <RiRobot2Fill size={18} />
                  </div>
                  <div className="max-w-[75%] p-3 bg-white/90 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4"></div>
            </div>
          </motion.div>          
          <motion.div 
            className="mt-4 pt-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isTrial && reachedTrialLimit ? (
              <div className="flex flex-col gap-3">
                <div className="bg-white/90 text-center p-3 rounded-lg border border-[#D4A017] text-gray-800">
                  <p className="mb-2">Anda telah mencapai batas percakapan trial.</p>
                  <p className="font-medium">Untuk melanjutkan percakapan, silakan sign in.</p>
                </div>
                <a href="/login" className="text-center py-3 bg-[#D4A017] text-white rounded-lg hover:bg-[#C09016] transition-colors shadow-sm font-medium cursor-pointer">
                  Sign In
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-3">                
              <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={isLoading ? "Menunggu respons..." : "Ketik pesanmu di sini..."}
                  className={`flex-grow p-3 pl-4 ${isLoading ? 'bg-gray-100 text-gray-500' : 'bg-gray-100/50'} border-none rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:bg-gray-100/80 transition-all`}
                  disabled={(isTrial && reachedTrialLimit) || isLoading}
                />                
                <button
                  onClick={handleSendMessage}
                  className={`p-3 ${(isTrial && reachedTrialLimit) || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D4A017] hover:bg-[#C09016] cursor-pointer'} text-white rounded-full transition-colors shadow-sm`}
                  disabled={(isTrial && reachedTrialLimit) || isLoading}
                >
                  <IoSend size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default RenderChatbot;
