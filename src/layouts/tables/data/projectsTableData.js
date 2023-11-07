/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import ProjectImage1 from "assets/images/small-logos/logo-asana.svg";
import ProjectImage2 from "assets/images/small-logos/github.svg";
import ProjectImage3 from "assets/images/small-logos/logo-atlassian.svg";
import ProjectImage4 from "assets/images/small-logos/logo-slack.svg";
import ProjectImage5 from "assets/images/small-logos/logo-spotify.svg";
import ProjectImage6 from "assets/images/small-logos/logo-invision.svg";

export default function Data() {
  const [tableData, setTableData] = useState([]);

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("https://backend-lrgj.onrender.com/api/hireDevs/all-hire-contact")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching data: " + error));
  }, []);

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "30%", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Mobile Number", accessor: "mobileNumber", align: "center" },
      { Header: "Completion", accessor: "completion", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: tableData.map((dataItem, index) => ({
      name: <Project image={ProjectImage1} name={dataItem.name} />,
      email: <Project image={ProjectImage2} name={dataItem.email} />,
      mobileNumber: <Project image={ProjectImage3} name={dataItem.mobileNumber} />,
      completion: <Progress color="info" value={60} />,
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    })),
  };
}
