import React, { useState } from 'react';
import { EyeOff, Eye, AlertCircle } from 'lucide-react';

export default function Cadastro({ onLogin, onGoToLogin }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState(''); // Novo estado para a matrícula
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleRegisto = (e) => {
    e.preventDefault();
    setErro('');

    // 1. Verifica se todos os campos estão preenchidos
    if (!nome || !email || !matricula || !senha || !confirmarSenha) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // 2. SEGURANÇA: Restrição de Domínio Institucional
    const dominioOficial = "@sertao.rs.gov.br";
    if (!email.toLowerCase().endsWith(dominioOficial)) {
      setErro(`Acesso negado. Utilize um e-mail corporativo válido (${dominioOficial}).`);
      return;
    }

    // 3. SEGURANÇA: Validação de Matrícula (simulação)
    if (matricula.length < 4) {
      setErro("Número de matrícula de servidor inválido.");
      return;
    }

    // 4. Validação de segurança da senha
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 dígitos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem. Tente novamente.");
      return;
    }

    // Se passar em todas as validações de segurança, simula o registo com sucesso
    onLogin();
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 lg:px-24 xl:px-32 z-10 bg-white">
        <div className="flex-1 flex flex-col justify-center py-12">
          
          <div className="max-w-md w-full mx-auto">
            <p className="text-sm font-medium text-slate-500 mb-2">Uso Exclusivo para Servidores</p>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Solicitar Acesso</h1>

            <form onSubmit={handleRegisto} className="space-y-5">
              
              {/* Nome Completo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); if (erro) setErro(''); }}
                  placeholder="Seu nome completo" 
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Matrícula e E-mail lado a lado */}
              <div className="grid grid-cols-2 gap-4">
                {/* Matrícula do Servidor */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nº de Matrícula</label>
                  <input 
                    type="text" 
                    value={matricula}
                    onChange={(e) => { setMatricula(e.target.value.replace(/\D/g, '')); if (erro) setErro(''); }}
                    placeholder="Ex: 12345" 
                    maxLength={8}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* E-mail Institucional */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">E-mail Institucional</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (erro) setErro(''); }}
                    placeholder="@sertao.rs.gov.br" 
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Senha de Acesso</label>
                <div className="relative">
                  <input 
                    type={mostrarSenha ? "text" : "password"} 
                    value={senha}
                    onChange={(e) => { setSenha(e.target.value); if (erro) setErro(''); }}
                    placeholder="Mínimo 6 dígitos" 
                    className={`w-full px-4 py-3 bg-white border ${erro && (senha.length > 0 && senha.length < 6) ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-[#4b5e28]'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-slate-400 pr-12`}
                  />
                  <button 
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  >
                    {mostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirmar Senha</label>
                <div className="relative">
                  <input 
                    type={mostrarConfirmarSenha ? "text" : "password"} 
                    value={confirmarSenha}
                    onChange={(e) => { setConfirmarSenha(e.target.value); if (erro) setErro(''); }}
                    placeholder="Repita sua senha" 
                    className={`w-full px-4 py-3 bg-white border ${erro && senha !== confirmarSenha && confirmarSenha.length > 0 ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-[#4b5e28]'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-slate-400 pr-12`}
                  />
                  <button 
                    type="button"
                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  >
                    {mostrarConfirmarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Mensagem de Erro Geral */}
              {erro && (
                 <p className="text-sm text-red-500 font-medium flex items-center gap-2 bg-red-50 p-3 rounded-lg mt-2 border border-red-100">
                    <AlertCircle size={18} className="shrink-0" /> <span>{erro}</span>
                 </p>
              )}

              {/* Botão de Registo */}
              <button 
                type="submit"
                className="w-full py-3.5 px-4 bg-[#4b5e28] hover:bg-[#3a4920] text-white font-medium rounded-lg transition-all shadow-[0_8px_20px_rgba(75,94,40,0.25)] hover:shadow-[0_4px_12px_rgba(75,94,40,0.2)] mt-6"
              >
                Solicitar Registo no Sistema
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-500 font-medium">
                  Já é um servidor registado? <button type="button" onClick={onGoToLogin} className="text-[#4b5e28] font-semibold hover:underline cursor-pointer">Aceder ao Painel</button>
                </p>
              </div>

            </form>
          </div>

        </div>

        <div className="pb-8">
          <p className="text-xs text-slate-400 font-medium">© 2026. Todos os direitos reservados. Prefeitura de Sertão.</p>
        </div>
      </div>

      {/* Lado Direito - Ilustração */}
      <div className="hidden lg:flex w-1/2 bg-[#16161b] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute -top-[350px] -right-[350px] w-[800px] h-[800px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[450px] -right-[450px] w-[1100px] h-[1100px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[550px] -right-[550px] w-[1400px] h-[1400px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[650px] -right-[650px] w-[1700px] h-[1700px] rounded-full border border-white/[0.03] pointer-events-none"></div>

        <div className="absolute bottom-[20%] -left-[150px] w-[500px] h-[500px] bg-[#dcfce7] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4b5e28] rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-lg w-full">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#6a8738]"></div>
              <span className="text-[#6a8738] text-xs font-bold tracking-widest uppercase">Comunica Sertão</span>
            </div>
            <h2 className="text-5xl font-bold text-white leading-tight">
              Canal interativo e direto com a prefeitura de <br/>
              <span className="text-[#6a8738]">Sertão - RS</span>
            </h2>
          </div>

          <div className="w-full bg-[#f8fafc] rounded-2xl shadow-2xl p-5 flex gap-5 transform rotate-[-1deg] hover:rotate-0 transition-transform duration-500 border border-slate-200/50">
            <div className="w-14 flex flex-col items-center gap-4 py-2">
              <div className="w-8 h-8 bg-[#4b5e28] rounded-lg mb-4"></div>
              <div className="w-10 h-6 bg-[#dcfce7] rounded-md"></div>
              <div className="w-10 h-2 bg-slate-200 rounded-full"></div>
              <div className="w-10 h-2 bg-slate-200 rounded-full"></div>
              <div className="w-10 h-2 bg-slate-200 rounded-full"></div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div className="flex flex-col gap-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
                  <div className="w-32 h-3 bg-slate-800 rounded-full"></div>
                </div>
                <div className="w-8 h-8 bg-[#dcfce7] rounded-full border border-white shadow-sm"></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-3"></div>
                  <div className="text-lg font-bold text-slate-800 leading-none mb-2">156</div>
                  <div className="w-16 h-1.5 bg-[#4b5e28] rounded-full opacity-60"></div>
                </div>
                <div className="bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-3"></div>
                  <div className="text-lg font-bold text-slate-800 leading-none mb-2">98</div>
                  <div className="w-14 h-1.5 bg-[#4b5e28] rounded-full opacity-60"></div>
                </div>
                <div className="bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full mb-3"></div>
                  <div className="text-lg font-bold text-slate-800 leading-none mb-2">5 dias</div>
                  <div className="w-12 h-1.5 bg-[#4b5e28] rounded-full opacity-60"></div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-4 rounded-lg shadow-sm flex-1 flex flex-col justify-end">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-16 h-2 bg-slate-800 rounded-full"></div>
                  <div className="w-24 h-3 bg-slate-100 rounded-full"></div>
                </div>
                
                <div className="flex items-end justify-between gap-1 h-24">
                  <div className="w-full bg-[#cbd5e1] rounded-t-sm h-[20%] transition-all hover:h-[25%]"></div>
                  <div className="w-full bg-[#cbd5e1] rounded-t-sm h-[35%] transition-all hover:h-[40%]"></div>
                  <div className="w-full bg-[#cbd5e1] rounded-t-sm h-[25%] transition-all hover:h-[30%]"></div>
                  <div className="w-full bg-[#a3b18a] rounded-t-sm h-[45%] transition-all hover:h-[50%]"></div>
                  <div className="w-full bg-[#a3b18a] rounded-t-sm h-[30%] transition-all hover:h-[35%]"></div>
                  <div className="w-full bg-[#a3b18a] rounded-t-sm h-[60%] transition-all hover:h-[65%]"></div>
                  <div className="w-full bg-[#a3b18a] rounded-t-sm h-[50%] transition-all hover:h-[55%]"></div>
                  <div className="w-full bg-[#4b5e28] rounded-t-sm h-[70%] transition-all hover:h-[75%]"></div>
                  <div className="w-full bg-[#4b5e28] rounded-t-sm h-[85%] transition-all hover:h-[90%]"></div>
                  <div className="w-full bg-[#4b5e28] rounded-t-sm h-[65%] transition-all hover:h-[70%]"></div>
                  <div className="w-full bg-[#2d3a17] rounded-t-sm h-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button title="Ajuda e Suporte" className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs font-semibold z-20 cursor-pointer">?</button>
      </div>
      
    </div>
  );
}