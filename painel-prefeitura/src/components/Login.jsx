import React, { useState } from 'react';
import { EyeOff, Eye, AlertCircle, ShieldCheck } from 'lucide-react';
import brasaoSertao from '../assets/brasao-sertao.jpg'; 

export default function Login({ onLogin, onGoToCadastro, onGoToEsqueceuSenha }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); 

  const dominioOficial = "@sertao.rs.gov.br";
  let sugestaoEmail = "";

  if (email.length > 0 && !email.endsWith(dominioOficial)) {
    if (!email.includes("@")) {
      sugestaoEmail = dominioOficial;
    } else {
      const partes = email.split("@");
      const dominioDigitado = partes[1];
      const dominioEsperado = "sertao.rs.gov.br";
      if (dominioEsperado.startsWith(dominioDigitado)) {
        sugestaoEmail = dominioEsperado.substring(dominioDigitado.length);
      }
    }
  }

  const handleKeyDown = (e) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && sugestaoEmail) {
      e.preventDefault();
      setEmail(email + sugestaoEmail);
      if (erro) setErro('');
    }
  };

  const handleEntrar = (e) => {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro("Por favor, preencha o e-mail e a senha para entrar.");
      return;
    }

    if (!email.toLowerCase().endsWith(dominioOficial)) {
      setErro(`Acesso restrito a servidores. Utilize o seu e-mail corporativo (${dominioOficial}).`);
      return;
    }

    const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexSenhaForte.test(senha)) {
      setErro("A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números.");
      return;
    }

    onLogin({
      nome: 'Administrador do Sistema',
      email: email,
      cargo: 'Gestor de Atendimento',
      departamento: 'Secretaria de Administração'
    });
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* ========================================================= */}
      {/* LADO ESQUERDO - FORMULÁRIO EM AZUL (#2563eb / #1d4ed8)    */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 lg:px-24 xl:px-32 z-10 bg-white">
        <div className="flex-1 flex flex-col justify-center py-12">
          
          <div className="max-w-md w-full mx-auto">
            
            <div className="flex items-center gap-2 mb-2 text-slate-500">
              <ShieldCheck size={18} className="text-[#2563eb]" />
              <p className="text-sm font-medium">Painel do Servidor</p>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-10">Acesse sua conta</h1>

            <form onSubmit={handleEntrar} className="space-y-6">
              
              {/* E-mail Institucional */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">E-mail Institucional</label>
                <div className={`relative w-full bg-white border ${erro && (!email || !email.includes(dominioOficial)) ? 'border-red-500' : 'border-slate-300'} rounded-lg focus-within:ring-2 focus-within:ring-[#2563eb] focus-within:border-transparent transition-all overflow-hidden`}>
                  <div className="absolute inset-0 px-4 py-3 text-sm pointer-events-none flex items-center whitespace-nowrap overflow-hidden">
                    <span className="text-transparent">{email}</span>
                    {sugestaoEmail && (
                      <span className="text-slate-400 flex items-center">
                        {sugestaoEmail}
                        <span className="ml-2 text-[9px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded shadow-sm">Tab</span>
                      </span>
                    )}
                  </div>
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value.replace(/\s/g, '')); if (erro) setErro(''); }}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    placeholder="servidor@sertao.rs.gov.br" 
                    className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none relative z-10 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
                <div className="relative">
                  <input 
                    type={mostrarSenha ? "text" : "password"} 
                    value={senha}
                    onChange={(e) => { setSenha(e.target.value); if (erro) setErro(''); }}
                    placeholder="Digite sua senha" 
                    className={`w-full px-4 py-3 bg-white border ${erro && senha.length > 0 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha) ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-[#2563eb]'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-slate-400 pr-12`}
                  />
                  <button 
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  >
                    {mostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 ml-1 font-medium">Mínimo de 8 caracteres (maiúsculas, minúsculas e números).</p>
              </div>

              {/* Mensagem de Erro */}
              {erro && (
                 <p className="text-sm text-red-500 font-medium flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-100">
                    <AlertCircle size={18} className="shrink-0" /> <span>{erro}</span>
                 </p>
              )}

              {/* Checkbox e Esqueceu a Senha */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb] accent-[#2563eb] cursor-pointer" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Manter conectado</span>
                </label>
                
                <button 
                  type="button" 
                  onClick={onGoToEsqueceuSenha}
                  className="text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] hover:underline transition-colors cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>

              {/* Botão Entrar no Painel */}
              <button 
                type="submit"
                className="w-full py-3.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium rounded-lg transition-all shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.2)] mt-4 cursor-pointer"
              >
                Entrar no Painel
              </button>

              {/* Solicitar Acesso */}
              <div className="text-center mt-6 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 font-medium">
                  É um novo servidor? <button type="button" onClick={onGoToCadastro} className="text-[#2563eb] font-semibold hover:text-[#1d4ed8] hover:underline cursor-pointer">Solicitar Acesso</button>
                </p>
              </div>

            </form>
          </div>
        </div>

        <div className="pb-8">
          <p className="text-xs text-slate-400 font-medium text-center lg:text-left">© 2026. Todos os direitos reservados. Prefeitura de Sertão.</p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LADO DIREITO - MAIS ALTO (-mt-36) E ESPAÇAMENTO ALINHADO  */}
      {/* ========================================================= */}
      <div className="hidden lg:flex w-1/2 flex-col bg-[#ffffff] border-l border-slate-200 relative overflow-hidden px-12">
        <div className="absolute -top-[350px] -right-[350px] w-[800px] h-[800px] rounded-full border border-slate-900/[0.04] pointer-events-none"></div>
        <div className="absolute -top-[450px] -right-[450px] w-[1100px] h-[1100px] rounded-full border border-slate-900/[0.04] pointer-events-none"></div>
        <div className="absolute -top-[550px] -right-[550px] w-[1400px] h-[1400px] rounded-full border border-slate-900/[0.04] pointer-events-none"></div>
        <div className="absolute -top-[650px] -right-[650px] w-[1700px] h-[1700px] rounded-full border border-slate-900/[0.04] pointer-events-none"></div>

        <div className="flex-1 flex flex-col items-center justify-center py-12 -mt-36 relative z-10">
          <div className="max-w-lg w-full flex flex-col items-center justify-center text-center">
            
            {/* BRASÃO DE SERTÃO */}
            <div className="mb-5 w-full flex justify-center">
               <img 
                 src={brasaoSertao} 
                 alt="Brasão do Município de Sertão" 
                 className="h-40 w-auto object-contain mix-blend-multiply" 
               />
            </div>

            {/* COMUNICA SERTÃO CENTRALIZADO E COM ESPAÇAMENTO CORRETO */}
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-[#eab308] shrink-0"></div>
                <span className="text-[#f8e000] text-lg font-black tracking-[0.18em] pl-[0.18em] uppercase leading-none drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.45)]">
                  Comunica Sertão
                </span>
                <div className="w-8 h-0.5 bg-[#eab308] shrink-0"></div>
              </div>
              
              <h2 className="text-5xl font-bold text-slate-900 leading-[1.18] tracking-tight">
                Canal interativo e <br/>
                direto com a <br/>
                prefeitura de <br/>
                <span className="inline-block mt-1 text-[#f8e000] drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.35)]">
                  Sertão - RS
                </span>
              </h2>
            </div>

          </div>
        </div>

        <div className="pb-8 invisible select-none" aria-hidden="true">
          <p className="text-xs">© 2026</p>
        </div>
      </div>
    </div>
  );
}