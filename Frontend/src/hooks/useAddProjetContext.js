import { useContext } from "react";
import FormContext from "../context/AddProjetContext";
const useAddProjetContext =()=>{
    return useContext(FormContext)
}
export default useAddProjetContext