import {
  type IconDefinition,
  faGithub,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const socialBarData: {
  name: string
  link: string
  icon: IconDefinition
}[] = [
  {
    name: 'Github',
    link: 'https://github.com/martinmiglio',
    icon: faGithub
  },
  {
    name: 'Email',
    link: 'mailto:contact@martinmiglio.dev',
    icon: faEnvelope
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/martinmiglio',
    icon: faLinkedinIn
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/migliosights',
    icon: faInstagram
  }
]
