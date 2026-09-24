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
import HistoricoNotificacoes from './components/HistoricoNotificacoes'; // Importação do novo ecrã

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const getHeaderInfo = () => {
    switch(activePage) {
      case 'dashboard': 
        return { title: 'Dashboard Administrativo', subtitle: '28 de julho de 2026 — Prefeitura Municipal' };
      case 'chamados': 
        return { title: 'Gestão de Chamados', subtitle: 'Lista de todas as solicitações registadas no sistema' };
      case 'novo': 
        return { title: 'Novo Chamado', subtitle: 'Abertura de nova solicitação manual' };
      case 'kanban': 
        return { title: 'Fluxo Kanban', subtitle: 'Acompanhamento visual e ágil das solicitações' };
      case 'relatorios': 
        return { title: 'Relatórios e Estatísticas', subtitle: 'Geração e exportação de dados consolidados' };
      case 'cidadaos': 
        return { title: 'Gestão de Cidadãos', subtitle: 'Base de munícipes registados na plataforma' };
      case 'secretarias': 
        return { title: 'Secretarias e Departamentos', subtitle: 'Gestão das entidades responsáveis pelo atendimento' };
      case 'configuracoes': 
        return { title: 'Configurações do Sistema', subtitle: 'Parâmetros globais, APIs e integrações externas' };
      case 'historico_notificacoes': // Novo título adicionado
        return { title: 'Central de Notificações', subtitle: 'Registo completo de todos os eventos e alertas do sistema' };
      default: 
        return { title: 'Prefeitura Municipal', subtitle: 'Sertão Integrado' };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Passamos o evento onViewAllNotifs para o Header */}
        <Header 
          title={title} 
          subtitle={subtitle} 
          onNew={() => setActivePage('novo')} 
          onViewAllNotifs={() => setActivePage('historico_notificacoes')}
        />

        {/* Router Condicional */}
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'chamados' && <Chamados />}
        {activePage === 'novo' && <NovoChamado setActivePage={setActivePage} />}
        {activePage === 'kanban' && <Kanban />}
        {activePage === 'relatorios' && <Relatorios />}
        {activePage === 'cidadaos' && <Cidadaos />}
        {activePage === 'secretarias' && <Secretarias />}
        {activePage === 'configuracoes' && <Configuracoes />}
        {activePage === 'historico_notificacoes' && <HistoricoNotificacoes />}
        
      </main>
    </div>
  );
}