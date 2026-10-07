import React from 'react';
import { UploadCloud } from 'lucide-react';

export default function NovoChamado({ setActivePage }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Chamado criado com sucesso!");
    setActivePage('chamados'); // Volta para a tela de chamados após criar
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen pb-24">
      
      {/* ========================================================= */}
      {/* O SEGREDO DA CENTRALIZAÇÃO: max-w-4xl mx-auto             */}
      {/* Isto limita a largura e empurra o bloco para o centro!  */}
      {/* ========================================================= */}
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          
          {/* Cabeçalho do Formulário */}
          <div className="p-8 border-b border-slate-100 bg-slate-50/30">
            <h2 className="text-xl font-bold text-slate-800">Formulário de Abertura</h2>
            <p className="text-sm text-slate-500 mt-1">Preencha os detalhes para registrar uma nova solicitação do cidadão.</p>
          </div>

          {/* Corpo do Formulário */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Linha 1: Nome e Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nome do Solicitante</label>
                <input 
                  type="text" 
                  placeholder="Nome completo" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] placeholder:text-slate-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Contato (Telefone/WhatsApp)</label>
                <input 
                  type="text" 
                  placeholder="(00) 00000-0000" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] placeholder:text-slate-400" 
                />
              </div>
            </div>

            {/* Linha 2: Categoria e Bairro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] text-slate-600">
                  <option value="">Selecione o assunto...</option>
                  <option value="iluminacao">Iluminação Pública</option>
                  <option value="pavimentacao">Pavimentação</option>
                  <option value="limpeza">Limpeza Urbana</option>
                  <option value="agua">Água e Esgoto</option>
                  <option value="poda">Poda de Árvores</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bairro / Região</label>
                <input 
                  type="text" 
                  placeholder="Bairro da ocorrência" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] placeholder:text-slate-400" 
                />
              </div>
            </div>

            {/* Linha 3: Endereço */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Endereço Completo</label>
              <input 
                type="text" 
                placeholder="Rua, Número, Ponto de Referência" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] placeholder:text-slate-400" 
              />
            </div>

            {/* Linha 4: Descrição */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Descrição da Ocorrência</label>
              <textarea 
                rows="4" 
                placeholder="Descreva os detalhes do problema reportado pelo cidadão..." 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] placeholder:text-slate-400 resize-none"
              ></textarea>
            </div>

            {/* Linha 5: Upload de Arquivos */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Evidências (Fotos ou Vídeos)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <UploadCloud size={20} className="text-slate-400 group-hover:text-[#4b5e28] transition-colors" />
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">
                  <span className="text-[#4b5e28] font-bold">Faça upload de arquivos</span> ou arraste e solte aqui
                </p>
                <p className="text-xs text-slate-500">PNG, JPG, MP4 ou MOV até 10MB</p>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center justify-end gap-4 pt-6 mt-8 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setActivePage('chamados')} 
                className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-8 py-2.5 bg-[#4b5e28] hover:bg-[#3a4920] text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                Criar Chamado
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}