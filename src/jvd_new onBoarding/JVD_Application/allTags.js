import { useState } from "react";

export default function useCounter() {
const [cetAdharDetails,setCetAdharDetails]= useState("")
const [Sscdata, setSscdata] = useState('');

    const tabInitDetails = {
        currentTab: "Studentdetails",
      };
      const [tabDetails, setTabDetails] = useState(tabInitDetails);

  return {
    setTabDetails,tabDetails,
    cetAdharDetails,setCetAdharDetails,
    Sscdata,setSscdata
  };

}
