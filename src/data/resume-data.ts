export const RESUME_DATA = {
  name: 'Martin Miglio',
  initials: 'MM',
  location: 'Michigan, USA',
  locationLink: 'https://www.google.com/maps/place/Michigan,+USA/',
  about:
    'Full-stack software developer with a knack for crafting web applications from the ground, up.',
  summary:
    'With experience in both front-end and back-end development, I have a passion for creating web applications that are both functional and beautiful. I am a quick learner and am always looking to expand my knowledge and skillset. Being familiar with multiple tech stacks, I am able to adapt to any project and work with any team.',
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
      company: 'I Play Texas',
      link: 'https://opencorporates.com/companies/us_tx/0801291571',
      badges: [],
      title: 'Full Stack Developer',
      start: 'April 2019',
      end: 'December 2019',
      description:
        'Worked in Full Stack .Net development, focusing primarily on WPF, WCF, IIS, and MSSQL technologies. I also venture into Xamarin, PHP, JavaScript and HTML when integrating my software into web or Android. I use these technologies to develop for physical and web-based slot machines and related applications.'
    },
    {
      company: 'GroupGolfer.com',
      link: 'https://GroupGolfer.com',
      badges: [],
      title: 'Software Developer Intern',
      start: 'October 2018',
      end: 'January 2019',
      description:
        'Developed in various languages for different tasks to improve company efficiency. Included software development with Geospatial Information Systems, Python, MySQL, PGSQL, and website development in WordPress.Developed '
    },
    {
      company: 'Integrated System Specialists',
      link: 'https://www.isysp.net/',
      badges: [],
      title: 'Information Technology Specialist',
      start: 'April 2016',
      end: 'August 2017',
      description:
        'Worked in network infrastructure implementation, including the planning and installation of various networking technologies in settings such as offices, schools, and township buildings.'
    }
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'React',
    'Next.js',
    'Vue.js',
    'Python',
    'C# .NET',
    'SQL',
    'Docker',
    'AWS',
    'GCP',
    'Rest API',
    'GraphQL'
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
      techStack: ['Side Project', 'TypeScript', 'Next.js', 'Rest API', 'AWS'],
      description: 'A platform to track TicketMaster ticket prices over time',
      link: {
        label: 'tixtrend.martinmiglio.dev',
        href: 'https://tixtrend.martinmiglio.dev/'
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
    },
    {
      title: 'martinmiglio.dev',
      techStack: ['Side Project', 'Vue.js', 'AWS'],
      description: 'My personal website. Built with Vue.js and TypeScript hosted on AWS',
      link: {
        label: 'martinmiglio.dev',
        href: 'https://martinmiglio.dev/'
      }
    },
    {
      title: 'BYO Photo Blog',
      techStack: ['Side Project', 'Next.js', 'AWS'],
      description: 'A self-hosted photo blog. Built with Next.js and TypeScript on AWS',
      link: {
        label: 'blogdemo.martinmiglio.dev',
        href: 'https://blogdemo.martinmiglio.dev/'
      }
    }
  ]
} as const
