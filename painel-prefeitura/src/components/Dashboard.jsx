import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar // Adicionadas as barras para o novo gráfico
} from 'recharts';
import { Ticket, Disc, Check, ArrowUpRight, MoreHorizontal, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  // Cores da Prefeitura
  const VERDE_MUSGO = '#4b5e28'; 
  const AZUL_ESCURO = '#1e3a8a'; 
  const AMARELO = '#f59e0b';     
  const VERMELHO = '#ef4444';    

  // Dados do Gráfico de Linhas
  const dataEvolucao = [
    { name: 'Jan', abertos: 140, concluidos: 100 },
    { name: 'Fev', abertos: 180, concluidos: 130 },
    { name: 'Mar', abertos: 170, concluidos: 120 },
    { name: 'Abr', abertos: 220, concluidos: 160 },
    { name: 'Mai', abertos: 250, concluidos: 150 },
    { name: 'Jun', abertos: 210, concluidos: 180 },
    { name: 'Jul', abertos: 260, concluidos: 195 },
  ];

  // Dados do Gráfico Circular
  const dataStatus = [
    { name: 'Concluídos', value: 1104, color: VERDE_MUSGO },
    { name: 'Em Andamento', value: 253, color: AZUL_ESCURO },
    { name: 'Pendentes', value: 187, color: AMARELO },
    { name: 'Cancelados', value: 42, color: VERMELHO },
  ];

  // NOVOS DADOS: Gráfico de Barras Horizontais (Categorias)
  const dataCategorias = [
    { name: 'Iluminação', value: 310 },
    { name: 'Pavimentação', value: 270 },
    { name: 'Limpeza', value: 240 },
    { name: 'Árvores', value: 190 },
    { name: 'Água/Esgoto', value: 170 },
    { name: 'Denúncias', value: 140 },
  ];

  // NOVOS DADOS: Lista de Chamados Recentes
  const chamadosRecentes = [
    { id: 'CH-2847', nome: 'Maria Aparecida S.', local: 'Iluminação Pública - Centro', status: 'Aberto', dotCor: 'bg-red-500', bgCor: 'bg-orange-50', textCor: 'text-orange-700', data: '28/07/2026' },
    { id: 'CH-2846', nome: 'João Carlos M.', local: 'Pavimentação - Jardim América', status: 'Em Andamento', dotCor: 'bg-yellow-500', bgCor: 'bg-yellow-50', textCor: 'text-yellow-700', data: '28/07/2026' },
    { id: 'CH-2845', nome: 'Ana Paula R.', local: 'Limpeza Urbana - Vila Nova', status: 'Concluído', dotCor: 'bg-green-500', bgCor: 'bg-green-50', textCor: 'text-green-700', data: '27/07/2026' },
    { id: 'CH-2844', nome: 'Roberto F.', local: 'Água e Esgoto - São João', status: 'Aberto', dotCor: 'bg-red-500', bgCor: 'bg-orange-50', textCor: 'text-orange-700', data: '27/07/2026' },
    { id: 'CH-2843', nome: 'Claudia B.', local: 'Poda de Árvore - Centro', status: 'Concluído', dotCor: 'bg-green-500', bgCor: 'bg-green-50', textCor: 'text-green-700', data: '26/07/2026' },
  ];

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-full pb-16">
      
      {/* ========================================== */}
      {/* 1. CARTÕES SUPERIORES (KPIs)                 */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Total de Chamados</p>
            <Ticket size={18} className="text-[#4b5e28]" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">1.586</h3>
          <p className="text-sm text-slate-500">+14% este mês</p>
          <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#4b5e28] rounded-t-md"></div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Em Andamento</p>
            <Disc size={18} className="text-[#1e3a8a]" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">253</h3>
          <p className="text-sm text-slate-500">16% do total</p>
          <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#1e3a8a] rounded-t-md"></div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Concluídos</p>
            <Check size={18} className="text-[#4b5e28]" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">1.104</h3>
          <p className="text-sm text-slate-500">Taxa: 69,6%</p>
          <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#4b5e28] rounded-t-md"></div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Tempo Médio</p>
            <ArrowUpRight size={18} className="text-cyan-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">4,2 dias</h3>
          <p className="text-sm text-slate-500">Meta: 5 dias ✓</p>
          <div className="absolute bottom-0 left-6 right-6 h-1 bg-cyan-500 rounded-t-md"></div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. LINHA DO MEIO (Evolução + Circular)       */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRÁFICO DE LINHAS */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Evolução Mensal de Chamados</h3>
              <p className="text-sm text-slate-500">Acompanhe o volume de solicitações ao longo do tempo.</p>
            </div>
            <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4b5e28] cursor-pointer hover:bg-slate-50">
              <option>Jan - Jul, 2026</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataEvolucao} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Line type="monotone" dataKey="abertos" name="Abertos" stroke={AZUL_ESCURO} strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: AZUL_ESCURO, strokeWidth: 2 }} activeDot={{ r: 6, fill: AZUL_ESCURO, stroke: '#fff' }} />
                <Line type="monotone" dataKey="concluidos" name="Concluídos" stroke={VERDE_MUSGO} strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: VERDE_MUSGO, strokeWidth: 2 }} activeDot={{ r: 6, fill: VERDE_MUSGO, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-start gap-8 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-[#1e3a8a]"></div>
              <span className="text-sm font-medium text-slate-500">Abertos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-[#4b5e28]"></div>
              <span className="text-sm font-medium text-slate-500">Concluídos</span>
            </div>
          </div>
        </div>

        {/* GRÁFICO CIRCULAR */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-slate-800">Distribuição por Status</h3>
          </div>
          
          <div className="h-[220px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataStatus} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none">
                  {dataStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ color: '#334155', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto pt-6 space-y-3">
            {dataStatus.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. LINHA INFERIOR (Categorias + Recentes)    */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRÁFICO DE BARRAS HORIZONTAIS */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Chamados por Categoria</h3>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCategorias} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="value" fill={VERDE_MUSGO} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LISTA DE CHAMADOS RECENTES */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Chamados Recentes</h3>
            <a href="#" className="text-sm font-semibold text-[#4b5e28] hover:text-[#3a4920] flex items-center gap-1 transition-colors">
              Ver todos <ArrowRight size={14} />
            </a>
          </div>
          
          <div className="flex-1 flex flex-col space-y-1">
            {chamadosRecentes.map((chamado, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 px-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                
                <div className="flex items-start gap-4">
                  <span className="text-xs font-semibold text-slate-400 mt-0.5 w-14 shrink-0">{chamado.id}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{chamado.nome}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{chamado.local}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${chamado.bgCor} ${chamado.textCor}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${chamado.dotCor}`}></div>
                    {chamado.status}
                  </div>
                  <span className="text-xs font-medium text-slate-400 w-16 text-right">{chamado.data}</span>
                </div>
                
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}