import React, { useState } from 'react';
import { ArrowLeft, Clock, User, FileText, MessageSquare, Paperclip, ChevronDown } from 'lucide-react';

export default function ChamadoDetalhes({ chamado, setActivePage }) {
  const [prioridadeAtiva, setPrioridadeAtiva] = useState(chamado?.prioridade || 'BAIXA');

  if (!chamado) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full">
        <p className="text-slate-500 mb-4">Nenhum chamado selecionado.</p>
        <button onClick={() => setActivePage('chamados')} className="px-4 py-2 bg-[#4b5e28] text-white rounded-lg font-medium">
          Voltar aos Chamados
        </button>
      </div>
    );
  }

  const origem = chamado.origem || 'chamados';
  let textoVoltar = 'Voltar aos Chamados';
  let destinoVoltar = 'chamados';

  if (origem === 'kanban') {
    textoVoltar = 'Voltar ao fluxo Kanban';
    destinoVoltar = 'kanban';
  } else if (origem === 'dashboard') {
    textoVoltar = 'Voltar ao Dashboard';
    destinoVoltar = 'dashboard';
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pendente': return 'bg-[#f59e0b] text-white'; 
      case 'Em Andamento': return 'bg-[#1e3a8a] text-white'; 
      case 'Concluído': return 'bg-[#4b5e28] text-white'; 
      case 'Cancelado': return 'bg-red-500 text-white'; 
      default: return 'bg-slate-500 text-white';
    }
  };

  const getPriorityStyle = (pri) => {
    switch(pri) {
      case 'ALTA': return 'text-red-700 bg-red-100 border-red-200 hover:bg-red-200';
      case 'MÉDIA': return 'text-yellow-700 bg-yellow-100 border-yellow-200 hover:bg-yellow-200';
      case 'BAIXA': return 'text-green-700 bg-green-100 border-green-200 hover:bg-green-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-full pb-16">
      
      <button 
        onClick={() => setActivePage(destinoVoltar)}
        className="flex items-center gap-2 text-slate-500 hover:text-[#4b5e28] transition-colors font-medium mb-2"
      >
        <ArrowLeft size={18} /> {textoVoltar}
      </button>
      
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-800">{chamado.titulo}</h2>
              <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-md border border-slate-200">
                {chamado.id}
              </span>
            </div>
            <p className="text-slate-500 flex items-center gap-2">
              <User size={16} /> Solicitado por: <span className="font-medium text-slate-700">{chamado.autor}</span>
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2.5">
            <span className={`px-4 py-1.5 text-sm font-bold rounded-lg shadow-sm ${getStatusColor(chamado.status)}`}>
              {chamado.status}
            </span>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prioridade:</span>
              <div className="relative">
                <select 
                  value={prioridadeAtiva}
                  onChange={(e) => setPrioridadeAtiva(e.target.value)}
                  className={`pl-3 pr-7 py-1 text-[11px] font-bold rounded border outline-none cursor-pointer appearance-none transition-colors ${getPriorityStyle(prioridadeAtiva)}`}
                >
                  <option value="BAIXA">BAIXA</option>
                  <option value="MÉDIA">MÉDIA</option>
                  <option value="ALTA">ALTA</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-[#4b5e28]"/> Descrição da Ocorrência
            </h3>
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 text-slate-600 text-sm leading-relaxed">
              O cidadão <strong>{chamado.autor}</strong> reportou uma ocorrência relacionada com a categoria <strong>{chamado.titulo}</strong> no município. 
              <br/><br/>
              A equipa técnica deve avaliar a situação presencialmente e proceder com as devidas ações de manutenção para garantir a resolução do problema dentro do prazo estabelecido. Esta prioridade foi classificada inicialmente de forma automática pelo sistema.
            </div>
          </div>
          
          <div className="space-y-4">
             <h3 className="font-bold text-slate-800">Métricas do Chamado</h3>
             <ul className="space-y-3 text-sm text-slate-600 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <li className="flex items-center gap-3 pb-3 border-b border-slate-50">
                  <Clock size={16} className="text-slate-400"/> 
                  <span>Última atualização:<br/><strong className="text-slate-800">{chamado.tempo}</strong></span>
                </li>
                <li className="flex items-center gap-3 pb-3 border-b border-slate-50">
                  <MessageSquare size={16} className="text-slate-400"/> 
                  <span>Interações técnicas:<br/><strong className="text-slate-800">{chamado.mensagens} respostas</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Paperclip size={16} className="text-slate-400"/> 
                  <span>Ficheiros em anexo:<br/><strong className="text-slate-800">{chamado.anexos} documentos</strong></span>
                </li>
             </ul>
          </div>

        </div>

      </div>
    </div>
  );
}