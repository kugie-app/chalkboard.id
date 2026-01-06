import React from 'react'
import CodeModal from '../../CodeModal'

const LinkBadgeCode = () => {
  return (
    <>
        <CodeModal>
                {`
    import { Badge } from "flowbite-react";
    
    <div className="flex flex-wrap gap-2">
      <div className="flex flex-wrap gap-2">
        <Badge href="#" color="primary">
        Badge Link 1
        </Badge>
        <Badge href="#" color="secondary">
        Badge Link 2
        </Badge>
        <Badge href="#" color="error">
        Badge Link 3
        </Badge>
        <Badge href="#" color="warning">
        Badge Link 4
        </Badge>
      </div>
    </div>
        `}
              </CodeModal>
    </>
  )
}

export default LinkBadgeCode
