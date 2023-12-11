import {
  IconDefinition,
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const contactContent: {
  name: string;
  link: string;
  icon: IconDefinition;
}[] = [
  {
    name: "Github",
    link: "https://github.com/martinmiglio",
    icon: faGithub,
  },
  {
    name: "Email",
    link: "mailto:contact@martinmiglio.dev",
    icon: faEnvelope,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/martinmiglio",
    icon: faLinkedinIn,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/migliosights",
    icon: faInstagram,
  },
];

export default function SocialBar() {
  return (
    <div className="flex flex-row gap-4">
      {contactContent.map((item) => (
        <Link
          href={item.link}
          key={item.link}
          aria-label={`${item.name} link`}
          data-umami-event={`Social link clicked: ${item.name}`}
        >
          <FontAwesomeIcon
            icon={item.icon}
            aria-label={`${item.name} icon`}
            className="h-5 w-5"
          />
        </Link>
      ))}
    </div>
  );
}
