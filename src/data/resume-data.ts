export const RESUME_DATA = {
  name: 'Martin Miglio',
  initials: 'MM',
  location: 'Michigan, USA',
  locationLink: 'https://www.google.com/maps/place/Michigan,+USA/',
  about:
    'Full-stack software developer with a knack for crafting web applications from the ground, up.',
  summary:
    'Frontend-leaning product engineer in React and TypeScript who owns features end-to-end, from scoping and design decisions through ship. Comfortable across the full stack and fluent in AI-assisted development.',
  personalWebsiteUrl: 'https://martinmiglio.dev',
  education: [
    {
      school: 'Kettering University',
      degree: "Bachelor's Degree in Computer Science",
      start: '2018',
      end: '2023'
    }
  ],
  work: [
    {
      company: 'Vitable Health',
      link: 'https://vitablehealth.com/',
      badges: ['Full-time'],
      title: 'Product Engineer',
      start: 'April 2025',
      end: 'Present',
      description:
        "Designed and shipped the ICHRA Quoting Tool, a self-serve product used by 45 brokers and employers across 900 sessions, 34K employees, and 6.3M plans. Collapsed industry-standard 1–3 week quote turnarounds to under a minute and cut the revenue team's SLA from 72 hours to under 3. Built an LLM-driven plan recommender in the member enrollment flow; 4.79 CSAT, +8% enrollment, and meaningfully faster time-to-complete. Drove team adoption of Claude Code and MCP; built review and ticket-handling workflows now standard across engineering."
    },
    {
      company: 'Revv',
      link: 'https://revvhq.com/',
      badges: ['Contract'],
      title: 'Web Developer - Marketing',
      start: 'October 2024',
      end: 'July 2025',
      description:
        'Lifted funnel conversion by shipping A/B-tested landing pages and funnel improvements in React and Next.js. Connected siloed marketing and growth tools into a single pipeline, eliminating manual handoffs and surfacing data the team had been flying blind on.'
    },
    {
      company: 'Independent / Freelance',
      link: 'https://www.martinmiglio.dev/',
      badges: ['Freelance'],
      title: 'Software Engineering Consultant',
      start: 'January 2025',
      end: 'July 2025',
      description:
        'Lead engineer and technical partner to an early-stage founder. Shipped concept-to-MVP on time across AWS, Hono, and a Tauri + React app for web and mobile; ran market validation that produced a decisive no-go and closed the engagement cleanly.'
    },
    {
      company: 'I Play Texas',
      link: 'https://opencorporates.com/companies/us_tx/0801291571',
      badges: ['Internship'],
      title: 'Full Stack Developer',
      start: 'April 2019',
      end: 'December 2019',
      description:
        'Built and sold a casino floor management system with visual analytics for slot performance, hot/cold zones, and revenue; shipped supporting slot machine software and mobile product demos across WPF, MSSQL, and Xamarin.'
    }
  ],
  skills: [
    'TypeScript',
    'JavaScript',
    'Python',
    'SQL',
    'React',
    'Next.js',
    'Node.js',
    'Vue.js',
    'Django',
    'AWS',
    'GCP',
    'Docker',
    'PostgreSQL',
    'REST',
    'GraphQL',
    'Claude Code',
    'MCP',
    'LLM Tooling',
    'Agentic Development'
  ],
  projects: [
    {
      title: 'sample.fit',
      techStack: ['Side Project', 'Docker', 'TypeScript', 'Next.js', 'Python'],
      description:
        'A service to help indie music producers explore their sample library with machine learning',
      link: {
        label: 'sample.fit',
        href: 'https://sample.fit/'
      }
    },
    {
      title: 'TixTrend',
      techStack: ['Side Project', 'TypeScript', 'Next.js', 'REST', 'AWS'],
      description: 'A platform to track TicketMaster ticket prices over time',
      link: {
        label: 'tixtrend.martinmiglio.dev',
        href: 'https://tixtrend.martinmiglio.dev/'
      }
    },
    {
      title: 'brasa',
      techStack: ['Open Source', 'Python', 'MicroPython', 'CLI'],
      description:
        'MicroPython developer tooling; flash, deploy, watch, and monitor embedded devices from a single CLI',
      link: {
        label: 'brasa on GitHub',
        href: 'https://github.com/martinmiglio/brasa'
      }
    },
    {
      title: 'tarkov-mcp',
      techStack: ['Open Source', 'Python', 'MCP', 'LLM Tooling'],
      description:
        'A Model Context Protocol server exposing Escape from Tarkov game data (items, markets, maps, quests) for LLM agents',
      link: {
        label: 'tarkov-mcp on GitHub',
        href: 'https://github.com/martinmiglio/tarkov-mcp'
      }
    },
    {
      title: 'pymemuc',
      techStack: ['Open Source', 'Python', 'API'],
      description: 'A Python API for MEmu Android Emulator',
      link: {
        label: 'pymemuc on GitHub',
        href: 'https://github.com/pyclashbot/pymemuc'
      }
    }
  ]
} as const
