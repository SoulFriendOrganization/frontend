/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import StreamText from "./StreamText";
import { useState, useEffect, useRef } from "react";
import { IoSend, IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { chatbotTrialService, chatbotService } from "../services";

function RenderChatbot({ name, userExpression, isTrial = true}) {
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
    <div className="flex flex-col items-center p-3 sm:p-4 md:p-6 max-w-xl sm:max-w-2xl mx-auto h-full w-full">
      <style>{scrollbarStyle}</style>
      {!isChatbotOpen ? (
        <>
          <motion.div 
            key="render-chatbot"
            className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full text-center px-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >  
            <motion.div
              className="text-2xl sm:text-3xl md:text-4xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {emojiMoodText}
            </motion.div>
            
            <motion.div 
              className="font-medium text-base sm:text-lg md:text-xl text-gray-800 mb-1 sm:mb-2"
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
            className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 mt-3 sm:mt-4 rounded-lg text-white font-medium bg-[#D4A017] hover:bg-[#C09016] transition-colors shadow-sm cursor-pointer text-sm sm:text-base"
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
        <div className="flex flex-col h-full w-full">          <motion.div 
            className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#D4A017] text-lg sm:text-xl text-white">
                {emojiMoodText}
              </div>
              <div className="font-medium text-gray-800 text-sm sm:text-base">
                {`${greeting} ${moodMessage} hari ini.`}
              </div>
            </div>            
            <button 
              onClick={() => setIsChatbotOpen(false)}
              className="text-gray-500 cursor-pointer hover:text-gray-700 bg-gray-100/50 hover:bg-gray-100 rounded-full p-1.5 sm:p-2 transition-colors"
            >
              <IoClose className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>
          </motion.div>
          <motion.div 
            className="flex flex-col flex-grow min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] max-h-[calc(100vh-230px)] sm:max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-250px)] border-t border-b border-gray-100 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >            
          <div className="flex-grow overflow-y-auto p-2 sm:p-3 md:p-4 scrollbar-hide" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#D4A017 transparent',
            }}>              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-3 sm:mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#D4A017] text-white flex items-center justify-center mr-1.5 sm:mr-2 self-end">
                      <RiRobot2Fill className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] sm:max-w-[75%] p-2 sm:p-2.5 md:p-3 text-sm sm:text-base ${
                      msg.sender === 'user' 
                        ? 'bg-[#D4A017] text-white rounded-2xl rounded-br-sm shadow-sm' 
                        : 'bg-white/90 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100'
                    }`}
                  >
                    {msg.message}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center ml-1.5 sm:ml-2 self-end">
                      <FaRegUser className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-[14px] md:h-[14px]" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="mb-3 sm:mb-4 flex justify-start">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#D4A017] text-white flex items-center justify-center mr-1.5 sm:mr-2 self-end">
                    <RiRobot2Fill className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                  </div>
                  <div className="max-w-[80%] sm:max-w-[75%] p-2 sm:p-2.5 md:p-3 bg-white/90 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4"></div>
            </div>
          </motion.div>            <motion.div 
            className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isTrial && reachedTrialLimit ? (
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="bg-white/90 text-center p-2 sm:p-3 rounded-lg border border-[#D4A017] text-gray-800">
                  <p className="mb-1 sm:mb-2 text-sm sm:text-base">Anda telah mencapai batas percakapan trial.</p>
                  <p className="font-medium text-sm sm:text-base">Untuk melanjutkan percakapan, silakan sign in.</p>
                </div>
                <a href="/login" className="text-center py-2 sm:py-3 bg-[#D4A017] text-white rounded-lg hover:bg-[#C09016] transition-colors shadow-sm font-medium cursor-pointer text-sm sm:text-base">
                  Sign In
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">                
              <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={isLoading ? "Menunggu respons..." : "Ketik pesanmu di sini..."}
                  className={`flex-grow p-2 sm:p-3 pl-3 sm:pl-4 text-sm sm:text-base ${isLoading ? 'bg-gray-100 text-gray-500' : 'bg-gray-100/50'} border-none rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:bg-gray-100/80 transition-all`}
                  disabled={(isTrial && reachedTrialLimit) || isLoading}
                />                
                <button
                  onClick={handleSendMessage}
                  className={`p-2 sm:p-3 ${(isTrial && reachedTrialLimit) || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D4A017] hover:bg-[#C09016] cursor-pointer'} text-white rounded-full transition-colors shadow-sm`}
                  disabled={(isTrial && reachedTrialLimit) || isLoading}
                >
                  <IoSend className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
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
