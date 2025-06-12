import React from "react";
import { 
  useTheme,
  Select,
  FormControl,
  InputLabel, 
} from "@mui/material"; 
import ProviderDisplay from "./ProviderDisplay";
import { useSelector } from "react-redux"; 
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";
import { useState } from "react";


const SidebarSelect = ( ) => {
  const theme = useTheme();
  const currentProvider  =  useSelector(selectCurrentProviderName)
  // const[change,setChange] = useState("")

  console.log("Current Provider:",currentProvider)

  // console.log("Value:",change)

  // const handleChange = (e)=>{
  //     console.log(e.target.value)
  // }
 
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Service Provider</InputLabel>
      <Select
        value={currentProvider}
        // onChange = {(e)=>{handleChange(e)}}
        label={"Service Provider"}
        id="step-six-target"
        MenuProps={{
          PaperProps: {
            sx: {
              padding: 0,
              maxHeight: 300,
              overflowY: "auto",
              bgcolor: "transparent",
              boxShadow: "none",  
              backgroundImage: "none",  
            },
            elevation: 0, // Remove elevation
          },
          MenuListProps: {
            sx: {
              bgcolor: "transparent",
            },
          },
        }}
      >
         <ProviderDisplay />
      </Select>
    </FormControl>
  );
};

export default SidebarSelect;
