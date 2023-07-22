import styled from "styled-components";
import { mobile } from "../responsive";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100vw;
  height: 88vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px 0px grey;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 5px 0px grey;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 24px;
  font-weight: 200;
  text-align: center;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  padding: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin-top: 20px;
  margin-left: 160px;
  background-color: white;
  color: black;
  cursor: pointer;
  text-align: center;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  &:hover {
    color: red;
    text-weight: bold;
    background-color: #ededed;
    border-top: 2px solid red;
    border-bottom: 2px solid red;
  }
  transition: all 0.05s ease;
`;

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREAR UNA CUENTA</Title>
          <Form>
            <Input placeholder="NOMBRE" />
            <Input placeholder="APELLIDO" />
            <Input placeholder="TELEFONO" />
            <Input placeholder="EMAIL" />
            <Input placeholder="CONTRASEÑA" />
            <Input placeholder="CONFIRMAR CONTRASEÑA" />
            <Button>CREAR</Button>
          </Form>
          <Link to="/login">Ya tienes una cuenta?</Link>
        </Wrapper>
      </Container>
      <Footer />
    </div>
  );
};

export default Register;
