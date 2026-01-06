import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const SquareOutlineBtnCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import React from "react";
    import { Button } from "@headlessui/react";

    <div className="flex gap-3 flex-wrap">
        <Button className="ui-button border border-primary text-primary hover:bg-primary hover:text-white rounded-md">
            Primary
          </Button>
          <Button className="ui-button border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-md">
            Secondary
          </Button>
          <Button className="ui-button border border-success text-success hover:bg-success hover:text-white rounded-md">
            Success
          </Button>
          <Button className="ui-button border border-error text-error hover:bg-error hover:text-white rounded-md">
            Error
          </Button>
          <Button className="ui-button border border-warning text-warning hover:bg-warning hover:text-white rounded-md">
            Warning
          </Button>
          <Button className="ui-button border border-info text-info hover:bg-info hover:text-white rounded-md">
            Info
        </Button>
    </div>
        `}
      </CodeModal>
    </div>
  )
}

export default SquareOutlineBtnCode
