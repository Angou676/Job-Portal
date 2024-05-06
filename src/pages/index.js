import React from "react";
import ListOfJob from "../components/ListOfJob";
import FilterComp from "../components/FilterComp";

const JobList = () => {
  return (
    <>
      <FilterComp />
      <ListOfJob />
    </>
  );
};

export default JobList;
