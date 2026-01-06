"use client";
import { useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";

function EditCategoryModal({
  showModal,
  handleCloseModal,
  handleUpdateCategory,
  initialCategoryName,
}: any) {
  const [newCategoryName, setNewCategoryName] = useState(initialCategoryName);
  // Function to handle saving changes and updating category name
  const handleSave = () => {
    handleUpdateCategory(newCategoryName);
    handleCloseModal();
  };
  return (
    <Modal size={"md"} show={showModal} onClose={handleCloseModal}>
      <Modal.Header className="pb-0">Edit Category</Modal.Header>
      <Modal.Body>
        <TextInput
          className="form-control"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal} color={'lighterror'}>Cancel</Button>
        <Button onClick={handleSave} color={'success'}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditCategoryModal;
