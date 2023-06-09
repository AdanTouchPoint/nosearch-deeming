import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/cjs/Col";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Loader from "react-loader-spinner";

const EmailForm = ({
  setShowThankYou,
  setShowFindForm,
  dataUser,
  setDataUser,
  showEmailForm,
  setShowEmailForm,
  emailData,
  setEmailData,
  clientId,
  allDataIn,
}) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value.replace(/\n\r?/g, "<br/>").replace(/#/g, " "),
    });
    setEmailData({
      ...dataUser,
      ...emailData,
      [e.target.name]: e.target.value.replace(/\n\r?/g, "<br/>").replace(/#/g, " "),
    });
   // console.log('allDataIn', allDataIn)
  };
  const { userName } = dataUser;
  const correoEnviado = (respuestaDeExito, dataUseryEmail) => {
    axios.post(
      `https://payload-demo-tpm.herokuapp.com/leads?&firstName=${
        dataUser.userName ? dataUser.userName : ""
      }&postalcode=${
        dataUser.zipCode ? dataUser.zipCode : dataUser.state
      }&emailData=${dataUser.emailUser}&representative=${
        allDataIn
      }&emailMessage=${dataUser.text}&clientId=${clientId}&sended=${respuestaDeExito}&subject=${dataUser.subject}`,
      dataUseryEmail
    );
  };
  const send = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (
      //firstName.trim() === '' || lastName.trim() === '' || //
      userName.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    const name = dataUser.userName.split(" ");
    // console.log(allDataIn);
    const payload = await axios.post(
      `https://payload-demo-tpm.herokuapp.com/batch-email?to=${allDataIn}&subject=${
        dataUser.subject
      }&firstName=${
        dataUser.userName ? dataUser.userName : ""
      }&emailData=${dataUser.emailUser}&text=${dataUser.text.replace(/\n\r?/g, "<br/>")}`
    );
    await setShowLoadSpin(false);
    if (payload.status === 200) {
      correoEnviado("Si", { dataUser, emailData });
      setShowEmailForm(true);
      setShowThankYou(false);
      dataUser.id = "";
    }
    if (payload.status !== 200) correoEnviado("No", { dataUser, emailData })

      return (
        <Alert>
          The mail has not been sent successfully, please try again more
           late
          <Button
            className={"button-email-form"}
            variant={"dark"}
            onClick={back}
          >
            Back
          </Button>
        </Alert>
      );
    }
  
  const back = (e) => {
    e.preventDefault();
    setShowFindForm(false);
    setShowEmailForm(true);
  };
  // console.log(allDataIn, 'allDataIn')
  // console.log("emailData", emailData);
  // console.log(dataUser, "data user");
  return (
    <div className={"emailContainer"} hidden={showEmailForm}>
      {error ? (
        <Alert variant={"danger"}>
          All fields are required, please fill in the missing ones.
        </Alert>
      ) : null}
      <Form onSubmit={send} noValidate validated={validated}>
        <div className={"formEmail"}>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>First name and Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="userName"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>*Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={emailData.emailUser}
                onChange={handleChange}
                name="emailUser"
                readOnly
              />
            </Form.Group>
          </Col>
        </div>
        
        <div className="input-subject">
          <Col>
            <Form.Group>
              <Form.Label>SUBJECT: (write a personalised subject heading)</Form.Label>
              <Form.Control
                onChange={handleChange}
                as="input"
                type="text"
                name="subject"
                defaultValue={dataUser.subject}
              />
            </Form.Group>
          </Col>
        </div>
        <Col>
          <Form.Group className="input-text-form">
            <Form.Control
              as="textarea"
              rows={8}
              defaultValue={dataUser.text}
              onChange={handleChange}
              name="text"
            />
          </Form.Group>
        </Col>
        <Loader
          visible={showLoadSpin}
          type="Puff"
          color="#000000"
          height={100}
          width={100}
          timeout={5000} //5 secs
        />
      </Form>
      <div className={"container buttons-container-email-form"}>
        <Button
          type={"submit"}
          className={"button-email-form"}
          variant={"dark"}
          onClick={send}
        >
          Send
        </Button>
        <Button className={"button-email-form"} variant={"dark"} onClick={back}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;
