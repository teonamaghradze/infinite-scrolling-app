import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserDetails.styles.css";
import Users from "../Users/Users";

const UserDetails = () => {
  const [details, setDetails] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  return (
    <div>
      {" "}
      <div className="details-container">
        <img className="details-img" alt="user img" src={details.imageUrl} />
        <fieldset className="info-container">
          <legend>Info</legend>
          <div>
            <p className="details-container-header">Info</p>

            <p>
              <strong>
                {details.prefix} {details.name} {details.lastName}
              </strong>
            </p>
            <p>
              <i>{details.title}</i>
            </p>
            <br />
            <p>
              <u>Email</u>: {details.email}
            </p>
            <p>
              <u>Ip Address</u>: {details.jobArea}
            </p>
            <p>
              <u>Job Type</u>: {details.jobType}
            </p>
          </div>
        </fieldset>
        <fieldset className="address-container">
          <legend>Address</legend>
          <p>
            <strong>
              {details.company?.name} {details.company?.suffix}
            </strong>
          </p>
          <br />
          <p>City: {details.address?.city}</p>
          <p>Country: {details.address?.country}</p>
          <p>State: {details.address?.state}</p>
          <p>Street Address: {details.address?.streetAddress}</p>
          <p>ZIP: {details.address?.zipCode}</p>
          <p>{details.phone}</p>
        </fieldset>
      </div>
      <Users userId={userId} />
    </div>
  );
};

export default UserDetails;
