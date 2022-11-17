import React from 'react'

import * as jnb from "react-bootstrap"; 
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useState } from "react";
import StudentDetails from './StudentDetails';
import StudentEDucationDetails from './StudentEDucationDetails';
import Header from '../../Header/Header';
import { useBetween } from "use-between";
import useCounter from "./allTags";

 function useSharedCounter() { return useBetween(useCounter);}
 export default function JvdApplication() {
    const { tabDetails,setTabDetails} = useSharedCounter();



  return (
    <div>
        <Header/>
        <div className="main_section">  </div>
     <jnb.Container >
          <jnb.Row >
                   <jnb.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            {/* <h1>Form of Application For Service Pension / Family Pension / Retirement Gratuity / <br/>Service Gratuity  / Commutation</h1> */}
                            <h1>Fresh OnBoarding of a student</h1>
                        </div>
                    </jnb.Col> 
          </jnb.Row>
        </jnb.Container>
        <jnb.Container className="outer-page-content-container " >
            <div>
                <Tabs     
                  defaultActiveKey={tabDetails.currentTab}
                  activeKey={tabDetails.currentTab}
                 onSelect={(event) => {return setTabDetails({ currentTab: event });}}>
                    
                    <TabList>
                        <Tab   eventKey="StudentDetails"  >
                            Student Details
                        </Tab>
                        <Tab  eventKey="StudentEDucationDetails">
                            Student Educational Details
                        </Tab>
                    </TabList>
                    <TabPanel 
                   >
                        <StudentDetails></StudentDetails>
                    </TabPanel>
                    <TabPanel 
                   >
                        <StudentEDucationDetails></StudentEDucationDetails>
                    </TabPanel>
                </Tabs>
                
            </div>

        </jnb.Container>

        
    </div>
  )
}
