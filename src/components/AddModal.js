import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import "./index.css";

function AddModal({ isOpen, onClose, setUsers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
  });
  const [emailError, setEmailError] = useState(null);

  const addUser = async (data) => {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const response = await axios
      .post(url, data)
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
    }
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setFormData({
      ...formData,
      name,
    });
  };

  const handleCompanyNameChange = (event) => {
    const companyName = event.target.value;
    setFormData({
      ...formData,
      companyName,
    });
  };

  const handleAdd = () => {
    if (!emailError) {
      onClose();
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          id: prevUsers.length + 1,
          name: formData.name,
          email: formData.email,
          company: {
            name: formData.companyName,
          },
        },
      ]);
      addUser(formData);
    } else {
      alert("Please enter a valid email");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} />
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
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton
          onClick={onClose}
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
        />
        <ModalBody>
          <FormControl sx={{ pb: "20px", pt: "40px" }}>
            <FormLabel>Name</FormLabel>
            <Input
              type="name"
              onChange={handleNameChange}
              sx={{ borderRadius: "5px", padding: "16px" }}
            />
          </FormControl>
          <FormControl isInvalid={emailError} sx={{ pb: "20px" }}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              onChange={handleEmailChange}
              sx={{ borderRadius: "5px", padding: "16px" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="name"
              onChange={handleCompanyNameChange}
              sx={{ borderRadius: "5px", padding: "16px" }}
            />
          </FormControl>
        </ModalBody>
        <Button
          mr={3}
          onClick={handleAdd}
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
          Add
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default AddModal;
