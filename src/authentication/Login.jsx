import Button from "../components/Button";
// import Container from "../components/Container";
import Navbar from "../components/Navbar";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  return (
    <>
      <Container>
        <Navbar />
      </Container>
      <SectionLoginContent />
    </>
  );
}

function SectionLoginContent() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className="section-auth">
      <div className="auth-social-wrapper">
        <h1 className="auth-title mb-5">Login to PeakTech</h1>
        <div className="auth-btns">
          <Button className="btn-outline-secondary btn-icon">
            <img src="google-icon.svg" alt="google icon" /> Login with Google
          </Button>
          <Button className="btn-outline-secondary btn-icon">
            <img src="facebook-icon.svg" alt="" />
            Login with Facebook
          </Button>
        </div>
        <div className="auth-text-divider">
          <span className="auth-text">Or, sign in with email</span>
        </div>
      </div>

      <Form className="mb-5">
        <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </Form.Group>
        <Link to="/dashboard" className="btn--primary w-100">
          Login
        </Link>
      </Form>
      <Container className="mb-5">
        <Row className="login--secondary-actions">
          <Col>
            <Link className="text-secondary">Forgot password</Link>
          </Col>
          <Col className="text-end">
            <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
