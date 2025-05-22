export const RESUME_DATA = {
  name: 'Martin Miglio',
  initials: 'MM',
  location: 'Michigan, USA',
  locationLink: 'https://www.google.com/maps/place/Michigan,+USA/',
  about:
    'Full-stack software developer with a knack for crafting web applications from the ground, up.',
  summary:
    'A versatile developer with a strong background in both web development and system integration, I specialize in building efficient, impactful solutions across diverse industries. My experience spans creating intuitive user interfaces, optimizing back-end systems, and developing tools that improve business operations. I thrive in dynamic environments, continually expanding my skills and adapting to new challenges. Passionate about delivering high-quality, user-centric products, I collaborate effectively with cross-functional teams to achieve project goals and drive business growth.',
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
      company: 'Vitable',
      link: 'https://vitablehealth.com/',
      badges: ['Contract'],
      title: 'Software Engineer',
      start: 'April 2025',
      end: 'Present',
      description: ''
    },
    {
      company: 'Revv ADAS',
      link: 'https://revvhq.com/',
      badges: ['Contract'],
      title: 'Web Developer - Marketing',
      start: 'October 2024',
      end: 'Present',
      description:
        'Supported growth-focused initiatives by blending software engineering best practices with marketing technology integration to achieve measurable business outcomes. Collaborated with marketing, SEO, and sales teams to develop and optimize solutions that enhanced lead generation, community engagement, and customer retention. Migrated and integrated CMS platforms to streamline content management workflows and improve scalability for marketing initiatives. Engineered and maintained integrations with CRM technologies, including Salesforce, to ensure seamless data synchronization and workflow automation. Developed a community-focused platform designed to foster interactive engagement and collaboration among users, driving brand advocacy and adoption of the company’s core technology products. Designed and deployed custom React components to streamline lead capture processes and optimize user interaction metrics across webinars, product demos, and marketing campaigns. Integrated and managed tools such as Marketo Engage, Chili Piper, Google Analytics, and Google Tag Manager to enable advanced user tracking, marketing attribution, and campaign performance optimization.'
    },
    {
      company: 'martinmiglio.dev',
      link: 'https://www.martinmiglio.dev/',
      badges: ['Freelance'],
      title: 'Digital Strategy Consultant',
      start: 'January 2024',
      end: 'Present',
      description: `Partner with early-stage tech startups to develop and implement comprehensive software products and digital strategies that drive growth.`
    },
    {
      company: 'I Play Texas',
      link: 'https://opencorporates.com/companies/us_tx/0801291571',
      badges: ['Internship'],
      title: 'Full Stack Developer',
      start: 'April 2019',
      end: 'December 2019',
      description:
        'Developed and maintained software for slot machines and related applications using WPF, WCF, IIS, and MSSQL. Designed internal tools to improve process efficiency, including a casino floor management system sold to a client, enabling graphical analysis of slot machine performance, hot/cold zones, and revenue metrics. Built mobile product demo apps with Xamarin and maintained web-based offerings using PHP and JavaScript.'
    },
    {
      company: 'GroupGolfer.com',
      link: 'https://GroupGolfer.com',
      badges: ['Internship'],
      title: 'Software Developer Intern',
      start: 'October 2018',
      end: 'January 2019',
      description:
        'Automated Geospatial Information Systems (GIS) tasks, generating marketing map imagery with Python and GIS database integrations. Managed GIS database operations and implementations, improving efficiency for marketing campaigns. Performed a successful website migration to WordPress, streamlining content management and hosting reliability.'
    },
    {
      company: 'Integrated System Specialists',
      link: 'https://www.isysp.net/',
      badges: [],
      title: 'Information Technology Specialist',
      start: 'April 2016',
      end: 'August 2017',
      description:
        'Implemented network infrastructure projects, including installing Cisco routers, switches, and firewalls across offices, schools, and township buildings. Supported large-scale deployments with small teams under tight deadlines, ensuring robust and secure connectivity. Collaborated with engineers and cable technicians to deliver solutions tailored to client needs.'
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
      title: 'Atlas Oak Advisory',
      techStack: ['Contract Work', 'Next.js'],
      description: 'A point of contact site for Atlas Oak Advisory',
      link: {
        label: 'atlasoakadvisory.com',
        href: 'https://atlasoakadvisory.com/'
      }
    },
    {
      title: 'Around the World Blog',
      techStack: ['Side Project', 'Next.js', 'AWS'],
      description: 'A travel blog built for Hogan Milam. Hosted on AWS and Vercel',
      link: {
        label: 'hoganmilam.site',
        href: 'https://hoganmilam.site/'
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
    }
  ]
} as const
