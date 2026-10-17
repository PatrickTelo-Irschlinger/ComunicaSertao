import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
// IMPORTAÇÃO DA LOGO
import logoSertao from '../assets/logo.png';

export default function EsqueceuSenha({ onGoToLogin, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
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

  const handleRecuperacao = (e) => {
    e.preventDefault();
    setErro('');

    if (!email) {
      setErro("Por favor, preencha o seu e-mail institucional.");
      return;
    }

    if (!email.toLowerCase().endsWith(dominioOficial)) {
      setErro(`Apenas e-mails do domínio ${dominioOficial} são permitidos.`);
      return;
    }

    // Simula o envio do e-mail
    setEnviado(true);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* ========================================================= */}
      {/* LADO ESQUERDO - FORMULÁRIO DE RECUPERAÇÃO                   */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 lg:px-24 xl:px-32 z-10 bg-white">
        <div className="flex-1 flex flex-col justify-center py-12">
          
          <div className="max-w-md w-full mx-auto">
            
            <button 
              type="button"
              onClick={onBackToLogin}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#4b5e28] transition-colors mb-12 cursor-pointer"
            >
              <ArrowLeft size={16} /> Voltar para o Login
            </button>

            {!enviado ? (
              <>
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <ShieldCheck size={18} className="text-[#4b5e28]" />
                  <p className="text-sm font-medium">Recuperação Segura</p>
                </div>
                
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Esqueceu a senha?</h1>
                <p className="text-sm text-slate-500 mb-10 leading-relaxed pr-8">
                  Não se preocupe! Digite o seu e-mail institucional abaixo e enviaremos as instruções para redefinir a sua senha.
                </p>

                <form onSubmit={handleRecuperacao} className="space-y-6">
                  
                  {/* E-mail Institucional */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">E-mail Institucional</label>
                    <div className={`relative w-full bg-white border ${erro ? 'border-red-500' : 'border-slate-300'} rounded-lg focus-within:ring-2 focus-within:ring-[#4b5e28] focus-within:border-transparent transition-all overflow-hidden`}>
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

                  {/* Mensagem de Erro */}
                  {erro && (
                     <p className="text-sm text-red-500 font-medium flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-100">
                        <AlertCircle size={18} className="shrink-0" /> <span>{erro}</span>
                     </p>
                  )}

                  {/* Botão de Envio */}
                  <button 
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#4b5e28] hover:bg-[#3a4920] text-white font-medium rounded-lg transition-all shadow-[0_8px_20px_rgba(75,94,40,0.25)] hover:shadow-[0_4px_12px_rgba(75,94,40,0.2)] mt-2 cursor-pointer"
                  >
                    Enviar link de recuperação
                  </button>
                </form>
              </>
            ) : (
              /* Ecrã de Sucesso */
              <div className="bg-[#4b5e28]/5 border border-[#4b5e28]/20 rounded-xl p-8 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-[#4b5e28]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-[#4b5e28]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">E-mail Enviado!</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Enviámos as instruções de recuperação para <b>{email}</b>. Verifique a sua caixa de entrada e a pasta de spam.
                </p>
                <button 
                  type="button"
                  onClick={onGoToLogin}
                  className="w-full py-3.5 px-4 bg-[#4b5e28] hover:bg-[#3a4920] text-white font-medium rounded-lg transition-all shadow-md cursor-pointer"
                >
                  Voltar para o Login
                </button>
              </div>
            )}

          </div>
        </div>

        <div className="pb-8">
          <p className="text-xs text-slate-400 font-medium text-center lg:text-left">© 2026. Todos os direitos reservados. Prefeitura de Sertão.</p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LADO DIREITO - LOGO E TEXTO CENTRALIZADOS                 */}
      {/* ========================================================= */}
      <div className="hidden lg:flex w-1/2 bg-[#16161b] relative overflow-hidden items-center justify-center p-12">
        {/* Efeitos de fundo visuais */}
        <div className="absolute -top-[350px] -right-[350px] w-[800px] h-[800px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[450px] -right-[450px] w-[1100px] h-[1100px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[550px] -right-[550px] w-[1400px] h-[1400px] rounded-full border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute -top-[650px] -right-[650px] w-[1700px] h-[1700px] rounded-full border border-white/[0.03] pointer-events-none"></div>

        <div className="absolute bottom-[20%] -left-[150px] w-[500px] h-[500px] bg-[#dcfce7] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4b5e28] rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-lg w-full flex flex-col items-center justify-center text-center">
          
          {/* LOGO DA PREFEITURA CENTRALIZADA */}
          <div className="mb-10 w-full flex justify-center">
             <img 
               src={logoSertao} 
               alt="Logótipo da Prefeitura Municipal de Sertão" 
               className="h-32 w-auto object-contain drop-shadow-2xl" 
             />
          </div>

          {/* TÍTULO E SUBTÍTULO CENTRALIZADOS */}
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#6a8738]"></div>
              <span className="text-[#6a8738] text-xs font-bold tracking-widest uppercase">Comunica Sertão</span>
              <div className="w-6 h-px bg-[#6a8738]"></div>
            </div>
            
            <h2 className="text-5xl font-bold text-white leading-tight">
              Canal interativo e <br/> direto com a <br/> prefeitura de <br/>
              <span className="text-[#6a8738]">Sertão - RS</span>
            </h2>
          </div>

        </div>

        <button title="Ajuda e Suporte" className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs font-semibold z-20 cursor-pointer">?</button>
      </div>
    </div>
  );
}