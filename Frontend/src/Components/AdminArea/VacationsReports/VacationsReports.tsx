import { useEffect, useState } from "react";
import "./VacationsReports.css";
import followerService from "../../../Services/followersService";
import notify from "../../../Services/notifyService";
import FollowerModel from "../../../Models/followerModel";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function VacationsReports(): JSX.Element {

    useVerifyAdmin()

    const [data, setData] = useState<{ name: any; followers: number; }[]>([])

    useEffect(() => {
        followerService.getFollowers()
            .then(f => {
                handleFollowers(f)
            })
            .catch(err => notify.error(err))
    }, [])

    async function handleFollowers(f: FollowerModel[]) {
        try {
            const preData: { name: any; followers: number; }[] = []
            const uniqueFollowers = new Map()

            for (let follower of f) {
                uniqueFollowers.set(follower.vacationID, follower.destination)
            }

            uniqueFollowers.forEach(async (value, key) => {
                const VacationFollowers = await followerService.getFollowersForVacation(key)
                const vacationData = { name: value, followers: VacationFollowers.length }
                preData.push(vacationData)
            })
            setData(preData)
        }
        catch (err: any) {
            notify.error(err)
        }
    }


    return (
        <div className="VacationsReports">
            <h2>Vacation Reports are:</h2>
            <Row className="row">
                {data && data.length !== 0 &&
                    <>
                        <BarChart
                            width={700}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>

                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="followers" fill="#8884d8" />
                        </BarChart>
                    </>
                }

                {data && data.length === 0 &&
                    <>
                        <h5>Wow, so empty</h5>
                        <p>Seems like no one followed a vacation</p>
                        <NavLink to={"/vacations"}>Go to Home</NavLink>
                    </>
                }
            </Row>
        </div >
    );
}

export default VacationsReports;