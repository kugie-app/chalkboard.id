"use client"

import { useState, useContext } from 'react'
import { KanbanDataContext } from '@/app/context/kanbancontext/index';
import { Button, TextInput, Modal } from 'flowbite-react';
import { postFetcher, putFetcher } from '@/app/api/globalFetcher';
import { mutate } from 'swr';

function KanbanHeader() {
    const { addCategory, setError } = useContext(KanbanDataContext);
    const [show, setShow] = useState(false);
    const [listName, setListName] = useState('');

    //Closes the modal 
    const handleClose = () => setShow(false);
    //open the modal 
    const handleShow = () => setShow(true);

    //Handles Add a new category.
    const handleSave = async () => {
        try {
            addCategory(listName);
            setListName('');
            setShow(false);
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <>
            <div className='sm:flex justify-between items-center'>
                <h5 className='card-title'>Improving Work Processes</h5>
                <Button color={'primary'} className='sm:mt-0 mt-3' onClick={handleShow}>Add List</Button>
            </div>
            <Modal size={'md'} show={show} onClose={handleClose}>
                <Modal.Header className='pb-0'>Add List</Modal.Header>
                <Modal.Body>
                    <TextInput
                        autoFocus
                        type="text"
                        className='form-control'
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} color="lighterror">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Add List</Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default KanbanHeader;
