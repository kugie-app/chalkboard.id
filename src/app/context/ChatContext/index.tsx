
import  { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import React from "react";
import useSWR, { mutate } from 'swr';
import { ChatsType, MessageType } from '@/app/[locale]/(DashboardLayout)/types/apps/chat';
import { getFetcher, postFetcher } from '@/app/api/globalFetcher';


// Define context props interface
export interface ChatContextProps {
    chatData: ChatsType[];
    chatContent: any[];
    chatSearch: string;
    selectedChat: ChatsType | null;
    loading: boolean;
    error:string;
    activeChatId: number | null;
    setChatContent: Dispatch<SetStateAction<any[]>>;
    setChatSearch: Dispatch<SetStateAction<string>>;
    setSelectedChat: Dispatch<SetStateAction<ChatsType | null>>;
    setActiveChatId: Dispatch<SetStateAction<number | null>>;
    sendMessage: (chatId: number | string, message: MessageType) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string>>;
}

// Create the context
export const ChatContext = createContext<ChatContextProps>({
    chatData: [],
    chatContent: [],
    chatSearch: '',
    selectedChat: null,
    loading: true,
    error:'',
    activeChatId: null,
    setChatContent: () => { },
    setChatSearch: () => { },
    setSelectedChat: () => { },
    setActiveChatId: () => { },
    sendMessage: () => { },
    setLoading: () => { },
    setError: () => { },
});

// Create the provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chatData, setChatData] = useState<ChatsType[]>([]);
    const [chatContent, setChatContent] = useState<any[]>([]);
    const [chatSearch, setChatSearch] = useState<string>('');
    const [selectedChat, setSelectedChat] = useState<ChatsType | null>(null);
    const [activeChatId, setActiveChatId] = useState<number | null>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const {data:ChatsData,isLoading:isChatsLoading,error:Chatserror,mutate} = useSWR('/api/chat', getFetcher);

    // Fetch chat data from the API
    useEffect(() => {
        if(ChatsData){
            setLoading(isChatsLoading);
            let chatsData = ChatsData.data;
            if (chatData.length === 0) {
                let specificChat = chatsData[0];
                setSelectedChat(specificChat);
            }
            setChatData(chatsData);
        }else if(Chatserror){
            setError(Chatserror)
            setLoading(isChatsLoading);
        }
        else{
            setLoading(isChatsLoading);
        }
    }, [ChatsData,Chatserror]);

    // Function to send a message to a chat identified by `chatId` using an API call.

    const sendMessage = async (chatId: number | string, message: MessageType) => {
        try {
           let {data} = await mutate(postFetcher('/api/chat' , {chatId,message}));
           let chat = data.find((chat:any) => chat.id === chatId)
           setSelectedChat(chat);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const value: ChatContextProps = {
        chatData,
        chatContent,
        chatSearch,
        selectedChat,
        loading,
        error,
        activeChatId,
        setChatContent,
        setChatSearch,
        setSelectedChat,
        setActiveChatId,
        sendMessage,
        setError,
        setLoading,
    };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
export type { ChatsType };

