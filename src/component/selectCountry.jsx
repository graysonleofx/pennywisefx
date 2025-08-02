import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import CountryData from "./CountryData";
import '../styles/sign-up.css'

const SelectCountry = () =>{
  // handle events
  const {
    register,  formState: { errors }
  } = useForm() 

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const data = CountryData;
    setCountries(data)
  }, [])
  return(
    <React.Fragment>
      <select 
      {...register('country', {required: 'Country is required'})}
      className="select-pl"
      >
        <option value="">--Select Country--</option>
        {
          countries.map((item) => {
            return(
              <option key={item.country} value={item.country}>
                {item.country}
              </option>
            )
          })
        }
      </select>
      {errors.country && <span>{errors.country.message}</span>}  
    </React.Fragment>
  )
}
export default SelectCountry;