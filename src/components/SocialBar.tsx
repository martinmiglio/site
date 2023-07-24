import {
  faGithub,
  faLinkedinIn,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const contactContent = [
  {
    contactContent: "github",
    contactLink: "https://github.com/martinmiglio",
  },
  {
    contactContent: "mail",
    contactLink: "mailto:contact@martinmiglio.dev",
  },
  {
    contactContent: "linkedin",
    contactLink: "https://www.linkedin.com/in/martinmiglio",
  },
  {
    contactContent: "instagram",
    contactLink: "https://www.instagram.com/migliosights",
  },
];

const iconMap = {
  twitter: faTwitter,
  linkedin: faLinkedinIn,
  mail: faEnvelope,
  github: faGithub,
  instagram: faInstagram,
};

const SocialBar = () => {
  return (
    <div className="flex flex-row gap-4">
      {contactContent.map((item) => (
        <Link href={item.contactLink} key={item.contactContent}>
          <FontAwesomeIcon
            icon={iconMap[item.contactContent]}
            className="h-4 w-4"
          />
        </Link>
      ))}
    </div>
  );
};

export default SocialBar;