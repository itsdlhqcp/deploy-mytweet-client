import React, { useState } from 'react';
import { Button, Form, Modal } from 'rsuite';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { useModalState } from '../misc/custom-hooks';
import FormGroup from 'rsuite/esm/FormGroup';

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= 102) {
      setText(value);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="mt-1">
      <Button block style={{ backgroundColor: 'green', color: 'white' }} onClick={open}>
        <PlusIcon style={{ marginRight: '8px' }} /> Add New Post
      </Button>

      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>Add new tweet post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            
            <FormGroup>
              <Form.ControlLabel>Write anything in mind?</Form.ControlLabel>
              <textarea
             
                id="comment" 
                rows="4"  
                className="form-control" 
                value={text}  
                onChange={handleTextChange} 
                style={{ width: '92%' , padding: '5px 5px 5px 5px' }} 
                placeholder="Enter your thoughts!"
              />
              <div style={{ textAlign: 'right' }}>
                <small>{text.length}/102</small> 
              </div>
            </FormGroup>

            <FormGroup>
              <Form.ControlLabel>Upload Image or GIF</Form.ControlLabel>
              <Button appearance="subtle" onClick={() => document.getElementById('file-upload').click()}>
                <CameraRetroIcon style={{ marginRight: '8px' }} /> Upload Image/GIF
              </Button>
              <input
                type="file"
                id="file-upload"
                accept="image/*,image/gif"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {file && <p>Selected file: {file.name}</p>}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="primary">
            Create New Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
