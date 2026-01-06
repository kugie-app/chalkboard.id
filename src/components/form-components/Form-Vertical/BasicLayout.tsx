import { Label, TextInput, Textarea, Button } from 'flowbite-react'
import React from 'react'
import TitleCard from '../../shared/TitleBorderCard'

const BasicLayout = () => {
  return (
    <div>
      <TitleCard title="Basic Layout">
            <div className="grid grid-cols-12 gap-30">
              <div className="col-span-12">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                  id="name"
                  type="name"
                  placeholder="Jordan Powell"
                  required
                  className="form-control"
                />
              </div>
              <div className="col-span-12">
                <div className="mb-2 block">
                  <Label htmlFor="company" value="Company" />
                </div>
                <TextInput
                  id="company"
                  type="text"
                  placeholder="ACME Inc."
                  required
                  className="form-control"
                />
              </div>
              <div className="col-span-12">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="jordan.powell@example.com"
                  required
                  className="form-control"
                />
              </div>
              <div className="col-span-12">
                <div className="mb-2 block">
                  <Label htmlFor="phoneno" value="Phone No" />
                </div>
                <TextInput
                  id="phoneno"
                  type="number"
                  placeholder="125 7545 645"
                  required
                  className="form-control"
                />
              </div>
              <div className="col-span-12">
                <div className="mb-2 block">
                  <Label htmlFor="message" value="Message" />
                </div>
                <Textarea
                  id="message"
                  placeholder="Hi, Do you  have a moment to talk Jeo ?"
                  required
                  className="form-control-textarera rounded-md"
                  rows={4}
                />
              </div>
              <div className="col-span-12">
                <Button type="submit" color="primary" >
                  Send
                </Button>
              </div>
            </div>
          </TitleCard>
    </div>
  )
}

export default BasicLayout
