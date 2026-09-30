import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Chamados from './components/Chamados';
import NovoChamado from './components/NovoChamado';
import Relatorios from './components/Relatorios';
import Cidadaos from './components/Cidadaos';
import Kanban from './components/Kanban';
import Secretarias from './components/Secretarias';
import Configuracoes from './components/Configuracoes';
import HistoricoNotificacoes from './components/HistoricoNotificacoes';
import Login from './components/Login';
import ChamadoDetalhes from './components/ChamadoDetalhes';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedChamado, setSelectedChamado] = useState(null);
  const [paginaOrigem, setPaginaOrigem] = useState('kanban'); // NOVO: Memória de origem

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const getHeaderInfo = () => {
    switch(activePage) {
      case 'dashboard': return { title: 'Dashboard Administrativo', subtitle: '28 de julho de 2026 — Prefeitura Municipal' };
      case 'chamados': return { title: 'Gestão de Chamados', subtitle: 'Lista de todas as solicitações registadas no sistema' };
      case 'novo': return { title: 'Novo Chamado', subtitle: 'Abertura de nova solicitação manual' };
      case 'kanban': return { title: 'Fluxo Kanban', subtitle: 'Acompanhamento visual e ágil das solicitações' };
      case 'relatorios': return { title: 'Relatórios e Estatísticas', subtitle: 'Geração e exportação de dados consolidados' };
      case 'cidadaos': return { title: 'Gestão de Cidadãos', subtitle: 'Base de munícipes registados na plataforma' };
      case 'secretarias': return { title: 'Secretarias e Departamentos', subtitle: 'Gestão das entidades responsáveis pelo atendimento' };
      case 'configuracoes': return { title: 'Configurações do Sistema', subtitle: 'Parâmetros globais, APIs e integrações externas' };
      case 'historico_notificacoes': return { title: 'Central de Notificações', subtitle: 'Registo completo de todos os eventos e alertas do sistema' };
      case 'detalhes_chamado': return { title: 'Detalhes da Ocorrência', subtitle: 'Análise aprofundada da solicitação do cidadão' };
      default: return { title: 'Prefeitura Municipal', subtitle: 'Sertão Integrado' };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        <Header 
          title={title} 
          subtitle={subtitle} 
          onNew={() => setActivePage('novo')} 
          onViewAllNotifs={() => setActivePage('historico_notificacoes')}
        />

        {/* Passamos o setPaginaOrigem para as 3 telas onde podemos clicar em chamados */}
        {activePage === 'dashboard' && <Dashboard setActivePage={setActivePage} setSelectedChamado={setSelectedChamado} setPaginaOrigem={setPaginaOrigem} />}
        {activePage === 'chamados' && <Chamados setActivePage={setActivePage} setSelectedChamado={setSelectedChamado} setPaginaOrigem={setPaginaOrigem} />}
        {activePage === 'kanban' && <Kanban setActivePage={setActivePage} setSelectedChamado={setSelectedChamado} setPaginaOrigem={setPaginaOrigem} />}
        
        {/* Passamos o paginaOrigem para a tela de Detalhes saber para onde voltar */}
        {activePage === 'detalhes_chamado' && <ChamadoDetalhes chamado={selectedChamado} setActivePage={setActivePage} paginaOrigem={paginaOrigem} />}
        
        {activePage === 'novo' && <NovoChamado setActivePage={setActivePage} />}
        {activePage === 'relatorios' && <Relatorios />}
        {activePage === 'cidadaos' && <Cidadaos />}
        {activePage === 'secretarias' && <Secretarias />}
        {activePage === 'configuracoes' && <Configuracoes />}
        {activePage === 'historico_notificacoes' && <HistoricoNotificacoes />}
        
      </main>
    </div>
  );
}