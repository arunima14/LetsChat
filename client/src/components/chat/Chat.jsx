import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';
import Header from '../customHeader/Header';
import StandardMessageForm from '../customMessage/StandardMessageForm';

const Chat = () => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID, 
    "test_user",
    "test_user"
  )
  return (
    <div style={{flexBasis: "100%"}}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} style={{height: "100vh"}} renderChatHeader={(chat) => <Header chat={chat} />}  renderMessageForm={(props) => {
        return(
          <StandardMessageForm props={props} activeChat={chatProps.chat} />
        )
      }}/> 
    </div>
  )
}

export default Chat;