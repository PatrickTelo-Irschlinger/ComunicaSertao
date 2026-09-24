import React from 'react';
import { 
  Search, Filter, MoreHorizontal, UserCheck, 
  Users, UserPlus, Mail, Phone
} from 'lucide-react';

export default function Cidadaos() {
  // Simulação de dados dos cidadãos
  const listaCidadaos = [
    { id: '1', nome: 'Maria Aparecida da Silva', cpf: '***.456.789-**', email: 'maria.silva@email.com', telefone: '(54) 99988-7766', bairro: 'Centro', status: 'Ativo', dataCadastro: '12/01/2026' },
    { id: '2', nome: 'João Carlos Martins', cpf: '***.123.456-**', email: 'joao.martins@email.com', telefone: '(54) 98877-6655', bairro: 'Jardim América', status: 'Ativo', dataCadastro: '05/03/2026' },
    { id: '3', nome: 'Ana Paula Rodrigues', cpf: '***.987.654-**', email: 'ana.paula@email.com', telefone: '(54) 97766-5544', bairro: 'Vila Nova', status: 'Bloqueado', dataCadastro: '20/05/2026' },
    { id: '4', nome: 'Roberto Fernandes', cpf: '***.321.987-**', email: 'roberto.f@email.com', telefone: '(54) 96655-4433', bairro: 'São João', status: 'Ativo', dataCadastro: '15/07/2026' },
    { id: '5', nome: 'Claudia Barros', cpf: '***.654.321-**', email: 'claudia.barros@email.com', telefone: '(54) 95544-3322', bairro: 'Centro', status: 'Ativo', dataCadastro: '22/07/2026' },
  ];

  return (
    <div className="p-8 space-y-6">
      
      {/* Cartões de Resumo (KPIs) */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase">Total de Cidadãos</p>
            <h4 className="text-2xl font-bold text-slate-900">12.450</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase">Cadastros Ativos</p>
            <h4 className="text-2xl font-bold text-slate-900">11.890</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <UserPlus size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase">Novos este Mês</p>
            <h4 className="text-2xl font-bold text-slate-900">+142</h4>
          </div>
        </div>
      </div>

      {/* Tabela de Cidadãos */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Barra de Pesquisa e Filtros */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar por Nome, CPF ou Email..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={16} /> Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
              <UserPlus size={16} /> Novo Cadastro
            </button>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nome / CPF</th>
                <th className="px-6 py-4">Contactos</th>
                <th className="px-6 py-4">Bairro</th>
                <th className="px-6 py-4">Data Registo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listaCidadaos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{item.nome}</div>
                    <div className="text-xs text-slate-400 mt-0.5">CPF: {item.cpf}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={14} className="text-slate-400" /> {item.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 mt-1">
                      <Phone size={14} className="text-slate-400" /> {item.telefone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{item.bairro}</td>
                  <td className="px-6 py-4 text-slate-500">{item.dataCadastro}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                      item.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
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
          <span>A mostrar 1 a 5 de 12.450 cidadãos</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">3</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">...</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">Seguinte</button>
          </div>
        </div>
      </div>

    </div>
  );
}