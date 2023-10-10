import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';
import Header from '../customHeader/Header';
import StandardMessageForm from '../customMessage/StandardMessageForm';
import AiText from '../customMessage/AiText';
import AiCode from '../customMessage/AiCode';
import AiAssist from '../customMessage/AiAssist';

const Chat = () => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID, 
    "test_user",
    "1234"
  )
  return (
    <div style={{flexBasis: "100%"}}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow 
        {...chatProps} 
        style={{height: "100vh"}} 
        renderChatHeader={(chat) => <Header chat={chat} />}  
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")){
            return(
              <AiText props={props} activeChat={chatProps.chat} />
            )
          }
          if (chatProps.chat?.title.startsWith("AiCode_")){
            return(
              <AiCode props={props} activeChat={chatProps.chat} />
            )
          }
          if (chatProps.chat?.title.startsWith("AiAssist_")){
            return(
              <AiAssist props={props} activeChat={chatProps.chat} />
            )
          }
          return(
              <StandardMessageForm props={props} activeChat={chatProps.chat} />
          )
        }}
      /> 
    </div>
  )
}

export default Chat;
