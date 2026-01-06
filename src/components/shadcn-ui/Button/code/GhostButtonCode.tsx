import React from 'react'
import CodeModal from '../../CodeModal'


const GhostButtonCode = () => {
  return (
    <CodeModal>
        {
            `
import { Button } from '@/components/shadcn-ui/Default-Ui/button'

<Button variant="ghostprimary" >Primary</Button>
<Button variant="ghostsecondary" >Secondary</Button>
<Button variant="ghostsuccess" >Success</Button>
<Button variant="ghostwarning" >Warning</Button>
<Button variant="ghosterror" >Error</Button>
<Button variant="ghostinfo" >Info</Button>            
            `
        }
    </CodeModal>
  )
}

export default GhostButtonCode