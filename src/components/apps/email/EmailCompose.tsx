import {
  Button,
  FileInput,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";

const EmailCompose = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button className="w-full  rounded-xl" color={"primary"} onClick={handleShow}>
        Compose
      </Button>
      <Modal show={show} onClose={handleClose}>
        <Modal.Header className="pb-0">Compose Mail</Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Label
                  htmlFor="to"
                  value="to"
                  className="mb-2 block capitalize"
                />
                <TextInput id="to" className="form-control" type="text" />
              </div>
              <div className="col-span-12">
                <Label
                  htmlFor="subject"
                  value="Subject"
                  className="mb-2 block capitalize"
                />
                <TextInput id="subject" className="form-control" type="text" />
              </div>
              <div className="col-span-12">
                <Label
                  htmlFor="message"
                  value="Message"
                  className="mb-2 block capitalize"
                />
                <Textarea
                  id="message"
                  className="form-control-textarea"
                  required
                  rows={4}
                />
              </div>
              <div className="col-span-12">
                <Label
                  htmlFor="attachment"
                  value="Attachment"
                  className="mb-2 block capitalize"
                />
                <FileInput id="attachment" className="form-control" />
              </div>
              <div className="col-span-12">
                <Modal.Footer className="p-0 pt-6">
                  <Button
                    color={"primary"}
                    className="bg-primary"
                    type="submit"
                    onClick={() => setShow(false)}
                  >
                    send
                  </Button>
                  <Button color={"error"} onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default EmailCompose;
