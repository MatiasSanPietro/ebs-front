import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { loginUser } from "../service/auth";
import { UserContext } from "../context/UserContext";
import React, { useContext, useState, useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  box-shadow: 0 0 5px 0px grey;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 5px 0px grey;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 200;
  text-align: center;
  border-top: 2px solid red;
  border-bottom: 2px solid red;
  padding: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
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
  margin-left: 100px;
  margin-bottom: 20px;
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

const Linka = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    mail: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizar validación de campos vacíos
    const validationErrors = {};
    if (!loginData.mail.trim()) {
      validationErrors.mail = "El mail es obligatorio.";
    }
    if (!loginData.password.trim()) {
      validationErrors.password = "La contraseña es obligatoria.";
    }
    if (!loginData.password.trim()) {
      validationErrors.password = "La contraseña es obligatoria.";
    } else if (loginData.password.trim().length < 8) {
      validationErrors.password =
        "La contraseña debe tener al menos 8 caracteres.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true); // Iniciar la solicitud al backend
      const response = await loginUser(loginData);
      console.log(response);
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/");
    } catch (err) {
      setError(err.response.data); // Mostrar la data del error en caso de error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Leer la información del usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [navigate, setUser]);

  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>INGRESAR</Title>
          <Form>
            <Input
              type="text"
              name="mail"
              value={loginData.mail}
              onChange={handleChange}
              placeholder="EMAIL"
            />
            <Input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="CONTRASEÑA"
            />
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Cargando..." : "ENTRAR"}
            </Button>
            <p style={{ color: "red" }}>{errors.password}</p>
            {errors.mail && <p style={{ color: "red" }}>{errors.mail}</p>}
            {err && <p style={{ color: "red" }}>{err}</p>}
            <Linka>NO RECUERDAS TU CONTRASEÑA?</Linka>
            <Link to="/register">Crear una cuenta</Link>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
