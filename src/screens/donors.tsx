import { useState, useEffect } from "react";
import { FBget } from "../config/backend/firebaseMethods";
export default function DonorsPage() {
    const [donatersList, setDonatersList] = useState<any>([])
    const getDataOfDonaters = () => {
        FBget("donater")
            .then((res: any) => {
                console.log(res)
                setDonatersList([...res])
            }).catch((err: any) => {
                console.log(err)
            })
    }
    useEffect(() => { getDataOfDonaters() }, [])
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="container bg-black text-white rounded-lg my-3 p-2 border-2 border-white " style={{ boxShadow: "5px 5px 5px gray" }}>
                    <div className="grid grid-cols-1">
                        <div className="text-start ms-4 ">
                            <h3 style={{ fontFamily: "fantasy" }} className="p-4">Here are<span className="underline" style={{ textShadow: "3px 3px 3px gray" }}> Donors </span>for you</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <table className="table table-dark rounded-lg">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Donating bloods group</td>
                            <td>Contact</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    {donatersList.map((x: any, i: any) => {
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