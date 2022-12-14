import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  useDisclosure,
  Highlight,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import colorList from "../constants/colorList";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setUsername(event.target.value);

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setEmail(event.target.value);

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setPassword(event.target.value);

  const handleSubmitBtn: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("submit button clicked");
    const data = {
      username,
      email,
      password,
    };
    if (username && email && password) {
      try {
        const checkEmail = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          data
        );
        console.log("check email", checkEmail);
        const { token } = checkEmail.data;
        localStorage.setItem("token", token);
        navigate("/loading");
      } catch (err: any) {
        console.log("this is error:", err);
        alert(err.response.data.status);
      }
    }
  };

  const isError = email === "";
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="ghost"
        bg={colorList.buttonPrimary}
        color={colorList.drawerModal}
        _hover={{ bg: colorList.component, color: colorList.textColor }}
        _active={{ bg: colorList.buttonSecondary, color: colorList.textColor }}
        onClick={onOpen}
      >
        <Text color={colorList.textColor}>
          <Highlight
            query="Sign up here!"
            styles={{ textDecoration: "underline" }}
          >
            New to us? Sign up here!
          </Highlight>
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={colorList.textColor}>
            Create your account
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-form" onSubmit={handleSubmitBtn}>
              <FormControl isRequired isInvalid={isError}>
                <FormLabel color={colorList.textColor}>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter username"
                />
                <FormLabel color={colorList.textColor}>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email address"
                />
                <FormLabel color={colorList.textColor}>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                />
              </FormControl>
              <br />
              <Button
                form="new-form"
                bg={colorList.buttonPrimary}
                color={colorList.drawerModal}
                _hover={{ bg: colorList.component, color: colorList.textColor }}
                _active={{
                  bg: colorList.buttonSecondary,
                  color: colorList.textColor,
                }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Signup;
