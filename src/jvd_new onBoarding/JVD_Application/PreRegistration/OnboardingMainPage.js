// import React, { useEffect, useState } from 'react'
// import { Col, Row } from 'react-bootstrap';
// import Header from '../../../Header/Header';
// import * as jnb from "react-bootstrap";

// import StudentDetails from '../StudentDetails';
// import StudentEDucationDetails from '../StudentEDucationDetails';
// import axios from 'axios';
// import { useBetween } from 'use-between';
// import useCounter from '../allTags';


// function useSharedCounter() { 
//        return useBetween(useCounter);
//      }
// export default function OnboardingMainPage() {
//        const {cetAdharDetails,Sscdata,tabDetails,setTabDetails} = useSharedCounter();
//        const[OnboardingDetails,setonboardingdetails]= useState([{}]);


//  useEffect(() => {
//        let regUrl="http://172.16.150.53:8302/jnbap/"+ cetAdharDetails+"/getCetDetails"
//        axios.get(regUrl).then((response) => {
//               setonboardingdetails(response.data)
//   console.log("response",response.data);
//   });
//             }, []);    
       
    
//   return (
// <>
//        <Header/> 
//        <div className="main_section">  </div>
       
//        <jnb.Container className='outer-page-content-container'>
              
//        <jnb.Row className="px-5 pt-5" >
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
// <b>Student UID Number:</b>
//        </jnb.Col>
      
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
//        {OnboardingDetails[0].uid}
//        </jnb.Col>
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
// <b>Student Name:</b>
//        </jnb.Col>
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
// {Sscdata.NAME}
//        </jnb.Col>



//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
// <b>Gender:</b>
//        </jnb.Col>
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
//       {OnboardingDetails[0].gender}
//        </jnb.Col>







//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
// <b>DOB:</b>
//        </jnb.Col>
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
//  {Sscdata.DOB}
//        </jnb.Col>
//        <br/>
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
// <b>Father Name:</b>
//        </jnb.Col>
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
//        {Sscdata.FNAME}
//    </jnb.Col>
//    <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
// <b>Mother Name:</b>
//        </jnb.Col>
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
//        {Sscdata.MNAME}
//        </jnb.Col>  
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
// <b>Social Status:</b>
//        </jnb.Col>   
//        <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
//        {OnboardingDetails[0].caste}
//        </jnb.Col> 
//        <br/>
// </jnb.Row>
//        <jnb.Row className="px-3 pt-3"  >  
//        {/* <jnb.Tabs defaultActiveKey="Studentdetails"id="controlled-tab-example"  className="btn btn-light" > */}
//        <jnb.Tabs  defaultActiveKey={tabDetails.currentTab} 
//                   activeKey={tabDetails.currentTab}
//                   onSelect={(event) => {return setTabDetails({ currentTab: event });}}
//                   id="controlled-tab-example"  className="btn btn-light">
      
//   <jnb.Tab  eventKey="Studentdetails"  title="Student Details"><StudentDetails></StudentDetails> </jnb.Tab>
//        <jnb.Tab  eventKey="EducationalDetails"  title="Education Details"><StudentEDucationDetails></StudentEDucationDetails></jnb.Tab>
//               </jnb.Tabs>
//               </jnb.Row>
              
//  </jnb.Container>

//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Header from '../../../Header/Header';
import * as jnb from "react-bootstrap";

import StudentDetails from '../StudentDetails';
import StudentEDucationDetails from '../StudentEDucationDetails';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../ScholarshipRenewal/Components/Api\'s/Apis';
import { useBetween } from 'use-between';
import useCounter from '../allTags';
function useSharedCounter() { return useBetween(useCounter);}

export default function OnboardingMainPage() {
       const { tabDetails,setTabDetails} = useSharedCounter();
 
       const cetReducer= useSelector((details)=>details.cetReducer);
console.log("cetreducerr",cetReducer.cetdetails)
//console.log("studentdetails",cetReducer.studentdetails[0].uid)
 const dispatch = useDispatch();
       
//   function regDetailsFunction() {
      
              // let regUrl = "http://172.16.150.61:8302/jnbap/getCetDetails"+ adharValue;
//               let regUrl="http://172.16.150.53:8302/jnbap/"+cetReducer.cetdetails +"/getCetDetails"
//              axios.get(regUrl).then((response) => {
//                             console.log("response",response.data);
// //   setStudentData(response.data);
// //   console.log("filtered REsponse",studentData[0])
//   dispatch({type:"UPDATE_STUDENTDETAILS",payload:response.data});

//  });
//  }


 useEffect(() => {
       let regUrl=API_URL+cetReducer.cetdetails +"/getCetDetails"
       axios.get(regUrl).then((response) => {
                      console.log("response",response.data);
                      dispatch({type:"UPDATE_STUDENTDETAILS",payload:response.data[0]});
                     });
            }, []);    
           
           
    
  return (
<>
       <Header/> 
       <div className="main_section">  </div>
       
       <jnb.Container className='outer-page-content-container'>
              
       <jnb.Row className="px-5 pt-5" >
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
<b>Student UID Number:</b>
       </jnb.Col>
       
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
{cetReducer.studentdetails.uid}
       </jnb.Col>
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
<b>Student Name:</b>
       </jnb.Col>
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
{cetReducer.studentdetails.stu_name}
       </jnb.Col>
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
<b>DOB:</b>
       </jnb.Col>
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
 {cetReducer.studentdetails.dob}
       </jnb.Col>
       <br/>
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
<b>Father Name:</b>
       </jnb.Col>
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
 {cetReducer.studentdetails.stu_father_name}
   </jnb.Col>
   <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
<b>Mother Name:</b>
       </jnb.Col>
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
 {cetReducer.studentdetails.stu_mother_name}
       </jnb.Col>  
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
<b>Social Status:</b>
       </jnb.Col>   
       <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
       {cetReducer.studentdetails.caste}
       </jnb.Col> 
       <br/>

  </jnb.Row>
       <jnb.Row className="px-3 pt-3"  >  
       {/* <jnb.Tabs  defaultActiveKey="Studentdetails"  id="controlled-tab-example"  className="btn btn-light" {tabDetails.currentTab} > */}
       <jnb.Tabs  defaultActiveKey={tabDetails.currentTab} 
                  activeKey={tabDetails.currentTab}
                  onSelect={(event) => {return setTabDetails({ currentTab: event });}}
                  id="controlled-tab-example"  className="btn btn-light" >
  <jnb.Tab  eventKey="Studentdetails"  title="Student Details"><StudentDetails></StudentDetails> </jnb.Tab>
       <jnb.Tab  eventKey="EducationalDetails"  title="Education Details"><StudentEDucationDetails></StudentEDucationDetails></jnb.Tab>
              </jnb.Tabs>
              </jnb.Row>
              
 </jnb.Container>

    </>
  )
}
