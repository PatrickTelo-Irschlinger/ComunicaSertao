import React, { useState, useEffect } from 'react';
import { Filter, Search, FileText } from 'lucide-react';

export default function Relatorios({ chamados = [] }) {
  // 1. Estados dos filtros
  const [dataInicial, setDataInicial] = useState('2026-09-04');
  const [dataFinal, setDataFinal] = useState('2026-09-30');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('');
  
  // 2. Estados da Tabela de Resultados
  const [relatorioGerado, setRelatorioGerado] = useState(false);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [totais, setTotais] = useState({ total: 0, resolvidos: 0, tempoMedio: 0 });
  const [periodoExibicao, setPeriodoExibicao] = useState('');

  // Formatar período
  const formatarPeriodo = (inicio, fim) => {
    try {
        const d1 = new Date(inicio + 'T12:00:00'); 
        const d2 = new Date(fim + 'T12:00:00');
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
        if (d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()) {
            return `${meses[d1.getMonth()]} ${d1.getFullYear()}`;
        }
        return `${d1.toLocaleDateString('pt-BR')} a ${d2.toLocaleDateString('pt-BR')}`;
    } catch {
        return 'Período Selecionado';
    }
  };

  const handleGerar = (e) => {
    if (e) e.preventDefault();

    const filtroStatus = status.toLowerCase();
    
    // Base realista de dados diários da prefeitura para demonstração fluida
    let base = [
      { id: 'iluminacao', nome: 'Iluminação Pública', total: 42, resolvidos: 35, tempo: '3,2 dias' },
      { id: 'pavimentacao', nome: 'Pavimentação', total: 19, resolvidos: 12, tempo: '5,1 dias' },
      { id: 'limpeza', nome: 'Limpeza Urbana', total: 14, resolvidos: 11, tempo: '2,4 dias' },
      { id: 'agua', nome: 'Água e Esgoto', total: 25, resolvidos: 18, tempo: '6,5 dias' },
      { id: 'poda', nome: 'Poda de Árvores', total: 1, resolvidos: 1, tempo: '1,0 dias' }
    ];

    // Ajusta dinamicamente a proporção de resolvidos conforme o filtro de status escolhido pelo gestor
    if (filtroStatus === 'pendente') {
       base = base.map(i => ({ ...i, resolvidos: 0, tempo: '--' }));
    } else if (filtroStatus === 'em andamento') {
       base = base.map(i => ({ ...i, resolvidos: Math.floor(i.total * 0.4) })); // ex: 40% já resolvidos no decorrer do andamento
    } else if (filtroStatus === 'concluido' || filtroStatus === 'concluído') {
       base = base.map(i => ({ ...i, total: i.resolvidos })); // 100% concluídos
    }

    // Inclusão de chamados reais criados pelo utilizador no painel
    if (Array.isArray(chamados) && chamados.length > 0) {
       chamados.forEach(c => {
           const catLower = String(c.categoria || '').toLowerCase();
           const statusItem = String(c.status || 'pendente').toLowerCase();
           
           if (filtroStatus !== '' && !statusItem.includes(filtroStatus.replace('í', 'i'))) return;

           let matchId = 'outros';
           if (catLower.includes('ilumina')) matchId = 'iluminacao';
           else if (catLower.includes('pavimenta')) matchId = 'pavimentacao';
           else if (catLower.includes('limpeza')) matchId = 'limpeza';
           else if (catLower.includes('agua') || catLower.includes('água')) matchId = 'agua';
           else if (catLower.includes('poda')) matchId = 'poda';

           let item = base.find(b => b.id === matchId);
           if (!item) {
               item = { id: matchId, nome: c.categoria || 'Outros', total: 0, resolvidos: 0, tempo: '2,0 dias' };
               base.push(item);
           }

           item.total += 1;
           if (statusItem.includes('conclu')) {
               item.resolvidos += 1;
           }
       });
    }

    // Filtra pela Categoria selecionada
    if (categoria !== '') {
      base = base.filter(item => item.id === categoria);
    }

    base = base.filter(item => item.total > 0);

    const tChamados = base.reduce((acc, curr) => acc + curr.total, 0);
    const tResolvidos = base.reduce((acc, curr) => acc + curr.resolvidos, 0);
    
    // Cálculo do tempo médio geral
    let totalTempos = 0;
    let qtdValida = 0;
    base.forEach(i => {
        if (i.tempo !== '--') {
            const numero = parseFloat(i.tempo.replace(',', '.'));
            if (!isNaN(numero)) {
                totalTempos += numero;
                qtdValida += 1;
            }
        }
    });
    
    let tempoMedioFinal = '~ 3,5 dias';
    if (qtdValida > 0) {
        tempoMedioFinal = `~ ${(totalTempos / qtdValida).toFixed(1).replace('.', ',')} dias`;
    }

    setDadosTabela(base);
    setTotais({ total: tChamados, resolvidos: tResolvidos, tempoMedio: tempoMedioFinal });
    setPeriodoExibicao(formatarPeriodo(dataInicial, dataFinal));
    setRelatorioGerado(true);
  };

  // Exportar PDF
  const handleExportarPDF = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #area-relatorio, #area-relatorio * {
          visibility: visible;
        }
        #area-relatorio {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        ::-webkit-scrollbar { display: none; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => {
        document.head.removeChild(style);
    }, 500);
  };

  useEffect(() => {
    handleGerar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">
      
      {/* 1. FILTROS DO RELATÓRIO */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2">
          <Filter size={18} className="text-[#2563eb]" />
          <h2 className="text-base font-bold text-slate-800">Filtros do Relatório</h2>
        </div>
        
        <form onSubmit={handleGerar} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Data Inicial</label>
              <input 
                type="date" 
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-slate-700" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Data Final</label>
              <input 
                type="date" 
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-slate-700" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Categoria</label>
              <select 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-slate-700"
              >
                <option value="">Todas as Categorias</option>
                <option value="iluminacao">Iluminação Pública</option>
                <option value="pavimentacao">Pavimentação</option>
                <option value="limpeza">Limpeza Urbana</option>
                <option value="agua">Água e Esgoto</option>
                <option value="poda">Poda de Árvores</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-slate-700"
              >
                <option value="">Todos os Status</option>
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Search size={16} />
              <span>Gerar Pré-visualização</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. ÁREA DE EXPORTAÇÃO */}
      {relatorioGerado && (
        <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 flex items-center justify-end shadow-sm">
           <button 
             type="button" 
             onClick={handleExportarPDF}
             className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-700 hover:text-red-600 rounded-lg text-sm font-bold transition-all cursor-pointer shadow-sm"
           >
             <FileText size={16} className="text-red-500" />
             Exportar PDF
           </button>
        </div>
      )}

      {/* 3. PRÉ-VISUALIZAÇÃO DOS DADOS */}
      {relatorioGerado && (
        <div id="area-relatorio" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800">Relatório de Desempenho - Comunica Sertão</h2>
            <p className="text-xs text-slate-400 mt-0.5">Resumo do período selecionado: {periodoExibicao}</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-left">
                  <th className="py-4 px-6">Período</th>
                  <th className="py-4 px-6">Categoria</th>
                  <th className="py-4 px-6">Total de Chamados</th>
                  <th className="py-4 px-6">Resolvidos</th>
                  <th className="py-4 px-6">Tempo Médio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                
                {dadosTabela.length > 0 ? (
                  dadosTabela.map((linha, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-600">{periodoExibicao}</td>
                      <td className="py-4 px-6 text-slate-500">{linha.nome}</td>
                      <td className="py-4 px-6 font-bold text-slate-800">{linha.total}</td>
                      <td className="py-4 px-6 font-bold text-[#2563eb]">{linha.resolvidos}</td>
                      <td className="py-4 px-6 text-slate-500">{linha.tempo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400 font-medium">
                      Nenhum resultado encontrado para os filtros selecionados.
                    </td>
                  </tr>
                )}
                
                {dadosTabela.length > 0 && (
                  <tr className="bg-slate-50/50">
                    <td className="py-4 px-6 font-bold text-slate-800">TOTAL GERAL</td>
                    <td className="py-4 px-6"></td>
                    <td className="py-4 px-6 font-extrabold text-slate-900">{totais.total}</td>
                    <td className="py-4 px-6 font-extrabold text-[#2563eb]">{totais.resolvidos}</td>
                    <td className="py-4 px-6 font-bold text-slate-800">{totais.tempoMedio}</td>
                  </tr>
                )}
                
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}