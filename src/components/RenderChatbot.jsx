/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import StreamText from "./StreamText";
import { useState } from "react";
import { IoSend, IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";

function RenderChatbot({ name, userExpression }) {
  // Custom CSS for scrollbar
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
    default: `mood kamu ${userExpression}`
  };
  
  const greetingMessages = {
    happy: `Hai ${name}! Senang melihatmu`,
    surprise: `Hai ${name}! Wah,`,
    sad: `Hai ${name}! Aku disini untukmu,`,
    anger: `Hai ${name}! Sepertinya`,
    disgust: `Hai ${name}! Hmm,`,
    fear: `Hai ${name}! Jangan khawatir,`,
    neutral: `Hai ${name}!`,
    default: `Hai ${name}!`
  };
  
  const moodMessage = moodMessages[userExpression.toLowerCase()] || moodMessages.default;
  const greeting = greetingMessages[userExpression.toLowerCase()] || greetingMessages.default;
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const buttonTexts = {
    happy: "Yuk, berbagi kebahagiaan!",
    surprise: "Ceritakan padaku!",
    sad: "Aku siap mendengarkan",
    anger: "Tenangkan pikiran yuk",
    disgust: "Mari diskusikan bersama",
    fear: "Bicarakan kecemasanmu",
    neutral: "Obrolan sejenak?",
    default: "Obrolin sekarang yuk"
  };
    const buttonText = buttonTexts[userExpression.toLowerCase()] || buttonTexts.default;
  
  const moodEmoji = {
    happy: "😊",
    surprise: "😲",
    sad: "😔",
    anger: "😠",
    disgust: "😒",
    fear: "😨",
    neutral: "😐",
    default: "🙂"
  }[userExpression.toLowerCase()] || "🙂";
  
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", message: "Halo! Apa yang ingin kamu diskusikan hari ini?" },
    { sender: "user", message: "Aku ingin berbicara tentang perasaanku" },
    { sender: "bot", message: "Tentu, aku siap mendengarkan. Apa yang sedang kamu rasakan?" },
  ]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    setChatMessages([...chatMessages, { sender: "user", message: inputMessage }]);
    setInputMessage("");
    
    // Dummy bot response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        message: `Terima kasih sudah berbagi. Bagaimana perasaanmu setelah menceritakan itu?` 
      }]);
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
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
              {moodEmoji}
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
      ) : (        <div className="flex flex-col h-full w-full">          {/* Introduction at top when chat is open */}
          <motion.div 
            className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D4A017] text-xl text-white">
                {moodEmoji}
              </div>
              <div className="font-medium text-gray-800">
                {`${greeting} ${moodMessage} hari ini.`}
              </div>
            </div>            <button 
              onClick={() => setIsChatbotOpen(false)}
              className="text-gray-500 hover:text-gray-700 bg-gray-100/50 hover:bg-gray-100 rounded-full p-2 transition-colors"
            >
              <IoClose size={18} />
            </button>
          </motion.div>{/* Chat container */}
          <motion.div 
            className="flex flex-col flex-grow min-h-[50vh] max-h-[calc(100vh-250px)] border-t border-b border-gray-100 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-grow overflow-y-auto p-4 scrollbar-hide" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#D4A017 transparent',
            }}>              {chatMessages.map((msg, index) => (
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
            </div>
          </motion.div>
            {/* Input area */}
          <motion.div 
            className="mt-4 pt-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesanmu di sini..."
                className="flex-grow p-3 pl-4 bg-gray-100/50 border-none rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:bg-gray-100/80 transition-all"
              />              <button
                onClick={handleSendMessage}
                className="p-3 bg-[#D4A017] text-white rounded-full hover:bg-[#C09016] transition-colors shadow-sm"
              >
                <IoSend size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default RenderChatbot;
