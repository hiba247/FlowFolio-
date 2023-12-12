//context for form 
import { createContext,useState,useEffect } from "react";

const FormContext=createContext({})

export const FormProvider=({children})=>{
//values will be availible for the children 

const steps = [{ label: 'Informations' }, { label: 'Codification' }];
const [activeStep, setActiveStep] = useState(0);

 const [formValues, setFormValues] = useState({
        nom: '',
        codeProjet: '',
        champsCodification: [],
      });
 const [nouveauChamp, setNouveauChamp] = useState({
        titre: '',
        nbCaracteres: '',
        typeChamp: 'numerique',
      });

      const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        console.log("hhh");
        console.log(name);
        console.log(value);
          setFormValues({
            ...formValues,
            [name]: value,
          });
          console.log(formValues);
   
      };
    
      const handleChampChange = (field, value) => {
        setNouveauChamp({
          ...nouveauChamp,
          [field]: value,
        });
        console.log(nouveauChamp);
      };
 

      const handleAdd = () => {
      
        // Create a copy of the existing champsCodification array and add the new champ
        const updatedChampsCodification = [...formValues.champsCodification, nouveauChamp];
    
        setFormValues({
          ...formValues,
          champsCodification: updatedChampsCodification,
        });
    
        // Reset nouveauChamp to its initial state
        setNouveauChamp({
          titre: '',
          nbCaracteres: '',
          typeChamp: 'numerique',
        });
        console.log(formValues)
        console.log(nouveauChamp)
      };
    
      const handleChampDelete = (index) => {
        const nouveauxChamps = [...formValues.champsCodification];
        nouveauxChamps.splice(index, 1);
        setFormValues({
          ...formValues,
          champsCodification: nouveauxChamps,
        });
      };
    
    return(
        <FormContext.Provider value={{steps,activeStep,formValues,nouveauChamp,setActiveStep,setFormValues,setNouveauChamp,handleChange,handleChampChange,handleAdd,handleChampDelete}}>
        {children}
        </FormContext.Provider>
    )
}

export default FormContext