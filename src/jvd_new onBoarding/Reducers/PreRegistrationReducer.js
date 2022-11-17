const preregreducer={
    cetdetails:[],
    studentdetails:[]
  

}
export default function PreregReducer(details=preregreducer,action)
{
   
     switch(action.type)
     {
        case "UPDATE_ADHARNO":
            return{...details,cetdetails:action.payload}

            case "UPDATE_STUDENTDETAILS":
                return{...details,studentdetails:action.payload}


        default:
           return details
            
     }
}