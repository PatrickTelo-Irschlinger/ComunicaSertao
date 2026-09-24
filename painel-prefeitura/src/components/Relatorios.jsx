import React from 'react';
import { 
  FileText, Download, FileSpreadsheet, Calendar, 
  Filter, Search, ArrowRight 
} from 'lucide-react';

export default function Relatorios() {
  // Simulação de dados para a pré-visualização do relatório
  const relatorioPreview = [
    { mes: 'Julho 2026', categoria: 'Iluminação Pública', total: 145, resolvidos: 120, tempoMedio: '3,2 dias' },
    { mes: 'Julho 2026', categoria: 'Pavimentação', total: 98, resolvidos: 65, tempoMedio: '5,1 dias' },
    { mes: 'Julho 2026', categoria: 'Limpeza Urbana', total: 112, resolvidos: 105, tempoMedio: '2,4 dias' },
    { mes: 'Julho 2026', categoria: 'Água e Esgoto', total: 76, resolvidos: 40, tempoMedio: '6,5 dias' },
  ];

  return (
    <div className="p-8 space-y-6">
      
      {/* Área de Filtros e Geração */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          Filtros do Relatório
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Data Inicial</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="date" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Data Final</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="date" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Categoria</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Todas as Categorias</option>
              <option>Iluminação</option>
              <option>Pavimentação</option>
              <option>Limpeza</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Todos os Status</option>
              <option>Concluídos</option>
              <option>Em Andamento</option>
              <option>Abertos</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Search size={16} />
            Gerar Pré-visualização
          </button>
        </div>
      </div>

      {/* Opções de Exportação */}
      <div className="flex items-center justify-between bg-slate-100 p-4 rounded-xl border border-slate-200">
        <span className="text-sm font-medium text-slate-700">Relatório gerado com sucesso. Selecione o formato de exportação:</span>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <FileText size={16} className="text-red-500" />
            PDF
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <FileSpreadsheet size={16} className="text-green-600" />
            Excel
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} className="text-slate-500" />
            CSV
          </button>
        </div>
      </div>

      {/* Tabela de Pré-visualização */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Pré-visualização dos Dados</h3>
          <p className="text-sm text-slate-500 mt-1">Resumo do período selecionado.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Período</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Total de Chamados</th>
                <th className="px-6 py-4">Resolvidos</th>
                <th className="px-6 py-4">Tempo Médio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {relatorioPreview.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.mes}</td>
                  <td className="px-6 py-4">{item.categoria}</td>
                  <td className="px-6 py-4 font-semibold">{item.total}</td>
                  <td className="px-6 py-4 text-green-600 font-medium">{item.resolvidos}</td>
                  <td className="px-6 py-4 text-slate-500">{item.tempoMedio}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
              <tr>
                <td className="px-6 py-4" colSpan="2">TOTAL GERAL</td>
                <td className="px-6 py-4">431</td>
                <td className="px-6 py-4 text-green-600">330</td>
                <td className="px-6 py-4 text-slate-500">~ 4,3 dias</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
}