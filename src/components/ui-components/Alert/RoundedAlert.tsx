import { Alert } from 'flowbite-react'
import React from 'react'
import CardBox from '../../shared/CardBox'
import RoundedAlertCode from './Code/RoundedAlertCode'

const RoundedAlert = () => {
  return (
    <div>
       <CardBox>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold">Rounded Alert</h4>
              <RoundedAlertCode/>
            </div>
            <Alert color="primary" rounded>
              <span className="font-medium">Primary</span> - A simple Primary
              alert
            </Alert>

            <Alert color="secondary" rounded>
              <span className="font-medium">Secondary</span> - A simple
              Secondary alert
            </Alert>

            <Alert color="success" rounded>
              <span className="font-medium">Success</span> - A simple Success
              alert
            </Alert>

            <Alert color="info" rounded>
              <span className="font-medium">Info</span> - A simple Info alert
            </Alert>

            <Alert color="warning" rounded>
              <span className="font-medium">Warning</span> - A simple Warning
              alert
            </Alert>

            <Alert color="error" rounded>
              <span className="font-medium">Error</span> - A simple Error alert
            </Alert>

            <Alert color="dark" rounded>
              <span className="font-medium">Dark</span> - A simple Dark alert
            </Alert>
          </CardBox>
    </div>
  )
}

export default RoundedAlert
