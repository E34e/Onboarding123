
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorMessage, Field, Formik, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as jnb from "react-bootstrap"; 
// import Header from "../Header/Header";
import { formikValidations, forrmikInitialValues } from "./studentDetailsValidations";
// import LoadingService from "./Api's/LoadingService";
import { useBetween } from "use-between";
import useCounter from "./allTags";
import axios from "axios";
import LoadingService from "../../ScholarshipRenewal/Components/Api's/LoadingService";

import moment from "moment";
import { API_URL } from "../../ScholarshipRenewal/Components/Api's/Apis";
// import useCounter from "/allTags";
function useSharedCounter() { return useBetween(useCounter);}
export default function StudentDetails() {
 
  const { tabDetails,setTabDetails} = useSharedCounter();
  const formIk = useFormik({
    enableReinitialize: true,
    initialValues: forrmikInitialValues,
    onSubmit: (values) => {
      alert("hello");
      LoadingService.studentDetailsSave(values).then((res) => {
        if (res.data) {
            alert("Student details");
            if (res.data !== null) {
              alert("Inserted Data Successfully!.");
              if(res.data.scode==="01"){
                setTabDetails({currentTab:"EducationalDetails"})
              }
             
              //navigate("/promotestudents");
              console.log("Successfully Inserted data",JSON.stringify(res.data));
              console.log(JSON.stringify(res.data));
              console.log(values)
            } 
            else {
              alert("Oops! Something went wrong at Student Details tab,Please check");
              console.log("Oops! Something went wrong at Student Details tab,Please check");
            }
            console.log(res.data);
          } else {
            alert("failure");
            console.log("failure at student page");
          }})
        .catch(() => {
          console.log("Exception Occured 71");
        });
    },
  validationSchema: formikValidations,
  });


  
    function clearMandalsFunc()
    {
      formIk.setFieldValue("mandaLcode","");
    }
    function clearVillagesFunc()
    {
      formIk.setFieldValue("villageCode","");
    }

    function clearHabsFunc()
    {
      formIk.setFieldValue("habCode","");
    }
    const [showDistCode,setDistCode]=useState('');
    const [showManList,setManList]=useState([]);
    const [showDistManApi,setDistManApi]=useState({});
    const [showMandalCode,setMandalCode]=useState('');
    const [showVillApi,setVillApi] = useState([]);
    const [showHabApi,setHabApi] = useState([]);
    const [showApiData,setApiData] = useState({});
    const [showRelValue,setRelValue] = useState('');
    const [showCasteList,setCasteList] = useState([]);
    const [showCasteCode,setCasteCode] = useState('');
    const [showSubCasteList,setSubCasteList] = useState([]);


    useEffect(()=>{
      axios.get(API_URL+"apdistman").then(response=>{
       // alert(JSON.stringify(response.data));
        setDistManApi(response.data);
      })
    },[]
    );

    useEffect(
      () => {
        //alert(showDistCode);
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
        console.log(response.data);
      })
      }
      catch(exception){
        console.log("exception :::::::"+exception);
      }
    }
    const getHabitationsFunc = async(e) =>{
      let habUrl=(API_URL+"aphabitations/?distCode="+showDistCode+"&&mandalCode="+showMandalCode);
      try{
        const response1= await axios.get(habUrl);
        setHabApi(response1.data);
      }
      catch(exception){
        console.log("Habitation exception::::::"+exception)
      }
    }
          //  ***************Setting Field Values************   
    useEffect(()=>{
      gapDetailsFunction()
    },[]
    );


    function gapDetailsFunction() {
      //alert("First ::"+application);
      let regUrl =
      "http://172.16.150.61:8302/jnbap/getCetDetails";
      axios.get(regUrl).then((response) => {
     alert(JSON.stringify(response.data));
            formIk.setFieldValue("studentAadharNo",response.data.uid);
            formIk.setFieldValue("studentName","rajini");
            formIk.setFieldValue("fatherName",response.data.stu_father_name);
      })
    }

    function clrPh()
    {
      formIk.setFieldValue("saderamNo","");
      formIk.setFieldValue("typeOfDisability","");
      formIk.setFieldValue("percentOfDisability","");
      formIk.setFieldValue("saderamCertificate","");
    }
    function clrPerAddr()
    {
      formIk.setFieldValue("isPermanentState","");
      formIk.setFieldValue("isPermanentDistrict","");
      formIk.setFieldValue("isPermanentManadl","");
      formIk.setFieldValue("isPermanentHabitation","");
      formIk.setFieldValue("isPermanentStreet","");
      formIk.setFieldValue("isPermanentDoorNo","");
      formIk.setFieldValue("isPermanentPincode","");
    }

    function sadaramReadFileDataAsBase640(e) {
      e.preventDefault();
      const filevalue = e.target.value;
      const file = e.target.files[0];
     // alert(e.target.value);
     formIk.setFieldValue("saderamCertificate",filevalue);
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => { 
            formIk.setFieldValue("fileUpload",event.target.result);
          };
          reader.onerror = (err) => {
              reject(err);
          };
    
          reader.readAsDataURL(file);
      });
    }
    function clrDocUpload()
    {
      formIk.setFieldValue("saderamCertificate","");
    }
    function clrCaste() {
      formIk.setFieldValue("caste", "");
    }
    function clrsubCaste() {
      formIk.setFieldValue("subCaste", "");
    }
    useEffect(() => {
      axios.get(API_URL+"castesubcaste").then
          (response => {
              setApiData(response.data);
          })
       },[]);
    
      useEffect(() => {
        if(showRelValue!==''){
            setCasteList(showApiData.APCFSS_Castes.filter((relVal)=> relVal.religion===showRelValue)); 
            }
    
    },[showRelValue]);
    
    useEffect(() => {
      if(showCasteCode!==''){
          setSubCasteList(showApiData.APCFSS_SubCastes.filter((CasteCodeVal)=> CasteCodeVal.casteCode == showCasteCode));
          }
    },[showCasteCode]);
   
      
  return (
    <>
     <div className="main_section">  </div>
    
      <FormikProvider value={formIk}>
        <Form onSubmit={formIk.handleSubmit} onChange={formIk.handleChange}>
        {/* <jnb.Container >
          <jnb.Row >
                   <jnb.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            <h1>Student Details</h1>
                        </div>
                    </jnb.Col> 
          </jnb.Row>
      </jnb.Container> */}

        <jnb.Container className="outer-page-content-container " > 
        <jnb.Row className="px-3 pt-3">
        <div className="inner-herbpage-service-title-sub"  style={{marginTop:'-30px'}}>
            <h1>Personal Details</h1>
        </div>
        <div className="jumbotron mt20 form-card-jnb" style={{ marginTop: "5px" }}>
        <jnb.Row className="px-5 pt-5">
       
        <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Father Aadhaar No</b></span>
                     <Field type="text" name="fatherAadharNo" className="form-control"  maxLength="12"/>
                     <ErrorMessage name="fatherAadharNo" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
          
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Mother Aadhaar No</b></span>
                     <Field type="text" name="motherAadharNo" className="form-control"  maxLength="12"/>
                     <ErrorMessage name="motherAadharNo" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>

         
        {/* <jnb.Row className="px-5 pt-3" > */}
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Father/Guardian Occupation </b></span>
                     <Field type="text" name="parentOccupation" className="form-control"/>
                     <ErrorMessage name="parentOccupation" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Mother Tongue</b></span>
            <Field component="select" name="motherToungue" className="form-control">
              <option value="">Select</option>
              <option value="1">Telugu</option>
              <option value="2">English</option>
              <option value="3">Hindi</option>
            </Field>
            <ErrorMessage name="motherToungue" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           </jnb.Row>
           <jnb.Row className="px-5 pt-3" > 
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Religion</b></span>
            <Field component="select" name="religion" className="form-control"
             onChange={(e) => { setRelValue(e.target.value); clrCaste(); clrsubCaste();}} >
              <option value="">Select</option>
              <option value="H">HINDU </option>
              <option value="M">MUSLIM</option>
              <option value="C">CHRISTIAN</option>
              <option value="S">SIKH</option>
              <option value="J">JAIN  </option>
              <option value="B">BUDDIST</option>
              <option value="P">PARSI</option>
              <option value="O">OTHERS</option>
              <option value="N">NA</option>
            </Field>
            <ErrorMessage name="religion" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Caste</b></span>
            <Field component="select" name="caste" className="form-control"
               onChange={(e) => { setCasteCode(e.target.value); clrsubCaste();}} >
               <option value="">----Select-----</option>
                      {showCasteList!==undefined && 
                      showCasteList.map((cs,i)=>{
                          return <option key={i}  value={cs.casteCode}> {cs.casteDesc} </option>
                        } )
                      }
            </Field>
            <ErrorMessage name="caste" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
         
        {/* <jnb.Row  className="px-5 pt-3" > */}
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Sub Caste</b></span>
            <Field component="select" name="subCaste" className="form-control">
            <option value="">----Select-----</option>
                            {showSubCasteList!==undefined && 
                            showSubCasteList.map((scs,i)=>{
                            return <option key={i} value={scs.subCasteCode}> {scs.subCasteDesc} </option>
                                } )
                            }
            </Field>
            <ErrorMessage name="subCaste" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Nationality</b></span>
            <Field component="select" name="nationality" className="form-control">
              <option value="">Select</option>
              <option value="1">Indian</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Field>
            <ErrorMessage name="nationality" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           </jnb.Row>
           <jnb.Row  className="px-5 pt-3" >
          <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                <jnb.InputGroup className="mb-4p5">
                <span className="label-text-style"><b>Physically Challenged &nbsp;</b></span>
           <Field type="radio" name="isPh" value="true"/>
           &nbsp;Yes  &nbsp;
           <Field type="radio" name="isPh" value="false" onClick={(e)=>{clrPh(e);clrDocUpload(e)}}/>
           &nbsp;No
           <ErrorMessage name="isPh" component="div" className="text-error"/>
                </jnb.InputGroup>
          </jnb.Col>
          {formIk.values.isPh==='true' && 
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
           <jnb.InputGroup className="mb-4p5">
               <span className="label-text-style"><b>Saderam No</b></span>
               <Field type="text" name="saderamNo" className="form-control"/>
               <ErrorMessage name="saderamNo" component="div" className="text-error" />
           </jnb.InputGroup>
           </jnb.Col>}

       {formIk.values.isPh==='true' && 
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
              <jnb.InputGroup className="mb-4p5">
            <span className="label-text-style"><b>Type of Disability</b></span>
           <Field component="select" name="typeOfDisability" className="form-control">
             <option value="">Select</option>
             <option value="1">HH-Hearing Handicaped</option>
             <option value="2">MW-Muscular Weakness</option>
             <option value="3">OH-Orthopaedically Handicaped</option>
             <option value="4">VH-Visually Handicaped</option>
           </Field>
           <ErrorMessage name="typeOfDisability" component="div" className="text-error" />
           </jnb.InputGroup>
       </jnb.Col>}
       {formIk.values.isPh==='true' && 
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
           <jnb.InputGroup className="mb-4p5">
               <span className="label-text-style"><b>% of disability </b></span>
               <Field component="select"  name="percentOfDisability" className="form-control">
               <option value="">--Select--</option>
                               <option value="40-45">40-45</option>
                               <option value="46-50">46-50</option>
                               <option value="51-55">51-55</option>
                               <option value="56-60">56-60</option>
                               <option value="61-65">61-65</option>
                               <option value="66-70">66-70</option>
                               <option value="Above 70">Above 70</option></Field>
               <ErrorMessage name="percentOfDisability" component="div" className="text-error" />
           </jnb.InputGroup>
       </jnb.Col>}
       {/* {formIk.values.isPh==='true' && 
       <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <jnb.InputGroup className="mb-4p5">                       
                       <span className="label-text-style"><b>Sadarem Certificate Upload&nbsp;</b></span>
                     
                       <Field type="file" name="saderamCertificate" className="form-control" onChange={(e)=>{sadaramReadFileDataAsBase640(e);}}/>
                       <Field type="hidden" name="fileUpload" className="form-control"/>
                       <ErrorMessage name="saderamCertificate" component="div" className="text-error"/>
                       </jnb.InputGroup>
                   
            </jnb.Col>} */}
         </jnb.Row>  
        {/* ********************** Student Address Details************************ */}
        <jnb.Row className="px-5 pt-3">  
        <div className="inner-herbpage-service-title-sub"  style={{marginTop:'-30px'}}>
            <h1>Student Address Details</h1>
        </div>
        <div className="form-card-jnb" style={{ marginTop: "5px"}}>
        <jnb.Row className="px-2 pt-5">
          <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>State</b></span>
            <Field component="select" name="stateCode" className="form-control">
            <option value="">Select</option>
              <option value="1">Andhra Pradesh</option>
              <option value="2">Andaman and Nicobar Islands</option>
              <option value="3">Arunachal Pradesh</option>
              <option value="4">Assam</option>
              <option value="5">Bihar</option>
              <option value="6">Chandigarh</option>
              <option value="7">Chhattisgarh</option>
              <option value="8">Dadar and Nagar Haveli</option>
              <option value="9">Daman and Diu</option>
              <option value="10">Delhi</option>
              <option value="11">Lakshadweep</option>
              <option value="12">Puducherry</option>
              <option value="13">Goa</option>
              <option value="14">Gujarat</option>
              <option value="15">Haryana</option>
              <option value="16">Himachal Pradesh</option>
              <option value="17">Jammu and Kashmir</option>
              <option value="18">Jharkhand</option>
              <option value="19">Karnataka</option>
              <option value="20">Kerala</option>
              <option value="21">Madhya Pradesh</option>
              <option value="22">Maharashtra</option>
              <option value="23">Manipur</option>
              <option value="24">Meghalaya</option>
              <option value="25">Mizoram</option>
              <option value="26">Nagaland</option>
              <option value="27">Odisha</option>
              <option value="28">Punjab</option>
              <option value="29">Rajasthan</option>
              <option value="30">Sikkim</option>
              <option value="31">Tamil Nadu</option>
              <option value="32">Telangana</option>
              <option value="33">Tripura</option>
              <option value="34">Uttar Pradesh</option>
              <option value="35">Uttarakhand</option>
              <option value="36">West Bengal</option>
            </Field>
            <ErrorMessage name="stateCode" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>District</b></span>
            <Field component="select" name="district" className="form-control"
               onBlur={(event)=>{setDistCode(event.target.value)}}
               onClick={()=> {clearMandalsFunc(); clearVillagesFunc(); clearHabsFunc();}}>
              <option value="">--Select--</option>
              {showDistManApi.APCFSS_Districts !== undefined &&
              showDistManApi.APCFSS_Districts.map((ds,i)=>{
                return <option key={i} value={ds.distCode}>{ds.distName}</option>
              })}
            </Field>
            <ErrorMessage name="district" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Mandal</b></span>
            <Field component="select" name="mandal" className="form-control"onBlur={(event)=>{getVillageDataFunction(event);}}
          onClick={() =>{clearVillagesFunc(); clearHabsFunc();}}>
              <option value="">--Select--</option>
              {showManList !== undefined && 
            showManList.map((ms,i)=>{
              return <option key={i} value={ms.mandalCode}>{ms.mandalName}</option>
            })}
            </Field>
            <ErrorMessage name="mandal" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
                <span className="label-text-style"><b>Village</b></span>
            <Field component="select" name="village" className="form-control"
            onBlur={getHabitationsFunc}>
           <option value="">--select--</option>
           {showVillApi !== undefined && 
           showVillApi.map((vs,i) =>{
            return <option key={i} value={vs.villageCode}>{vs.villageName}</option>
           })}
            </Field>
            <ErrorMessage name="village" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           </jnb.Row>

           <jnb.Row className="px-2 pt-3">
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                    <span className="label-text-style"><b>Habitation</b></span>
            <Field component="select" name="habCode" className="form-control"
            onChange={formIk.handleChange}>
              <option value="">--select--</option>
              {showHabApi !== undefined &&
                showHabApi.map((hs,i) => {
                  return <option key={i} value={hs.habCode}>{hs.habitation}</option>
                })}
                </Field>
              <ErrorMessage name="habCode" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Street / Land Mark</b></span>
                     <Field type="text" name="street" className="form-control"/>
                     <ErrorMessage name="street" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Door/House No</b></span>
                     <Field type="text" name="doorNo" className="form-control"/>
                     <ErrorMessage name="doorNo" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>PIN Code</b></span>
                     {/* <label>Student Aadhar No</label> */}
                     <Field type="text" name="pincode" className="form-control" maxLength="6"/>
                     <ErrorMessage name="pincode" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>

           </jnb.Row>
          </div>
        </jnb.Row>
        <jnb.Row className="px-5 pt-5"  >
        <div className="inner-herbpage-service-title-sub"  style={{marginTop:'-30px'}}>
            <h1>Permanent address </h1>
        </div>
        <div className="form-card-jnb" style={{ marginTop: "5px"}}>
        <jnb.Row className="px-2 pt-5">
        <jnb.Col xs={12} sm={12} md={12} lg={3} xl={5} xxl={5}>
                 <jnb.InputGroup className="mb-4p5">
                 <span className="label-text-style"><b>If Present Addres is same as Permanent address &nbsp;</b></span>
            <Field type="radio" name="addressType" value="C" onClick={clrPerAddr}/>
            &nbsp;Yes  &nbsp;
            <Field type="radio" name="addressType" value="P"/>
            &nbsp;No
            <ErrorMessage name="addressType" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           </jnb.Row>
           {formIk.values.addressType==='P' && 
           <jnb.Row  className="px-5 pt-3">
             <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>State</b></span>
            <Field component="select" name="isPermanentState" className="form-control">
            <option value="">Select</option>
              <option value="1">Andhra Pradesh</option>
              <option value="2">Andaman and Nicobar Islands</option>
              <option value="3">Arunachal Pradesh</option>
              <option value="4">Assam</option>
              <option value="5">Bihar</option>
              <option value="6">Chandigarh</option>
              <option value="7">Chhattisgarh</option>
              <option value="8">Dadar and Nagar Haveli</option>
              <option value="9">Daman and Diu</option>
              <option value="10">Delhi</option>
              <option value="11">Lakshadweep</option>
              <option value="12">Puducherry</option>
              <option value="13">Goa</option>
              <option value="14">Gujarat</option>
              <option value="15">Haryana</option>
              <option value="16">Himachal Pradesh</option>
              <option value="17">Jammu and Kashmir</option>
              <option value="18">Jharkhand</option>
              <option value="19">Karnataka</option>
              <option value="20">Kerala</option>
              <option value="21">Madhya Pradesh</option>
              <option value="22">Maharashtra</option>
              <option value="23">Manipur</option>
              <option value="24">Meghalaya</option>
              <option value="25">Mizoram</option>
              <option value="26">Nagaland</option>
              <option value="27">Odisha</option>
              <option value="28">Punjab</option>
              <option value="29">Rajasthan</option>
              <option value="30">Sikkim</option>
              <option value="31">Tamil Nadu</option>
              <option value="32">Telangana</option>
              <option value="33">Tripura</option>
              <option value="34">Uttar Pradesh</option>
              <option value="35">Uttarakhand</option>
              <option value="36">West Bengal</option>
            </Field>
            <ErrorMessage name="isPermanentState" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>District</b></span>
            <Field component="select" name="isPermanentDistrict" className="form-control"
               onBlur={(event)=>{setDistCode(event.target.value)}}
               onClick={()=> {clearMandalsFunc(); clearVillagesFunc(); clearHabsFunc();}}>
              <option value="">--Select--</option>
              {showDistManApi.APCFSS_Districts !== undefined &&
              showDistManApi.APCFSS_Districts.map((ds,i)=>{
                return <option key={i} value={ds.distCode}>{ds.distName}</option>
              })}
            </Field>
            <ErrorMessage name="isPermanentDistrict" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Mandal</b></span>
            <Field component="select" name="isPermanentManadl" className="form-control"onBlur={(event)=>{getVillageDataFunction(event);}}
          onClick={() =>{clearVillagesFunc(); clearHabsFunc();}}>
              <option value="">--Select--</option>
              {showManList !== undefined && 
            showManList.map((ms,i)=>{
              return <option key={i} value={ms.mandalCode}>{ms.mandalName}</option>
            })}
            </Field>
            <ErrorMessage name="isPermanentManadl" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Village</b></span>
            <Field component="select" name="isPermanentVillage" className="form-control"
            onBlur={getHabitationsFunc}>
           <option value="">--select--</option>
           {showVillApi !== undefined && 
           showVillApi.map((vs,i) =>{
            return <option key={i} value={vs.villageCode}>{vs.villageName}</option>
           })}
            </Field>
            <ErrorMessage name="isPermanentVillage" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           </jnb.Row>}
           {formIk.values.addressType==='P' && 
           <jnb.Row className="px-5 pt-3">
              <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
            <jnb.InputGroup className="mb-4p5">
             <span className="label-text-style"><b>Habitation</b></span>
            <Field component="select" name="isPermanentHabitation" className="form-control"
            onChange={formIk.handleChange}>
              <option value="">--select--</option>
              {
                showHabApi !== undefined &&
                showHabApi.map((hs,i) => {
                  return <option key={i} value={hs.habCode}>{hs.habitation}</option>
                })
              }
            </Field>
            <ErrorMessage name="isPermanentHabitation" component="div" className="text-error" />
            </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Street / Land Mark</b></span>
                     <Field type="text" name="isPermanentStreet" className="form-control"/>
                     <ErrorMessage name="isPermanentStreet" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>Door/House No</b></span>
                     <Field type="text" name="isPermanentDoorNo" className="form-control"/>
                     <ErrorMessage name="isPermanentDoorNo" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                 <jnb.InputGroup className="mb-4p5">
                     <span className="label-text-style"><b>PIN Code</b></span>
                     <Field type="text" name="isPermanentPincode" className="form-control" maxLength="6"/>
                     <ErrorMessage name="isPermanentPincode" component="div" className="text-error" />
                 </jnb.InputGroup>
           </jnb.Col>
           </jnb.Row>}
          </div>
        </jnb.Row>
        <jnb.Row className="p-4">
            <jnb.Col xs={12} sm={12} md={12} lg={10} xl={10} xxl={10}>&nbsp;</jnb.Col>
            <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
            <div className="d-grid">
              <Button variant="success" type="submit">Submit</Button> 
            </div>
            </jnb.Col>
        </jnb.Row>
      </div>
    </jnb.Row>
  </jnb.Container> 
  </Form>
  </FormikProvider>
    
    </>
  );
}