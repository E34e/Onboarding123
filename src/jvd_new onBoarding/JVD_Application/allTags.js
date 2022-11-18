import { useState } from "react";

export default function useCounter() {
const [cetAdharDetails,setCetAdharDetails]= useState("")
const [basicScreenDetails,setBAsicScreenDetails]= useState("")
const [Sscdata, setSscdata] = useState('');
const[cetTypeData,setCetTypeData]=useState([])
const[cetCourseNAme, SetcetCourseNAme]= useState([])
    const tabInitDetails = {
        currentTab: "Studentdetails",
      };
      const [tabDetails, setTabDetails] = useState(tabInitDetails);

  return {
    setTabDetails,tabDetails,
    cetAdharDetails,setCetAdharDetails,
    Sscdata,setSscdata,
    cetTypeData,setCetTypeData,
    basicScreenDetails,setBAsicScreenDetails,
    cetCourseNAme, SetcetCourseNAme
  };

}
