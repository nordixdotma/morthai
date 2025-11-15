import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  description?: string
  centered?: boolean
  className?: string
  descriptionClassName?: string
  subtitle?: string
}

export function SectionHeading({
  title,
  description,
  centered = true,
  className,
  descriptionClassName,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {subtitle && (
        <div className="inline-block mb-3 px-3 py-1 bg-primary/10 backdrop-blur-sm rounded-full text-primary text-sm font-medium">
          {subtitle}
        </div>
      )}
      <h2 className="font-tomato text-3xl font-bold md:text-4xl">{title}</h2>
      {description && <p className={cn("mx-auto mt-4 max-w-3xl text-white/80", descriptionClassName)}>{description}</p>}
    </div>
  )
}
