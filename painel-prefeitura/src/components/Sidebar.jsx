import React from 'react';
import { 
  LayoutDashboard, Ticket, Kanban, FileText, 
  Users, Building2, Settings, MoreHorizontal 
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage }) {
  
  const getItemClass = (pageName) => {
    const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ";
    return activePage === pageName 
      ? baseClass + "bg-blue-600 text-white font-medium"
      : baseClass + "hover:bg-slate-800 hover:text-white text-slate-400";
  };

  return (
    <aside className="w-[260px] bg-[#0f172a] text-slate-400 flex flex-col justify-between flex-shrink-0">
      <div>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-sm">PM</div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">Prefeitura</h1>
            <p className="text-xs text-slate-500">Municipal</p>
          </div>
        </div>
        
        <div className="px-4 text-xs font-semibold text-slate-500 mb-2 mt-4 tracking-wider">PRINCIPAL</div>
        <nav className="px-3 space-y-1">
          <a onClick={() => setActivePage('dashboard')} className={getItemClass('dashboard')}>
            <LayoutDashboard size={18} /> Dashboard
          </a>
          
          <a onClick={() => setActivePage('chamados')} className={`flex items-center justify-between ${getItemClass('chamados')}`}>
            <div className="flex items-center gap-3"><Ticket size={18} /> Chamados</div>
            {activePage !== 'chamados' && <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">12</span>}
          </a>
          
          <a onClick={() => setActivePage('kanban')} className={getItemClass('kanban')}>
            <Kanban size={18} /> Fluxo Kanban
          </a>
          
          <a onClick={() => setActivePage('relatorios')} className={getItemClass('relatorios')}>
            <FileText size={18} /> Relatórios
          </a>
          
          <a onClick={() => setActivePage('cidadaos')} className={getItemClass('cidadaos')}>
            <Users size={18} /> Cidadãos
          </a>
          
          <a onClick={() => setActivePage('secretarias')} className={getItemClass('secretarias')}>
            <Building2 size={18} /> Secretarias
          </a>
          
          <a onClick={() => setActivePage('configuracoes')} className={getItemClass('configuracoes')}>
            <Settings size={18} /> Configurações
          </a>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 flex items-center justify-between hover:bg-slate-800 cursor-pointer transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 text-blue-200 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
            TS
          </div>
          <div>
            <p className="text-white text-sm font-medium">Tiago Souza</p>
            <p className="text-xs text-slate-500">Administrador</p>
          </div>
        </div>
        <MoreHorizontal size={16} />
      </div>
    </aside>
  );
}