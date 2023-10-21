import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

import "./index.css";
function EditModal({ isOpen, onClose, user }) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        companyName: user.company.name,
      });
    const [emailError, setEmailError] = useState(null);

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setFormData({
          ...formData,
          email,
        });
    
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          setEmailError("Invalid email address");
        } else {
          setEmailError(null);
        }
      };

      const handleSave = () => {
     
        if (!emailError) {
      
          onClose();


        }
        else {
            return(
                <div>Error</div>
            );
        }
      };
    
  return (
    <Modal sx={{}} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay sx={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} />
      <ModalContent
        sx={{
          position: "absolute",
          marginTop: "50px",
          top: "50%",
          left: "35%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "10px",
          outline: "none",
          padding: "20px",
          backgroundColor: "#fff",
          zIndex: "1000",
        }}
      >
        <>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "16px",
              height: "16px",
              padding: "0",
              borderRadius: "50%",
              border: "none",
              outline: "none",
              cursor: "pointer",
              color: "#999",
              background: "none",
            }}
            onClick={onClose}
          />
          <ModalBody>
            <FormControl >
              <FormLabel>Name</FormLabel>
              <Input placeholder={user.name} type="name" />
            </FormControl>
            <FormControl isInvalid={emailError} >
              <FormLabel>Email</FormLabel>
              <Input placeholder={user.email} type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Company Name</FormLabel>
              <Input placeholder={user.company.name} type="name" />
            </FormControl>
         
          </ModalBody>
          <Button mr={3} onClick={handleSave}>
              Save
            </Button>
        </>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
