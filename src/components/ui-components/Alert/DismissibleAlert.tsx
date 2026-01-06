"use client";
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Alert } from 'flowbite-react'

const DismissibleAlert = () => {
  return (
    <div>
      <CardBox>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold">Dismissible Alert</h4>
              
            </div>
            <Alert
              color="primary"
              onDismiss={() => alert("Alert dismissed!")}
              className="rounded-md"
            >
              <span className="font-medium">Primary</span> - A simple Primary
              alert
            </Alert>

            <Alert
              color="secondary"
              onDismiss={() => alert("Alert dismissed!")}
              className="rounded-md"
            >
              <span className="font-medium">Secondary</span> - A simple
              Secondary alert
            </Alert>

            <Alert
              color="success"
              onDismiss={() => alert("Alert dismissed!")}
              className="rounded-md"
            >
              <span className="font-medium">Success</span> - A simple Success
              alert
            </Alert>

            <Alert
              color="info"
              onDismiss={() => alert("Alert dismissed!")}
              className="rounded-md"
            >
              <span className="font-medium">Info</span> - A simple Info alert
            </Alert>

            <Alert
              color="warning"
              onDismiss={() => alert("Alert dismissed!")}
              className="rounded-md"
            >
              <span className="font-medium">Warning</span> - A simple Warning
              alert
            </Alert>

            <Alert
              color="error"
              onDismiss={() => alert("Alert dismissed!")}
              className="rounded-md"
            >
              <span className="font-medium">Error</span> - A simple Error alert
            </Alert>

            <Alert
              color="dark"
              onDismiss={() => alert("Alert dismissed!")}
              className="rounded-md"
            >
              <span className="font-medium">Dark</span> - A simple Dark alert
            </Alert>
          </CardBox>
    </div>
  )
}

export default DismissibleAlert
