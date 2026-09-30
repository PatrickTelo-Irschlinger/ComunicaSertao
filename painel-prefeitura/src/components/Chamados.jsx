import React from 'react';
import { Search, Filter, Eye, MoreHorizontal } from 'lucide-react';

export default function Chamados({ setActivePage, setSelectedChamado }) {
  const listaChamados = [
    { id: 'CH-2847', autor: 'Maria Aparecida S.', titulo: 'Iluminação Pública', local: 'Centro', status: 'Pendente', tempo: '28/07/2026', prioridade: 'ALTA', mensagens: 2, anexos: 1 },
    { id: 'CH-2846', autor: 'João Carlos M.', titulo: 'Pavimentação', local: 'Jardim América', status: 'Em Andamento', tempo: '28/07/2026', prioridade: 'ALTA', mensagens: 4, anexos: 2 },
    { id: 'CH-2845', autor: 'Ana Paula R.', titulo: 'Limpeza Urbana', local: 'Vila Nova', status: 'Concluído', tempo: '27/07/2026', prioridade: 'BAIXA', mensagens: 0, anexos: 1 },
    { id: 'CH-2844', autor: 'Roberto F.', titulo: 'Água e Esgoto', local: 'São João', status: 'Pendente', tempo: '27/07/2026', prioridade: 'MÉDIA', mensagens: 0, anexos: 3 },
    { id: 'CH-2843', autor: 'Claudia B.', titulo: 'Poda de Árvores', local: 'Centro', status: 'Em Andamento', tempo: '26/07/2026', prioridade: 'MÉDIA', mensagens: 1, anexos: 1 }
  ];

  const handleAbrirDetalhes = (chamado) => {
    setSelectedChamado({ ...chamado, origem: 'chamados' });
    setActivePage('detalhes_chamado');
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
    <div className="p-8 space-y-6 bg-slate-50 min-h-full pb-16">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Pesquisar por ID, Cidadão ou Local..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]/50 focus:border-[#4b5e28] transition-colors" />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors bg-white">
          <Filter size={16} /> Filtros
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
              {listaChamados.map((chamado, idx) => (
                <tr key={idx} onClick={() => handleAbrirDetalhes(chamado)} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="py-4 px-6 font-semibold text-slate-800">{chamado.id}</td>
                  <td className="py-4 px-6 text-slate-600">{chamado.autor}</td>
                  <td className="py-4 px-6"><p className="font-semibold text-slate-800">{chamado.titulo}</p><p className="text-[11px] text-slate-400 mt-0.5">{chamado.local}</p></td>
                  <td className="py-4 px-6">{getStatusBadge(chamado.status)}</td>
                  <td className="py-4 px-6 text-slate-500">{chamado.tempo}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); handleAbrirDetalhes(chamado); }} className="p-1.5 text-slate-400 hover:text-[#4b5e28] hover:bg-[#4b5e28]/10 rounded-md transition-colors" title="Ver Detalhes"><Eye size={18} /></button>
                      <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><MoreHorizontal size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-white">
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