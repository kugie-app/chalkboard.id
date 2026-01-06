import React from 'react'
import CodeModal from '../../CodeModal'

const IconBadgeCode = () => {
  return (
<CodeModal>
 {
    `
  import { Badge } from '@/components/shadcn-ui/Default-Ui/badge'
  
  <Badge><Icon icon="tabler:check" className='text-base' /></Badge>
  <Badge variant="secondary" ><Icon icon="tabler:time-duration-30" className='text-base' /></Badge>
  <Badge variant="success" ><Icon icon="tabler:time-duration-60" className='text-base' /></Badge>
  <Badge variant="error" ><Icon icon="tabler:calendar-time" className='text-base' /></Badge>
  <Badge variant="info" ><Icon icon="tabler:file-time" className='text-base' /></Badge>
    `
 }   
</CodeModal>
  )
}

export default IconBadgeCode