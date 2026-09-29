import React, { useState } from 'react';
import { EyeOff, Eye, AlertCircle } from 'lucide-react';

export default function Login({ onLogin }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); // Novo estado para controlar as mensagens de erro

  const handleEntrar = (e) => {
    e.preventDefault();
    
    // Limpa erros anteriores
    setErro('');

    // Valida se os campos estão preenchidos
    if (!email || !senha) {
      setErro("Por favor, preencha o e-mail e a senha para entrar.");
      return;
    }

    // Valida o tamanho da senha (pelo menos 6 dígitos)
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 dígitos.");
      return;
    }

    // Se passar por todas as validações, faz o login!
    onLogin();
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 lg:px-24 xl:px-32 z-10 bg-white">
        <div className="flex-1 flex flex-col justify-center">
          
          <div className="max-w-md w-full mx-auto">
            <p className="text-sm font-medium text-slate-500 mb-2">Bem-vindo de volta</p>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-10">Acesse sua conta</h1>

            <form onSubmit={handleEntrar} className="space-y-6">
              
              {/* E-mail */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">E-mail</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (erro) setErro(''); // Limpa o erro ao voltar a escrever
                  }}
                  placeholder="voce@empresa.com" 
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] focus:border-transparent transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
                <div className="relative">
                  <input 
                    type={mostrarSenha ? "text" : "password"} 
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                      if (erro) setErro(''); // Limpa o erro ao voltar a escrever
                    }}
                    placeholder="Digite sua senha" 
                    // Se houver erro, a borda do input fica vermelha
                    className={`w-full px-4 py-3 bg-white border ${erro && senha.length < 6 ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-[#4b5e28]'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-slate-400 pr-12`}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  >
                    {mostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                
                {/* Mensagem de feedback da senha */}
                {erro && senha.length < 6 ? (
                  <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                    <AlertCircle size={14} /> {erro}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 mt-2">A senha deve ter pelo menos 6 dígitos.</p>
                )}
              </div>

              {/* Mensagem de Erro Geral (Se faltar e-mail) */}
              {erro && senha.length >= 6 && (
                 <p className="text-sm text-red-500 font-medium flex items-center gap-1 bg-red-50 p-2 rounded-lg">
                    <AlertCircle size={16} /> {erro}
                 </p>
              )}

              {/* Manter conectado & Esqueceu a senha */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-[#4b5e28] focus:ring-[#4b5e28] accent-[#4b5e28] cursor-pointer" 
                  />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Manter conectado</span>
                </label>
                <a href="#" className="text-sm font-semibold text-[#4b5e28] hover:text-[#3a4920] transition-colors">
                  Esqueceu a senha?
                </a>
              </div>

              {/* Botão de Login */}
              <button 
                type="submit"
                className="w-full py-3.5 px-4 bg-[#4b5e28] hover:bg-[#3a4920] text-white font-medium rounded-lg transition-all shadow-[0_8px_20px_rgba(75,94,40,0.25)] hover:shadow-[0_4px_12px_rgba(75,94,40,0.2)] mt-4"
              >
                Entrar na plataforma
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-500 font-medium">
                  Ainda não tem uma conta? <a href="#" className="text-[#4b5e28] font-semibold hover:underline">Criar conta</a>
                </p>
              </div>

            </form>
          </div>

        </div>

        <div className="pb-8">
          <p className="text-xs text-slate-400 font-medium">© 2026. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Lado Direito - Ilustração (Apenas Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-[#16161b] relative overflow-hidden items-center justify-center p-12">
        
        {/* Elementos Decorativos Fundo */}
        <div className="absolute -top-[350px] -right-[350px] w-[800px] h-[800px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[450px] -right-[450px] w-[1100px] h-[1100px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[550px] -right-[550px] w-[1400px] h-[1400px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[650px] -right-[650px] w-[1700px] h-[1700px] rounded-full border border-white/[0.03] pointer-events-none"></div>

        <div className="absolute bottom-[20%] -left-[150px] w-[500px] h-[500px] bg-[#dcfce7] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4b5e28] rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-lg w-full">
          {/* Títulos da direita */}
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

          {/* Mockup do Dashboard */}
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

        <button 
          title="Ajuda e Suporte"
          className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs font-semibold z-20 cursor-pointer"
        >
          ?
        </button>

      </div>
      
    </div>
  );
}