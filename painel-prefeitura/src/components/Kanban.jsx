import React, { useState } from 'react';
import { MoreHorizontal, MessageSquare, Paperclip, Clock, AlertCircle } from 'lucide-react';

export default function Kanban() {
  // Transformamos as colunas num objeto de estado (state) para que o React atualize o ecrã quando movermos os cartões
  const [colunas, setColunas] = useState({
    abertos: {
      id: 'abertos',
      titulo: 'Abertos',
      corHeader: 'border-yellow-500',
      bgCor: 'bg-slate-100',
      chamados: [
        { id: 'CH-2847', solicitante: 'Maria Aparecida S.', categoria: 'Iluminação Pública', prioridade: 'Alta', dias: 'Hoje', comentarios: 2, anexos: 1 },
        { id: 'CH-2844', solicitante: 'Roberto F.', categoria: 'Água e Esgoto', prioridade: 'Média', dias: 'Há 1 dia', comentarios: 0, anexos: 3 },
        { id: 'CH-2850', solicitante: 'Carlos Eduardo', categoria: 'Limpeza Urbana', prioridade: 'Baixa', dias: 'Há 2 dias', comentarios: 1, anexos: 0 },
      ]
    },
    andamento: {
      id: 'andamento',
      titulo: 'Em Andamento',
      corHeader: 'border-blue-500',
      bgCor: 'bg-slate-100',
      chamados: [
        { id: 'CH-2846', solicitante: 'João Carlos M.', categoria: 'Pavimentação', prioridade: 'Alta', dias: 'Há 3 dias', comentarios: 4, anexos: 2 },
        { id: 'CH-2843', solicitante: 'Claudia B.', categoria: 'Poda de Árvores', prioridade: 'Média', dias: 'Há 4 dias', comentarios: 1, anexos: 1 },
      ]
    },
    concluidos: {
      id: 'concluidos',
      titulo: 'Concluídos',
      corHeader: 'border-green-500',
      bgCor: 'bg-slate-100',
      chamados: [
        { id: 'CH-2845', solicitante: 'Ana Paula R.', categoria: 'Limpeza Urbana', prioridade: 'Baixa', dias: 'Concluído ontem', comentarios: 0, anexos: 1 },
        { id: 'CH-2840', solicitante: 'Fernando Costa', categoria: 'Iluminação Pública', prioridade: 'Média', dias: 'Concluído há 3 dias', comentarios: 3, anexos: 2 },
      ]
    }
  });

  // Estado para realçar a coluna que está a receber o cartão por cima
  const [colunaAlvo, setColunaAlvo] = useState(null);

  const getCorPrioridade = (prioridade) => {
    switch (prioridade) {
      case 'Alta': return 'bg-red-100 text-red-700';
      case 'Média': return 'bg-yellow-100 text-yellow-700';
      case 'Baixa': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // --- Funções de Drag and Drop ---

  // 1. Quando começamos a arrastar um cartão
  const handleDragStart = (e, chamadoId, colunaOrigemId) => {
    e.dataTransfer.setData('chamadoId', chamadoId);
    e.dataTransfer.setData('colunaOrigemId', colunaOrigemId);
    
    // Efeito visual para o cartão que está a ser arrastado
    setTimeout(() => {
      e.target.classList.add('opacity-40');
    }, 0);
  };

  // 2. Quando largamos o cartão (termina o arrasto)
  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-40');
    setColunaAlvo(null);
  };

  // 3. Quando arrastamos um cartão por cima de uma coluna válida
  const handleDragOver = (e, colunaId) => {
    e.preventDefault(); // Necessário para permitir o Drop (largar)
    if (colunaAlvo !== colunaId) {
      setColunaAlvo(colunaId);
    }
  };

  // 4. Quando o rato sai de cima de uma coluna
  const handleDragLeave = (e) => {
    setColunaAlvo(null);
  };

  // 5. Ação de largar o cartão na nova coluna
  const handleDrop = (e, colunaDestinoId) => {
    e.preventDefault();
    setColunaAlvo(null);

    const chamadoId = e.dataTransfer.getData('chamadoId');
    const colunaOrigemId = e.dataTransfer.getData('colunaOrigemId');

    // Se largar na mesma coluna onde estava, não faz nada
    if (colunaOrigemId === colunaDestinoId) return;

    // Atualizamos o estado movendo o cartão da origem para o destino
    setColunas(prevColunas => {
      const colunaOrigem = prevColunas[colunaOrigemId];
      const colunaDestino = prevColunas[colunaDestinoId];

      // Encontrar o cartão arrastado
      const cartaoArrastado = colunaOrigem.chamados.find(c => c.id === chamadoId);
      
      // Remover o cartão da coluna de origem
      const novosChamadosOrigem = colunaOrigem.chamados.filter(c => c.id !== chamadoId);
      
      // Adicionar o cartão à coluna de destino
      const novosChamadosDestino = [...colunaDestino.chamados, cartaoArrastado];

      return {
        ...prevColunas,
        [colunaOrigemId]: { ...colunaOrigem, chamados: novosChamadosOrigem },
        [colunaDestinoId]: { ...colunaDestino, chamados: novosChamadosDestino }
      };
    });
  };

  return (
    <div className="p-8 h-full">
      <div className="flex gap-6 h-full min-h-[70vh] overflow-x-auto pb-4">
        
        {/* Usamos Object.values para percorrer o nosso objeto de colunas */}
        {Object.values(colunas).map((coluna) => (
          <div 
            key={coluna.id} 
            className={`flex-shrink-0 w-80 flex flex-col rounded-xl border-2 transition-colors duration-200 ${
              colunaAlvo === coluna.id 
                ? 'border-blue-400 bg-blue-50/50' // Realce visual quando arrastamos por cima
                : `border-slate-200 ${coluna.bgCor}`
            }`}
            onDragOver={(e) => handleDragOver(e, coluna.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, coluna.id)}
          >
            
            {/* Cabeçalho da Coluna */}
            <div className={`p-4 border-t-4 rounded-t-xl ${coluna.corHeader} flex items-center justify-between border-b border-slate-200 bg-white`}>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                {coluna.titulo}
                <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">
                  {coluna.chamados.length}
                </span>
              </h3>
              <button className="text-slate-400 hover:text-slate-700 transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Lista de Cartões */}
            <div className="p-3 flex-1 overflow-y-auto space-y-3 min-h-[150px]">
              {coluna.chamados.map((chamado) => (
                <div 
                  key={chamado.id}
                  draggable="true" // Permite arrastar o elemento HTML
                  onDragStart={(e) => handleDragStart(e, chamado.id, coluna.id)}
                  onDragEnd={handleDragEnd}
                  className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md cursor-grab active:cursor-grabbing transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-slate-400">{chamado.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${getCorPrioridade(chamado.prioridade)}`}>
                      {chamado.prioridade}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{chamado.categoria}</h4>
                  <p className="text-xs text-slate-500 mb-4">{chamado.solicitante}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-400 text-xs font-medium">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock size={14} />
                      <span>{chamado.dias}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {chamado.comentarios > 0 && (
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer">
                          <MessageSquare size={14} />
                          <span>{chamado.comentarios}</span>
                        </div>
                      )}
                      {chamado.anexos > 0 && (
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer">
                          <Paperclip size={14} />
                          <span>{chamado.anexos}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão Adicionar (Apenas na coluna Abertos) */}
            {coluna.id === 'abertos' && (
              <div className="p-3 border-t border-slate-200 bg-white rounded-b-xl">
                <button className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors border border-dashed border-slate-300">
                  <AlertCircle size={16} /> Novo Alerta
                </button>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}