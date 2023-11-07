/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import React, { useEffect, useState } from "react";
import team3 from "assets/images/team-3.jpg";

export default function Data() {
  const [tableData, setTableData] = useState([]);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("https://backend-lrgj.onrender.com/api/contactus/all-user")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching data: " + error));
  }, []);

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      // { Header: "status", accessor: "status", align: "center" },
      { Header: "number", accessor: "number", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: tableData.map((dataItem, index) => ({
      author: <Author image={team3} name={dataItem.name} email={dataItem.email} />,
      budget: <Job title={dataItem.budget} description={dataItem.description} />,
      // status: (
      //   <MDBox ml={-1}>
      //     <MDBadge badgeContent={dataItem.status} color="success" variant="gradient" size="sm" />
      //   </MDBox>
      // ),
      number: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {dataItem.mobileNumber}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    })),
  };
}
