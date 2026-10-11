export const profile = {
  name: 'Vaibhav Ganjave',
  role: 'Full Stack Developer',
  company: 'Four Colours India Pvt. Ltd.',
  location: 'Pune, India',
  email: 'ganjavevaibhav1@gmail.com',
  phone: '+91 9370283002',
  github: 'https://github.com/Vaibhav-B-Ganjave',
  githubHandle: 'Vaibhav-B-Ganjave',
  linkedin: 'https://www.linkedin.com/in/vaibhav--ganjave',
  linkedinHandle: 'vaibhav--ganjave',
  website: 'https://vaibhav-ganjave-portfolio.vercel.app/',
  websiteHandle: 'vaibhav-ganjave-portfolio.vercel.app',
  careerStart: new Date(2023, 8, 1),
  // Drop your PDF into /public and set this to e.g. '/Vaibhav-Ganjave-Resume.pdf' to show a Résumé button.
  resumeUrl: '',
}

export function yearsOfExperience(now = new Date()) {
  const months = (now.getFullYear() - profile.careerStart.getFullYear()) * 12 + now.getMonth() - profile.careerStart.getMonth()
  return Math.max(1, Math.floor(months / 12))
}

export const sections = [
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export const sphereWords = [
  'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'MySQL', 'JavaScript', 'Java', 'Mendix', 'REST',
  'HTML5', 'CSS3', 'Spring', 'Hibernate', 'Git', 'VS Code', 'IntelliJ', 'JSX', 'Hooks', 'APIs',
  'ES6+', 'Compass', 'Eclipse', 'JSON', 'Vite', 'npm',
]

export const stack = [
  { group: 'Frontend', items: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Java'] },
  { group: 'Data', items: ['SQL', 'MySQL', 'MongoDB'] },
  { group: 'Low-code & frameworks', items: ['Mendix', 'Spring (basic)', 'Hibernate (basic)'] },
  { group: 'Tools', items: ['Git', 'VS Code', 'IntelliJ IDEA', 'Eclipse', 'MongoDB Compass'] },
]

export const projects = [
  {
    id: 'ebuddy',
    title: 'eBuddy',
    kind: 'AI chatbot platform',
    context: 'Internal tool · Four Colours',
    visual: 'chat',
    summary: 'A ChatGPT-style assistant built for internal company use, with a React front end designed to grow as more AI tools came on board.',
    points: [
      'Built the chat interface and its interactive React components for a smooth conversational experience.',
      'Laid out a scalable front-end architecture for AI-based communication tools.',
      'Integrated the React UI with SQL-backed services, with about 1.5 years of hands-on work on the product.',
    ],
    tech: ['React.js', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    id: 'appraisal',
    title: 'Automated Appraisal',
    kind: 'Workflow automation',
    context: 'Enterprise · Full stack',
    visual: 'flow',
    summary: 'An end-to-end system that automates the performance-review cycle, from self-assessment through manager review to final sign-off.',
    points: [
      'Owned both sides: the React UI and the Node/Express REST APIs behind it.',
      'Designed and managed the database schemas across SQL and MongoDB.',
      'Built the API layer that carries review data cleanly between front end and back end.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'SQL', 'MongoDB'],
  },
  {
    id: 'launcher',
    title: 'Launcher 2',
    kind: 'Low-code client apps',
    context: 'Client delivery · Mendix',
    visual: 'grid',
    summary: 'Low-code business applications for client teams, extended with custom Java modules wherever the platform needed more power.',
    points: [
      'Developed Mendix applications for client-side business requirements.',
      'Integrated custom Java modules into Mendix for functionality beyond the platform defaults.',
      'Worked with client teams on workflows, data models and back-end logic.',
    ],
    tech: ['Mendix', 'Java'],
  },
]

export const experience = {
  company: 'Four Colours India Pvt. Ltd.',
  role: 'Software Developer',
  period: 'Sep 2023 — Present',
  location: 'Pune, India',
  points: [
    'Design and build responsive UIs and integrate REST APIs across multiple enterprise applications.',
    'Deliver full-stack features with React.js, Node.js, SQL and MongoDB.',
    'Build low-code client solutions on Mendix, extended with Java integrations.',
    'Work across the whole lifecycle: requirements, design, coding, testing and deployment.',
    'Collaborate with cross-functional teams to ship scalable, maintainable software.',
  ],
}

export const education = [
  { title: 'B.E. Computer Engineering', place: 'Vidya Niketan College of Engineering, Sangamner · SPPU', year: '2021 — 2022', score: '8.78 CGPA' },
  { title: 'Higher Secondary (HSC)', place: 'Chandaneshwar Vidyalaya, Sangamner · Maharashtra Board', year: '2017 — 2018', score: '66.77%' },
  { title: 'Secondary School (SSC)', place: 'Chandaneshwar Vidyalaya, Sangamner · Maharashtra Board', year: '2015 — 2016', score: '86.80%' },
]

export const certifications = [
  { title: 'Full Stack Java Development', place: 'QSpiders, Hadapsar, Pune' },
  { title: 'Mendix: Low-code Application Development', place: 'Udemy' },
]

export const languages = [
  { name: 'Marathi', level: 'Native', value: 3 },
  { name: 'Hindi', level: 'Fluent', value: 3 },
  { name: 'English', level: 'Professional', value: 2 },
]
