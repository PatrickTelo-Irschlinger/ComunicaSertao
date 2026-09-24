import React from 'react';
import { Ticket, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { lineData, pieData, barData } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total de Chamados</h3>
            <Ticket size={16} className="text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">1.586</div>
          <div className="text-sm text-slate-500">+14% este mês</div>
          <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-full"></div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Em Andamento</h3>
            <div className="w-4 h-4 rounded-full border-2 border-yellow-500 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div></div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">253</div>
          <div className="text-sm text-slate-500">16% do total</div>
          <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 w-[16%]"></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Concluídos</h3>
            <div className="text-green-500">✓</div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">1.104</div>
          <div className="text-sm text-slate-500">Taxa: 69,6%</div>
          <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[69.6%]"></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tempo Médio</h3>
            <ArrowUpRight size={16} className="text-cyan-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">4,2 dias</div>
          <div className="text-sm text-slate-500">Meta: 5 dias ✓</div>
          <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 w-[80%]"></div>
          </div>
        </div>
      </div>

      {/* Gráficos Linha 1 */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Evolução Mensal de Chamados</h3>
              <p className="text-sm text-slate-500">Acompanhe o volume de solicitações ao longo do tempo.</p>
            </div>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white">
              <option>Jan - Jul, 2026</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="abertos" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="concluidos" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Distribuição por Status</h3>
            </div>
            <MoreHorizontal size={18} className="text-slate-400" />
          </div>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}