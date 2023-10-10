import { usePostAiAssistMutation } from "@/state/api";
import React, { useState, useEffect } from "react";
import MessageFormUI from "./MessageFormUI";


function useDebounce(value, delay){
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // const handler = setTimeout(() => {
        //     setDebouncedValue(value);
        // }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debouncedValue;
}

const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };


  const debouncedValue = useDebounce(message, 1000);
  useEffect(() => {
    if(debouncedValue){
        const form = { text: message};
        triggerAssist(form);
    }
  }, [debouncedValue]);

  const handleKeyDown = (e) => {
    if(e.keyCode === 9 || e.keyCode === 13){
        e.preventDefault();
        setMessage(`${message}  ${appendText}`);
    }
    setAppendText("");
  }

  useEffect(() => {
    if(resultAssist.data?.message){
        setAppendText(resultAssist.data?.message)
    }
  }, [resultAssist]);

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleKeyDown={handleKeyDown}
      appendText={appendText}
    />
  );
};

export default AiAssist;