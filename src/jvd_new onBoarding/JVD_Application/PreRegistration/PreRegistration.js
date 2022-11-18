import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';
import * as jnb from "react-bootstrap"; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';


import Header from '../../../Header/Header';
import { useBetween } from 'use-between';
import useCounter from '../allTags';


import LoadingService from '../../../ScholarshipRenewal/Components/Api\'s/LoadingService';
import { cetforrmikInitialValuess, cstformikValidations } from './PreRegistrationValidation';
import { API_URL } from '../../../ScholarshipRenewal/Components/Api\'s/Apis';



function useSharedCounter() { 
  return useBetween(useCounter);
}


export default function PreRegistration() {
  const {cetAdharDetails,setCetAdharDetails,setSscdata,Sscdata,cetTypeData,
      setCetTypeData,basicScreenDetails,setBAsicScreenDetails,
      cetCourseNAme, SetcetCourseNAme} = useSharedCounter();
const navigate=useNavigate();
const [showData,setData]=useState("")



 const formIk = useFormik({
        enableReinitialize:true,
        initialValues:cetforrmikInitialValuess,
     //  validationSchema:cstformikValidations,
      
  onSubmit:(values)=>{
    alert("hi")   
    console.log(values);
   
    var answer = window.confirm("Save data?");
  if (answer) {
    alert("Are you sure you want to save this?");
    LoadingService.SaveCetData(values).then((res)=>{
            alert(JSON.stringify(res.data))
            // setBAsicScreenDetails(res.data)
if(res.data.scode==="01"){
   
      const msg1 = (
            <div>
              <p> Registration Successfully Completed </p><br/>

              <p>  <b style={{color:"red"}} >{res.data.reg_id}</b></p>
              <p>        <b style={{color:"red"}} >{res.data.temp_password}</b></p>
             <p> <a href='http://localhost:3000/jvd'>Click here to Go To Student Details Page</a></p>
              </div>
          );

          setData(msg1);
      console.log("responsed data", res.data)

}
 })
           .catch(()=>{
            alert("Server is too busy plz try again after sometime")
           })
      }
      else{
            alert("cancel");
      }
        }
        
    }
    );
//     alert(JSON.stringify(showData))






/*********For ssc service */
const [sscHtno, setSscHtno] = useState([]);
const [sscPassyr, setSscPassyr] = useState([]);


function Sscdetails(event) {
  let regUrl =

"http://172.16.150.48:8300/JnbOverseas/getsscdata?sscHallticketNo="+sscHtno+"&sscpassyear="+sscPassyr+"&sscpasstype="+event.target.value;

  axios.get(regUrl).then((response) => {

setSscdata(response.data.data);
  });
}


/*****For cet type */
function Cetdata(){
 // let regUrl="http://172.16.150.61:8302/jnbap/"+{collCode}+"/getCetRegistredValues ";
 let regUrl="http://172.16.150.61:8302/jnbap/12532/getCetRegistredValues";
 axios.get(regUrl).then((response)=>{
  console.log("cettype",cetTypeData)
  setCetTypeData(response.data)
  
 })

}


/**Cet courses */


function CetCourses(){
      let regUrl="http://172.16.150.61:8302/jnbap/15472/getCollegesRegistration ";
      axios.get(regUrl).then((response)=>{
            console.log("courses",response.data)
       SetcetCourseNAme(response.data)
       
      })     
}
useEffect(()=>{
  Cetdata()
  CetCourses()
},[])





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
                 <jnb.InputGroup className="mb-4p5">
                 <span className="label-text-style"><b>CET Course Name</b></span>
                 <Field component="select" name="cet_course_name" className="form-control">
                 <option value="">--Select--</option>
              {cetCourseNAme!== undefined &&
              cetCourseNAme.map((ds,i)=>{
                return <option key={i} value={ds.course_name}>{ds.course_name}</option>
              })}
            </Field>
                     <ErrorMessage name="cet_course_name" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                 <span className="label-text-style"><b>CET Type</b></span>
            <Field component="select" name="cet_type" className="form-control">
            <option value="">--Select--</option>
              {cetTypeData!== undefined &&
              cetTypeData.map((ds,i)=>{
                return <option key={i} value={ds.cet_code}>{ds.cet_code}</option>
              })}
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
            <Field type="radio" name="gender" value="Male"/>
            &nbsp;Male  &nbsp;
            <Field type="radio" name="gender" value="Female"/>
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
                     <Field type="text" name="mobile_no" className="form-control"  />
                     <ErrorMessage name="mobile_no" component="div" className="text-error" />
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
<jnb.Row className="p-4">
            <jnb.Col xs={12} sm={12} md={12} lg={10} xl={10} xxl={10}><i className="text-danger"> {showData} </i>
            
            
            </jnb.Col>
            <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
            <div className="d-grid">
            <jnb.Button variant="success" type="submit" >
          Submit
        </jnb.Button> 
        </div>
              </jnb.Col>
        
      </jnb.Row>
 </div>

        </jnb.Container>

       


 </Form>
        </FormikProvider>
    </div>
  )
}
