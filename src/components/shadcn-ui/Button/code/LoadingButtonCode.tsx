import React from 'react'
import CodeModal from '../../CodeModal'

const LoadingButtonCode = () => {
  return (
    <CodeModal>
        {
            `
import { Button } from '@/components/shadcn-ui/Default-Ui/button'
import { Loader2 } from 'lucide-react'

<Button disabled ><Loader2 className="animate-spin" /> Please wait</Button>
<Button variant="secondary" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
<Button variant="success" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
<Button variant="warning" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
<Button variant="error" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
<Button variant="info" disabled ><Loader2 className="animate-spin" /> Please wait</Button>            
            `
        }
    </CodeModal>
  )
}

export default LoadingButtonCode