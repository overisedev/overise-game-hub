import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import overiseLogo from '@/assets/overise-logo.png';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  options?: ChatOption[];
}

interface ChatOption {
  label: string;
  response: string;
  isCTA?: boolean;
  ctaLink?: string;
}

const FAQ_OPTIONS: ChatOption[] = [
  {
    label: "Qual o preço do acesso?",
    response: "O acesso vitalício custa apenas R$39,99 por um pagamento único! Você terá acesso a mais de 6.500 jogos para sempre, sem mensalidades."
  },
  {
    label: "Como funciona o desbloqueio?",
    response: "Após a compra, você recebe acesso imediato à sua conta Steam desbloqueada. Basta fazer login no seu PC e todos os jogos estarão disponíveis para baixar e jogar!"
  },
  {
    label: "Funciona em qualquer PC?",
    response: "Sim! Funciona em qualquer computador Windows. Basta ter a Steam instalada e fazer login com a conta desbloqueada."
  },
  {
    label: "É seguro? Tem garantia?",
    response: "100% seguro! Oferecemos garantia de 7 dias. Se não gostar, devolvemos seu dinheiro sem perguntas. Mais de 50 mil clientes satisfeitos!"
  },
  {
    label: "Recebo na hora?",
    response: "Sim! O acesso é liberado automaticamente após a confirmação do pagamento. Em poucos minutos você já estará jogando!"
  }
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Olá! Sou o assistente da Overise. Tem alguma dúvida sobre o pacote de jogos? Estou aqui para ajudar!",
    },
    {
      id: 2,
      type: 'bot',
      content: "Escolha uma opção ou digite sua dúvida:",
      options: FAQ_OPTIONS
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showBadge, setShowBadge] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option: ChatOption) => {
    if (option.isCTA && option.ctaLink) {
      window.location.href = option.ctaLink;
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: option.label
    };

    const botResponse: Message = {
      id: Date.now() + 1,
      type: 'bot',
      content: option.response,
      options: [
        { label: "Quero desbloquear agora!", isCTA: true, ctaLink: "#planos", response: "" },
        { label: "Tenho outra dúvida", response: "Claro! Escolha uma das opções abaixo:" }
      ]
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  const handleMoreQuestions = () => {
    const botMessage: Message = {
      id: Date.now(),
      type: 'bot',
      content: "Sem problemas! Escolha uma das opções abaixo:",
      options: FAQ_OPTIONS
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue
    };

    const botResponse: Message = {
      id: Date.now() + 1,
      type: 'bot',
      content: "Obrigado pela sua mensagem! Para uma resposta mais rápida, escolha uma das opções abaixo ou acesse nosso suporte no WhatsApp.",
      options: [
        { label: "Falar no WhatsApp", isCTA: true, ctaLink: "https://wa.me/5511999999999", response: "" },
        ...FAQ_OPTIONS.slice(0, 3)
      ]
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowBadge(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] flex flex-col overflow-hidden"
            style={{
              background: 'rgba(8, 8, 8, 0.98)',
              border: '1px solid rgba(0, 255, 65, 0.25)',
              borderRadius: '20px',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 255, 65, 0.08)'
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-4 py-3.5"
              style={{
                background: 'linear-gradient(180deg, rgba(20, 20, 20, 1) 0%, rgba(12, 12, 12, 1) 100%)',
                borderBottom: '1px solid rgba(0, 255, 65, 0.2)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ 
                    background: '#000',
                    border: '1px solid rgba(0, 255, 65, 0.3)',
                    boxShadow: '0 0 15px rgba(0, 255, 65, 0.15)'
                  }}
                >
                  <img 
                    src={overiseLogo} 
                    alt="Overise" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px] m-0 tracking-tight">Assistente Overise</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        background: '#00FF41',
                        boxShadow: '0 0 8px rgba(0, 255, 65, 0.6)'
                      }}
                    />
                    <p className="text-[11px] m-0 font-semibold uppercase tracking-wider" style={{ color: '#00FF41' }}>
                      Online
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="w-8 h-8 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center bg-transparent cursor-pointer transition-all duration-200"
                aria-label="Fechar chat"
                style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#666' 
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-3"
              style={{ 
                background: 'linear-gradient(180deg, #050505 0%, #000 100%)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#222 #000'
              }}
            >
              {messages.map((message) => (
                <div key={message.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      message.type === 'user' ? 'self-end ml-auto' : ''
                    }`}
                    style={{
                      background: message.type === 'user' 
                        ? 'linear-gradient(135deg, #00FF41 0%, #00cc33 100%)' 
                        : 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
                      color: message.type === 'user' ? '#000' : '#f0f0f0',
                      borderRadius: message.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      borderLeft: message.type === 'bot' ? '3px solid #00FF41' : 'none',
                      fontWeight: message.type === 'user' ? 600 : 400,
                      boxShadow: message.type === 'user' 
                        ? '0 4px 15px rgba(0, 255, 65, 0.3)' 
                        : '0 4px 15px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {message.content}
                  </motion.div>
                  
                  {/* Options */}
                  {message.options && (
                    <div className="mt-3 flex flex-col gap-2">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => option.label.includes('outra dúvida') ? handleMoreQuestions() : handleOptionClick(option)}
                          className="chat-option-btn w-full flex items-center justify-between px-4 py-3 text-[13px] cursor-pointer transition-all duration-200"
                          style={{
                            background: option.isCTA 
                              ? 'linear-gradient(135deg, #00FF41 0%, #00cc33 100%)' 
                              : 'linear-gradient(135deg, rgba(25, 25, 25, 0.9) 0%, rgba(18, 18, 18, 0.9) 100%)',
                            border: option.isCTA ? 'none' : '1px solid rgba(0, 255, 65, 0.2)',
                            color: option.isCTA ? '#000' : '#e5e5e5',
                            borderRadius: '12px',
                            fontWeight: option.isCTA ? 800 : 500,
                            textTransform: option.isCTA ? 'uppercase' : 'none',
                            letterSpacing: option.isCTA ? '0.5px' : 'normal',
                            boxShadow: option.isCTA 
                              ? '0 4px 15px rgba(0, 255, 65, 0.25)' 
                              : '0 2px 10px rgba(0, 0, 0, 0.3)'
                          }}
                          onMouseOver={(e) => {
                            if (!option.isCTA) {
                              e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.5)';
                              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(0, 255, 65, 0.05) 100%)';
                              e.currentTarget.style.color = '#00FF41';
                            } else {
                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 65, 0.4)';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!option.isCTA) {
                              e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.2)';
                              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(25, 25, 25, 0.9) 0%, rgba(18, 18, 18, 0.9) 100%)';
                              e.currentTarget.style.color = '#e5e5e5';
                            } else {
                              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 65, 0.25)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          <span>{option.label}</span>
                          {!option.isCTA && <ChevronRight size={16} style={{ opacity: 0.5 }} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div 
              className="flex items-center gap-3 p-4"
              style={{
                background: 'linear-gradient(180deg, rgba(12, 12, 12, 1) 0%, rgba(8, 8, 8, 1) 100%)',
                borderTop: '1px solid rgba(0, 255, 65, 0.15)'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua dúvida..."
                className="flex-1 px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.5)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={handleSendMessage}
                className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #00FF41 0%, #00cc33 100%)',
                  border: 'none',
                  color: '#000',
                  boxShadow: '0 4px 15px rgba(0, 255, 65, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 65, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 65, 0.3)';
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center cursor-pointer border-none relative"
        aria-label={isOpen ? "Fechar assistente" : "Abrir assistente de suporte"}
        style={{
          background: 'linear-gradient(135deg, #00FF41 0%, #00cc33 100%)',
          boxShadow: '0 6px 25px rgba(0, 255, 65, 0.4)',
          color: '#000'
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        
        {/* Notification Badge - Simple dot */}
        {showBadge && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
            style={{
              background: '#FF3B3B',
              border: '3px solid #0a0a0a',
              boxShadow: '0 0 10px rgba(255, 59, 59, 0.5)',
              animation: 'pulse 2s infinite'
            }}
          />
        )}
      </motion.button>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        
        @media (max-width: 480px) {
          .fixed.bottom-5.right-5 > div:first-child {
            width: 90vw !important;
            height: 70vh !important;
            bottom: 80px !important;
            right: -10px !important;
          }
        }
      `}</style>
    </div>
  );
}
