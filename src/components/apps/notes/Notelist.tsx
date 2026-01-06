"use client";
import { Icon } from "@iconify/react";
import React, { useState, useContext, useEffect } from "react";
import { Alert, Button, TextInput, Tooltip } from "flowbite-react";
import { NotesContext } from '@/app/context/NotesContext/index';
import { NotesType } from "@/app/[locale]/(DashboardLayout)/types/apps/notes";


const Notelist = () => {

  const { notes, selectNote, selectedNoteId, deleteNote }: any = useContext(NotesContext);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeNoteId, setActiveNoteId] = useState<any | null>(null);


  useEffect(() => {
    if (notes.length > 0) {
      // Set the first note as active 
      const firstNoteId = notes[0].id;
      setActiveNoteId(firstNoteId);
    }
  }, [notes]);


  const filterNotes = (notes: NotesType[], nSearch: string) => {
    if (nSearch !== "")
      return notes.filter(
        (t: any) =>
          !t.deleted &&
          t.title
            .toLocaleLowerCase()
            .concat(" ")
            .includes(nSearch.toLocaleLowerCase())
      );

    return notes.filter((t) => !t.deleted);
  };

  const filteredNotes = filterNotes(notes, searchTerm);

  const handleNoteClick = (noteId: any) => {
    setActiveNoteId(noteId);
    selectNote(noteId);
  };

  return (
    <>
      <div>
        <TextInput
          id="search"
          value={searchTerm}
          placeholder="Search Notes"
          className="form-control"
          sizing="md"
          required
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h6 className="text-base mt-6">All Notes</h6>
        <div className="flex flex-col gap-3 mt-4">
          {filteredNotes && filteredNotes.length ? (
            filteredNotes.map((note, index) => (
              <div key={note.id}>
                <div
                  className={`cursor-pointer relative p-4 rounded-md bg-light${note.color} dark:bg-dark${note.color}
                  ${activeNoteId === note.id ? "scale-100" : "scale-95"} transition-transform duration-200`}
                  onClick={() => handleNoteClick(note.id)}
                >
                  <h6 className={`text-base truncate text-${note.color}`}>
                    {note.title}
                  </h6>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-ld">
                      {new Date(note.datef).toLocaleDateString()}
                    </p>
                    <div>
                      <Tooltip content="Delete">
                        <Button
                          aria-label="delete"
                          className="bg-transparent h-8 w-8 text-ld p-0 flex items-center hover:bg-transparent hover:text-dark dark:hover:text-white"
                          onClick={() => deleteNote(note.id)}
                        >
                          <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <Alert color="error" icon={() => <Icon icon="solar:info-circle-linear" className="me-2" height={20} />}>
                <span className="font-medium"> No Notes Found!</span>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Notelist;





