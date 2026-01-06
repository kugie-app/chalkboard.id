import React from 'react'
import CodeModal from '../../CodeModal'

const LinkBadgeCode = () => {
  return (
    <CodeModal>
        {
            `
import { badgeVariants } from '@/components/shadcn-ui/Default-Ui/badge'

<Link href="/ui-components/badge" className={badgeVariants({ variant: "default" })}>Badge Link 1</Link>
<Link href="/ui-components/badge" className={badgeVariants({ variant: "secondary" })}>Badge Link 2</Link>
<Link href="/ui-components/badge" className={badgeVariants({ variant: "success" })}>Badge Link 3</Link>
<Link href="/ui-components/badge" className={badgeVariants({ variant: "warning" })}>Badge Link 4</Link>
<Link href="/ui-components/badge" className={badgeVariants({ variant: "error" })}>Badge Link 5</Link>
<Link href="/ui-components/badge" className={badgeVariants({ variant: "info" })}>Badge Link 6</Link>            
            `
        }
    </CodeModal>
  )
}

export default LinkBadgeCode