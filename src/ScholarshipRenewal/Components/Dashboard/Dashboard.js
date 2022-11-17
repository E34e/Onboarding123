import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";  
import { Form, FormikProvider, useFormik } from "formik"; 
import Header from '../../../Header/Header';
import * as jnb from "react-bootstrap"; 
import { BsBoxArrowInUpRight } from 'react-icons/bs';
function Dashboard() {
  const formikInitialValues = {
    course: "",
    year: "",
  };
  const formIk = useFormik({
    enableReinitialize: true,
    initialValues: formikInitialValues,
  });


  return (
    <>
     <Header />
     <div className="main_section">  </div>
      <FormikProvider value={formIk}>
        <Form onSubmit={formIk.handleSubmit}>

        <jnb.Container >
          <jnb.Row >
                   <jnb.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            {/* <h1>Form of Application For Service Pension / Family Pension / Retirement Gratuity / <br/>Service Gratuity  / Commutation</h1> */}
                            <h1>Dashboard</h1>
                        </div>
                    </jnb.Col> 
          </jnb.Row>
        </jnb.Container>



        <jnb.Container className="outer-page-content-container " >
            <jnb.Row className="p-4">
              <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
               
                <div class="deck">
                <div class="service">
                  <div class="service-title">
                    <h6>JVD's</h6> 
                    <p>Jagananna Vidya Deevena</p>
                    <a href="/" class=""><img alt="link to Service" src="../img/right-arrow.svg" class="service-link"/></a>
                    <div class="icon"><img src="../img/jvd.svg" alt="Administration" /></div>
                  </div>
                
                </div>
                </div>
                </jnb.Col>
                <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                <div class="deck">
                <div class="service">
                  <div class="service-title">
                    <h6>J Nivas</h6> 
                    <p>Hostels</p>
                    <a href="/" class=""><img alt="link to Service" src="../img/right-arrow.svg" class="service-link"/></a>
                    <div class="icon"><img src="../img/nivas.svg" alt="Administration" /></div>
                  </div>
                
                </div>
                </div>
              </jnb.Col>
              <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                <div class="deck">
                <div class="service">
                  <div class="service-title">
                    <h6>JVVD</h6> 
                    <p>Jagananna Videsi Vidya Deevena</p>
                    <a href="/" class=""><img alt="link to Service" src="../img/right-arrow.svg" class="service-link"/></a>
                    <div class="icon"><img src="../img/jvvd.svg" alt="Administration" /></div>
                  </div>
                
                </div>
                </div>
              </jnb.Col>

              
            </jnb.Row> 
      
            <jnb.Row className="p-4 mt-4">
                        <div className="inner-herbpage-service-title-sub mb-3">
                            <h1>Jagananna Vidya Deevena</h1>
                        </div>
                  <div className="service-grid">
                    <span> Fresh Onboarding</span>
                    <span className="right-arrow"> <BsBoxArrowInUpRight/> </span> 
                  </div>
                  <div className="service-grid">
                    <span>  Promotion</span>
                    <span className="right-arrow"> <BsBoxArrowInUpRight/> </span> 
                  </div>




                  <div className="inner-herbpage-service-title-sub mb-3">
                            <h1>J Nivas</h1>
                        </div>
                  <div className="service-grid">
                    <span> Institution Profile</span>
                    <span className="right-arrow"> <BsBoxArrowInUpRight/> </span> 
                  </div>
                  <div className="service-grid">
                  <span>  Biometric Attendance</span>
                  <span className="right-arrow"> <BsBoxArrowInUpRight/> </span> 
                  </div>



                  <div className="inner-herbpage-service-title-sub mb-3">
                            <h1>Jagananna Videsi Vidya Deevena</h1>
                  </div>
                  <div className="service-grid">
                  <span>  JVVD Verification</span>
                  <span className="right-arrow"> <BsBoxArrowInUpRight/> </span> 
                  </div>
                  <div className="service-grid">
                  <span> JVVD Candidate Selection</span>
                  <span className="right-arrow"> <BsBoxArrowInUpRight/> </span> 
                  </div>
              </jnb.Row>
      </jnb.Container>
      </Form>
      </FormikProvider>
    </>
  );
}

export default Dashboard;

