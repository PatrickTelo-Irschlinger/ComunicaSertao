import React, { useState } from 'react';
import { 
  Save, User, Bell, Key, Globe, 
  Smartphone, Database, ShieldCheck,
  Check, Loader2, Copy, Camera, Lock,
  Bot, Link2, Mail, MessageSquare,
  Shield, Laptop, LogOut, History, MapPin, Clock
} from 'lucide-react';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('geral');

  // Estados dos diferentes formulários
  const [formData, setFormData] = useState({
    nomeInstituicao: 'Prefeitura Municipal de Sertão',
    fusoHorario: 'Brasília (BRT) - UTC-3',
    idioma: 'Português (Brasil)'
  });

  const [perfilData, setPerfilData] = useState({
    nome: 'Tiago Souza',
    email: 'tiago.souza@sertao.rs.gov.br',
    cargo: 'Administrador de Sistemas',
    telefone: '(54) 99988-7766'
  });

  const [apiData, setApiData] = useState({
    openAiKey: 'sk-proj-1234567890abcdef',
    openAiModel: 'gpt-4o-mini',
    whatsappToken: 'sertao_integrado_v1_secure'
  });

  const [notificacoes, setNotificacoes] = useState({
    emailNovoChamado: true,
    emailResumoDiario: false,
    whatsappCidadaoStatus: true,
    whatsappCidadaoAvaliacao: true,
    alertaNavegador: true
  });

  // Estado da Segurança
  const [segurancaConfig, setSegurancaConfig] = useState({
    twoFactorAuth: false,
    alertaNovoDispositivo: true
  });

  const [saveStatus, setSaveStatus] = useState('idle');
  const [copiado, setCopiado] = useState(false);

  // Manipuladores de eventos
  const handleGeralChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfilData(prev => ({ ...prev, [name]: value }));
  };

  const handleApiChange = (e) => {
    const { name, value } = e.target;
    setApiData(prev => ({ ...prev, [name]: value }));
  };

  const toggleNotificacao = (chave) => {
    setNotificacoes(prev => ({ ...prev, [chave]: !prev[chave] }));
  };

  const toggleSeguranca = (chave) => {
    setSegurancaConfig(prev => ({ ...prev, [chave]: !prev[chave] }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText("https://api.sertao-integrado.com.br/webhook/whatsapp");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const getTabClass = (tabName) => {
    const baseClass = "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ";
    return activeTab === tabName 
      ? baseClass + "bg-white border border-slate-200 text-blue-600 shadow-sm"
      : baseClass + "text-slate-600 hover:bg-slate-100 border border-transparent";
  };

  // Componente visual reutilizável para o interruptor (Toggle)
  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="p-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Menu Lateral Interno */}
        <div className="col-span-1 space-y-2">
          <button onClick={() => setActiveTab('geral')} className={getTabClass('geral')}>
            <Globe size={18} /> Geral e Sistema
          </button>
          <button onClick={() => setActiveTab('perfil')} className={getTabClass('perfil')}>
            <User size={18} /> Perfil do Administrador
          </button>
          <button onClick={() => setActiveTab('api')} className={getTabClass('api')}>
            <Key size={18} /> Integrações e API
          </button>
          <button onClick={() => setActiveTab('notificacoes')} className={getTabClass('notificacoes')}>
            <Bell size={18} /> Notificações
          </button>
          <button onClick={() => setActiveTab('seguranca')} className={getTabClass('seguranca')}>
            <ShieldCheck size={18} /> Segurança
          </button>
        </div>

        {/* Área de Formulários Condicional */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          
          {/* ========== GERAL E SISTEMA ========== */}
          {activeTab === 'geral' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                <Globe className="text-slate-400" size={20} />
                <h3 className="text-lg font-bold text-slate-900">Informações do Sistema</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nome da Instituição</label>
                  <input type="text" name="nomeInstituicao" value={formData.nomeInstituicao} onChange={handleGeralChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Fuso Horário</label>
                    <select name="fusoHorario" value={formData.fusoHorario} onChange={handleGeralChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Brasília (BRT) - UTC-3</option>
                      <option>Lisboa (WET) - UTC+0</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Idioma Padrão</label>
                    <select name="idioma" value={formData.idioma} onChange={handleGeralChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Português (Brasil)</option>
                      <option>Português (Portugal)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== PERFIL DO ADMINISTRADOR ========== */}
          {activeTab === 'perfil' && (
            <>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                  <User className="text-slate-400" size={20} />
                  <h3 className="text-lg font-bold text-slate-900">Informações Pessoais</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-blue-900 text-blue-200 flex items-center justify-center text-3xl font-bold shadow-inner">TS</div>
                      <button className="absolute bottom-0 right-0 p-2 bg-white border border-slate-200 text-slate-600 rounded-full shadow-sm hover:text-blue-600 transition-all"><Camera size={16} /></button>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-base">{perfilData.nome}</h4>
                      <p className="text-sm text-slate-500 mb-2">Administrador do Sistema</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
                      <input type="text" name="nome" value={perfilData.nome} onChange={handlePerfilChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail</label>
                      <input type="email" name="email" value={perfilData.email} onChange={handlePerfilChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Cargo / Função</label>
                      <input type="text" name="cargo" value={perfilData.cargo} onChange={handlePerfilChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone</label>
                      <input type="text" name="telefone" value={perfilData.telefone} onChange={handlePerfilChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                  <Lock className="text-slate-400" size={20} />
                  <h3 className="text-lg font-bold text-slate-900">Segurança da Conta</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Palavra-passe Atual</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nova Palavra-passe</label>
                    <input type="password" placeholder="Nova palavra-passe" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Confirmar Nova Palavra-passe</label>
                    <input type="password" placeholder="Repita a nova palavra-passe" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========== INTEGRAÇÕES E API ========== */}
          {activeTab === 'api' && (
            <>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                  <Bot className="text-slate-400" size={20} />
                  <h3 className="text-lg font-bold text-slate-900">Inteligência Artificial (OpenAI)</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Estado da Conexão</h4>
                      <p className="text-xs text-slate-500 mt-1">Conectado ao servidor da OpenAI para classificação de chamados.</p>
                    </div>
                    <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Ativo
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">API Key</label>
                      <input type="password" name="openAiKey" value={apiData.openAiKey} onChange={handleApiChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Modelo de IA Padrão</label>
                      <select name="openAiModel" value={apiData.openAiModel} onChange={handleApiChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="gpt-4o-mini">GPT-4o Mini (Recomendado - Rápido)</option>
                        <option value="gpt-4o">GPT-4o (Maior precisão)</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Legado)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                  <Smartphone className="text-slate-400" size={20} />
                  <h3 className="text-lg font-bold text-slate-900">WhatsApp Business API</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                      <Link2 size={16} className="text-slate-500" /> Webhook URL (Callback)
                    </label>
                    <p className="text-xs text-slate-500 mb-2">URL a configurar no painel da Meta (Facebook Developer) para receber as mensagens.</p>
                    <div className="flex gap-2">
                      <input type="text" value="https://api.sertao-integrado.com.br/webhook/whatsapp" readOnly className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 font-mono focus:outline-none" />
                      <button onClick={handleCopyWebhook} className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg text-sm transition-colors border ${copiado ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}>
                        {copiado ? <Check size={16} /> : <Copy size={16} />}
                        {copiado ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Verify Token (Token de Validação)</label>
                    <input type="text" name="whatsappToken" value={apiData.whatsappToken} onChange={handleApiChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========== NOTIFICAÇÕES ========== */}
          {activeTab === 'notificacoes' && (
            <>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                  <Mail className="text-slate-400" size={20} />
                  <h3 className="text-lg font-bold text-slate-900">Notificações por E-mail (Administrador)</h3>
                </div>
                <div className="p-2">
                  <div className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Alerta de Novos Chamados</h4>
                      <p className="text-xs text-slate-500 mt-1">Receber um e-mail imediato sempre que um cidadão registar um novo chamado via WhatsApp.</p>
                    </div>
                    <ToggleSwitch checked={notificacoes.emailNovoChamado} onChange={() => toggleNotificacao('emailNovoChamado')} />
                  </div>
                  <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Resumo Diário (Relatório)</h4>
                      <p className="text-xs text-slate-500 mt-1">Receber um e-mail às 08:00 com o resumo de estatísticas do dia anterior.</p>
                    </div>
                    <ToggleSwitch checked={notificacoes.emailResumoDiario} onChange={() => toggleNotificacao('emailResumoDiario')} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                  <MessageSquare className="text-slate-400" size={20} />
                  <h3 className="text-lg font-bold text-slate-900">Automações de WhatsApp (Cidadão)</h3>
                </div>
                <div className="p-2">
                  <div className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Atualização de Status Automática</h4>
                      <p className="text-xs text-slate-500 mt-1">Enviar mensagem no WhatsApp do cidadão quando o seu chamado mudar de estado.</p>
                    </div>
                    <ToggleSwitch checked={notificacoes.whatsappCidadaoStatus} onChange={() => toggleNotificacao('whatsappCidadaoStatus')} />
                  </div>
                  <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Pesquisa de Satisfação</h4>
                      <p className="text-xs text-slate-500 mt-1">Enviar pedido de avaliação após o chamado ser marcado como Concluído.</p>
                    </div>
                    <ToggleSwitch checked={notificacoes.whatsappCidadaoAvaliacao} onChange={() => toggleNotificacao('whatsappCidadaoAvaliacao')} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========== SEGURANÇA ========== */}
          {activeTab === 'seguranca' && (
            <>
              {/* Autenticação em Dois Fatores */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                  <Shield className="text-slate-400" size={20} />
                  <h3 className="text-lg font-bold text-slate-900">Proteção da Conta</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="max-w-md">
                      <h4 className="text-sm font-semibold text-slate-800">Autenticação de Dois Fatores (2FA)</h4>
                      <p className="text-sm text-slate-500 mt-1 mb-3">
                        Aumente a segurança da sua conta exigindo um código gerado no seu telemóvel (ex: Google Authenticator) em cada início de sessão.
                      </p>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        Configurar aplicação de autenticação →
                      </button>
                    </div>
                    <ToggleSwitch checked={segurancaConfig.twoFactorAuth} onChange={() => toggleSeguranca('twoFactorAuth')} />
                  </div>
                  
                  <div className="border-t border-slate-100 pt-6 flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Alertas de Novo Dispositivo</h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Receba um e-mail se a sua conta for acedida a partir de um dispositivo ou navegador não reconhecido.
                      </p>
                    </div>
                    <ToggleSwitch checked={segurancaConfig.alertaNovoDispositivo} onChange={() => toggleSeguranca('alertaNovoDispositivo')} />
                  </div>
                </div>
              </div>

              {/* Sessões Ativas */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Laptop className="text-slate-400" size={20} />
                    <h3 className="text-lg font-bold text-slate-900">Sessões Ativas</h3>
                  </div>
                  <button className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors flex items-center gap-2">
                    <LogOut size={16} /> Encerrar todas as outras sessões
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {/* Sessão Atual */}
                  <div className="p-5 flex items-center justify-between bg-blue-50/30">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                        <Laptop size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                          Windows 11 • Chrome 
                          <span className="text-[10px] uppercase font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Sessão Atual</span>
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><MapPin size={12} /> Getúlio Vargas, RS</span>
                          <span className="flex items-center gap-1"><Globe size={12} /> IP: 177.100.200.55</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Outra Sessão */}
                  <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-slate-100 text-slate-600 rounded-lg">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">Apple iPhone 14 • Safari</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><MapPin size={12} /> Passo Fundo, RS</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> Último acesso há 3 dias</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-sm text-slate-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-md transition-colors border border-slate-200 hover:border-red-200 hover:bg-red-50">
                      Revogar
                    </button>
                  </div>
                </div>
              </div>

              {/* Registo de Acessos Recentes */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                  <History className="text-slate-400" size={20} />
                  <h3 className="text-lg font-bold text-slate-900">Histórico de Acesso (Últimos 7 dias)</h3>
                </div>
                <div className="p-2">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                      <tr>
                        <th className="px-5 py-3 rounded-tl-lg">Data e Hora</th>
                        <th className="px-5 py-3">Ação</th>
                        <th className="px-5 py-3">Endereço IP</th>
                        <th className="px-5 py-3 rounded-tr-lg">Localização</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-5 py-3">24 Set 2026, 08:30</td>
                        <td className="px-5 py-3"><span className="text-green-600 font-medium">Login com Sucesso</span></td>
                        <td className="px-5 py-3 font-mono text-xs">177.100.200.55</td>
                        <td className="px-5 py-3">Getúlio Vargas, RS</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3">23 Set 2026, 17:45</td>
                        <td className="px-5 py-3"><span className="text-slate-600 font-medium">Sessão Terminada</span></td>
                        <td className="px-5 py-3 font-mono text-xs">177.100.200.55</td>
                        <td className="px-5 py-3">Getúlio Vargas, RS</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3">23 Set 2026, 08:15</td>
                        <td className="px-5 py-3"><span className="text-green-600 font-medium">Login com Sucesso</span></td>
                        <td className="px-5 py-3 font-mono text-xs">177.100.200.55</td>
                        <td className="px-5 py-3">Getúlio Vargas, RS</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3">21 Set 2026, 20:10</td>
                        <td className="px-5 py-3"><span className="text-red-600 font-medium">Tentativa Falhada</span></td>
                        <td className="px-5 py-3 font-mono text-xs">189.50.33.10</td>
                        <td className="px-5 py-3 text-red-600">Desconhecido</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Botão de Salvar Global (Visível para todas as abas) */}
          <div className="flex justify-end pt-4 pb-8 border-t border-slate-200 mt-6">
            <button 
              onClick={handleSave}
              disabled={saveStatus === 'saving' || saveStatus === 'success'}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm ${
                saveStatus === 'idle' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                saveStatus === 'saving' ? 'bg-blue-400 text-white cursor-not-allowed' :
                'bg-green-500 text-white'
              }`}
            >
              {saveStatus === 'idle' && <Save size={18} />}
              {saveStatus === 'saving' && <Loader2 size={18} className="animate-spin" />}
              {saveStatus === 'success' && <Check size={18} />}
              
              {saveStatus === 'idle' && 'Salvar Alterações'}
              {saveStatus === 'saving' && 'A Salvar...'}
              {saveStatus === 'success' && 'Guardado com Sucesso!'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}