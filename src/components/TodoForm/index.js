import React, { useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { withFirebase } from "../Auth/Firebase";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { CloseIcon } from "shared/Icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const ErrorText = styled(ErrorMessage)`
  color: red;
  padding: 2px 0;
  font-size: 12px;
  color: red;
`;

const Label = styled.span`
  padding: 2px 0;
  font-size: 12px;
`;

const DatePickers = styled(DatePicker)`
  display: block;
  width: 100%;
  padding: 0.475rem 0.45rem;
  font-size: 12px;
  color: ${props => props.theme.fontColorPrimary};
  line-height: 1.5;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const InputField = styled(Field)`
  display: block;
  width: 100%;
  padding: 0.475rem 0.45rem;
  font-size: 12px;
  color: ${props => props.theme.fontColorPrimary};
  line-height: 1.5;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  color: rgba(65, 65, 65, 0.8);
  transition: opacity linear 0.15s;
  z-index: 2000;
  width: ${props => {
    switch (props.modalSize) {
      case "lg":
        return "800";
      default:
        return "480";
    }
  }}px;
  margin: 40px auto;
  &.fade-in {
    opacity: 1;
    transition: opacity linear 0.15s;
  }
  &.fade-out {
    opacity: 0;
    transition: opacity linear 0.15s;
  }
  @media only screen and (max-width: 700px) {
    margin: auto 5%;
    width: auto;
    height: 0;
    top: 0;
    bottom: 0;
  }
`;

const Background = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 1040;
  display: block;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  outline: 0;
`;

const BoxDialog = styled.div`
  z-index: 1050;
  width: 100%;
  background-color: #fefefe;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
`;

const BoxContent = styled.div`
  width: 100%;
`;

export const BoxBody = styled.div`
  font-size: 14px;
  width: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 600px;
`;

const UpModalBodyFormik = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: ${props => props.theme.fontColorPrimary};
  flex-direction: column;
`;

const ModalNote = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  width: 100%;
  font-weight: 600;
  align-items: center;
  position: relative;
  font-size: ${props => props.theme.font12};
`;

const BoxFooterFormik = styled.div`
  padding: 5px 0;
  display: flex;
  padding-right: 3px;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.div`
  font-size: 1em;
  cursor: pointer;
  padding: 0.25em 1.2em;
  border-radius: 3px;
  background: "#fff";
  font-size: ${props => props.theme.font14};
  color: rgb(130, 222, 199);
  &:hover {
    background: #f2f2f2;
  }
`;

const SubmitButton = styled.button`
  font-size: 1em;
  cursor: pointer;
  padding: 0.25em 1.2em;
  border-radius: 3px;
  background: "#fff";
  border: none;
  margin-left: 3px;
  font-size: ${props => props.theme.font14};
  color: rgb(130, 222, 199);
  background: "#fff !important";
  &:hover {
    background: #f2f2f2;
  }
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  display: flex;
  right: 1%;
  cursor: pointer;
  padding: 2px;
  background: #f2f2f2;
  justify-content: center;
  &:hover {
    background: rgba(128, 128, 128, 0.7);
  }
`;

const FormInputField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  width: 100%;
  position: relative;
`;

const modalRoot = document.getElementById("modal-root");
const TodoFormModal = props => {
  const [fadeType, setState] = useState(null);
  const background = useRef();
  useEffect(() => {
    window.addEventListener("keydown", onEscKeyDown, false);
    setTimeout(() => setState("in"), 0);
    return () => {
      window.removeEventListener("keydown", onEscKeyDown, false);
    };
  }, [props.isOpen]);

  const transitionEnd = e => {
    if (e.propertyName !== "opacity" || fadeType === "in") return;

    if (fadeType === "out") {
      props.onClose();
    }
  };

  const onEscKeyDown = e => {
    if (e.key !== "Escape") return;
    setState("out");
  };

  const handleClick = e => {
    e.preventDefault();
    setState("out");
  };

  const formSubmitHandler = fields => {
    if (props.listItem) {
      props.reqUpdateTask(props.firebase, props.listItem, fields);
    } else {
      props.createNewTask(fields);
    }
    setState("out");
  };
  return ReactDom.createPortal(
    <Modal
      id={props.id}
      className={`wrapper ${"size-" + props.modalSize} fade-${fadeType} ${
        props.modalClass
      }`}
      role="dialog"
      modalSize={props.modalSize}
      onTransitionEnd={transitionEnd}
    >
      <BoxDialog>
        <BoxContent>
          <BoxBody>
            <UpModalBodyFormik>
              <ModalNote>
                <span>Create a New Task.</span>
                <CloseIconWrapper onClick={handleClick}>
                  <CloseIcon></CloseIcon>
                </CloseIconWrapper>
              </ModalNote>
              <Formik
                initialValues={{
                  taskType: props.listItem
                    ? props.taskListDetails[props.listItem].taskType.taskType
                    : "" || "",
                  title: props.listItem
                    ? props.taskListDetails[props.listItem].taskType.title
                    : "" || "",
                  details: props.listItem
                    ? props.taskListDetails[props.listItem].taskType.details
                    : "" || "",
                  dueDate: null,
                  statusTask: props.listItem
                    ? props.taskListDetails[props.listItem].taskType.statusTask
                    : "Active" || "Active"
                }}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required("Task title is required"),
                  details: Yup.string().required("Task details is required")
                })}
                onSubmit={fields => {
                  formSubmitHandler(fields);
                }}
                render={({
                  isSubmitting,
                  errors,
                  status,
                  values,
                  touched,
                  setFieldValue
                }) => (
                  <Form style={{ width: "100%" }}>
                    <FormInputField>
                      <Label htmlFor="taskType">Select a task type</Label>
                      <InputField name="taskType" component="select">
                        <option value="" label="Select a type" />
                        <option value="Frontend" label="Frontend task" />
                        <option value="Backend" label="Backend task" />
                        <option value="Server" label="Server task" />
                        <option value="Mobile" label="Mobile task" />
                      </InputField>
                      <ErrorText
                        name="taskType"
                        component="select"
                        className="invalid-feedback"
                      />
                    </FormInputField>
                    <FormInputField>
                      <Label htmlFor="title">Task title</Label>
                      <InputField
                        name="title"
                        type="text"
                        className={
                          errors.title && touched.title ? " is-invalid" : ""
                        }
                      />
                      <ErrorText
                        name="title"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormInputField>
                    <FormInputField>
                      <Label htmlFor="details">Task details</Label>
                      <InputField
                        name="details"
                        type="textarea"
                        component="textarea"
                        className={
                          errors.details && touched.details ? " is-invalid" : ""
                        }
                      />
                      <ErrorText
                        name="details"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormInputField>
                    <FormInputField>
                      <Label htmlFor="dueDate">Select a due date</Label>
                      <DatePickers
                        selected={values.dueDate}
                        onChange={date => setFieldValue("dueDate", date)}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        maxDate={
                          new Date(
                            new Date().setFullYear(
                              new Date().getFullYear() + 18
                            )
                          )
                        }
                        placeholderText="Select a due date"
                      />
                    </FormInputField>
                    <BoxFooterFormik>
                      <CloseButton onClick={handleClick}>
                        {"CANCEL"}
                      </CloseButton>
                      <SubmitButton type="submit">SUBMIT</SubmitButton>
                    </BoxFooterFormik>
                  </Form>
                )}
              />
            </UpModalBodyFormik>
          </BoxBody>
        </BoxContent>
      </BoxDialog>
      <Background onMouseDown={handleClick} ref={background} />
    </Modal>,
    modalRoot
  );
};

export default withFirebase(TodoFormModal);
