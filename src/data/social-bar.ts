import {
  faBluesky,
  faGithub,
  faInstagram,
  faLinkedinIn,
  type IconDefinition
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const CONTACT = {
  email: 'contact@martinmiglio.dev',
  github: 'martinmiglio',
  linkedin: 'martinmiglio',
  instagram: 'migliosights',
  bluesky: 'martinmiglio.dev'
} as const

export const socialBarData: { name: string; link: string; icon: IconDefinition }[] = [
  { name: 'Github', link: `https://github.com/${CONTACT.github}`, icon: faGithub },
  { name: 'Email', link: `mailto:${CONTACT.email}`, icon: faEnvelope },
  { name: 'LinkedIn', link: `https://www.linkedin.com/in/${CONTACT.linkedin}`, icon: faLinkedinIn },
  { name: 'Instagram', link: `https://www.instagram.com/${CONTACT.instagram}`, icon: faInstagram },
  { name: 'Bluesky', link: `https://bsky.app/profile/${CONTACT.bluesky}/`, icon: faBluesky }
]
