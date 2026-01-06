import { Spinner } from 'flowbite-react'
import React from 'react'
import CardBox from '../../shared/CardBox'
import CodeModal from '../CodeModal'

const ColorSpinner = () => {
  return (
    <div>
        <CardBox>
            <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Spinner colors</h4>
            <CodeModal>
              {`
    import { Spinner } from "flowbite-react";
    
    <div className="flex flex-wrap gap-3">
      <Spinner color="info" aria-label="Info spinner example" />
      <Spinner color="success" aria-label="Success spinner example" />
      <Spinner color="failure" aria-label="Failure spinner example" />
      <Spinner color="warning" aria-label="Warning spinner example" />
      <Spinner color="pink" aria-label="Pink spinner example" />
      <Spinner color="purple" aria-label="Purple spinner example" />
    </div>
              `}
            </CodeModal>
            </div>
            <div className="flex flex-wrap gap-3 pt-3">
              <Spinner color="info" aria-label="Info spinner example" />
              <Spinner color="success" aria-label="Success spinner example" />
              <Spinner color="failure" aria-label="Failure spinner example" />
              <Spinner color="warning" aria-label="Warning spinner example" />
              <Spinner color="pink" aria-label="Pink spinner example" />
              <Spinner color="purple" aria-label="Purple spinner example" />
            </div>
          </CardBox>
    </div>
  )
}

export default ColorSpinner
