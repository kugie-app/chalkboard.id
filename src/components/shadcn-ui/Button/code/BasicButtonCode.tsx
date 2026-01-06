import React from 'react'
import CodeModal from '../../CodeModal'

const BasicButtonCode = () => {
  return (
    <CodeModal>
        {
            `
import { Button } from '@/components/shadcn-ui/Default-Ui/button'

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="info">Info</Button>
            `
        }
    </CodeModal>
  )
}

export default BasicButtonCode