import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const DisableButtonsCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import React from 'react'
    import { Button } from '@headlessui/react'

    <div className="flex gap-3 flex-wrap">
        <Button className="ui-button bg-primary cursor-not-allowed" disabled>
        Primary
        </Button>
        <Button className="ui-button bg-secondary cursor-not-allowed" disabled>
        Secondary
        </Button>
        <Button className="ui-button bg-success cursor-not-allowed" disabled>
        Success
        </Button>
        <Button className="ui-button bg-error cursor-not-allowed" disabled>
        Error
        </Button>
        <Button className="ui-button bg-warning cursor-not-allowed" disabled>
        Warning
        </Button>
        <Button className="ui-button bg-info cursor-not-allowed" disabled>
        Info
        </Button>
    </div>
        `}
      </CodeModal>
    </div>
  )
}

export default DisableButtonsCode
