import { Field, Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Button, Card, Col, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useBetween } from "use-between";
import useCounter from "./useStatesData";
import * as jnb from "react-bootstrap"; 
function useSharedCounter() {
  return useBetween(useCounter);
}

const ConfirmstudentDetails = () => {
  const { show, setShow } = useSharedCounter();
  const studentId = JSON.parse(localStorage.getItem("id"))
  //let studentId = localStorage.getItem("id");
  //const [hallTicket, setHallticket] = useState();
  ///const [student_id, setStudentId] = useState();
  ///const [scholarType, setscholarType] = useState();
  //const [course, setcourse] = useState();
  //const [percentage, setpercentage] = useState();
  const navigate = useNavigate();
  const navigatetodashboard = () => {
    navigate("/dashboard");
  };

  


  const modalFormik = useFormik({
    initialValues: {
      student_id: studentId,
      hallticket: "",
      scholarType: "",
      course: "",
      percentage: "",
    },
    onSubmit: (values) => {
       console.log(values);
      alert(JSON.stringify(values));
      localStorage.setItem("studentData", JSON.stringify(values));
},
 });
 
 const handleClose = () => setShow(false);
  return (
    <FormikProvider value={modalFormik}>
      <Form onSubmit={modalFormik.handleSubmit} onChange={modalFormik.handleChange}>
     
          <jnb.Row>
            <jnb.Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
              <FormGroup className="form-group">
                <label className="control-label star" name="student_id" >
                  Student Id: &nbsp;&nbsp;&nbsp;&nbsp;
                 <b>{studentId}</b>{" "}
                 {/* <Field type="text" name="student_id" className="form-control" value={studentId}/> */}
                </label>
              </FormGroup>
            </jnb.Col>
            <jnb.Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
              <FormGroup className="form-group">
                <label className="control-label star">
                  Previous Hall Ticket No :
                </label>
                <Field
                  type="text"
                  name="hallticket"
                  className="form-control"
                  //value={showEventUploads.value[0].event_name}'
                />
              </FormGroup>
            </jnb.Col>
          </jnb.Row>
          <jnb.Row>
            <jnb.Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
              <FormGroup className="form-group">
                <label className="control-label star">Scholarship Type </label>
                <Field as="select" className="form-control" name="scholarType">
                  <option value="">--Select--</option>
                  <option value="Day-Scholar">Day Scholar</option>
                  <option value="Regular">Regular</option>
                </Field>
              </FormGroup>
              </jnb.Col>
            <jnb.Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
              <FormGroup className="form-group">
                <label className="control-label star">Course</label>
                <Field as="select" className="form-control" name="course">
                  <option value="">--Select--</option>
                  <option value="BBA">BBA</option>
                  <option value="BSC">BSC</option>
                </Field>
              </FormGroup>
              </jnb.Col>
          </jnb.Row>
          <jnb.Row>
            <jnb.Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
              <FormGroup className="form-group">
                <label className="control-label star">
                  Previous Course Percentage
                </label>
                <Field type="text" name="percentage" className="form-control" />
              </FormGroup>
              </jnb.Col>
          </jnb.Row>
<br/>
<jnb.Row>
            <jnb.Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <button
            type="submit"
            className="btn btn-success pull-right submitButton"
            variant="success"
            onClick={handleClose}
          >
            Confirm &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          </button>

    
          </jnb.Col>
          </jnb.Row>
      </Form>
    </FormikProvider>
  );
};
export default ConfirmstudentDetails;
