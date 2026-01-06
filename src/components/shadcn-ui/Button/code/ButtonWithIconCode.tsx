import React from 'react'
import CodeModal from '../../CodeModal'

const ButtonWithIconCode = () => {
  return (
   <CodeModal>
    {
        `
import { Button } from '@/components/shadcn-ui/Default-Ui/button'

<Button> <Icon icon="tabler:mail" className='text-lg' /> Login with email</Button>
<Button variant="secondary"><Icon icon="tabler:garden-cart" className='text-lg' /> Shop now</Button>
<Button variant="success"><Icon icon="tabler:user-circle" className='text-lg' /> Signup now</Button>
<Button variant="warning"><Icon icon="tabler:calendar-event" className='text-lg' /> Live event</Button>
<Button variant="info"><Icon icon="tabler:align-box-left-bottom" className='text-lg' />Create project</Button>
<Button variant="error"><Icon icon="tabler:user-shield" className='text-lg' /> Login now</Button>        
        `
    }
   </CodeModal>
  )
}

export default ButtonWithIconCode