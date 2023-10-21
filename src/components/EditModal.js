import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button
  } from '@chakra-ui/react'
import { useState } from 'react';
import './index.css';
function EditModal({isOpen, onClose}) {

  return (
   <Modal className='modal' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
     <ModalContent>
          
            <>
              <ModalHeader>Edit User</ModalHeader>
 
              <ModalCloseButton />
          <ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
        </ModalContent>
        
    </Modal>
  )
}

export default EditModal;