import React, { useState } from "react";

import './CallSync.css';
import { ClockIcon, PhoneArrowUpRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

//nota p mim, isso eh so p apresentacao e n tem iuntegracao nenhuma c backend qe farreii de python!!

// array de chamadas iniciais (exemplo)
const INITIAL_CALLS = [
    {
        id: 1,
        number: '(21) 99233-1093',
        datetime: '2025-12-08T10:00',
        type: 'Lembrete de consulta',
        status: 'Agendada'
    },
    {
        id: 2,
        number: '(00) 4002-8922',
        datetime: '2025-12-08T10:00',
        type: 'Confirmação de envio de PlayStation 2',
        status: 'Concluída'
    }
];

// componente principal
const App = () => {
    // Inicializa o estado com a lista de chamadas fixas e com strings vazias CORRIGIDAS
    const [scheduledCalls, setScheduledCalls] = useState(INITIAL_CALLS);
    const [newCall, setNewCall] = useState({ number: "", datetime: "", type: 'Lembrete' });

    // Função de mudança CORRIGIDA
    const handleChange = (e) => {
        setNewCall({
            ...newCall,
            [e.target.name]: e.target.value,
        });
    };

    // Função simples pro front: add a chamada à lista local
    const handleSchedule = (e) => {
        e.preventDefault();

        // Cria o novo obj de chamada
        const callData = {
            ...newCall,
            // Lógica de ID corrigida (usa o tamanho do array)
            id: scheduledCalls.length + 1, 
            status: 'Agendada',
            createdAt: new Date().toISOString(),
        };

        // Add nova chamada ao array local, atualizando a tela
        setScheduledCalls([callData, ...scheduledCalls]);

        // Limpa o form
        setNewCall({ number: "", datetime: "", type: 'Lembrete' });

        // Exibe feedback p apresentacao
        alert(`Chamada para ${callData.number} agendada na lista! (Apenas visual)`);
    };

    return (
        <div className="app-container">

            {/* header da gata */}
            <header className="header-main">
                <div className="header-logo">
                    CallSync
                </div>
                <div className="header-slogan">
                    suas ligações automáticas!
                </div>
            </header>

            <main className="main-container">

                {/* agendamentos e Planos */}
                <div className="column-left">
                    <section className="card card-schedule">
                        <h2 className="card-title">
                            <PhoneArrowUpRightIcon style={{ width: '28px', height: '28px', marginRight: '12px', color: '#4f46e5' }} />
                            programar nova chamada
                        </h2>

                        <form onSubmit={handleSchedule} className="form-space">
                            <div className="form-group">
                                <label htmlFor="number" className="form-label">número de telefone</label>
                                <input
                                    type="tel"
                                    id="number"
                                    name="number"
                                    value={newCall.number}
                                    onChange={handleChange}
                                    placeholder="(XX) XXXXX-XXXX"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label htmlFor="datetime" className="form-label">data e hora</label>
                                    <input 
                                        type="datetime-local"
                                        id="datetime"
                                        name="datetime"
                                        value={newCall.datetime}
                                        onChange={handleChange} // <-- Adicionado o onChange
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div> {/* div de motivo da chamada */}
                                    <label htmlFor="type" className="form-label">motivo da chamada</label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={newCall.type}
                                        onChange={handleChange}
                                        className="form-input form-select"
                                    >
                                        <option value="Lembrete">Lembrete de compromisso</option>
                                        <option value="Pesquisa">Pesquisa de satisfação</option>
                                        <option value="Agente">Conexão com agente</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button type="submit" className="form-button">
                                agendar chamada
                            </button>
                        </form>
                    </section>
                    
                    {/* seçao assinar plano */}
                    <section className="card card-plan" style={{ marginTop: '2.5rem', border: '1px solid #a5b4fc' }}>
                        <h2 className="card-title">
                            assine um plano e ganhe seu número virtual !
                        </h2>
                        <div style={{ backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #38bdf8' }}>
                             <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1d4ed8', marginBottom: '0.5rem' }}>Plano CallSync PRO</h3>
                             <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
                                receba um **número virtual** dedicado, 1000 minutos/mês e relatórios de sucesso.
                             </p>
                             <button
                                type="button"
                                className="form-button"
                                style={{ width: 'auto', backgroundColor: '#38bdf8' }}
                            >
                                ver detalhes e assinar
                            </button>
                        </div>
                    </section>
                </div>

                {/* Coluna Direita: chamadas Agendadas */}
                <div className="column-right">
                    <section className="card card-calls" style={{ height: '100%' }}>
                        <h2 className="card-title">
                             <ClockIcon style={{ width: '28px', height: '28px', marginRight: '12px', color: '#38bdf8' }} />
                            minhas chamadas agendadas
                        </h2>
                        
                        {scheduledCalls.length === 0 ? (
                            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Nenhuma chamada agendada. Comece a programar!</p>
                        ) : (
                            <div className="call-list-scroll">
                                {scheduledCalls.map((call) => (
                                    <div 
                                        key={call.id} 
                                        className={`call-list-item ${call.status === 'Agendada' ? 'call-list-item-agendada' : 'call-list-item-concluida'}`}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <p style={{ fontWeight: 700, color: '#1f2937', fontSize: '1.125rem' }}>{call.number}</p>
                                            <span 
                                                className={`call-status ${call.status === 'Agendada' ? 'status-agendada' : 'status-concluida'}`}
                                            >
                                                {call.status === 'Agendada' ? (
                                                     <ClockIcon style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                                                ) : (
                                                     <CheckCircleIcon style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                                                )}
                                                {call.status}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                                            <span style={{ fontWeight: 500 }}>Data/Hora:</span> {new Date(call.datetime).toLocaleString('pt-BR')}
                                        </p>
                                        <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                                            <span style={{ fontWeight: 500 }}>Tipo:</span> {call.type}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

            </main>

            {/* footerzin dos cria */}
            <footer className="footer-main">
                <div className="footer-content">
                    <p style={{ marginBottom: '0.5rem' }}>
                        &copy; 2025 CallSync. Sincronizando o futuro da comunicação automatizada.
                    </p>
                   <p>
                   Desenvolvido com &lt;3 por Marina Barberini (dev), Raquel Frota e Evelin Silva (marketing e design).
                   </p>
                </div>
            </footer>
        </div>
    );
};
//desista dos seus sonhos e morra
export default App;