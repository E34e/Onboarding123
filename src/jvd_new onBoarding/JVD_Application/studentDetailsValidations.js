import * as Yup from "yup";

const isValid = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
const pin = /^[1-9]{1}[0-9]{5}$/;
const onlynum = /^[0-9]+$/;
const mobileValidation = /^[6-9]{1}[0-9]{9}$/;
const alphaNumeric = /^[A-Za-z0-9\s.]+$/; 
const onlyletter = /^[A-Za-z\s.]+$/;


export const forrmikInitialValues = {
    // studentAadharNo: '',
    // studentName :'',
    motherAadharNo: "",
    // motherName:"",
    fatherAadharNo: "",
    // fatherName:"",
    // gender: "",
    // dob:"",
    religion: "",
    caste:"",
    subCaste: "",
    nationality:"",
    parentOccupation:'',
    motherToungue:"",
    // mobileNo:"",
    // email:"",

    isPh:"",
    saderamNo:"",
    // saderamCertificate:"",
    // fileUpload:"",
    typeOfDisability:"",
    percentOfDisability:"",
   

    stateCode:"",
    district:"",
    mandal:"",
    village:"",
    habCode:"",
    street:"",
    doorNo:"",
    pincode:"",

    addressType:"",
    isPermanentState:"",
    isPermanentDistrict:"",
    isPermanentManadl:"",
    isPermanentVillage:"",
    isPermanentHabitation:"",
    isPermanentStreet:"",
    isPermanentDoorNo:"",
    isPermanentPincode:"",
   
  };

  export const eduDEtailsFormik = {
   
      admissiondate: "",
      universityname: "",
      clgname: "",
      course: "",
      year:"",
      section:"",
      admissionCategory:"",
      secondLanguage:"",
      extracircular:"",
      hostel:"",
      incomeCertify:"",
      
      cetName:"",
      cetHallTicket:"",
      cetPassYear:"",

      isCap:"",
      capOption:"",
      capCertificate:"",
      capfileUpload:"",
     
      isSport:"",
      sportOption:"",
      sportCertificate:"",
      sportsfileUpload:"",

      isNcc:"",
      nccOption:"",
      nccCertificate:"",
      nccfileUpload:"",

      isNss:"",
      nssCertificate:"",
      nssfileUpload:"",

      isExCurricular:"",
      extraActivityCertify:"",
      curricularfileUpload:"",
   
  };
  export const formikValidations = Yup.object().shape({
    // studentAadharNo: Yup.string()
    //     .required("Please Enter Aadhar Number")
    //     .min(12, " Aadhar number must be exactly 12 digits only")
    //     .max(12)
    //     .matches(isValid, "Please Enter Aadhar Number Correctly"),
    // studentName:Yup.string().required( " Please enter student name").matches(onlyletter," Enter valid student name"),
    motherAadharNo:Yup.string()
    .required("Please Enter Mother Aadhar Number")
    .min(12, " Aadhar number must be exactly 12 digits only")
    .max(12)
    .matches(isValid, "Please Enter  Aadhar Number Correctly"),
   
    fatherAadharNo:Yup.string()
    .required("Please Enter Father Aadhar Number")
    .min(12, " Aadhar number must be exactly 12 digits only")
    .max(12)
    .matches(isValid, "Please Enter  Aadhar Number Correctly"),
    // fatherName:Yup.string().required( " Please enter father name").matches(onlyletter," Enter valid Service name"),
    // motherName:Yup.string().required( " Please enter mother name").matches(onlyletter," Enter valid Service name"),
    // gender:Yup.string().required( " Please select gender"),
    // dob:Yup.string().required( " Please select date of birth"),
    religion:Yup.string().required( " Please select religion"),
    caste:Yup.string().required( " Please select caste"),
    subCaste:Yup.string().required( " Please select subcaste"),
    parentOccupation:Yup.string().required( " Please enter occupation").matches(onlyletter," Enter aplhabets only"),
    nationality:Yup.string().required( " Please select nationality"),
    motherToungue:Yup.string().required( " Please select language"),


    isPh:Yup.string().required("Select yes or no"),
    saderamNo:Yup.string().when('isPh',{
      is:(isPh)=>isPh === "true" ? true : false,
      then:Yup.string().required("Please enter saderam number"),
      otherwise:Yup.string()
   }),
   typeOfDisability:Yup.string().when('isPh',{
    is:(isPh)=>isPh === "true" ? true : false,
    then:Yup.string().required("Please select type of disability"),
    otherwise:Yup.string()
 }),

 percentOfDisability:Yup.string().when('isPh',{
  is:(isPh)=>isPh === "true" ? true : false,
  then:Yup.string().required("Please enter percent of disability"),
  otherwise:Yup.string()
}),
// saderamCertificate:Yup.string().when('isPh',{
//   is:(isPh)=>isPh === "true" ? true : false,
//   then:Yup.string().required("Please upload sadarem certificate"),
//   otherwise:Yup.string()
// }),
stateCode:Yup.string().required( " Please select state"),
district:Yup.string().required( " Please select district"),
mandal:Yup.string().required( " Please select mandal"),
     village:Yup.string().required( " Please select Village"),
     habCode:Yup.string().required( " Please select habitation"),
     street:Yup.string().required( " Please enter street"),
     doorNo:Yup.string().required( " Please enter door number"),
     pincode: Yup.string()
     .required("Please Enter Pincode")
     .matches(pin, "Pincode Must be digits only") ///^[0-9]+$/
     .min(6, "Pincode must be exactly 6 digits"),

     addressType: Yup.string().required("Please Select permanent Address(Yes or No)"),
     isPermanentState: Yup.string().when("addressType", {
       is: (addressType) => (addressType === "no" ? true : false),
       then: Yup.string().required("Please Select  state"),
       oterwise: Yup.string(),
     }),
     isPermanentDistrict: Yup.string().when("addressType", {
        is: (addressType) => (addressType === "no" ? true : false),
        then: Yup.string().required("Please Select  District"),
        oterwise: Yup.string(),
      }),
      isPermanentManadl: Yup.string().when("addressType", {
        is: (addressType) => (addressType === "no" ? true : false),
        then: Yup.string().required("Please Select mandal"),
        oterwise: Yup.string(),
      }),
      isPermanentVillage:Yup.string().when("addressType", {
        is: (addressType) => (addressType === "no" ? true : false),
        then: Yup.string().required("Please Select Village"),
        oterwise: Yup.string(),
      }),
      isPermanentHabitation: Yup.string().when("addressType", {
        is: (addressType) => (addressType === "no" ? true : false),
        then: Yup.string().required("Please Select  habitation"),
        oterwise: Yup.string(),
      }),
      isPermanentStreet: Yup.string().when("addressType", {
        is: (addressType) => (addressType === "no" ? true : false),
        then: Yup.string().required("Please enter street"),
        oterwise: Yup.string(),
      }),
      isPermanentDoorNo: Yup.string().when("addressType", {
        is: (addressType) => (addressType === "no" ? true : false),
        then: Yup.string().required("Please enter  door number"),
        oterwise: Yup.string(),
      }),
      isPermanentPincode: Yup.string().when("addressType", {
        is: (addressType) => (addressType === "no" ? true : false),
        then: Yup.string()
          .required("please Enter  Pincode")
          .matches(onlynum, "Pincode must be digits only")
          .min(6)
          .max(6),
        oterwise: Yup.string(),
    }),
  //     mobileNo: Yup.string()
  //   .required("Please Enter Mobile No")
  //   .matches(mobileValidation,"Mobile number must be digits only")
  //   .min(10)
  //   .max(10),
  //  email: Yup.string()
  //   .email("Invalid Email Format")
  //   .required("Please Enter Your Email Id")
  //   .max(100),
  })

  export const eduDEtailsValidation= Yup.object().shape({
    admissiondate: Yup.string().required(" Please enter admission date"),
    universityname: Yup.string().required(" Please select University name"),
    clgname: Yup.string().required(" Please select college name"),
    course: Yup.string().required("Please select course name"), 
     year: Yup.string().required("Please select year "),
    section: Yup.string().required("Please select section name"),
    admissionCategory: Yup.string().required("Please select admission Category"),
    secondLanguage: Yup.string().required(" Please Select Second Language"), 
    extracircular: Yup.string().required(" Please enter extra curricular activity"),
    hostel: Yup.string().required(" Plese select hostel or day scholar"),
    incomeCertify: Yup.string().required(" Please enter income certificate number"),

    capOption:Yup.string().when('isCap',
    { is: (isCap) => isCap === true ? true : false,
      then: Yup.string().required('select Cap category'),
      otherwise: Yup.string()
    }),
    capCertificate:Yup.string().when('isCap',
    { is: (isCap) => isCap === true ? true : false,
    then: Yup.string().required(' please upload Cap Certificate'),
    otherwise: Yup.string()
     }),
    sportOption:Yup.string().when('isSport',
    { is: (isSport) => isSport === true ? true : false,
      then: Yup.string().required('select Sport category'),
      otherwise: Yup.string()
    }),
    sportCertificate:Yup.string().when('isSport',
    { is: (isSport) => isSport === true ? true : false,
      then: Yup.string().required('please upload Sport Certificate'),
      otherwise: Yup.string()
    }),
    nccOption:Yup.string().when('isNcc',
    { is: (isNcc) => isNcc === true ? true : false,
      then: Yup.string().required('select Ncc category'),
      otherwise: Yup.string()
    }),
    nccCertificate:Yup.string().when('isNcc',
    { is: (isNcc) => isNcc === true ? true : false,
      then: Yup.string().required('please upload Ncc Certificate'),
      otherwise: Yup.string()
    }),
    nssCertificate:Yup.string().when('isNss',
    { is: (isNss) => isNss === true ? true : false,
      then: Yup.string().required('please upload Nss Certificate'),
      otherwise: Yup.string()
    }),
    extraActivityCertify:Yup.string().when('isExCurricular',
    { is: (isExCurricular) => isExCurricular === true ? true : false,
      then: Yup.string().required('please upload Extracurricular Activity Certificate'),
      otherwise: Yup.string()
    }),
  });