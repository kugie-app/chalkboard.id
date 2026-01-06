"use client";
import * as React from "react";
import { Button, Modal, Textarea } from "flowbite-react";
import { TbCheck } from "react-icons/tb";
import { useContext, useState } from "react";
import { NotesContext } from '@/app/context/NotesContext/index';


interface Props {
  colors: any[];
}

const AddNotes = ({ colors }: Props) => {
  const { addNote }: any = useContext(NotesContext);

  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scolor, setScolor] = React.useState<string>("primary");
  const [title, setTitle] = React.useState("");

  const setColor = (e: string) => {
    setScolor(e);
  };


  return (
    <>
      <Button onClick={() => setOpenNoteModal(true)} color={"primary"}>
        Add Note
      </Button>
      <Modal show={openNoteModal} size="lg" onClose={() => setOpenNoteModal(false)}>
        <Modal.Header>Add New Note</Modal.Header>
        <Modal.Body className="pt-0">
          <div className="space-y-2">
            <Textarea
              rows={5}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="description"
              className="w-full form-control-textarea"
            />
            <h6 className="text-base pt-4">Change Note Color</h6>

            <div className="flex gap-2 items-center">
              {colors
                ? colors.map((color) => (
                  <div
                    className={`h-7 w-7 flex justify-center items-center rounded-full cursor-pointer  bg-${color.disp}`}
                    key={color.disp}
                    onClick={() => setColor(color.disp)}
                  >
                    {scolor === color.disp ? (
                      <TbCheck width="18" className="text-white" />
                    ) : null}
                  </div>
                ))
                : ''}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color={"primary"}
            disabled={title === ""}
            onClick={(e: { preventDefault: () => void }) => {
              e.preventDefault();
              addNote({ title, color: scolor });
              setOpenNoteModal(false);
              setTitle("");
            }}
          >
            Save
          </Button>
          <Button color={"lighterror"} onClick={() => setOpenNoteModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNotes;
