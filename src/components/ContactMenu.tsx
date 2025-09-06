import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { socialBarData } from '@/data/social-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function ContactMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const animationClasses = [
    'animate-slide-in-1',
    'animate-slide-in-2',
    'animate-slide-in-3',
    'animate-slide-in-4',
    'animate-slide-in-5'
  ]

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-fit">
      <CollapsibleTrigger asChild>
        <button
          className="text-theme-700 hover:text-theme-500 w-fit transform text-2xl font-bold transition-colors duration-200 hover:scale-105"
          data-umami-event="Home Contact Menu Toggled"
        >
          CONTACT
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsible-content mt-4 overflow-hidden">
        <div className="border-theme-200 flex flex-col gap-3 border-l-2 pl-4">
          {socialBarData.map((social, index) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} ${social.link}`}
              data-umami-event={`Contact Menu Social Link Clicked: ${social.name}`}
              className={`text-theme-600 hover:text-theme-500 flex w-fit items-center gap-3 text-lg font-medium transition-colors duration-200 ${isOpen ? animationClasses[index] || 'animate-slide-in-5' : ''}`}
            >
              <FontAwesomeIcon
                icon={social.icon}
                aria-label={`${social.name} icon`}
                className="text-xl"
              />
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
