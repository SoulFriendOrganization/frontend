import { Link } from "react-router";
import { RenderChatbot } from "../components";
import { IoReturnDownBack } from "react-icons/io5";

function ChatbotPage() {
  const userExpression = "neutral";
  const name = "User";

  return (
    <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center justify-center overflow-hidden">
      <Link to="/home">
          <IoReturnDownBack className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
      </Link> 
      <RenderChatbot 
        userExpression={userExpression}
        isTrial={false}
        name={name}
      />
    </div>
  );
}

export default ChatbotPage;