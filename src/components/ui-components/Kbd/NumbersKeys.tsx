import { Kbd } from 'flowbite-react'
import React from 'react'
import CardBox from '../../shared/CardBox'

const NumbersKeys = () => {
  return (
    <div>
       <CardBox>
        <h4 className="text-lg font-semibold mb-2">Number Keys</h4>
        <div className="flex flex-wrap gap-3">
          <Kbd>1</Kbd>
          <Kbd>2</Kbd>
          <Kbd>3</Kbd>
          <Kbd>4</Kbd>
          <Kbd>5</Kbd>
          <Kbd>6</Kbd>
          <Kbd>7</Kbd>
          <Kbd>8</Kbd>
          <Kbd>9</Kbd>
          <Kbd>0</Kbd>
        </div>
      </CardBox>
    </div>
  )
}

export default NumbersKeys
