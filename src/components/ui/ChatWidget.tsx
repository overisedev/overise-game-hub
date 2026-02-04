import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

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
    label: "💰 Qual o preço do acesso?",
    response: "O acesso vitalício custa apenas R$39,99 por um pagamento único! Você terá acesso a mais de 6.500 jogos para sempre, sem mensalidades."
  },
  {
    label: "🎮 Como funciona o desbloqueio?",
    response: "Após a compra, você recebe acesso imediato ao nosso app exclusivo. Basta instalar no seu celular e todos os jogos estarão disponíveis para jogar offline, sem precisar de console!"
  },
  {
    label: "📱 Funciona em qualquer celular?",
    response: "Sim! Funciona em celulares Android e iPhone. O app é leve e otimizado para rodar perfeitamente em qualquer dispositivo."
  },
  {
    label: "🔒 É seguro? Tem garantia?",
    response: "100% seguro! Oferecemos garantia de 7 dias. Se não gostar, devolvemos seu dinheiro sem perguntas. Mais de 50 mil clientes satisfeitos!"
  },
  {
    label: "⚡ Recebo na hora?",
    response: "Sim! O acesso é liberado automaticamente após a confirmação do pagamento. Em poucos minutos você já estará jogando!"
  }
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Olá! 👋 Sou a IA da Overise. Posso tirar suas dúvidas sobre o desbloqueio.",
    },
    {
      id: 2,
      type: 'bot',
      content: "Digite sua dúvida abaixo ou escolha uma opção:",
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

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: option.label
    };

    // Add bot response
    const botResponse: Message = {
      id: Date.now() + 1,
      type: 'bot',
      content: option.response,
      options: [
        { label: "🚀 Quero desbloquear agora!", isCTA: true, ctaLink: "#planos", response: "" },
        { label: "↩️ Tenho outra dúvida", response: "Claro! Escolha uma das opções abaixo:" }
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
        { label: "📲 Falar no WhatsApp", isCTA: true, ctaLink: "https://wa.me/5511999999999", response: "" },
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
    <div className="fixed bottom-5 right-5 z-[9999]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
              background: 'rgba(10, 10, 10, 0.98)',
              border: '1px solid rgba(0, 255, 65, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 255, 65, 0.1)'
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4"
              style={{
                background: 'rgba(17, 17, 17, 0.95)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ 
                      background: 'linear-gradient(135deg, #00FF41 0%, #00cc33 100%)',
                      color: '#000'
                    }}
                  >
                    OV
                  </div>
                  <div 
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
                    style={{ 
                      background: '#00FF41',
                      border: '2px solid #111'
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm m-0">Assistente Overise</h3>
                  <p className="text-xs m-0 font-medium" style={{ color: '#00FF41' }}>Online Agora</p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="bg-transparent border-none cursor-pointer p-1 transition-colors"
                style={{ color: '#666' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#666'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-3"
              style={{ 
                background: '#000',
                scrollbarWidth: 'thin',
                scrollbarColor: '#333 #000'
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
                      background: message.type === 'user' ? '#00FF41' : 'rgba(26, 26, 26, 0.9)',
                      color: message.type === 'user' ? '#000' : '#eee',
                      borderRadius: message.type === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      borderLeft: message.type === 'bot' ? '3px solid #00FF41' : 'none',
                      fontWeight: message.type === 'user' ? 600 : 400
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
                          className="w-full text-left px-3 py-2.5 text-[13px] cursor-pointer transition-all duration-200"
                          style={{
                            background: option.isCTA ? '#00FF41' : 'transparent',
                            border: option.isCTA ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                            color: option.isCTA ? '#000' : '#fff',
                            borderRadius: '8px',
                            fontWeight: option.isCTA ? 800 : 400,
                            textTransform: option.isCTA ? 'uppercase' : 'none',
                            textAlign: option.isCTA ? 'center' : 'left'
                          }}
                          onMouseOver={(e) => {
                            if (!option.isCTA) {
                              e.currentTarget.style.borderColor = '#00FF41';
                              e.currentTarget.style.color = '#00FF41';
                            } else {
                              e.currentTarget.style.background = '#00cc33';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!option.isCTA) {
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                              e.currentTarget.style.color = '#fff';
                            } else {
                              e.currentTarget.style.background = '#00FF41';
                            }
                          }}
                        >
                          {option.label}
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
              className="flex items-center gap-2.5 p-4"
              style={{
                background: 'rgba(17, 17, 17, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua dúvida..."
                className="flex-1 px-4 py-3 text-sm outline-none"
                style={{
                  background: '#000',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '25px',
                  color: '#fff'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#00FF41'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                style={{
                  background: '#00FF41',
                  border: 'none',
                  color: '#000'
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer border-none relative"
        style={{
          background: '#00FF41',
          boxShadow: '0 4px 20px rgba(0, 255, 65, 0.4)',
          color: '#000'
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        
        {/* Notification Badge */}
        {showBadge && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
            style={{
              background: '#FF0000',
              color: '#fff',
              border: '2px solid #0a0a0a',
              animation: 'pulse 2s infinite'
            }}
          >
            1
          </motion.span>
        )}
      </motion.button>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
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
