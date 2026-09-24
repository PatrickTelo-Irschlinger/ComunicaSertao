import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react';

export default function NovoChamado({ setActivePage }) {
  // Estado para guardar os ficheiros selecionados (apenas simulação no Front-end)
  const [arquivos, setArquivos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular o envio e regressar à lista
    alert('Chamado criado com sucesso! (Isto será processado pelo Spring Boot no futuro)');
    setActivePage('chamados');
  };

  // Função para simular a adição de ficheiros
  const handleFileChange = (e) => {
    if (e.target.files) {
      const novosArquivos = Array.from(e.target.files).map(file => ({
        nome: file.name,
        tipo: file.type.includes('video') ? 'video' : 'imagem'
      }));
      setArquivos([...arquivos, ...novosArquivos]);
    }
  };

  // Remover um ficheiro da lista
  const removerArquivo = (indexParaRemover) => {
    setArquivos(arquivos.filter((_, index) => index !== indexParaRemover));
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">Formulário de Abertura</h3>
          <p className="text-sm text-slate-500 mt-1">Preencha os detalhes para registar uma nova solicitação do cidadão.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informações Pessoais */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome do Solicitante</label>
              <input type="text" placeholder="Nome completo" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" required />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Contacto (Telefone/WhatsApp)</label>
              <input type="text" placeholder="(00) 00000-0000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" required />
            </div>
          </div>

          {/* Categoria e Local */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Categoria</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" required>
                <option value="">Selecione o assunto...</option>
                <option value="iluminacao">Iluminação Pública</option>
                <option value="pavimentacao">Pavimentação/Buracos</option>
                <option value="limpeza">Limpeza Urbana</option>
                <option value="agua">Água e Esgoto</option>
                <option value="arvores">Poda de Árvores</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bairro / Região</label>
              <input type="text" placeholder="Bairro da ocorrência" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Endereço Completo</label>
            <input type="text" placeholder="Rua, Número, Ponto de Referência" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Descrição da Ocorrência</label>
            <textarea rows="4" placeholder="Descreva os detalhes do problema reportado pelo cidadão..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none" required></textarea>
          </div>

          {/* NOVA SEÇÃO: Anexos (Fotos e Vídeos) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Evidências (Fotos ou Vídeos)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-10 w-10 text-slate-400" />
                <div className="flex text-sm text-slate-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Faça upload de ficheiros</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*,video/*" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">ou arraste e solte aqui</p>
                </div>
                <p className="text-xs text-slate-500">PNG, JPG, MP4 ou MOV até 10MB</p>
              </div>
            </div>

            {/* Lista de Ficheiros Selecionados */}
            {arquivos.length > 0 && (
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {arquivos.map((arq, index) => (
                  <li key={index} className="flex items-center justify-between p-3 text-sm bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`p-2 rounded-md ${arq.tipo === 'video' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                        {arq.tipo === 'video' ? <Video size={16} /> : <ImageIcon size={16} />}
                      </div>
                      <span className="truncate text-slate-700 font-medium">{arq.nome}</span>
                    </div>
                    <button type="button" onClick={() => removerArquivo(index)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* FIM DA NOVA SEÇÃO */}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => setActivePage('dashboard')}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Criar Chamado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}