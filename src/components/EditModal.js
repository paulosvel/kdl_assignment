import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";


import "./index.css";
function EditModal({ isOpen, onClose, user,setUsers }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    companyName: user.company.name,
  });
  const [emailError, setEmailError] = useState(null);

  const updateUser = async (id, data) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await axios
      .put(url, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  };


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
    if (email === "") {
      setEmailError(null);
      setFormData({
        ...formData,
        email: user.email, 
      });
    }
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setFormData({
      ...formData,
      name,
    });
  }

  const handleCompanyNameChange = (event) => {
    const companyName = event.target.value;
    setFormData({
      ...formData,
      companyName,
    });
  }


  const handleSave = () => {
    if (!emailError) {
      onClose();
      setUsers((prevUsers) => {
        return prevUsers.map((prevUser) => {
          if (prevUser.id === user.id) {
            return {
              ...prevUser,
              name: formData.name,
              email: formData.email,
              company: {
                ...prevUser.company,
                name: formData.companyName,
              },
            };
          }
          return prevUser;
        });
      });
      updateUser(user.id, formData);
    } else {
      alert("Please enter valid email");
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
            <FormControl sx={{ pb: "20px", pt: "40px" }}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder={user.name}
                type="name"
                sx={{ borderRadius: "5px", padding: "16px" }}
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl isInvalid={emailError} sx={{ pb: "20px" }}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder={user.email}
                sx={{ borderRadius: "5px", padding: "16px" }}
                type="email"
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Company Name</FormLabel>
              <Input
                placeholder={user.company.name}
                type="name"
                sx={{ borderRadius: "5px", padding: "16px" }}
                onChange={handleCompanyNameChange}
              />
            </FormControl>
          </ModalBody>
          <Button
            onClick={handleSave}
            variant={"solid"}
            sx={{
              width: "200px",
              borderRadius: "26px",
              height: "25px",
              mt: "60px",
              backgroundColor: "#00B87C",
              border: "none",
              _hover: {
                backgroundColor: "#00B87C",
                opacity: "0.8",
                cursor: "pointer",
              },
            }}
          >
            Save
          </Button>
        </>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
