import Button from "../components/Button";
// import Container from "../components/Container";
// import Navbar from "../components/Navbar";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import "./login.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../services/getRegister";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function FormRegistration({ onStepUpdate }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(email);
    const data = await registerUser();
    console.log(data);
    if (data) onStepUpdate();
  };
  return (
    <div className="">
      <h1 className="auth-title mb-3">Register for PeakTech</h1>
      <p className="auth-desc mb-5">
        Get fast and accurate roof measurementsand signature-worthy proposals.
      </p>
      <Form className="mb-5">
        <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
          <Form.Label>Work Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Button className="btn--primary w-100" onClick={handleSubmit}>
          Continue &rarr;
        </Button>
      </Form>
      <div className="auth-text-divider">
        <span className="auth-text">Or</span>
      </div>
      <div className="auth-btns">
        <Button className="btn-outline-secondary btn-icon">
          <img src="google-icon.svg" alt="google icon" /> Login with Google
        </Button>
        <Button className="btn-outline-secondary btn-icon">
          <img src="facebook-icon.svg" alt="" />
          Login with Facebook
        </Button>
      </div>
    </div>
  );
}

function FormPassword({ onStepUpdate }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    onStepUpdate();
  };
  return (
    <>
      <h1 className="auth-title">Create your Password</h1>
      <p className="auth-subtitle">
        Password must contain at least 8 character
      </p>
      <Form className="mb-3">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <Button className="btn btn-outline-secondary" type="button">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </Form.Group>
        <Form.Group controlId="formCheckbox" className="mb-5">
          <Form.Check>
            <Form.Check.Input
              type="checkbox"
              id="term-check-label"
              checked={true}
            />
            <Form.Check.Label className="term-text" htmlFor="term-check-label">
              <span>I agree the PeakTech</span>
              <a href="https://example.com">Terms of Services</a>
              <span>and</span>
              <a href="https://example.com">Privacy Policy</a>
            </Form.Check.Label>
          </Form.Check>
        </Form.Group>
        <Row>
          <Col>
            <Button>&larr; Back</Button>
          </Col>
          <Col>
            <Button className="btn--primary w-100" onClick={handleSubmit}>
              Continue &rarr;
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

function EmailVerifyStep({ onStepUpdate }) {
  const handleSubmit = function (e) {
    e.preventDefault();
    onStepUpdate();
  };
  return (
    <div>
      <progress className="w-100 mb-3" id="file" value="32" max="100">
        {" "}
        32%{" "}
      </progress>
      <h1 className="auth-title mb-4">Please verify your email</h1>
      <div className="verify-email-text mb-5">
        <p>
          You're almost there! We've sent a verification code to your email:
        </p>
        <p className="fw-bold">basitkhattak1@email10p.org.</p>
        <p>
          Simply click on the link within the email, or enter the code below to
          verify your email. If you don't see it, we recommend checking your
          spam folder.
        </p>
      </div>
      <Form className="mb-5">
        <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter 6-digit Code</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Button className="btn--primary w-100" onClick={handleSubmit}>
          Verify Email &rarr;
        </Button>
      </Form>
      <Row className="mb-5">
        <Col className="text-center resend-code-text">
          <p>Can`t find the code?</p>
          <Link>Send new code</Link>
        </Col>
      </Row>
    </div>
  );
}

function FormProfileDetail({ onStepUpdate, onStepBack }) {
  const [usageList, setUsageList] = useState([
    "Measurments",
    "Quotes/Propsals",
    "Lead",
    "CRM",
    "Invoicing",
    "Financing",
    "Not sure yet",
  ]);
  const [toolUsedBefore] = useState([
    "Measurments",
    "Quotes/Propsals",
    "Invoice",
    "Lead",
    "CRM",
  ]);
  const [selectedUsage, setSelectedUsage] = useState([]);

  const handleUsageSelection = function (id) {
    console.log(id);
    setSelectedUsage((selected) =>
      selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id]
    );
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    // IF RESPONCE GET OK THEN UPDATE THE STEP
    onStepUpdate();
  };
  return (
    <div>
      <progress className="w-100 mb-3" id="file" value="32" max="100">
        {" "}
        32%{" "}
      </progress>
      <h1 className="auth-title mb-4">Tell us about yourself</h1>
      <p className="auth-subtitle">
        We’ve seen a thing or two, and we want to make sure you get the most out
        of the platform.
      </p>
      <form action="" className="profile-form">
        <div className="grid grid--2-cols grid-gap">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group
            className="mb-3 grid-span-all-cols"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group
            controlId="formCheckbox"
            className="mb-5 grid-span-all-cols"
          >
            <Form.Check>
              <Form.Check.Input
                type="checkbox"
                id="term-check-label"
                checked={true}
              />
              <Form.Check.Label
                className="term-text"
                htmlFor="term-check-label"
              >
                By checking this box, you confirm you want to hear from Roofr
                with information about products, services, or special offers
                that we think may be of interest to you... (read more)
              </Form.Check.Label>
            </Form.Check>
          </Form.Group>
          <Form.Group className=" mb-5 grid-span-all-cols">
            <Form.Label>What best describes your role?</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-5 grid-span-all-cols">
            <Form.Label>What will you use roofr for?</Form.Label>
            <div className="grid grid--4-cols selection-box">
              {usageList.map((item, i) => (
                <div
                  className={`usage usage-${i + 1} ${
                    selectedUsage.includes(i + 1) ? "selected" : ""
                  }`}
                  key={i + 1}
                  onClick={() => handleUsageSelection(i + 1)}
                >
                  {item}
                </div>
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-5 grid-span-all-cols">
            <Form.Label>
              What tools have you used before? (Select all that apply)
            </Form.Label>
            <div className="grid grid--4-cols selection-box">
              {toolUsedBefore.map((item, i) => (
                <div
                  className={`usage usage-${i + 1} ${
                    selectedUsage.includes(i + 1) ? "selected" : ""
                  }`}
                  key={i + 1}
                  onClick={() => handleUsageSelection(i + 1)}
                >
                  {item}
                </div>
              ))}
            </div>
          </Form.Group>
        </div>
        <Row>
          <Col>
            <Button onClick={onStepBack}>&larr; Back</Button>
          </Col>
          <Col>
            <Button className="btn--primary w-100" onClick={handleSubmit}>
              Continue &rarr;
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

function FormCompanyInfo({ onStepBack }) {
  const handleSubmit = function (e) {
    e.preventDefault();
    console.log("FINAL SUBMITION WILL BE MADE");
  };
  return (
    <>
      <progress className="w-100 mb-3" id="file" value="32" max="100">
        {" "}
        32%{" "}
      </progress>
      <h1 className="auth-title mb-4">Tell us about the company</h1>
      <p className="auth-subtitle">
        This gives Roofr’s Success Team a headstart so they can provide the best
        support for your team.
      </p>
      <form action="">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Company name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Row>
          <Col>
            <Button onClick={onStepBack}>&larr; Back</Button>
          </Col>
          <Col>
            <Link to="/dashboard" className="btn--primary w-100">
              Create Account
            </Link>
          </Col>
        </Row>
      </form>
    </>
  );
}

function StepsFormVerification({ step, onStepUpdate, onStepBack }) {
  return (
    <>
      <span className="mb-3 d-inline-block step-title">Step {step} of 5</span>
      {step === 2 && <FormPassword onStepUpdate={onStepUpdate} />}
      {step === 3 && <EmailVerifyStep onStepUpdate={onStepUpdate} />}
      {step === 4 && <FormProfileDetail onStepUpdate={onStepUpdate} />}
      {step === 5 && <FormCompanyInfo onStepBack={onStepBack} />}
    </>
  );
}

const REG_MAX_STEP = 5;
export default function Register() {
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleStep = function () {
    if (activeStep < REG_MAX_STEP)
      setActiveStep((activeStep) => activeStep + 1);
  };

  const handleStepBack = function () {
    if (activeStep > 1) setActiveStep((step) => step - 1);
  };
  return (
    <>
      <Container>
        <Navbar />
      </Container>
      <SectionLoginContent>
        {activeStep === 1 ? (
          <FormRegistration onStepUpdate={handleStep} />
        ) : (
          <StepsFormVerification
            step={activeStep}
            onStepUpdate={handleStep}
            onStepBack={handleStepBack}
          />
        )}
      </SectionLoginContent>
    </>
  );
}

function SectionLoginContent({ children }) {
  return <section className="section-auth">{children}</section>;
}
