import React from 'react'
import CodeModal from '../../CodeModal'

const BasicAlertCode = () => {
  return (
    <CodeModal>
        {
            `
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/shadcn-ui/Default-Ui/alert"
   
<Alert variant="lightprimary">
    <Terminal className="h-4 w-4" />
    <AlertTitle className="text-primary">Primary Alert!</AlertTitle>
    <AlertDescription>
        Use our highly customizable component
    </AlertDescription>
</Alert>
<Alert variant="lightsecondary">
    <Terminal className="h-4 w-4" />
    <AlertTitle className="text-secondary">Secondary Alert!</AlertTitle>
    <AlertDescription>
        Use our highly customizable component
    </AlertDescription>
</Alert>
<Alert variant="lightsuccess">
    <Terminal className="h-4 w-4" />
    <AlertTitle className="text-success">Success Alert!</AlertTitle>
    <AlertDescription>
        Use our highly customizable component
    </AlertDescription>
</Alert>
<Alert variant="lightwarning">
    <Terminal className="h-4 w-4" />
    <AlertTitle className="text-warning">Warning Alert!</AlertTitle>
    <AlertDescription>
        Use our highly customizable component
    </AlertDescription>
</Alert>
<Alert variant="lighterror">
    <Terminal className="h-4 w-4" />
    <AlertTitle className="text-error">Error Alert!</AlertTitle>
    <AlertDescription>
        Use our highly customizable component
    </AlertDescription>
</Alert>
<Alert variant="lightinfo">
    <Terminal className="h-4 w-4" />
    <AlertTitle className="text-info">Info Alert!</AlertTitle>
    <AlertDescription>
        Use our highly customizable component
    </AlertDescription>
</Alert>           
            `
        }
    </CodeModal>
  )
}

export default BasicAlertCode