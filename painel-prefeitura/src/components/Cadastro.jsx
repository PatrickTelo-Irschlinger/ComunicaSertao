import React, { useState } from 'react';
import { EyeOff, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';
// IMPORTAÇÃO DA LOGO
import logoSertao from '../assets/logo.png';

export default function Cadastro({ onLogin, onGoToLogin }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

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

  const handleKeyDownEmail = (e) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && sugestaoEmail) {
      e.preventDefault();
      setEmail(email + sugestaoEmail);
      if (erro) setErro('');
    }
  };

  const handleRegisto = (e) => {
    e.preventDefault();
    setErro('');

    if (!nome || !email || !cargo || !departamento || !senha || !confirmarSenha) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!email.toLowerCase().endsWith(dominioOficial)) {
      setErro(`Acesso negado. Utilize um e-mail corporativo válido (${dominioOficial}).`);
      return;
    }

    if (cargo.trim().length < 2) {
      setErro("Por favor, informe o seu Cargo.");
      return;
    }
    if (departamento.trim().length < 2) {
      setErro("Por favor, informe o seu Departamento / Secretaria.");
      return;
    }

    const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexSenhaForte.test(senha)) {
      setErro("A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem. Verifique a confirmação.");
      return;
    }

    setSucesso(true);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* ========================================================= */}
      {/* LADO ESQUERDO - FORMULÁRIO DE CADASTRO                    */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 lg:px-24 xl:px-32 z-10 bg-white">
        <div className="flex-1 flex flex-col justify-center py-8">
          
          <div className="max-w-md w-full mx-auto">
            
            {!sucesso ? (
              <>
                <p className="text-sm font-medium text-slate-500 mb-2">Uso Exclusivo para Servidores</p>
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Solicitar Acesso</h1>

                <form onSubmit={handleRegisto} className="space-y-4">
                  
                  {/* Nome Completo */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome Completo</label>
                    <input 
                      type="text" 
                      value={nome}
                      onChange={(e) => { setNome(e.target.value); if (erro) setErro(''); }}
                      placeholder="Seu nome completo" 
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* E-mail Institucional */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail Institucional</label>
                    <div className={`relative w-full bg-white border ${erro && (!email || !email.includes(dominioOficial)) ? 'border-red-500' : 'border-slate-300'} rounded-lg focus-within:ring-2 focus-within:ring-[#4b5e28] focus-within:border-transparent transition-all overflow-hidden`}>
                      <div className="absolute inset-0 px-4 py-2.5 text-sm pointer-events-none flex items-center whitespace-nowrap overflow-hidden">
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
                        onKeyDown={handleKeyDownEmail}
                        autoComplete="off"
                        placeholder="@sertao.rs.gov.br" 
                        className="w-full px-4 py-2.5 bg-transparent text-sm focus:outline-none relative z-10 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Cargo e Departamento lado a lado */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Cargo</label>
                      <input 
                        type="text" 
                        value={cargo}
                        onChange={(e) => { setCargo(e.target.value); if (erro) setErro(''); }}
                        placeholder="Ex: Gestor de Atendimento" 
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] focus:border-transparent transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Departamento / Secretaria</label>
                      <input 
                        type="text" 
                        value={departamento}
                        onChange={(e) => { setDepartamento(e.target.value); if (erro) setErro(''); }}
                        placeholder="Ex: Administração" 
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5e28] focus:border-transparent transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Senha */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Senha de Acesso</label>
                    <div className="relative">
                      <input 
                        type={mostrarSenha ? "text" : "password"} 
                        value={senha}
                        onChange={(e) => { setSenha(e.target.value); if (erro) setErro(''); }}
                        placeholder="Mínimo 8 caracteres" 
                        className={`w-full px-4 py-2.5 bg-white border ${erro && senha.length > 0 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha) ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-[#4b5e28]'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-slate-400 pr-12`}
                      />
                      <button 
                        type="button"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                      >
                        {mostrarSenha ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 ml-1 font-medium">Use 8+ caracteres, com maiúsculas, minúsculas e números.</p>
                  </div>

                  {/* Confirmar Senha */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirmar Senha</label>
                    <div className="relative">
                      <input 
                        type={mostrarConfirmarSenha ? "text" : "password"} 
                        value={confirmarSenha}
                        onChange={(e) => { setConfirmarSenha(e.target.value); if (erro) setErro(''); }}
                        placeholder="Repita sua senha" 
                        className={`w-full px-4 py-2.5 bg-white border ${confirmarSenha.length > 0 && senha !== confirmarSenha ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-slate-300 focus:ring-[#4b5e28]'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-slate-400 pr-12`}
                      />
                      <button 
                        type="button"
                        onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                      >
                        {mostrarConfirmarSenha ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                    {confirmarSenha.length > 0 && senha !== confirmarSenha && (
                      <p className="text-[11px] text-red-500 mt-1 ml-1 font-bold">As senhas não coincidem.</p>
                    )}
                  </div>

                  {/* Mensagem de Erro Geral */}
                  {erro && (
                     <p className="text-sm text-red-500 font-medium flex items-center gap-2 bg-red-50 p-3 rounded-lg mt-2 border border-red-100">
                        <AlertCircle size={18} className="shrink-0" /> <span>{erro}</span>
                     </p>
                  )}

                  {/* Botão de Solicitação */}
                  <button 
                    type="submit"
                    className="w-full py-3 px-4 bg-[#4b5e28] hover:bg-[#3a4920] text-white font-medium rounded-lg transition-all shadow-[0_8px_20px_rgba(75,94,40,0.25)] hover:shadow-[0_4px_12px_rgba(75,94,40,0.2)] mt-4 cursor-pointer"
                  >
                    Solicitar Acesso
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm text-slate-500 font-medium">
                      Já é um servidor registrado? <button type="button" onClick={onGoToLogin} className="text-[#4b5e28] font-semibold hover:underline cursor-pointer">Voltar ao Painel</button>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* Ecrã de Sucesso */
              <div className="bg-[#4b5e28]/5 border border-[#4b5e28]/20 rounded-xl p-8 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-[#4b5e28]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-[#4b5e28]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Solicitação Enviada!</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Os seus dados foram recebidos com sucesso. Por questões de segurança, a sua conta aguarda agora a <b>aprovação do administrador</b> do sistema.
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

        <div className="pb-6">
          <p className="text-xs text-slate-400 font-medium text-center lg:text-left">© 2026. Todos os direitos reservados. Prefeitura de Sertão.</p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LADO DIREITO - LOGO E TEXTO CENTRALIZADOS                 */}
      {/* ========================================================= */}
      <div className="hidden lg:flex w-1/2 bg-[#16161b] relative overflow-hidden items-center justify-center p-12">
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

      </div>
    </div>
  );
}