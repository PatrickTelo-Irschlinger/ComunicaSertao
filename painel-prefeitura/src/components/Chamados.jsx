import React, { useState } from 'react';
import { Search, Filter, Eye, MoreHorizontal, Check, Clock, AlertCircle, X } from 'lucide-react';

export default function Chamados({ setActivePage, setSelectedChamado }) {
  const [listaChamados, setListaChamados] = useState([
    { id: 'CH-2847', autor: 'Maria Aparecida S.', titulo: 'Iluminação Pública', local: 'Centro', status: 'Pendente', tempo: '28/07/2026', prioridade: 'ALTA', mensagens: 2, anexos: 1 },
    { id: 'CH-2846', autor: 'João Carlos M.', titulo: 'Pavimentação', local: 'Jardim América', status: 'Em Andamento', tempo: '28/07/2026', prioridade: 'ALTA', mensagens: 4, anexos: 2 },
    { id: 'CH-2845', autor: 'Ana Paula R.', titulo: 'Limpeza Urbana', local: 'Vila Nova', status: 'Concluído', tempo: '27/07/2026', prioridade: 'BAIXA', mensagens: 0, anexos: 1 },
    { id: 'CH-2844', autor: 'Roberto F.', titulo: 'Água e Esgoto', local: 'São João', status: 'Pendente', tempo: '27/07/2026', prioridade: 'MÉDIA', mensagens: 0, anexos: 3 },
    { id: 'CH-2843', autor: 'Claudia B.', titulo: 'Poda de Árvores', local: 'Centro', status: 'Em Andamento', tempo: '26/07/2026', prioridade: 'MÉDIA', mensagens: 1, anexos: 1 }
  ]);

  const [menuAtivo, setMenuAtivo] = useState(null);

  const handleAbrirDetalhes = (chamado) => {
    setSelectedChamado({ ...chamado, origem: 'chamados' });
    setActivePage('detalhes_chamado');
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setMenuAtivo(menuAtivo === id ? null : id);
  };

  const alterarStatus = (e, id, novoStatus) => {
    e.stopPropagation();
    setListaChamados(prevLista => 
      prevLista.map(chamado => 
        chamado.id === id ? { ...chamado, status: novoStatus } : chamado
      )
    );
    setMenuAtivo(null); 
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pendente': return <span className="px-3 py-1 text-xs font-bold text-yellow-700 bg-yellow-100 rounded-md">Pendente</span>;
      case 'Em Andamento': return <span className="px-3 py-1 text-xs font-bold text-blue-700 bg-blue-100 rounded-md">Em andamento</span>;
      case 'Concluído': return <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-md">Concluído</span>;
      case 'Cancelado': return <span className="px-3 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-md">Cancelado</span>;
      default: return null;
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-full pb-16 relative">
      
      {/* Overlay invisível para fechar o menu ao clicar fora dele */}
      {menuAtivo && (
        <div 
          className="fixed inset-0 z-40 cursor-default" 
          onClick={(e) => { e.stopPropagation(); setMenuAtivo(null); }}
        ></div>
      )}

      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4 relative z-10">
        <div className="relative flex-1 max-w-2xl">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Pesquisar por ID, Cidadão ou Local..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]/50 focus:border-[#4b5e28] transition-colors" 
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors bg-white">
          <Filter size={16} /> Filtros
        </button>
      </div>

      {/* Tabela de Chamados */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm relative z-10">
        
        {/* O pb-48 garante espaço para o menu não cortar nas últimas linhas */}
        <div className="overflow-x-auto min-h-[400px] pb-48 rounded-t-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Solicitante</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Categoria / Local</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Data Abertura</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {listaChamados.map((chamado) => (
                <tr 
                  key={chamado.id} 
                  onClick={() => handleAbrirDetalhes(chamado)} 
                  className={`border-b border-slate-100 transition-colors cursor-pointer group relative ${menuAtivo === chamado.id ? 'bg-slate-50 z-50' : 'hover:bg-slate-50 z-10'}`}
                >
                  <td className="py-4 px-6 font-semibold text-slate-800 relative">{chamado.id}</td>
                  <td className="py-4 px-6 text-slate-600 relative">{chamado.autor}</td>
                  <td className="py-4 px-6 relative">
                    <p className="font-semibold text-slate-800">{chamado.titulo}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{chamado.local}</p>
                  </td>
                  <td className="py-4 px-6 relative">
                    {getStatusBadge(chamado.status)}
                  </td>
                  <td className="py-4 px-6 text-slate-500 relative">{chamado.tempo}</td>
                  <td className="py-4 px-6 text-right relative">
                    <div className={`flex items-center justify-end gap-3 transition-opacity ${menuAtivo === chamado.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAbrirDetalhes(chamado); }} 
                        className="p-1.5 text-slate-400 hover:text-[#4b5e28] hover:bg-[#4b5e28]/10 rounded-md transition-colors" 
                        title="Ver Detalhes"
                      >
                        <Eye size={18} />
                      </button>

                      <div className="relative">
                        <button 
                          onClick={(e) => toggleMenu(e, chamado.id)} 
                          className={`p-1.5 rounded-md transition-colors ${menuAtivo === chamado.id ? 'bg-slate-200 text-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                          title="Alterar Status"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {/* Menu Dropdown corrigido - Fundo sólido, z-index alto e sombra forte */}
                        {menuAtivo === chamado.id && (
                          <div 
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-slate-200 overflow-hidden z-[9999] animate-in fade-in zoom-in-95 duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="px-3 py-2 border-b border-slate-100 bg-slate-50 text-left">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Alterar status para:</span>
                            </div>
                            <div className="flex flex-col py-1 bg-white">
                              <button 
                                onClick={(e) => alterarStatus(e, chamado.id, 'Pendente')} 
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-yellow-700 hover:bg-yellow-50 transition-colors text-left bg-white"
                              >
                                <AlertCircle size={14} /> Pendente
                              </button>
                              <button 
                                onClick={(e) => alterarStatus(e, chamado.id, 'Em Andamento')} 
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors text-left bg-white"
                              >
                                <Clock size={14} /> Em Andamento
                              </button>
                              <button 
                                onClick={(e) => alterarStatus(e, chamado.id, 'Concluído')} 
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-green-50 transition-colors text-left bg-white"
                              >
                                <Check size={14} /> Concluído
                              </button>
                              <div className="h-px bg-slate-100 my-1 mx-2"></div>
                              <button 
                                onClick={(e) => alterarStatus(e, chamado.id, 'Cancelado')} 
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors text-left bg-white"
                              >
                                <X size={14} /> Cancelado
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginação do Rodapé */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-white relative z-20 rounded-b-xl">
          <p className="text-xs text-slate-500">A mostrar 1 a 5 de 1.586 chamados</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 border border-slate-200 rounded-md text-xs font-medium text-slate-400 hover:bg-slate-50 cursor-not-allowed">Anterior</button>
            <button className="px-3 py-1.5 border border-[#4b5e28] bg-[#4b5e28] text-white rounded-md text-xs font-bold">1</button>
            <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-md text-xs font-medium transition-colors">2</button>
            <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-md text-xs font-medium transition-colors">3</button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">Seguinte</button>
          </div>
        </div>
      </div>
    </div>
  );
}