import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Chamados from './components/Chamados';
import ChamadoDetalhes from './components/ChamadoDetalhes';
import Kanban from './components/Kanban';
import Secretarias from './components/Secretarias';
import Relatorios from './components/Relatorios';
import Configuracoes from './components/Configuracoes';
import NovoChamado from './components/NovoChamado';
import HistoricoNotificacoes from './components/HistoricoNotificacoes';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import EsqueceuSenha from './components/EsqueceuSenha';

const secretariasPadrao = [
  {
    id: 1,
    nome: 'Secretaria de Obras e Viação',
    responsavel: 'Carlos Eduardo Oliveira',
    email: 'obras@sertao.rs.gov.br',
    telefone: '(54) 3345-1234',
    status: 'Ativo',
    equipe: [
      { nome: 'José Santos (Engenheiro)', telefone: '(54) 99912-3456' },
      { nome: 'Mariana Costa (Arquiteta)', telefone: '(54) 99876-5432' }
    ]
  },
  {
    id: 2,
    nome: 'Secretaria de Saúde',
    responsavel: 'Dra. Ana Maria Pereira',
    email: 'saude@sertao.rs.gov.br',
    telefone: '(54) 3345-5678',
    status: 'Ativo',
    equipe: [
      { nome: 'Maria Santos (Técnica)', telefone: '(54) 99811-2233' }
    ]
  },
  {
    id: 3,
    nome: 'Secretaria de Água e Saneamento',
    responsavel: 'Roberto Carlos Silva',
    email: 'agua@sertao.rs.gov.br',
    telefone: '(54) 3345-9012',
    status: 'Ativo',
    equipe: []
  }
];

export default function App() {
  const dadosPadrao = [
    {
      id: 'CH-2847',
      solicitante: 'Maria Aparecida S.',
      categoria: 'Iluminação Pública',
      bairro: 'Centro',
      status: 'Cancelado',
      data: '28/07/2026',
      dataAbertura: '28/07/2026',
      ultimaModificacao: '28/07/2026 às 16:40'
    },
    {
      id: 'CH-2846',
      solicitante: 'João Carlos M.',
      categoria: 'Pavimentação',
      bairro: 'Jardim América',
      status: 'Em andamento',
      data: '28/07/2026',
      dataAbertura: '28/07/2026',
      ultimaModificacao: '28/07/2026 às 14:15'
    },
    {
      id: 'CH-2845',
      solicitante: 'Ana Paula R.',
      categoria: 'Limpeza Urbana',
      bairro: 'Vila Nova',
      status: 'Concluído',
      data: '27/07/2026',
      dataAbertura: '27/07/2026',
      ultimaModificacao: '28/07/2026 às 11:20'
    },
    {
      id: 'CH-2844',
      solicitante: 'Roberto F.',
      categoria: 'Água e Esgoto',
      bairro: 'São João',
      status: 'Pendente',
      data: '27/07/2026',
      dataAbertura: '27/07/2026',
      ultimaModificacao: '27/07/2026 às 09:05'
    },
    {
      id: 'CH-2843',
      solicitante: 'Claudia B.',
      categoria: 'Poda de Árvores',
      bairro: 'Centro',
      status: 'Em andamento',
      data: '26/07/2026',
      dataAbertura: '26/07/2026',
      ultimaModificacao: '27/07/2026 às 17:30'
    }
  ];

  const [autenticado, setAutenticado] = useState(false);
  const [telaAuth, setTelaAuth] = useState('login');
  const [activePage, setActivePage] = useState('dashboard');
  const [chamados, setChamados] = useState(dadosPadrao);
  const [secretarias, setSecretarias] = useState(secretariasPadrao);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [usuario, setUsuario] = useState({
    nome: 'Administrador do Sistema',
    email: 'admin@sertao.rs.gov.br',
    cargo: 'Gestor de Atendimento',
    departamento: 'Secretaria de Administração'
  });

  const handleLogin = (dadosUsuario) => {
    if (dadosUsuario) setUsuario(dadosUsuario);
    setAutenticado(true);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setAutenticado(false);
    setTelaAuth('login');
  };

  const handleSelectChamado = (chamado) => {
    setChamadoSelecionado(chamado);
    setActivePage('chamado-detalhes');
  };

  const alterarStatusChamado = (id, novoStatus) => {
    const agora = new Date();
    const ultimaModificacao =
      `${agora.toLocaleDateString('pt-BR')} às ` +
      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setChamados((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: novoStatus, ultimaModificacao } : c
      )
    );
  };

  const encaminharChamado = (id, secretaria) => {
    const agora = new Date();
    const dataHora =
      `${agora.toLocaleDateString('pt-BR')} às ` +
      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setChamados((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const registro = {
          de: c.departamento || null,
          para: secretaria.nome,
          por: usuario.nome,
          dataHora
        };
        return {
          ...c,
          departamento: secretaria.nome,
          ultimaModificacao: dataHora,
          encaminhamentos: [...(c.encaminhamentos || []), registro]
        };
      })
    );
  };

  const chamadoAtual = chamadoSelecionado
    ? {
        ...chamadoSelecionado,
        ...(chamados.find((c) => c.id === chamadoSelecionado.id) || {})
      }
    : null;

  if (!autenticado) {
    if (telaAuth === 'cadastro') {
      return (
        <Cadastro
          onLogin={handleLogin}
          onGoToLogin={() => setTelaAuth('login')}
        />
      );
    }
    if (telaAuth === 'esqueceu-senha') {
      return (
        <EsqueceuSenha
          onGoToLogin={() => setTelaAuth('login')}
          onBackToLogin={() => setTelaAuth('login')}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onGoToCadastro={() => setTelaAuth('cadastro')}
        onGoToEsqueceuSenha={() => setTelaAuth('esqueceu-senha')}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />

      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          usuario={usuario}
        />

        <main className="flex-1 min-w-0">
          {activePage === 'dashboard' && (
            <Dashboard
              chamados={chamados}
              onSelectChamado={handleSelectChamado}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'chamados' && (
            <Chamados
              chamados={chamados}
              setChamados={setChamados}
              onAlterarStatus={alterarStatusChamado}
              onSelectChamado={handleSelectChamado}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'chamado-detalhes' && (
            <ChamadoDetalhes
              chamado={chamadoAtual}
              onAlterarStatus={alterarStatusChamado}
              secretarias={secretarias}
              onEncaminhar={encaminharChamado}
              onBack={() => setActivePage('chamados')}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'kanban' && (
            <Kanban
              chamados={chamados}
              setChamados={setChamados}
              onSelectChamado={handleSelectChamado}
            />
          )}

          {activePage === 'secretarias' && (
            <Secretarias secretarias={secretarias} setSecretarias={setSecretarias} />
          )}

          {activePage === 'relatorios' && <Relatorios chamados={chamados} />}

          {activePage === 'configuracoes' && <Configuracoes />}

          {activePage === 'novo-chamado' && (
            <NovoChamado setActivePage={setActivePage} />
          )}

          {activePage === 'notificacoes' && (
            <HistoricoNotificacoes
              setActivePage={setActivePage}
              onBack={() => setActivePage('dashboard')}
            />
          )}
        </main>
      </div>
    </div>
  );
}