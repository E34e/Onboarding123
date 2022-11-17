import React from "react";
import { CommonAxiosPost } from "./CommonAxios";
class LoadingService { 
  saveData(req) {
    return CommonAxiosPost(
      // " http://172.16.150.61:9010/jnbmaster/promotedstudentsave",
      "https://devapi.jnanabhumi.apcfss.in/jnb/promotedstudentsave",
      req
    );
  }
  updateData(req) {
    return CommonAxiosPost("http://localhost:8086/jnb_mdr/updateddetails", req);
  }

  SaveCetData(req){
  return CommonAxiosPost("http://172.16.150.61:9010/jnbmaster/saveCetDetails", req);
}


  studentDetailsSave(req) {
    return CommonAxiosPost("http://172.16.150.61:9010/jnbmaster/saveStudentPersonalDetails", req);
  }
}
export default new LoadingService();
