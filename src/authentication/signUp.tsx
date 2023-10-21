import { Box, Paper, TextField, Typography, Button, Avatar, Backdrop, CircularProgress } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from "react";
import { FBsignUp } from "../config/backend/firebaseMethods";
import { useNavigate } from "react-router-dom";
// imports of select 
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SignUp() {
    const [user, setUser] = useState<any>({})
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const navigate = useNavigate()
    const fillUser = (key: any, val: any) => {
        user[key] = val;
        setUser({ ...user })
    }
    const SignUpUser = () => {
        setOpenBackdrop(true)
        FBsignUp(user, "users")
            .then((res: any) => {
                alert("This user signedUp successfully")
                navigate("/")
                setOpenBackdrop(false)
            }).catch((err: any) => {
                alert(err)
                setOpenBackdrop(false)
            })
    }
    return (
        <>
            {/* Login */}
            <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 h-screen w-screen">
                <div className="w-[400px] ease-in duration-300 bg-white p-5 rounded-lg border-t-4 border-indigo-500 border-b-4 border-indigo-500 hover:border-r-4 border-indigo-500 hover:border-l-4 border-indigo-500 hover:border-t-0 border-indigo-500 hover:border-b-0 border-indigo-500 flex justify-center items-center">
                    <div className="py-2 flex-col flex justify-center items-center">
                        {/* <Simple loader /> */}
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackdrop}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        {/* <Simple loader /> */}
                        <Avatar src="/broken-image.jpg" sx={{ width: "100px", height: "100px", backgroundColor: "transparent" }} className="block bg-gradient-to-r from-indigo-500 mb-4" />
                        <TextField variant="filled" label="User Name" type="text" onChange={(e: any) => fillUser("User Name", e.target.value)} />
                        <br />
                        <TextField variant="filled" label="Email" type="email" onChange={(e: any) => fillUser("Email", e.target.value)} />
                        <br />
                        <TextField variant="filled" label="Password" type="password" onChange={(e: any) => fillUser("Password", e.target.value)} />
                        <br />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Who are you</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Who are you"
                                    onChange={(e:any)=>{fillUser("typeOfUser",e.target.value)}}
                                    sx={{width:"220px"}}                                >
                                    <MenuItem value={"Donor"}>Donor</MenuItem>
                                    <MenuItem value={"Recipent"}>Recipent</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <br />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">What is your blood group</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="What is your blood group"
                                    onChange={(e:any)=>{fillUser("bloodGroup",e.target.value)}}
                                    sx={{width:"220px"}}                                >
                                    <MenuItem value={"O"}>O</MenuItem>
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"B"}>B</MenuItem>
                                    <MenuItem value={"AB"}>AB</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    <br />    
                    <Button variant="contained" onClick={SignUpUser} endIcon={<PersonIcon />} className="bg-gradient-to-r from-indigo-500 ease-linear duration-500 hover:bg-gradient-to-l from-indigo-300 w-75 h-50 py-2 rounded-lg" >Sign up</Button>
                        <div className="flex justify-center ">
                            <p onClick={() => navigate("/")} className="underline mt-3 hover:cursor-pointer" style={{color:"blue"}}>already you have an account</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}