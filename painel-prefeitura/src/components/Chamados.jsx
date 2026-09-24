import React from 'react';
import { Search, Filter, MoreHorizontal, Eye } from 'lucide-react';

export default function Chamados() {
  const listaChamados = [
    { id: 'CH-2847', cidadao: 'Maria Aparecida S.', categoria: 'Iluminação Pública', local: 'Centro', status: 'Aberto', data: '28/07/2026', cor: 'bg-yellow-100 text-yellow-700' },
    { id: 'CH-2846', cidadao: 'João Carlos M.', categoria: 'Pavimentação', local: 'Jardim América', status: 'Em andamento', data: '28/07/2026', cor: 'bg-blue-100 text-blue-700' },
    { id: 'CH-2845', cidadao: 'Ana Paula R.', categoria: 'Limpeza Urbana', local: 'Vila Nova', status: 'Concluído', data: '27/07/2026', cor: 'bg-green-100 text-green-700' },
    { id: 'CH-2844', cidadao: 'Roberto F.', categoria: 'Água e Esgoto', local: 'São João', status: 'Aberto', data: '27/07/2026', cor: 'bg-yellow-100 text-yellow-700' },
    { id: 'CH-2843', cidadao: 'Claudia B.', categoria: 'Poda de Árvores', local: 'Centro', status: 'Em andamento', data: '26/07/2026', cor: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="p-8">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Barra de Pesquisa e Filtros */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar por ID, Cidadão ou Local..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filtros
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Solicitante</th>
                <th className="px-6 py-4">Categoria / Local</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Data Abertura</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listaChamados.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.id}</td>
                  <td className="px-6 py-4">{item.cidadao}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-700">{item.categoria}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.local}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${item.cor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{item.data}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação Básica */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <span>A mostrar 1 a 5 de 1.586 chamados</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">3</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">Seguinte</button>
          </div>
        </div>
      </div>
    </div>
  );
}