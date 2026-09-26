import { Project, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Muhammad Abdullah',
  title: 'Frontend & MERN Stack Web Developer',
  email: 'letsmailabdullahcoder@gmail.com',
  phone: '+92 318 4477041',
  location: 'Multan, Pakistan (Global Remote)',
  github: 'https://github.com/lets-abdullah',
  linkedin: 'https://www.linkedin.com/in/muhammad-abdullah-96aa55427/',
  specialization: 'Full-Stack MERN & Systems Architecture',
  company: 'HAT Tech Media',
  resumeUrl: '/Muhammad_Abdullah_Resume.pdf',
  status: 'Open for Projects & Contracts'
};

export const PROJECTS: Project[] = [
  {
    id: 'elysia-hotel',
    title: 'Elysia Hotel Booking',
    category: 'mern',
    description: 'Full-stack hotel reservation platform.',
    tags: ['MERN Stack', 'Hotel Website', 'React / Node', 'MongoDB', 'REST APIs'],
    image: '/screenshots/hotel.png',
    demoUrl: 'https://elysia-frontend-hotel.vercel.app/',
    repoUrl: 'https://github.com/lets-abdullah',
    featured: true
  },
    {
    id: 'elysia-hotel-erp',
    title: 'Elysia Hotel ERP',
    category: 'mern',
    description: 'Full-stack hotel ERP for room bookings, guest ledgers, and automated billing.',
    tags: ['Dashboard', 'Hotel ERP', 'React / Node', 'MongoDB', 'REST APIs'],
    image: '/screenshots/hotel erp.png',
    demoUrl: 'https://elysia-zeta-bice.vercel.app/',
    repoUrl: 'https://github.com/lets-abdullah',
    featured: true
  },
    {
    id: 'wedding',
    title: 'Royal Wedding',
    category: 'mern',
    description: 'Elegant Royal Wedding Invitation Website | Responsive design with a luxurious digital invitation experience.',
    tags: ['MERN Stack', 'Wedding Card', 'Typescript', 'REST APIs'],
    image: '/screenshots/Royal.png',
    demoUrl: 'https://royal-wedding-site.vercel.app/',
    repoUrl: 'https://github.com/lets-abdullah',
    featured: true
  },
  {
    id: 'ghalla-mandi-pos',
    title: 'Ghalla Mandi POS & Ledger',
    category: 'erp',
    description: 'Agricultural commodity trading POS and ledger ERP with real-time sales, commission logs, and khata management.',
    tags: ['MERN Stack', 'POS System', 'Inventory ERP', 'Express / Node'],
    image: '/screenshots/mandi.png',
    demoUrl: 'https://ghalla-mandi.vercel.app/',
    repoUrl: 'https://github.com/lets-abdullah',
    featured: false
  },
  {
    id: 'fitzone-gym',
    title: 'Fitzone Gym Hub',
    category: 'mern',
    description: 'High-performance membership portal and fitness tracker with dark-mode UI, MongoDB schemas, and JWT auth.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB' , 'Payment Integration' ],
    image: '/screenshots/Gym.png',
    demoUrl: 'https://fitzone-gym-knowledge-hub.vercel.app/',
    repoUrl: 'https://github.com/lets-abdullah',
    featured: false
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'hat-tech-media',
    period: 'JULY 2026 — PRESENT',
    role: 'Web Developer',
    company: 'HAT Tech Media',
    location: 'Multan, Pakistan',
    type: 'Full-time / On-site',
    description: 'Developing frontend interfaces and integrating REST APIs for enterprise POS and inventory management systems.',
    bullets: [
      'Built interactive inventory tables and checkout workflows using React.js and REST APIs.',
      'Created responsive dashboard views for multi-branch store operations and daily accounting summaries.',
      'Collaborated on database schemas with MongoDB and Express backend services.'
    ],
    tags: ['MERN Stack', 'POS Systems', 'REST APIs', 'React.js', 'Express.js'],
    isCurrent: true
  },
  {
    id: 'independent-engineering',
    period: '2025 — PRESENT',
    role: 'Full-Stack Developer',
    company: 'Independent Engineering',
    location: 'Remote',
    type: 'Freelance & Contract',
    description: 'Delivering production full-stack web applications and custom POS/ERP solutions for commercial clients.',
    bullets: [
      'Engineered custom ERP & POS applications (PharmaFlow, Elysia Hotel, Ghalla Mandi).',
      'Developed secure REST APIs with stateless JWT authentication and role-based access control.',
      'Configured CI/CD automated deployment pipelines on Vercel Edge and Railway cloud.'
    ],
    tags: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'TypeScript', 'Vercel']
  }
];

export const SKILL_METRICS = [
  { name: 'React.js & Frontend Engineering', level: 88 },
  { name: 'Node.js & Express.js REST APIs', level: 84 },
  { name: 'MongoDB & Database Architecture', level: 82 },
  { name: 'JavaScript ES6+ / TypeScript / CSS3', level: 92 },
  { name: 'Git, GitHub & Version Control', level: 86 },
  { name: 'POS & ERP Systems Logic', level: 85 }
];

export const TECH_MARQUEE_ROW_1 = [
  '⚡ React.js',
  '🚀 Node.js',
  '🛠️ Express.js',
  '🍃 MongoDB',
  '🌐 REST APIs',
  '✨ TypeScript',
  '🔥 JavaScript ES6+',
  '⚡ React.js',
  '🚀 Node.js',
  '🛠️ Express.js',
  '🍃 MongoDB'
];

export const TECH_MARQUEE_ROW_2 = [
  '💎 Modern CSS & Glassmorphism',
  '📦 POS & ERP Systems',
  '🔥 Vercel & Railway',
  '🛡️ Git & GitHub',
  '🤖 AI Engineering Workflows',
  '💎 Responsive Web Design',
  '📦 Inventory Analytics'
];
