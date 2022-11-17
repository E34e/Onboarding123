import { ErrorMessage, Field, FormikProvider, useFormik } from "formik"; 
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import localStorage from "redux-persist/es/storage";
import * as jnb from "react-bootstrap";  
import { BiUser, BiLock } from "react-icons/bi";
export default function LoginPage() {
  const [username, setusername] = useState();
  const [image, setImage] = useState();

  function clearpassword() {
    formIk.setFieldValue("password", "");
  }
  const navigate = useNavigate();
  const navigatetoforgot = () => {
    navigate("/forgotpassword");
  };
  const userValidationSchema = Yup.object().shape({
    userId: Yup.string().required("Please enter username"),
    password: Yup.string().required("Please enter password"),
  });

  const submitDetails = async (values) => {
    try {
      const req = values;
      const res = await axios.post(
        "http://172.16.150.61:9010/jvdlogin/jnblogincheck",
        req
      );
    
      
      if (res.data != null) {
       
       if (res.data.responseCode === "01") {
        console.log(res.data)
          alert("Login successfully");
      localStorage.setItem(
            "username",
            JSON.stringify(res.data.studentName)
          );
          setusername(res.data.studentName);
          localStorage.setItem("image", JSON.stringify(res.data.photos));
          setImage(res.data.photos);
        //  navigate("/cetregistration");
        } else {
          alert(JSON.stringify(res.data.responseDesc));
        }
      } else {
        alert("Invalid Username");
      }
    } catch (e) {
     alert("server down plz try again after some time");
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("username") === null &&
      localStorage.getItem("image") == null
    ) {
      submitDetails();
    }
  }, []);

  const formIk = useFormik({
    initialValues: {
      userId: "",
      userPassword: "",
    },
    //validationSchema: userValidationSchema,
    onSubmit: submitDetails,
  });
  // document.getElementById("username").value=null;

  document.body.classList.add(
    'jnb-bg'      
  );


  return (

    
    <>
     
    <jnb.Navbar bg="light" expand="lg" >
      <jnb.Container fluid>
        <jnb.Navbar.Brand href="#"><img src="../img/logo.png " width="200px" alt="Jnanabhumi"/></jnb.Navbar.Brand>
        <jnb.Navbar.Toggle aria-controls="navbarScroll" />
        <jnb.Navbar.Collapse id="navbarScroll">
          <jnb.Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <jnb.Nav.Link href="/">Home</jnb.Nav.Link>
            <jnb.Nav.Link href="/">GOs</jnb.Nav.Link>
            <jnb.Nav.Link href="/">Circulars</jnb.Nav.Link> 
          </jnb.Nav>
       
        </jnb.Navbar.Collapse>
      </jnb.Container>
    </jnb.Navbar>
    <jnb.Container >
    <img src="img/emc.svg" className="corner" alt="dots" />
    <jnb.Row >
       {/* <jnb.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
       <div className="vertical-center">
       <img src="../img/slider.svg" width="65%" alt="Jnanabhumi"/>
       </div>
      </jnb.Col> */}
      <jnb.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>&nbsp;</jnb.Col>
      <jnb.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <div className="login-card ">
      <FormikProvider value={formIk}>
        <form onChange={formIk.handleChange} onSubmit={formIk.handleSubmit} className="form_adjust"  >
         
            
                    
          <div className="inner-herbpage-service-title-sub">
                       <h1 style={{fontSize:'30px'}}> Login</h1>
                     </div>
                 
            
            

            <jnb.InputGroup className="mb-3">
                  <jnb.InputGroup.Text id="basic-addon1" className="group_txt">
                    <BiUser className="font_size" />
                  </jnb.InputGroup.Text>
                  <Field
                type="text"
                name="userId"
                placeholder="Enter Your User Name"
                className="form-control" 
              />
                  <ErrorMessage
                name="userId"
                component="div"
                className="fa fa-exclamation-triangle text-danger"
              />
                </jnb.InputGroup>

                <jnb.InputGroup className="mb-3">
                  <jnb.InputGroup.Text id="basic-addon2" className="group_txt">
                    <BiLock className="font_size" />
                  </jnb.InputGroup.Text>
                  <Field placeholder="Password" name="userPassword" type="password"  
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    className="form-control" autoComplete="off" />
                    <ErrorMessage
                name="userPassword"
                component="div"
                className="fa fa-exclamation-triangle text-danger"
              />
                </jnb.InputGroup>
                
                <div className="d-grid gap-2">
                  <jnb.Button variant="success" type="submit" className="btn_primary">
                    Sign in
                  </jnb.Button>
                  {/* <a href="#" className="text-end text-black forgot mb-4" style={{ zIndex: "9994" }} onClick={navigatetoforgot}>Forgot Password ?</a> */}
                </div>

{/* 
            <jnb.FormGroup className="form-group">
              <label className="control-label star"> Username:</label>
              <Field
                type="text"
                name="userId"
                placeholder="Enter Your User NAME"
                className="form-control"
                class="col-sm-3 col-form-label"
              />
              <ErrorMessage
                name="userId"
                component="div"
                className="fa fa-exclamation-triangle text-danger"
              />
            </jnb.FormGroup> */}

           
 

            
          
          
        </form>
      </FormikProvider>
      </div>
      </jnb.Col>
      <jnb.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>&nbsp;</jnb.Col>
    </jnb.Row>

      
      </jnb.Container>
    </>
  );
}
