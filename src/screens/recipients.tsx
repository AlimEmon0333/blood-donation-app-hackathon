import { useState, useEffect } from "react";
import { FBget } from "../config/backend/firebaseMethods";
import { Backdrop, CircularProgress } from "@mui/material";
export default function ReciepentsPage() {
    const [recipientsList, setRecipientsList] = useState<any>([])
    const [openBackDrop, setOpenBackDrop] = useState<any>(false)
    const getDataOfRecipients = () => {
        setOpenBackDrop(true)
        FBget("recipient")
        .then((res: any) => {
            console.log(res)
            setRecipientsList([...res])
            setOpenBackDrop(false)
        }).catch((err: any) => {
            console.log(err)
            setOpenBackDrop(false)
            })
    }
    useEffect(() => { getDataOfRecipients() }, [])
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="container bg-black text-white rounded-lg my-3 p-2 border-2 border-white " style={{ boxShadow: "5px 5px 5px gray" }}>
                    <div className="grid grid-cols-1">
                        <div className="text-start ms-4 ">
                            <h3 style={{ fontFamily: "fantasy" }} className="p-4">Here are<span className="underline" style={{ textShadow: "3px 3px 3px gray" }}> Recipients </span>for you</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <table className="table table-dark table-striped shadow-lg border-5 border-gray " style={{borderRadius:"10px"}}>
                    <thead>
                        <tr>
                            <td>Recipients Name</td>
                            <td>Recipients Address</td>
                            <td>Needed bloods group</td>
                            <td>Contact</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <Backdrop
                        sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackDrop}
                    >
                        <CircularProgress  sx={{backgroundColor:"black", color:"black"}} />
                    </Backdrop>
                    {recipientsList.map((x: any, i: any) => {
                        return (
                            <>
                                <tbody>
                                    <tr>
                                        <td>
                                            {x.firstName} {x.lastName}
                                        </td>
                                        <td>
                                            {x.exactAddress}
                                        </td>
                                        <td>
                                            {x.donatedBlood}
                                        </td>
                                        <td>
                                            {x.contactNumber}
                                        </td>
                                        <td>
                                            {x.activeEmail}
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        )
                    })}
                </table>
            </div>


        </>
    )
}