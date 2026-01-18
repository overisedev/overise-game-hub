import { useState } from 'react';

type TabType = 'dashboard' | 'files';

interface AppPreviewProps {
  className?: string;
}

const AppPreview = ({ className = '' }: AppPreviewProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isOptimized, setIsOptimized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logMessage, setLogMessage] = useState('');

  const handleOptimize = () => {
    setIsProcessing(true);
    setLogMessage('Processando...');
    
    setTimeout(() => {
      setLogMessage('Limpando cache...');
    }, 500);
    
    setTimeout(() => {
      setLogMessage('Sincronizando...');
    }, 1200);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsOptimized(true);
      setLogMessage('SUCESSO: SISTEMA SINCRONIZADO.');
      setActiveTab('dashboard');
    }, 2000);
  };

  const handleRestore = () => {
    setIsProcessing(true);
    setLogMessage('Restaurando arquivos...');
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsOptimized(false);
      setLogMessage('SUCESSO: PADRÃO RESTAURADO.');
      setActiveTab('dashboard');
    }, 1500);
  };

  return (
    <div className={`app-preview-container ${className}`}>
      {/* Window Frame */}
      <div className="app-window">
        {/* Title Bar */}
        <div className="app-titlebar">
          <div className="app-titlebar-left">
            <img src="/favicon.ico" alt="" className="app-icon" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <span className="app-title-text">OVERISE | System Manager</span>
          </div>
          <div className="app-titlebar-buttons">
            <div className="titlebar-btn minimize">─</div>
            <div className="titlebar-btn maximize">□</div>
            <div className="titlebar-btn close">✕</div>
          </div>
        </div>

        {/* App Content */}
        <div className="app-content">
          {/* Sidebar */}
          <div className="app-sidebar">
            <div className="sidebar-header">
              <h1 className="sidebar-logo">OVERISE</h1>
              <span className="sidebar-version">SYSTEM V7.2</span>
            </div>

            <nav className="sidebar-nav">
              <button 
                className={`sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                DASHBOARD
              </button>
              <button 
                className={`sidebar-btn ${activeTab === 'files' ? 'active' : ''}`}
                onClick={() => setActiveTab('files')}
              >
                MEUS ARQUIVOS
              </button>
            </nav>

            <div className="sidebar-status">
              <span className="status-dot">●</span> CONECTADO
            </div>
          </div>

          {/* Main Area */}
          <div className="app-main">
            {activeTab === 'dashboard' ? (
              <div className="dashboard-view">
                <h2 className="view-title">Visão Geral</h2>
                
                <div className={`status-card ${isOptimized ? 'optimized' : 'pending'}`}>
                  <span className="status-label">STATUS DO SISTEMA</span>
                  <h3 className="status-title">
                    {isOptimized ? 'SISTEMA SINCRONIZADO' : 'SINCRONIZAÇÃO PENDENTE'}
                  </h3>
                  <p className="status-desc">
                    {isOptimized 
                      ? 'Todos os recursos estão atualizados e operando.' 
                      : 'A plataforma local precisa ser configurada.'}
                  </p>
                  
                  {!isOptimized && (
                    <button 
                      className="status-action-btn"
                      onClick={() => setActiveTab('files')}
                    >
                      CONFIGURAR AGORA
                    </button>
                  )}
                  
                  <div className={`status-bar ${isOptimized ? 'optimized' : 'pending'}`} />
                </div>
                
                <span className="check-info">Verificação de integridade: OK</span>
              </div>
            ) : (
              <div className="files-view">
                <h2 className="view-title">Ferramentas</h2>
                
                <div className="tools-container">
                  <button 
                    className="tool-btn primary"
                    onClick={handleOptimize}
                    disabled={isProcessing}
                  >
                    OTIMIZAR PLATAFORMA
                  </button>
                  <ul className="tool-desc">
                    <li>Atualiza diretórios</li>
                    <li>Limpa arquivos temporários</li>
                    <li>Sincroniza configurações</li>
                  </ul>
                  
                  <button 
                    className="tool-btn secondary"
                    onClick={handleRestore}
                    disabled={isProcessing}
                  >
                    RESTAURAR PADRÃO
                  </button>
                  <ul className="tool-desc">
                    <li>Reverte alterações</li>
                    <li>Restaura arquivos originais</li>
                  </ul>
                </div>
                
                {isProcessing && (
                  <div className="progress-bar">
                    <div className="progress-fill" />
                  </div>
                )}
                
                {logMessage && (
                  <span className={`log-message ${logMessage.includes('SUCESSO') ? 'success' : ''}`}>
                    {logMessage}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .app-preview-container {
          perspective: 1000px;
        }

        .app-window {
          background: #09090b;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 
            0 0 0 1px rgba(255,255,255,0.08),
            0 25px 80px rgba(0,0,0,0.8),
            0 0 60px rgba(0,255,65,0.1);
          transform: rotateX(2deg) rotateY(-1deg);
          transition: transform 0.4s ease;
        }

        .app-window:hover {
          transform: rotateX(0deg) rotateY(0deg);
        }

        .app-titlebar {
          background: #050505;
          padding: 10px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .app-titlebar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .app-icon {
          width: 16px;
          height: 16px;
        }

        .app-title-text {
          font-size: 12px;
          color: #a1a1aa;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .app-titlebar-buttons {
          display: flex;
          gap: 8px;
        }

        .titlebar-btn {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .titlebar-btn.minimize { background: #fbbf24; }
        .titlebar-btn.maximize { background: #22c55e; }
        .titlebar-btn.close { background: #ef4444; }

        .titlebar-btn:hover {
          color: #000;
        }

        .app-content {
          display: flex;
          min-height: 400px;
        }

        .app-sidebar {
          width: 200px;
          background: #050505;
          padding: 30px 0;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.06);
        }

        .sidebar-header {
          padding: 0 20px;
          margin-bottom: 30px;
        }

        .sidebar-logo {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .sidebar-version {
          font-size: 10px;
          font-weight: 700;
          color: #00FF41;
          letter-spacing: 0.5px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 0 12px;
          flex: 1;
        }

        .sidebar-btn {
          background: transparent;
          border: none;
          color: #a1a1aa;
          font-size: 11px;
          font-weight: 600;
          padding: 12px 14px;
          text-align: left;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .sidebar-btn:hover {
          background: #18181b;
          color: #e4e4e7;
        }

        .sidebar-btn.active {
          background: #18181b;
          color: white;
        }

        .sidebar-status {
          padding: 0 20px;
          font-size: 10px;
          font-weight: 700;
          color: #00FF41;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .app-main {
          flex: 1;
          padding: 40px;
          background: #09090b;
        }

        .view-title {
          font-size: 20px;
          font-weight: 700;
          color: white;
          margin: 0 0 20px 0;
        }

        .status-card {
          border-radius: 12px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .status-card.optimized {
          background: #061809;
          border: 1px solid #14532d;
        }

        .status-card.pending {
          background: #1c1917;
          border: 1px solid #451a03;
        }

        .status-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: block;
        }

        .status-card.optimized .status-label { color: #00FF41; }
        .status-card.pending .status-label { color: #FFB800; }

        .status-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin: 0 0 8px 0;
        }

        .status-desc {
          font-size: 13px;
          margin: 0 0 16px 0;
        }

        .status-card.optimized .status-desc { color: #86efac; }
        .status-card.pending .status-desc { color: #fdba74; }

        .status-action-btn {
          background: #FFB800;
          color: black;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .status-action-btn:hover {
          background: #d97706;
        }

        .status-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .status-bar.optimized { background: #00FF41; }
        .status-bar.pending { background: #451a03; }

        .check-info {
          font-size: 11px;
          color: #52525b;
        }

        .tools-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tool-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .tool-btn.primary {
          background: #00FF41;
          color: black;
        }

        .tool-btn.primary:hover:not(:disabled) {
          background: #00cc33;
        }

        .tool-btn.secondary {
          background: #27272a;
          color: white;
        }

        .tool-btn.secondary:hover:not(:disabled) {
          background: #3f3f46;
        }

        .tool-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tool-desc {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          font-size: 12px;
          color: #71717a;
        }

        .tool-desc li::before {
          content: '• ';
          color: #52525b;
        }

        .progress-bar {
          height: 4px;
          background: #27272a;
          border-radius: 2px;
          margin-top: 20px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          width: 30%;
          background: #00FF41;
          border-radius: 2px;
          animation: loading 1s ease-in-out infinite;
        }

        @keyframes loading {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 50%; }
          100% { transform: translateX(400%); width: 30%; }
        }

        .log-message {
          display: block;
          margin-top: 16px;
          font-size: 12px;
          font-family: 'Consolas', monospace;
          color: #a1a1aa;
        }

        .log-message.success {
          color: #00FF41;
        }

        @media (max-width: 768px) {
          .app-sidebar {
            width: 160px;
          }
          
          .app-main {
            padding: 24px;
          }
          
          .status-title {
            font-size: 15px;
          }
        }

        @media (max-width: 640px) {
          .app-content {
            flex-direction: column;
          }
          
          .app-sidebar {
            width: 100%;
            flex-direction: row;
            padding: 16px;
            align-items: center;
            justify-content: space-between;
          }
          
          .sidebar-header {
            margin-bottom: 0;
          }
          
          .sidebar-nav {
            flex-direction: row;
            padding: 0;
            flex: unset;
          }
          
          .sidebar-status {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AppPreview;
