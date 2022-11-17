import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';
import * as jnb from "react-bootstrap"; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import LoadingService from '../../../ScholarshipRenewal/Components/Api\'s/LoadingService';
import { API_URL } from '../../../ScholarshipRenewal/Components/Api\'s/Apis';
import Header from '../../../Header/Header';
import { useBetween } from 'use-between';
import useCounter from '../allTags';

import { formikValidations, forrmikInitialValue } from './PreRegistrationValidation';


function useSharedCounter() { 
  return useBetween(useCounter);
}


export default function PreRegistration() {
  const {cetAdharDetails,setCetAdharDetails,setSscdata,Sscdata} = useSharedCounter();
const navigate=useNavigate();

const [showDistCode,setDistCode]=useState('');
const [showManList,setManList]=useState([]);
const [showDistManApi,setDistManApi]=useState({});
const [showMandalCode,setMandalCode]=useState('');
const [showVillApi,setVillApi] = useState([]);
useEffect(()=>{
  axios.get("http://172.16.150.53:8302/jnbap/apdistman").then(response=>{
   // alert(JSON.stringify(response.data));
    setDistManApi(response.data);
  })
},[]
);

 const formIk = useFormik({
        enableReinitialize:true,
        initialValues:forrmikInitialValue,
       validationSchema:formikValidations,
      
  onSubmit:(values)=>{
    alert(JSON.stringify(values));    
            LoadingService.SaveCetData(values).then((res)=>{
                if(res.data!==null){
                    alert("Application Submitted Successfully");
                    console.log("responsed data", res)
                  navigate("/")
                   
                }
                else{
                    alert("Failed To Submit ");
                }
            })
           .catch(()=>{
            alert("Server is too busy plz try again after sometime")
           })
          
        }
    });
    useEffect(
      () => {
        
        if(showDistCode !== '')
        {
          setManList(showDistManApi.APCFSS_Mandals.filter((dVal) => dVal.distCode==showDistCode));
        }
      },[showDistCode]
    );
    
    
    const getVillageDataFunction = async(e)=>
    {
      setMandalCode(e.target.value);
      // alert("mandal code ::::::::" + showMandalCode);
      let villUrl=(API_URL+"villages/?distCode="+showDistCode+"&&mandalCode="+e.target.value);
      try{
      await axios.get(villUrl).then( response => {
        setVillApi(response.data);
      
      })
      }
      catch(exception){
        console.log("exception :::::::"+exception);
      }
    }
    
    
    function clearVillagesFunc()
    {
      formIk.setFieldValue("stu_village","");
    }
    
 function clearMandalsFunc()
    {
      formIk.setFieldValue("stu_mandal","");
    }


/*********For ssc service */
const [sscHtno, setSscHtno] = useState([]);
const [sscPassyr, setSscPassyr] = useState([]);


function Sscdetails(event) {
  let regUrl =

"http://172.16.150.48:8300/JnbOverseas/getsscdata?sscHallticketNo="+sscHtno+"&sscpassyear="+sscPassyr+"&sscpasstype="+event.target.value;

  axios.get(regUrl).then((response) => {
    alert(regUrl);
    setSscdata(response.data.data);
  });
}
return (
    <div>
             <Header/>
        <div className="main_section">  </div>
 <FormikProvider value={formIk}>
        <Form onSubmit={formIk.handleSubmit} onChange={formIk.handleChange}>
        <jnb.Container>
        <jnb.Row >
        <jnb.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
 <h1>Pre-Registration Form</h1>
                        </div>
                    </jnb.Col> 
        </jnb.Row>
        </jnb.Container>
      

        <jnb.Container className="outer-page-content-container " > 
 <div className="jumbotron mt20 form-card-jnb" style={{ marginTop: "5px" }}>
 <jnb.Row className="px-5 pt-3">
        <div className="inner-herbpage-service-title-sub"  >
 <h1>CET Details</h1>
        </div>
        <div className="form-card-jnb" style={{ marginTop: "5px" }}>
        <jnb.Row className="px-5 pt-5">
  <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p">
                     <span className="label-text-style"><b>Academic Year</b></span>
<Field component="select" name="ac_year" className="form-control">
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Field>
                     <ErrorMessage name="ac_year" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                 <span className="label-text-style"><b>CET Type</b></span>
            <Field component="select" name="cet_type" className="form-control">
              <option value="">Select</option>
              <option value="1">ICE</option>
              <option value="2">EAPCET</option>
              <option value="3">RCET</option>
            </Field>
                     <ErrorMessage name="cet_type" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
         
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
           <jnb.InputGroup className="mb-4p">
                     <span className="label-text-style"><b>CET Hallticket Number</b></span>
                     <Field type="text" name="cet_ht_no" className="form-control" maxLength="10"/>
                     <ErrorMessage name="cet_ht_no" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>

           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p">
                     <span className="label-text-style"><b>CET Rank</b></span>
                     <Field type="text" name="cet_rank" className="form-control" maxLength="5"/>
                     <ErrorMessage name="cet_rank" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                 <span className="label-text-style"><b>CET Course Name</b></span>
                 <Field component="select" name="cet_course_name" className="form-control">
              <option value="">Select</option>
              <option value="1">Agriculture Engineering</option>
              <option value="2">Civil Engineering</option>
              <option value="3">Computer Science Engineering</option>
            </Field>
                     <ErrorMessage name="cet_course_name" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
         
            
          
           </jnb.Row></div></jnb.Row>

           <jnb.Row className="px-5 pt-5">
<div className="inner-herbpage-service-title-sub"  style={{marginTop:'-30px'}}>
         <h1>SSC Details</h1>
        </div>
        <div className="form-card-jnb" style={{ marginTop: "5px" }}>
        <jnb.Row className="px-5 pt-5">
   
           <jnb.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>SSC Hallticket Number</b></span>
             <Field type="text" name="ssc_htno" maxLength="10" className="form-control" onChange={(event) => {
                        formIk.handleChange(event);
                        setSscHtno(event.target.value);
                      }}/>
                     <ErrorMessage name="ssc_htno" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
 <jnb.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>SSC Pass Year</b></span>
                     <Field component="select" name="ssc_pass_year" className="form-control"
                     onChange={(event) => {
                      formIk.handleChange(event);
                      setSscPassyr(event.target.value);
                    }}>
              <option value="">Select</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2021">2020</option>
            </Field>
                     <ErrorMessage name="ssc_pass_year" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>

           <jnb.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>SSC Pass Type</b></span>
                     <Field component="select" name="ssc_pass_type" className="form-control"
                     onChange={(event) => {
                      formIk.handleChange(event);
                      // setSscPassType(event.target.value);
                      Sscdetails(event);
                    }}>
              <option value="">Select</option>
              <option value="1">Regular</option>
              <option value="2">Supply</option>
             
            </Field>
                     <ErrorMessage name="ssc_pass_type" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
</jnb.Row></div></jnb.Row>


{/* {Sscdata.map((data)=>{ */}
<jnb.Row className="px-5 pt-5">
           <div className="inner-herbpage-service-title-sub"  style={{marginTop:'-30px'}}>
         <h1>Personal Details</h1>
        </div>
        <div className="form-card-jnb" style={{ marginTop: "5px" }}>
        <jnb.Row className="px-5 pt-5">
        <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p">
                     <span className="label-text-style"><b>Student Aadhaar No</b></span>
 <Field type="text" name="uid" className="form-control" 
                     onChange={ (e) => { setCetAdharDetails(e.target.value) }} />
<ErrorMessage name="uid" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           {/* {Sscdata && Sscdata.map((stud, i) => {
                              return (
                                <> */}
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Student Name</b></span>
                    
                     <Field type="text" name="stu_name" className="form-control" value={Sscdata.NAME}/>
                    
                 </jnb.InputGroup>
           </jnb.Col>
           {/* </>
                              );
                            })} */}
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                 <span className="label-text-style"><b>Gender&nbsp;</b></span>
            <Field type="radio" name="gender" value="M"/>
            &nbsp;Male  &nbsp;
            <Field type="radio" name="gender" value="F"/>
            &nbsp;Female
            <ErrorMessage name="gender" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                 <span className="label-text-style"><b>DOB&nbsp;</b></span>
                 <Field type="text" name="dob" className="form-control " value={Sscdata.DOB}/>
                    
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Father Name</b></span>
                     {/* <label>Student Aadhar No</label> */}
                     <Field type="text" name="stu_father_name" className="form-control" value={Sscdata.FNAME} />
                    
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Mother Name</b></span>
                     <Field type="text" name="stu_mother_name" className="form-control" value={Sscdata.MNAME} />
                  
                 </jnb.InputGroup>
           </jnb.Col>

    
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Mobile Number</b></span>
                     <Field type="text" name="mobileNo" className="form-control"  />
                     <ErrorMessage name="mobileNo" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Email </b></span>
                     <Field type="email" name="email" className="form-control"  />
                     <ErrorMessage name="email" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>

           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Social Status of the Student</b></span>
                     <Field component="select" name="caste" className="form-control">
              <option value="">Select</option>
              <option value="OC">OC</option>
              <option value="BC">BC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
  </Field>
                     <ErrorMessage name="caste" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           
</jnb.Row>
</div>

</jnb.Row>
{/* })} */}
<br/>
 </div>
 <jnb.Row className="p-4">
            <jnb.Col xs={12} sm={12} md={12} lg={10} xl={10} xxl={10}>&nbsp;</jnb.Col>
            <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
            <div className="d-grid">
            <jnb.Button variant="success" type="submit">
          Submit
        </jnb.Button> 
        </div>
              </jnb.Col>
        
      </jnb.Row>
        </jnb.Container>

       


 </Form>
        </FormikProvider>
    </div>
  )
}
