import { TextField } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FBadd } from "../config/backend/firebaseMethods";
import { useNavigate } from "react-router-dom";

export default function RecipientsForm() {
    const [recipient, setRecipient] = React.useState<any>({})
    const navigate = useNavigate()
    const fillRecipient = (key: any, val: any) => {
        recipient[key] = val;
        setRecipient({ ...recipient })
    }
    const recipientsOfBlood = () => {
        FBadd("recipient", recipient)
            .then((res: any) => {
                navigate("/donorsScreen")
            })
            .catch((err) => {
                console.log(err)
                alert(err)
            })
    }
    return (
        <>
            <div className="flex justify-center ">
                <div className="container bg-black border-4 border-white mx-4 shadow-lg rounded-lg my-5">
                    <div className="grid grid-cols-2 text-white flex items-center">
                        <div>
                            <h3 className="p-4">Fill your <span className="underline " style={{ textShadow: "3px 3px 3px gray" }}> form</span></h3>
                        </div>
                        <div className="text-end">
                            <button className="btn btn-light px-5" onClick={recipientsOfBlood} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="container bg-black border-4 border-white mx-4 shadow-lg rounded-lg mt-5 p-4 ">
                    <div className="grid grid-cols-2">
                        <div>
                            <TextField className="bg-white w-75 m-2 rounded-lg shadow-lg" id="filled-basic" onChange={(e: any) => fillRecipient("firstName", e.target.value)} label="Enter your first name" variant="filled" />
                        </div>
                        <div>
                            <TextField className="bg-white w-75 m-2 rounded-lg shadow-lg" id="filled-basic" onChange={(e: any) => fillRecipient("lastName", e.target.value)} label="Enter your last name" variant="filled" />
                        </div>
                        <div>
                            <TextField className="bg-white w-75 m-2 rounded-lg shadow-lg" id="filled-basic" onChange={(e: any) => fillRecipient("activeEmail", e.target.value)} label="Enter your active email" variant="filled" />
                        </div>
                        <div>
                            <TextField className="bg-white w-75 m-2 rounded-lg shadow-lg" id="filled-basic" onChange={(e: any) => fillRecipient("contactNumber", e.target.value)} label="Enter your Contact number" variant="filled" />
                        </div>
                        <div>
                            <TextField className="bg-white w-75 m-2 rounded-lg shadow-lg" id="filled-basic" onChange={(e: any) => fillRecipient("exactAddress", e.target.value)} label="Enter your exact address" variant="filled" />
                        </div>
                        <div>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Which blood group will you need</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        className="w-75 m-2"
                                        sx={{ backgroundColor: "white" }}
                                        onChange={(e: any) => fillRecipient("donatedBlood", e.target.value)}
                                    >
                                        <MenuItem value={"A group"}>A group</MenuItem>
                                        <MenuItem value={"B group"}>B group</MenuItem>
                                        <MenuItem value={"O group"}>O group</MenuItem>
                                        <MenuItem value={"AB group"}>AB group</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}