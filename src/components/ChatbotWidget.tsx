import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Bot, Sparkles, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello! I'm Abdullah's AI Assistant. Select a question below to learn about his MERN stack experience, systems, or availability.`
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const quickPrompts = [
    'What is his tech stack?',
    'Tell me about his live projects',
    'What is his current industry job?',
    'How do I hire him?'
  ];

  const handleSendPrompt = (query: string) => {
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);

    // Generate intelligent response based on portfolio data and scroll to section
    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = '';

      if (q.includes('stack') || q.includes('skill') || q.includes('technology') || q.includes('tech')) {
        reply = `Abdullah specializes in the MERN Stack (MongoDB, Express.js, React.js, Node.js), TypeScript, REST APIs, POS & ERP Systems, JavaScript ES6+, HTML5/CSS3, and modern Git workflows.`;
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      } else if (q.includes('project') || q.includes('live') || q.includes('work') || q.includes('portfolio')) {
        reply = `Abdullah has engineered 4 major production platforms:\n• PharmaFlow ERP (Pharmacy Management & Live POS)\n• Elysia (Hotel Booking & Staff Operations ERP)\n• Ghalla Mandi POS (Grain Commodity Ledger ERP)\n• Fitzone Gym Hub (Fitness & Membership Portal).`;
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      } else if (q.includes('job') || q.includes('current') || q.includes('company') || q.includes('hat')) {
        reply = `Abdullah is currently employed as a Web Developer at HAT Tech Media in Multan, Pakistan, building POS interfaces, inventory management systems, and REST APIs.`;
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      } else if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone')) {
        reply = `You can connect with Abdullah directly:\n• Email: ${PERSONAL_INFO.email}\n• Phone/WhatsApp: ${PERSONAL_INFO.phone}\nHe is available for full-stack contracts, remote engineering roles, and custom POS/ERP builds!`;
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        reply = `Thanks for asking! Abdullah is a dedicated MERN Stack and Frontend Developer. Feel free to explore his projects below or reach out at ${PERSONAL_INFO.email} to collaborate!`;
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'bot', text: reply }
      ]);
    }, 350);
  };

  return (
    <>
      <button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Portfolio Assistant"
        title="Chat with AI Assistant"
      >
        {isOpen ? <X size={22} color="#1A1D24" /> : <MessageSquare size={22} color="#1A1D24" />}
      </button>

      {isOpen && (
        <div className="chatbot-drawer">
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              background: 'rgba(37, 42, 52, 0.98)',
              borderBottom: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E5B83B, #C99327)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(201, 147, 39, 0.35)'
                }}
              >
                <Bot size={17} color="#1A1D24" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>
                  Abdullah Assistant
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-emerald)',
                      display: 'inline-block',
                      boxShadow: '0 0 6px var(--accent-emerald)'
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-emerald)',
                      fontWeight: 600
                    }}
                  >
                    Online
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages list */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius:
                    m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  background:
                    m.sender === 'user'
                      ? 'linear-gradient(135deg, #E5B83B, #C99327)'
                      : 'var(--bg-card)',
                  color: m.sender === 'user' ? '#1A1D24' : '#F8FAFC',
                  fontWeight: m.sender === 'user' ? 700 : 400,
                  fontSize: '0.84rem',
                  lineHeight: '1.5',
                  border:
                    m.sender === 'user' ? 'none' : '1px solid var(--border-glass)',
                  whiteSpace: 'pre-line',
                  boxShadow: m.sender === 'user' ? '0 4px 14px rgba(201, 147, 39, 0.25)' : 'none'
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Question Actions Column (No search bar, no horizontal scrollbar) */}
          <div
            style={{
              padding: '12px 14px',
              borderTop: '1px solid var(--border-glass)',
              background: 'rgba(30, 34, 42, 0.98)',
              display: 'flex',
              flexDirection: 'column',
              gap: '7px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <Sparkles size={12} color="var(--gold-bright)" />
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--gold-bright)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Ask Abdullah
              </span>
            </div>

            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendPrompt(prompt)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'rgba(45, 49, 58, 0.85)',
                  border: '1px solid rgba(106, 112, 124, 0.25)',
                  color: '#F8FAFC',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold-bright)';
                  e.currentTarget.style.color = 'var(--gold-bright)';
                  e.currentTarget.style.background = 'rgba(201, 147, 39, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(106, 112, 124, 0.25)';
                  e.currentTarget.style.color = '#F8FAFC';
                  e.currentTarget.style.background = 'rgba(45, 49, 58, 0.85)';
                }}
              >
                <span>{prompt}</span>
                <ChevronRight size={13} color="var(--gold-bright)" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
