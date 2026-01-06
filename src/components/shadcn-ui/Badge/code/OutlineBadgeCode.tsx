import React from 'react'
import CodeModal from '../../CodeModal'

const OutlineBadgeCode = () => {
  return (
    <CodeModal>
        {
            `
 import { Badge } from '@/components/shadcn-ui/Default-Ui/badge'   
 
 <Badge variant="outline">Primary</Badge>
 <Badge variant="outlineSecondary" >Secondary</Badge>
 <Badge variant="outlineSuccess" >Success</Badge>
 <Badge variant="outlineWarning" >Warning</Badge>
 <Badge variant="outlineInfo" >Info</Badge>
 <Badge variant="outlineError" >Error</Badge>            
            `
        }
    </CodeModal>
  )
}

export default OutlineBadgeCode