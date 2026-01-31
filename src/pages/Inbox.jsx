import React, { useState } from 'react';
import { Search, MoreVertical, Phone, Video, ChevronDown, Paperclip, Send, Smile } from 'lucide-react';
import { useStore } from '../store/useStore';

const Inbox = () => {
    const { contacts, messages, sendMessage, user } = useStore();
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [showChatOnMobile, setShowChatOnMobile] = useState(false);
    const [msgInput, setMsgInput] = useState("");

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        setShowChatOnMobile(true);
    };

    const handleSend = () => {
        if (!msgInput.trim()) return;
        sendMessage(selectedContact.id, msgInput);
        setMsgInput("");
    };

    const activeMessages = messages[selectedContact.id] || [];

    return (
        <div className="flex h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] gap-6 relative">
            {/* Sidebar List */}
            <div className={`
                w-full lg:w-80 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col
                ${showChatOnMobile ? 'hidden lg:flex' : 'flex'}
            `}
            >
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" placeholder="Search messages..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs focus:outline-none dark:text-white" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {contacts.map((contact) => (
                        <button
                            key={contact.id}
                            onClick={() => handleSelectContact(contact)}
                            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-colors ${selectedContact.id === contact.id ? 'bg-brand-50 dark:bg-brand-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <div className="relative">
                                <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{contact.name}</h4>
                                    <span className="text-[10px] text-gray-400">{contact.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{contact.msg}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`
                flex-1 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col
                ${showChatOnMobile ? 'flex' : 'hidden lg:flex'}
            `}
            >
                {/* Chat Header */}
                <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowChatOnMobile(false)}
                            className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <ChevronDown className="rotate-90" size={24} />
                        </button>
                        <img src={selectedContact.avatar} alt={selectedContact.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
                        <div>
                            <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-white">{selectedContact.name}</h3>
                            <p className="text-[10px] md:text-xs text-green-500 font-medium">{selectedContact.online ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <button className="p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"><Phone size={18} /></button>
                        <button className="p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"><Video size={18} /></button>
                        <button className="p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"><MoreVertical size={18} /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                    {activeMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'them' && (
                                <img src={selectedContact.avatar} alt="Sender" className="w-8 h-8 rounded-full self-end mr-2 mb-1" />
                            )}
                            <div className={`max-w-[80%] md:max-w-[70%] p-3 md:p-4 rounded-2xl text-sm ${msg.sender === 'me' ? 'bg-brand-600 text-white rounded-tr-none' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                <p>{msg.text}</p>
                                <span className={`text-[10px] block mt-1 ${msg.sender === 'me' ? 'text-brand-100' : 'text-gray-400'}`}>{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    {activeMessages.length === 0 && (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                            No messages yet. Say hi!
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 md:gap-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl">
                        <button className="p-2 text-gray-400 hover:text-brand-600 transition-colors hidden sm:block"><Paperclip size={20} /></button>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm dark:text-white min-w-0 outline-none"
                        />
                        <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Smile size={18} /></button>
                        <button
                            onClick={handleSend}
                            className="w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 transition-colors shrink-0 disabled:opacity-50"
                            disabled={!msgInput.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
