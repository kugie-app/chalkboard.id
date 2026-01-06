import React from 'react'
import CodeModal from '../../CodeModal'

const DefaultBadgeCode = () => {
  return (
    <CodeModal>
 {
    `
import { Badge } from '@/components/shadcn-ui/Default-Ui/badge'

 <div className="flex items-center gap-3 mt-4">
 <Badge>Primary</Badge>
 <Badge variant="secondary" >Secondary</Badge>
 <Badge variant="success" >Success</Badge>
 <Badge variant="warning" >Warning</Badge>
 <Badge variant="info" >Info</Badge>
 <Badge variant="error" >Error</Badge>
</div>   
    `
 }       
    </CodeModal>
  )
}

export default DefaultBadgeCode