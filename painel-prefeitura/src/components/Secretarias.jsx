import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Mail, Phone, MapPin, Ticket, Users, Building, Leaf, Droplet, Heart, Edit, Settings, Trash, X, UserPlus, UserMinus } from 'lucide-react';

export default function Secretarias() {
  // ==========================================
  // ESTADOS PRINCIPAIS DO SISTEMA
  // ==========================================
  const [secretarias, setSecretarias] = useState([
    { id: 1, nome: 'Secretaria de Obras e Viação', responsavel: 'Carlos Mendonça', email: 'obras@sertao.rs.gov.br', telefone: '(54) 3345-1001', endereco: 'Rua Principal, 123 - Centro', chamados: 145, equipe: 32, tipo: 'obras', cor: 'bg-[#4b5e28]/10 text-[#4b5e28]' },
    { id: 2, nome: 'Secretaria do Meio Ambiente', responsavel: 'Luciana Alves', email: 'meioambiente@sertao.rs.gov.br', telefone: '(54) 3345-1002', endereco: 'Av. das Árvores, 45 - Bosque', chamados: 89, equipe: 18, tipo: 'ambiente', cor: 'bg-emerald-100 text-emerald-700' },
    { id: 3, nome: 'Secretaria de Água e Saneamento', responsavel: 'Marcos Ribeiro', email: 'saneamento@sertao.rs.gov.br', telefone: '(54) 3345-1003', endereco: 'Rua das Águas, 789 - Distrito Industrial', chamados: 56, equipe: 24, tipo: 'agua', cor: 'bg-blue-100 text-blue-700' },
    { id: 4, nome: 'Secretaria de Saúde', responsavel: 'Dra. Helena Costa', email: 'saude@sertao.rs.gov.br', telefone: '(54) 3345-1004', endereco: 'Rua do Hospital, 10 - Centro', chamados: 12, equipe: 85, tipo: 'saude', cor: 'bg-red-100 text-red-700' },
  ]);

  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [menuAtivo, setMenuAtivo] = useState(null);

  // Estados para os Modais
  const [mostrarModalNova, setMostrarModalNova] = useState(false);
  const [novaSecretaria, setNovaSecretaria] = useState({ nome: '', responsavel: '', email: '', telefone: '', endereco: '' });

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [secretariaEditando, setSecretariaEditando] = useState(null);

  const [mostrarModalEquipe, setMostrarModalEquipe] = useState(false);
  const [secretariaEquipe, setSecretariaEquipe] = useState(null);
  const [novoMembro, setNovoMembro] = useState('');
  const [membrosEquipe, setMembrosEquipe] = useState([]);

  // ==========================================
  // LÓGICAS DE PESQUISA E MENU
  // ==========================================
  const secretariasFiltradas = secretarias.filter(s =>
    s.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
    s.responsavel.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setMenuAtivo(menuAtivo === id ? null : id);
  };

  // ==========================================
  // AÇÕES DO MENU DE 3 PONTOS
  // ==========================================
  const excluirSecretaria = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta secretaria do sistema?")) {
      setSecretarias(prev => prev.filter(s => s.id !== id));
    }
    setMenuAtivo(null);
  };

  const abrirModalEditar = (sec) => {
    setSecretariaEditando({ ...sec });
    setMostrarModalEditar(true);
    setMenuAtivo(null);
  };

  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    setSecretarias(prev => prev.map(s => s.id === secretariaEditando.id ? secretariaEditando : s));
    setMostrarModalEditar(false);
    setSecretariaEditando(null);
  };

  const abrirModalEquipe = (sec) => {
    setSecretariaEquipe(sec);
    // Simula membros da equipe para o modal
    setMembrosEquipe([
      { id: 101, nome: sec.responsavel + ' (Responsável)' },
      { id: 102, nome: 'João Silva (Atendimento)' },
      { id: 103, nome: 'Maria Santos (Técnica)' }
    ]);
    setMostrarModalEquipe(true);
    setMenuAtivo(null);
  };

  const adicionarMembroEquipe = (e) => {
    e.preventDefault();
    if (!novoMembro.trim()) return;
    setMembrosEquipe([...membrosEquipe, { id: Date.now(), nome: novoMembro }]);
    setNovoMembro('');
    setSecretarias(prev => prev.map(s => s.id === secretariaEquipe.id ? { ...s, equipe: s.equipe + 1 } : s));
  };

  const removerMembroEquipe = (idMembro) => {
    setMembrosEquipe(prev => prev.filter(m => m.id !== idMembro));
    setSecretarias(prev => prev.map(s => s.id === secretariaEquipe.id ? { ...s, equipe: Math.max(0, s.equipe - 1) } : s));
  };

  // ==========================================
  // LÓGICA DE CRIAR NOVA
  // ==========================================
  const handleSalvarNova = (e) => {
    e.preventDefault();
    const nova = {
      id: secretarias.length > 0 ? Math.max(...secretarias.map(s => s.id)) + 1 : 1,
      nome: novaSecretaria.nome,
      responsavel: novaSecretaria.responsavel,
      email: novaSecretaria.email,
      telefone: novaSecretaria.telefone,
      endereco: novaSecretaria.endereco,
      chamados: 0,
      equipe: 1,
      tipo: 'nova',
      cor: 'bg-slate-100 text-slate-700'
    };
    setSecretarias([nova, ...secretarias]);
    setNovaSecretaria({ nome: '', responsavel: '', email: '', telefone: '', endereco: '' });
    setMostrarModalNova(false);
  };

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'obras': return <Building size={24} />;
      case 'ambiente': return <Leaf size={24} />;
      case 'agua': return <Droplet size={24} />;
      case 'saude': return <Heart size={24} />;
      default: return <Building size={24} />;
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-full pb-16 relative">

      {/* Overlay invisível para fechar o Menu de Ações (3 pontos) */}
      {menuAtivo && (
        <div
          className="fixed inset-0 z-30 cursor-default"
          onClick={() => setMenuAtivo(null)}
        ></div>
      )}

      {/* ======================================================= */}
      {/* 1. MODAL DE NOVA SECRETARIA */}
      {/* ======================================================= */}
      {mostrarModalNova && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Adicionar Nova Secretaria</h3>
              <button onClick={() => setMostrarModalNova(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSalvarNova} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Secretaria</label>
                <input type="text" required value={novaSecretaria.nome} onChange={(e) => setNovaSecretaria({ ...novaSecretaria, nome: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" placeholder="Ex: Secretaria de Educação" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Responsável / Secretário(a)</label>
                <input type="text" required value={novaSecretaria.responsavel} onChange={(e) => setNovaSecretaria({ ...novaSecretaria, responsavel: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" placeholder="Nome do Responsável" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                  <input type="email" required value={novaSecretaria.email} onChange={(e) => setNovaSecretaria({ ...novaSecretaria, email: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" placeholder="email@sertao.rs.gov.br" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                  <input type="text" required value={novaSecretaria.telefone} onChange={(e) => setNovaSecretaria({ ...novaSecretaria, telefone: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" placeholder="(54) 3345-0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Endereço (Sede)</label>
                <input type="text" required value={novaSecretaria.endereco} onChange={(e) => setNovaSecretaria({ ...novaSecretaria, endereco: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" placeholder="Rua / Avenida, Número" />
              </div>
              <div className="pt-6 flex gap-3 justify-end">
                <button type="button" onClick={() => setMostrarModalNova(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-[#4b5e28] hover:bg-[#3a4920] rounded-lg transition-colors shadow-md">Salvar Secretaria</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* 2. MODAL DE EDITAR INFORMAÇÕES */}
      {/* ======================================================= */}
      {mostrarModalEditar && secretariaEditando && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Editar Secretaria</h3>
              <button onClick={() => setMostrarModalEditar(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSalvarEdicao} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Secretaria</label>
                <input type="text" required value={secretariaEditando.nome} onChange={(e) => setSecretariaEditando({ ...secretariaEditando, nome: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Responsável / Secretário(a)</label>
                <input type="text" required value={secretariaEditando.responsavel} onChange={(e) => setSecretariaEditando({ ...secretariaEditando, responsavel: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                  <input type="email" required value={secretariaEditando.email} onChange={(e) => setSecretariaEditando({ ...secretariaEditando, email: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                  <input type="text" required value={secretariaEditando.telefone} onChange={(e) => setSecretariaEditando({ ...secretariaEditando, telefone: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Endereço (Sede)</label>
                <input type="text" required value={secretariaEditando.endereco} onChange={(e) => setSecretariaEditando({ ...secretariaEditando, endereco: e.target.value })} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]" />
              </div>
              <div className="pt-6 flex gap-3 justify-end">
                <button type="button" onClick={() => setMostrarModalEditar(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-md">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* 3. MODAL DE GERENCIAR EQUIPE */}
      {/* ======================================================= */}
      {mostrarModalEquipe && secretariaEquipe && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Gerenciar Equipe</h3>
                <p className="text-sm text-slate-500">{secretariaEquipe.nome}</p>
              </div>
              <button onClick={() => setMostrarModalEquipe(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <form onSubmit={adicionarMembroEquipe} className="flex gap-3">
                <input
                  type="text"
                  value={novoMembro}
                  onChange={(e) => setNovoMembro(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do novo funcionário..."
                />
                <button type="submit" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
                  <UserPlus size={16} /> Adicionar
                </button>
              </form>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Membros da Equipe ({membrosEquipe.length})</p>
              <div className="space-y-2">
                {membrosEquipe.map(membro => (
                  <div key={membro.id} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                    <span className="text-sm font-medium text-slate-700">{membro.nome}</span>
                    <button
                      onClick={() => removerMembroEquipe(membro.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Remover Funcionário"
                    >
                      <UserMinus size={16} />
                    </button>
                  </div>
                ))}
                {membrosEquipe.length === 0 && (
                  <p className="text-sm text-slate-500 italic text-center py-4">Nenhum funcionário na lista.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* TOPO: BARRA DE PESQUISA E BOTÃO NOVA SECRETARIA */}
      {/* (CORRIGIDO: removido "relative z-10") */}
      {/* ======================================================= */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            placeholder="Pesquisar por secretaria ou responsável..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28]/50 focus:border-[#4b5e28] transition-colors"
          />
        </div>

        <button
          onClick={() => setMostrarModalNova(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#4b5e28] hover:bg-[#3a4920] text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
        >
          <Plus size={18} /> Nova Secretaria
        </button>
      </div>

      {/* ======================================================= */}
      {/* GRID DE CARTÕES DAS SECRETARIAS */}
      {/* (CORRIGIDO: removido "relative z-10" para não criar um   */}
      {/*  contexto de empilhamento acima do overlay do menu)      */}
      {/* ======================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {secretariasFiltradas.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            Nenhuma secretaria encontrada com esse nome ou responsável.
          </div>
        )}

        {secretariasFiltradas.map((sec) => (
          <div
            key={sec.id}
            className={`bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col relative ${menuAtivo === sec.id ? 'z-50' : 'z-10'}`}
          >
            {/* CABEÇALHO DO CARTÃO */}
            <div className="p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${sec.cor}`}>
                  {getIcon(sec.tipo)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 leading-tight">{sec.nome}</h3>
                  <p className="text-xs text-slate-500 mt-1">Resp: <span className="font-semibold text-slate-700">{sec.responsavel}</span></p>
                </div>
              </div>

              {/* MENU DE AÇÕES (3 PONTOS) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => toggleMenu(e, sec.id)}
                  className={`p-1.5 rounded-md transition-colors ${menuAtivo === sec.id ? 'bg-slate-200 text-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                >
                  <MoreHorizontal size={20} />
                </button>

                {menuAtivo === sec.id && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-slate-200 overflow-hidden z-[9999] animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex flex-col py-1.5">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); abrirModalEditar(sec); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors w-full text-left"
                      >
                        <Edit size={14} /> Editar Informações
                      </button>

                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); abrirModalEquipe(sec); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#4b5e28] transition-colors w-full text-left"
                      >
                        <Settings size={14} /> Gerenciar Equipe
                      </button>

                      <div className="h-px bg-slate-100 my-1 mx-2"></div>

                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); excluirSecretaria(sec.id); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <Trash size={14} /> Excluir Secretaria
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CORPO DO CARTÃO */}
            <div className="px-6 flex-1 flex flex-col gap-3">
              <p className="flex items-center gap-2.5 text-sm text-slate-500">
                <Mail size={16} className="text-slate-400 shrink-0" /> {sec.email}
              </p>
              <p className="flex items-center gap-2.5 text-sm text-slate-500">
                <Phone size={16} className="text-slate-400 shrink-0" /> {sec.telefone}
              </p>
              <p className="flex items-start gap-2.5 text-sm text-slate-500 leading-tight mt-1">
                <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" /> {sec.endereco}
              </p>
            </div>

            {/* RODAPÉ DO CARTÃO */}
            <div className="mt-6 border-t border-slate-100 grid grid-cols-2 divide-x divide-slate-100 bg-slate-50/50 rounded-b-xl">
              <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Chamados Abertos</p>
                  <p className="font-bold text-slate-800 text-lg leading-none">{sec.chamados}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <Ticket size={14} />
                </div>
              </div>

              <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Equipe</p>
                  <p className="font-bold text-slate-800 text-lg leading-none">{sec.equipe} <span className="text-xs font-medium text-slate-500">func.</span></p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <Users size={14} />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}