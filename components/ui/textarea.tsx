import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-border placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/15 aria-invalid:border-destructive flex min-h-16 w-full rounded-md border bg-card px-3 py-2.5 text-base outline-none transition focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
