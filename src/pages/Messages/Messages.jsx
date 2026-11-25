import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../../components/layout/TopNavBar/TopNavBar';
import BottomNavBar from '../../components/layout/BottomNavBar/BottomNavBar';
import { getChats, sendChatMessage } from '../../services/storage';
import './Messages.css';
import { useStorageRefresh } from '../../services/useStorageRefresh';

export default function Messages() {
  useStorageRefresh();
  const chats = getChats();
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('compras');
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchChat, setSearchChat] = useState('');


  const currentChats = chats.filter(c => {
    const matchesTab = c.type === activeTab;
    const matchesSearch = searchChat === '' || 
      c.user.name.toLowerCase().includes(searchChat.toLowerCase()) ||
      c.productTitle.toLowerCase().includes(searchChat.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeChat = currentChats.find(c => c.id === activeChatId) || currentChats[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChat) return;

    try {
      sendChatMessage(activeChat.id, messageText);
      setMessageText('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-on-background font-sans antialiased overflow-hidden">
      <TopNavBar />
      {error && <p className="fixed z-50 bottom-20 left-4 bg-error-container p-3 rounded" role="alert">{error}</p>}

      <div className="flex flex-1 pt-16 pb-16 lg:pb-0 h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Panel: Chat List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-outline-variant flex flex-col bg-surface h-full ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-outline-variant">
            <h1 className="font-headline-md text-headline-md text-primary font-bold mb-3">
              Mensajes
            </h1>
            
            {/* Tabs: Compras / Ventas */}
            <div className="flex border-b border-outline-variant mb-3">
              <button 
                onClick={() => { setActiveTab('compras'); }}
                className={`flex-1 py-2 text-label-bold transition-all ${
                  activeTab === 'compras' 
                    ? 'text-secondary border-b-2 border-secondary font-bold' 
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                Compras
              </button>
              <button 
                onClick={() => { setActiveTab('ventas'); }}
                className={`flex-1 py-2 text-label-bold transition-all ${
                  activeTab === 'ventas' 
                    ? 'text-secondary border-b-2 border-secondary font-bold' 
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                Ventas
              </button>
            </div>

            {/* Search chats */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
                search
              </span>
              <input 
                className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body-sm text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" 
                placeholder="Buscar chats por nombre o producto..." 
                type="text"
                value={searchChat}
                onChange={(e) => setSearchChat(e.target.value)}
              />
            </div>
          </div>

          {/* Chat items list */}
          <div className="flex-1 overflow-y-auto">
            {currentChats.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant text-body-sm">
                No hay conversaciones en esta pestaña.
              </div>
            ) : (
              currentChats.map((chat) => {
                const isActive = activeChat && activeChat.id === chat.id;
                return (
                  <div 
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-l-4 ${
                      isActive 
                        ? 'bg-surface-container-high border-secondary' 
                        : 'hover:bg-surface-container-low border-transparent'
                    }`}
                  >
                    <img 
                      className="w-12 h-12 rounded-full object-cover shadow-sm bg-surface-container-low flex-shrink-0" 
                      alt={chat.user.name} 
                      src={chat.user.avatar} 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-label-bold text-label-bold text-on-surface truncate font-semibold">
                          {chat.user.name}
                        </h3>
                        <span className="font-body-sm text-[11px] text-on-surface-variant ml-2 flex-shrink-0">
                          {chat.time}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        {chat.lastMessage}
                      </p>
                      <p className="font-label-caps text-[11px] text-secondary mt-1 font-semibold truncate">
                        {chat.productTitle}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Center/Right Panel: Active Conversation */}
        {activeChat ? (
          <div className={`flex flex-col flex-1 h-full min-w-0 bg-surface-bright ${activeChatId ? 'flex' : 'hidden md:flex'}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveChatId(null)}
                  className="md:hidden p-1 text-on-surface-variant hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
                <img 
                  className="w-10 h-10 rounded-full object-cover shadow-sm" 
                  alt={activeChat.user.name} 
                  src={activeChat.user.avatar} 
                />
                <div>
                  <h2 className="font-label-bold text-label-bold text-on-surface font-bold">
                    {activeChat.user.name}
                  </h2>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      {activeChat.user.rating} ({activeChat.user.trades}) • {activeChat.productTitle}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link 
                  to={`/vendedor/${activeChat.user.id}`}
                  className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors" 
                  title="Ver perfil"
                >
                  <span className="material-symbols-outlined">person</span>
                </Link>
              </div>
            </div>

            {/* Chat Messages scroll area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-surface-container-lowest">
              <div className="text-center my-2">
                <span className="font-label-caps text-[11px] text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant/30">
                  Chat protegido por AlToque
                </span>
              </div>

              {activeChat.messages.map((msg) => {
                const isMe = msg.sender === 'me';
                return (
                  <div 
                    key={msg.id}
                    className={`flex gap-2 items-end max-w-[80%] ${isMe ? 'self-end' : 'self-start'}`}
                  >
                    {!isMe && (
                      <img 
                        className="w-6 h-6 rounded-full object-cover mb-1" 
                        alt="User" 
                        src={activeChat.user.avatar} 
                      />
                    )}
                    <div 
                      className={`p-3 rounded-2xl shadow-sm ${
                        isMe 
                          ? 'bg-primary text-on-primary rounded-br-sm' 
                          : 'bg-surface-container-high text-on-surface rounded-bl-sm border border-outline-variant/40'
                      }`}
                    >
                      <p className="font-body-sm text-body-sm leading-relaxed">{msg.text}</p>
                      <span className={`text-[10px] mt-1 block text-right flex items-center justify-end gap-1 ${isMe ? 'text-inverse-primary' : 'text-on-surface-variant'}`}>
                        {msg.time}
                        {isMe && (
                          <span className="material-symbols-outlined text-[13px]">done_all</span>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message input */}
            <form onSubmit={handleSend} className="p-3 border-t border-outline-variant bg-surface flex items-center gap-2">
              <input 
                className="flex-1 bg-surface-container-low border border-outline-variant rounded-full px-4 py-2.5 text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none" 
                placeholder="Escribe tu mensaje..." 
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!messageText.trim()}
                className="bg-secondary text-on-secondary w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary-fixed transition-colors disabled:opacity-40 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-surface-bright text-on-surface-variant">
            <p>Selecciona una conversación para empezar a chatear.</p>
          </div>
        )}
      </div>

      <BottomNavBar />
    </div>
  );
}

