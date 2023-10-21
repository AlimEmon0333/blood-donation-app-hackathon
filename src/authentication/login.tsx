import { TextField, Button, Avatar, Backdrop, CircularProgress } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FBlogin } from "../config/backend/firebaseMethods";


export default function Login() {
    const [user, setUser] = useState<any>({})
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const navigate = useNavigate()
    const fillUser = (key: any, val: any) => {
        user[key] = val;
        setUser({ ...user })
    }
    const LogInUser = () => {
        setOpenBackdrop(true)
        FBlogin(user, "users")
            .then((res: any) => {
                console.log(res)
                setOpenBackdrop(false)
                if (res.typeOfUser == "Donor") {
                    navigate("/donorsForm")
                } else {
                    navigate("/recipientsForm")
                }
            }).catch((err: any) => {
                alert(err)
                setOpenBackdrop(false)
            })
    }


    return (
        <>
            {/* Login */}
            <div className="flex justify-center items-center bg-gradient-to-r from-black h-screen w-screen">
                <div className="w-[350px] ease-in duration-300 bg-white p-5 rounded-lg border-4 border-white flex justify-center items-center">
                    <div className="py-2 flex-col flex justify-center items-center">
                        {/* loader */}
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackdrop}
                        // onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        {/* loader */}
                        <Avatar src="/broken-image.jpg" sx={{ width: "100px", height: "100px", backgroundColor: "transparent" }} className="block bg-gradient-to-r from-black mb-4" />
                        <TextField label="Enter Email" type="email" className="w-100" onChange={(e: any) => fillUser('Email', e.target.value)} />
                        <br />
                        <TextField label="Enter Password" className="w-100" type="password" onChange={(e: any) => fillUser('Password', e.target.value)} />
                        <br />
                        <Button variant="contained" onClick={LogInUser} endIcon={<PersonIcon />} className="btn btn-dark px-5" >Login</Button>   
                        <br />
                        <div className="flex justify-center ">
                         <p>No have account !</p> 
                         <br /> 
                          <p onClick={() => navigate("/signUp")} className="underline hover:cursor-pointer" style={{ color: "blue" }}> create account !</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}