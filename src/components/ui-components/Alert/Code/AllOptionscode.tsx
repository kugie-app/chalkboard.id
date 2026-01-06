import React from 'react'
import CodeModal from '../../CodeModal'

const AllOptionscode = () => {
  return (
    <div>
        <CodeModal>
                {`
    import { HiEye, HiInformationCircle } from "react-icons/hi";
    import { Alert } from "flowbite-react";
    
    <Alert
      additionalContent={<ExampleAdditionalContent />}
      color="lightsuccess"
      icon={HiInformationCircle}
      onDismiss={() => alert("Alert dismissed!")}
      rounded
      className="rounded-md"
    >
      <span className="font-medium">Info alert!</span> Change a few
      things up and try submitting again.
    </Alert>      
                `}
              </CodeModal>
    </div>
  )
}

export default AllOptionscode
