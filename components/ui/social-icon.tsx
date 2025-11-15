import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialIconProps {
  icon: LucideIcon
  href: string
  label: string
  className?: string
}

export function SocialIcon({ icon: Icon, href, label, className }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all duration-300 hover:bg-primary hover:scale-110",
        className,
      )}
    >
      <Icon size={18} />
    </a>
  )
}
