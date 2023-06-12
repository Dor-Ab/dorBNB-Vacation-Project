import { Col, Row } from "react-bootstrap";
import FollowerModel from "../../../Models/followerModel";
import "./FollowerCard.css";
import AvatarProfile from "../../../Assets/Images/avatar.png"

interface FollowerCardProps {
    follower: FollowerModel
}

function FollowerCard(props: FollowerCardProps): JSX.Element {
    return (
        <div className="FollowerCard">
            <Row className="row">
                <Col className="followerPhotoContainer">
                    <img src={AvatarProfile} />
                </Col>
                <Col className="followerDetails">
                    <h2>{props.follower.firstName} {props.follower.lastName}</h2>
                    <span>Follower ID: {props.follower.followerID}</span>
                    <span>User ID: {props.follower.userID}</span>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default FollowerCard;
