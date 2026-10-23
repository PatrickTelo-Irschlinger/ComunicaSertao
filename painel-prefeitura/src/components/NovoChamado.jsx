import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function NovoChamado({ setActivePage }) {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [categoria, setCategoria] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  
  // Estados para upload de arquivo e feedback
  const [arquivo, setArquivo] = useState(null);
  const [arquivoPreview, setArquivoPreview] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  // Função para lidar com a seleção do arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // Limite de 10MB
        setErro("O arquivo deve ter no máximo 10MB.");
        setArquivo(null);
        setArquivoPreview(null);
        return;
      }
      setArquivo(file);
      
      // Cria preview apenas se for imagem
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setArquivoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setArquivoPreview(null); // Remove preview se não for imagem
      }
      setErro('');
    }
  };

  const removerArquivo = () => {
    setArquivo(null);
    setArquivoPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');

    // Validação dos campos obrigatórios
    if (!nome.trim() || !contato.trim() || !categoria) {
      setErro("Por favor, preencha os campos obrigatórios: Nome, Contato e Categoria.");
      return;
    }

    // Se houver arquivo, aqui você faria a lógica de enviar o FormData para a sua API /upload/foto
    // Por enquanto, simulamos o sucesso
    setSucesso(true);

    // Aguarda 2 segundos para mostrar a mensagem de sucesso e redireciona
    setTimeout(() => {
      setActivePage('chamados');
    }, 2000);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen pb-24">
      
      {/* ========================================================= */}
      {/* O SEGREDO DA CENTRALIZAÇÃO: max-w-4xl mx-auto             */}
      {/* ========================================================= */}
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          
          {/* Cabeçalho do Formulário */}
          <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Formulário de Abertura</h2>
              <p className="text-sm text-slate-500 mt-1">Preencha os detalhes para registrar uma nova solicitação do cidadão.</p>
            </div>
            {sucesso && (
               <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg font-bold text-sm border border-green-200">
                 <CheckCircle2 size={18} /> Chamado criado com sucesso!
               </div>
            )}
          </div>

          {/* Corpo do Formulário */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Mensagem de Erro */}
            {erro && (
              <div className="flex items-center gap-2 bg-red-50 p-4 rounded-lg text-red-600 text-sm font-medium border border-red-100">
                <AlertCircle size={18} /> {erro}
              </div>
            )}

            {/* Linha 1: Nome e Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome do Solicitante <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); if(erro) setErro(''); }}
                  placeholder="Nome completo" 
                  className={`w-full px-4 py-3 bg-white border ${erro && !nome ? 'border-red-500' : 'border-slate-200'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder:text-slate-400`} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contato (Telefone/WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={contato}
                  onChange={(e) => { setContato(e.target.value); if(erro) setErro(''); }}
                  placeholder="(00) 00000-0000" 
                  className={`w-full px-4 py-3 bg-white border ${erro && !contato ? 'border-red-500' : 'border-slate-200'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder:text-slate-400`} 
                />
              </div>
            </div>

            {/* Linha 2: Categoria e Bairro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Categoria <span className="text-red-500">*</span>
                </label>
                <select 
                  value={categoria}
                  onChange={(e) => { setCategoria(e.target.value); if(erro) setErro(''); }}
                  className={`w-full px-4 py-3 bg-white border ${erro && !categoria ? 'border-red-500' : 'border-slate-200'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${categoria ? 'text-slate-700' : 'text-slate-400'}`}
                >
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
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bairro da ocorrência" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder:text-slate-400" 
                />
              </div>
            </div>

            {/* Linha 3: Endereço */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Endereço Completo</label>
              <input 
                type="text" 
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Rua, Número, Ponto de Referência" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder:text-slate-400" 
              />
            </div>

            {/* Linha 4: Descrição */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Descrição da Ocorrência</label>
              <textarea 
                rows="4" 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva os detalhes do problema reportado pelo cidadão..." 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder:text-slate-400 resize-none"
              ></textarea>
            </div>

            {/* Linha 5: Upload de Arquivos */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Evidências (Fotos ou Vídeos)</label>
              
              {!arquivo ? (
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors group">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*,video/mp4,video/quicktime"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm pointer-events-none">
                    <UploadCloud size={20} className="text-slate-400 group-hover:text-[#2563eb] transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 mb-1 pointer-events-none">
                    <span className="text-[#2563eb] font-bold">Clique para upload</span> ou arraste o arquivo aqui
                  </p>
                  <p className="text-xs text-slate-500 pointer-events-none">PNG, JPG, MP4 ou MOV até 10MB</p>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
                  {arquivoPreview ? (
                    <img src={arquivoPreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                  ) : (
                    <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center shadow-sm">
                       <UploadCloud size={24} className="text-slate-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{arquivo.name}</p>
                    <p className="text-xs text-slate-500">{(arquivo.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={removerArquivo}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Remover arquivo"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center justify-end gap-4 pt-6 mt-8 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setActivePage('chamados')} 
                className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={sucesso}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all ${sucesso ? 'bg-green-600 text-white cursor-not-allowed' : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white hover:shadow-lg cursor-pointer'}`}
              >
                {sucesso ? 'Criando...' : 'Criar Chamado'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}