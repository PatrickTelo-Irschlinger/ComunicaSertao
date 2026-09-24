import React from 'react';
import { 
  Building2, Search, Plus, MoreVertical, 
  Users, Ticket, Mail, Phone, MapPin 
} from 'lucide-react';

export default function Secretarias() {
  // Simulação de dados das secretarias/departamentos
  const secretarias = [
    {
      id: 1,
      nome: 'Secretaria de Obras e Viação',
      responsavel: 'Carlos Mendonça',
      email: 'obras@sertao.rs.gov.br',
      telefone: '(54) 3345-1001',
      endereco: 'Rua Principal, 123 - Centro',
      chamadosAbertos: 145,
      membrosEquipa: 32,
      corBg: 'bg-blue-50',
      corIcon: 'text-blue-600'
    },
    {
      id: 2,
      nome: 'Secretaria do Meio Ambiente',
      responsavel: 'Luciana Alves',
      email: 'meioambiente@sertao.rs.gov.br',
      telefone: '(54) 3345-1002',
      endereco: 'Av. das Árvores, 45 - Bosque',
      chamadosAbertos: 89,
      membrosEquipa: 18,
      corBg: 'bg-green-50',
      corIcon: 'text-green-600'
    },
    {
      id: 3,
      nome: 'Secretaria de Água e Saneamento',
      responsavel: 'Marcos Ribeiro',
      email: 'saneamento@sertao.rs.gov.br',
      telefone: '(54) 3345-1003',
      endereco: 'Rua das Águas, 789 - Distrito Industrial',
      chamadosAbertos: 56,
      membrosEquipa: 24,
      corBg: 'bg-cyan-50',
      corIcon: 'text-cyan-600'
    },
    {
      id: 4,
      nome: 'Secretaria de Saúde',
      responsavel: 'Dra. Helena Costa',
      email: 'saude@sertao.rs.gov.br',
      telefone: '(54) 3345-1004',
      endereco: 'Rua do Hospital, 10 - Centro',
      chamadosAbertos: 12,
      membrosEquipa: 85,
      corBg: 'bg-red-50',
      corIcon: 'text-red-600'
    }
  ];

  return (
    <div className="p-8 space-y-6">
      
      {/* Barra de Topo: Pesquisa e Ação */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Pesquisar por secretaria ou responsável..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} /> Nova Secretaria
        </button>
      </div>

      {/* Grelha de Cartões das Secretarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {secretarias.map((sec) => (
          <div key={sec.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            
            {/* Cabeçalho do Cartão */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${sec.corBg} ${sec.corIcon}`}>
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{sec.nome}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Resp: <span className="font-medium text-slate-700">{sec.responsavel}</span></p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-50 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Corpo do Cartão (Contactos) */}
            <div className="p-5 space-y-3 flex-1 bg-slate-50/50">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={16} className="text-slate-400" />
                <a href={`mailto:${sec.email}`} className="hover:text-blue-600 transition-colors">{sec.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={16} className="text-slate-400" />
                <span>{sec.telefone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin size={16} className="text-slate-400" />
                <span className="truncate" title={sec.endereco}>{sec.endereco}</span>
              </div>
            </div>

            {/* Rodapé do Cartão (Estatísticas) */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50 text-yellow-600">
                  <Ticket size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Chamados Abertos</p>
                  <p className="text-sm font-bold text-slate-900">{sec.chamadosAbertos}</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-slate-200"></div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Equipa</p>
                  <p className="text-sm font-bold text-slate-900">{sec.membrosEquipa} func.</p>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}