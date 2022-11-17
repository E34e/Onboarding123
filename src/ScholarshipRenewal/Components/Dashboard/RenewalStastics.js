import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";  
import { Col, Container, Modal, Row } from "react-bootstrap";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PieComponent from "./PieComponet";
import { Field, Form, FormikProvider, useFormik } from "formik";
import localStorage from "redux-persist/es/storage";
import useCounter from "./useStatesData.js";
import { useBetween } from "use-between";
import Header from "../../../Header/Header";
import * as jnb from "react-bootstrap"; 

import LoadingService from "../Api's/LoadingService";
import PieChart from "./PieComponet";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import DataTable from "react-data-table-component";
import Stackedbarchart from "./StackedBarChart";
import { FiFilter } from 'react-icons/fi';
import { BiSearchAlt } from 'react-icons/bi';
import ConfirmstudentDetails from "./ConfirmstudentDetails";

function useSharedCounter() {
  return useBetween(useCounter);
}

export default function RenewalStastics() {


  function refreshPage() {
    window.location.reload(false);
  }
/////--------------UseStates--------------------------//
  const { show, setShow } = useSharedCounter();
  const [studentInfo, setstudentInfo] = useState([]);
    const [payLoad, setPayLoad] = useState([]);
  const [studentId, setStudentId] = useState();
  const [courseYear,setCourseYear] = useState();
  const [courseName,setCourseName] = useState();
  const [showDetails, setDetails] = useState("");
  const[getLocalStorage,setLocalStorage]= useState("")
  const [showPendingData, setPendingData] = useState(false);

  /////---------------For Popup---------------/////
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  ///-------Payload----------///
  const payLoadValues = {
    student_id: "",
    course_id: "",
    year: "",
    choose: "",
    student_name: "",
    parentsname: "",
    caste: "",
  };
  const formIk = useFormik({
    enableReinitialize: true,
    initialValues: payLoadValues,

    onSubmit: (values) => {
      console.log(studentInfo.length);

      for (var i = 0; i < studentInfo.length; i++) {
        //alert(Object.keys(data.shareInfo[i]).length);
        payLoadValues.course_id = values.course_id;
        payLoadValues.year = values.year;
        payLoadValues.caste = studentInfo[i].caste;
        payLoadValues.student_id = studentInfo[i].student_id;
        payLoadValues.student_name = studentInfo[i].student_name;
        payLoadValues.parentsname = studentInfo[i].parentsname;
        payLoadValues.choose = true;

        console.log(studentInfo[i].student_id);

        setPayLoad([...payLoad, payLoadValues]);
      }
      console.log(JSON.stringify(payLoad));

//-------Post api hit--------------//

      LoadingService.saveData(payLoad)
        .then((res) => {
          if (res.data) {
            if (res.data !== null) {
              alert("Inserted Successfully!.");
   
              console.log(JSON.stringify(res.data));
            } else {
              alert("Oops! Something went wrong,Please check");
            }
            console.log(res.data);
          } else {
            alert("failure");
          }
        })
        .catch(() => {
          console.log("Exception Occured ");
        });
    },
  });

  //-----------localstorage get ---------///
 
 useEffect(() => {
 const dataPromise = localStorage.getItem("studentData");
    dataPromise.then(data => {
 setLocalStorage(data);
          console.log(JSON.parse(getLocalStorage))
});



//-----------report table data-----------------------------///////////
axios
      .get(
        // "http://172.16.150.61:8302/jnbap/promotestudents"
        "http://172.16.150.61:9000/jnb/promotestudents"
        )
      .then((response) => {
        setDetails(response.data);
      });
  }, [getLocalStorage]);

  function pendingFunc(coursename,courseyear) {
    setCourseYear(courseyear);
    setCourseName(coursename);
    setPendingData(true);
  }

//////-----------student id storing in local storage ---------/////////
  const handleRowSelected = React.useCallback(state => {
    let studentId = state.selectedRows.map((row) =>{
     // setShow(true)
     handleShow()
      localStorage.setItem("id",row.student_id)
    })
  }, []);

  // --------------------------------For navigation ------------------------------------------------- 

  const navigatetoNotPromote = () => {
    navigate("/demote");
  };


 
  //-----------------------For studentdetails  loop -------------------------
  const [courseid, setcourseid] = useState([]);
  const [year, setyear] = useState([]);
  const [studentdata, setstudentdata] = useState([]);
  function Studentdetails() {
    let regUrl =
      // "http://172.16.150.61:8302/jnbap/" + courseid + "/" + year + "/students";
      // "https://mocki.io/v1/61f289c5-1fa7-41a2-a4e5-bc0c8126a540"
      "https://mocki.io/v1/eda45a34-f3aa-4ecf-bdc9-fca94c271c9b"
    axios.get(regUrl).then((response) => {
      setstudentdata(response.data);
    });
  }

  useEffect(() => {
    Studentdetails();
  }, [courseid, year]);

const columns = [
    {
        name: 'StudentId',
        // cell: (row, index) => row.sno,
        selector: row => row.student_id,
        grow: '50'
        
    },
    {
        name: 'Student Name',
        selector: row => row.student_name,
        grow: '50'
    },
    {
        name: 'parentsname',
        selector: row => row.parentsname,
        grow: '100'
    },
    {
        name: 'caste',
        selector: row => row.caste,
        grow: '50'
    },
    {
      name: 'Updated Data',
      selector: row => "",
      grow: '150'
  },
  ]


  

  const handledisabled = row => row.status === 1;
    const tableData = {
        columns,
     studentdata
    };
  
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
                            <h1>Total Eligible Students</h1>
                        </div>
                    </jnb.Col> 
          </jnb.Row>
        </jnb.Container>
        <jnb.Container className="outer-page-content-container " >
        <jnb.Accordion defaultActiveKey="0" >
      <jnb.Accordion.Item eventKey="0" className="mb-2 border border-top">
        <jnb.Accordion.Header  ><FiFilter/>&nbsp;Filter</jnb.Accordion.Header>
        <jnb.Accordion.Body>
        <jnb.Row className="bg-filter">
              <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
              <jnb.InputGroup className="mb-4 mt-4">
                    <span className="label-text-style"><b>Course Group</b></span>
                          <select name="prcategory" className="form-control mandatoryField">
                            <option value=""> Select </option> 
                            <option value="">All </option> 
                            <option value=""> BA </option> 
                            <option value=""> B.Com </option> 
                            <option value=""> BSC</option> 
                          </select> 
              </jnb.InputGroup>
              </jnb.Col>
              <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
              <jnb.InputGroup className="mb-4 mt-4">
                    <span className="label-text-style"><b>Year</b></span>
                          <select name="prcategory" className="form-control mandatoryField">
                            <option value=""> Select </option> 
                            <option value="">All </option> 
                            <option value=""> 1st Year </option> 
                            <option value=""> 2nd Year</option> 
                            <option value=""> 3rd Year </option> 
                          </select> 
              </jnb.InputGroup>
              </jnb.Col>
              <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
              <jnb.InputGroup className="mb-4 mt-4">
              <span className="label-text-style"><b>Status</b></span>
                          <select name="prcategory" className="form-control mandatoryField">
                            <option value=""> Select </option> 
                            <option value="">All </option> 
                            <option value="">Promoted </option> 
                            <option value="">Not-Promoted</option> 
                            <option value="">Pending</option> 
                          </select> 
                          </jnb.InputGroup>
              </jnb.Col>
              <jnb.Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                <div className="d-grid mt-4">
               <jnb.Button variant="success"  type="submit">Search</jnb.Button>
               </div>
              </jnb.Col>
          </jnb.Row>
        </jnb.Accordion.Body>
      </jnb.Accordion.Item>
   
    </jnb.Accordion>
         
        <jnb.Row className="p-4">
            <jnb.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                   {/* <PieChart></PieChart> */}
                   <Stackedbarchart></Stackedbarchart>
                   <div>
                    <center>
                      <table
                       className="table table-condensed table-striped table-hover "
                       
                      >
                        <thead style={{ fontSize: "14px!important" }}>
                          <tr>
                            <th>S.No</th>
                            <th>Course Id</th>
                            <th>Year</th>
                            <th>Course </th>
                            <th>Promoted</th>
                            <th>Not Promoted</th>
                            <th>Pending</th>
                          </tr>
                        </thead>
                        <tbody>
                          {showDetails &&
                            showDetails.map((stud, i) => {
                              return (
                                <>
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td align="center">{stud.course_id}</td>
                                    <td align="center">{stud.year}</td>
                                    <td align="center">{stud.course}</td>
                                    <td align="right">{stud.promoted}</td>
                                    <td align="right">{stud.notpromoted}</td>
                                    <td align="right">
                                      <a style={{cursor:"pointer"}} href=" " className="text-primary button" onClick={()=>{pendingFunc(stud.course,stud.year)}}>
                                        {stud.pending}
                                      </a>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                    </center>
                  </div>
              </jnb.Col>
              <jnb.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
              <jnb.Row style={{padding:'0px;'}}>
              <jnb.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
  <span class="input-group-text" id="basic-addon2"> <BiSearchAlt/></span>
</div>
                </jnb.Col>
                <jnb.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  &nbsp;
                </jnb.Col>
                </jnb.Row>
              <jnb.Row style={{padding:'0px;'}} className="overflow-cards-scroll">
           
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}  >
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">B.Vocational</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">B.Ed(Hindi)</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">BSc</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">B.A</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">BCom</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">B.Sc(Zoology)</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">HC SOCIO</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">B.Vocational</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">B.Ed(Hindi)</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">BSc</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">B.A</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              <jnb.Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <div className="course-grp-deck">
                  <div className="course-grp-title">
                  <div className="groupshort">BCom</div>
                  <div className="clear-bth"></div>
                  <div className="course-grp-2col">
                    <div className="item border-end">  <small>Course ID</small><div className="course-id">34</div>  </div>
                    <div className="item">  <small>Total Strength</small><div className="total-count">100</div>  </div>
                    </div>
                      <table className="table table-hover table-striped table-sm ">
                     <tr>
                        <td align="center" ><div className="small-text">Promoted</div> </td>
                        <td align="center"><div className="small-text">Not Promoted</div> </td>
                        <td align="center"><div className="small-text">Pending</div> </td>
                      </tr>
                      <tr>
                        <td align="center" className="border-end"> <div class="values">20</div></td>
                        <td align="center" className="border-end"> <div class="values">30</div></td>
                        <td align="center"> <div class="values">50</div></td>
                      </tr>
                     </table> 
                     <div><img src="../img/next.svg" className="drilldown-right-icon" alt="" /></div>
                  </div> 
                </div>
              </jnb.Col>
              
                </jnb.Row>
             </jnb.Col>
              </jnb.Row>


              {showPendingData === true ? (
              <>
                
              <jnb.Row id="pendingId">
                  <jnb.Col sm={6}>
                    <b>Course:&nbsp;
                    <input type="text" value={courseName} className="text-primary"/>
                     
                      </b>
                  </jnb.Col>

                  <jnb.Col xs={6}>
                    <b>Course Year: &nbsp;
               <input type="text" value={courseYear} className="text-primary" />    
                    </b>
            </jnb.Col>
                </jnb.Row>
              </>
            ) : (
              <></>
            )}
       
     
<pre></pre>
{showPendingData === true ? (
              <>
              <DataTable
              columns={columns}
              pagination={true}
                paginationPerPage="100"
                persistTableHead={true}
                onSelectedRowsChange={handleRowSelected}
              selectableRowDisabled={handledisabled}
              data={studentdata}
                keyField="cfmsid"
              fixedHeader
                fixedHeaderScrollHeight='600px' 
              highlightOnHover selectableRows
              />
                                           
 
           <jnb.Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>Edit Student Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
<ConfirmstudentDetails></ConfirmstudentDetails>
              </Modal.Body>
              </jnb.Modal>                             
     <jnb.Row className="p-4">
            <jnb.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>&nbsp;</jnb.Col>
            <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
          <div className="d-grid">
          <Button variant="success"  type="submit">
          Promote
        </Button>
            </div>
              </jnb.Col>
              <jnb.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
          <div className="d-grid">
          <Button variant="danger" onClick={navigatetoNotPromote}>
          Do not promote
        </Button>
            </div>
              </jnb.Col>
      </jnb.Row> 
             </>
            ) : (
              <></>
            )}
 </jnb.Container>
        </Form>
      </FormikProvider>
    </>
  );
}
          
           