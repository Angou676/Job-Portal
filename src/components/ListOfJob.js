import React, { useState, useEffect } from "react";
import "./styles.css";
import { Button, Grid } from "@mui/material";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

function ListOfJob() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data initially when component mounts
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Fetched data:", result);
        setData((prevData) => [...prevData, ...result.jdList]); // Update state using functional form
        setOffset((prevOffset) => prevOffset + 10); // Update offset using functional form
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      console.log("Reached bottom of the page.");
      // Fetch more data when scrolled to bottom
      fetchData();
    }
  };

  // Add and remove event listener when component mounts/unmounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Grid container>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.jdUid} className="gridItem">
          <div className="jobItemContainer">
            <div className="jobPost">
              <HourglassFullIcon fontSize="10px" />
              <span>Posted 10 days ago</span>
            </div>
            <div className="jobLogoBox">
              <img src={item.logoUrl} className="companyLogo" />
              <div>
                <h5 className="companyNameText">{item.companyName}</h5>
                <div className="capitalize">{item.jobRole}</div>
                <div className="capitalize">{item.location}</div>
              </div>
            </div>

            <p>
              Estimated Salary: ₹{" "}
              {item.minJdSalary ? item.minJdSalary + " - " : ""}{" "}
              {item.maxJdSalary} LPA
            </p>

            <h5>About Company:</h5>
            <h5>About us</h5>
            <div className="aboutCompanyContainer">
              <p className="aboutCompanyText">{item.jobDetailsFromCompany}</p>
              <h4>Founder/ Recruiter Profile</h4>
              <div className="aboutCompanyOverlay" />
            </div>

            <div className="viewJobLink">View Job</div>
            <h6 className="companyNameText expeMt">
              {item.minExp ? "Minimum Experience" : "Experience"}
            </h6>
            <p className="expeVal">
              {item.minExp ? item.minExp + " years" : "Any"}
            </p>
            <Button className="easyApplyButton capitalize">
              <ElectricBoltIcon className="electricBoltIcon" />
              Easy Apply
            </Button>
            <Button className="referralButton capitalize">
              Unlock referral asks
            </Button>
          </div>
        </Grid>
      ))}
      {loading && <p>Loading...</p>}
    </Grid>
  );
}

export default ListOfJob;
