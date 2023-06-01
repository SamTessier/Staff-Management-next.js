import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { saveSchool, getSchools } from "../localStorageDB";
import SchoolDetails from "./SchoolDetails";
import AddSchoolDialog from "./AddSchoolDialog";
import SchoolItem from "./SchoolItem";

const AllSchools = () => {
  
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    setSchools(getSchools());
  }, []);


  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    
  };
  const handleDetailsOpen = (school) => {
    setSelectedSchool(school);
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => setDetailsOpen(false);

  const onSubmit = (data) => {
    const newSchool = { ...data };
    saveSchool(newSchool);
    setSchools(getSchools());
    setModalOpen(false);
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#EFBD26",
    "&:hover": {
      backgroundColor: "#EFBD26",
    },
    padding: theme.spacing(1),
  }));

  
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Box
        border={1}
        borderColor="grey.500"
        borderRadius={2}
        p={3}
        m={2}
        bgcolor="grey.100"
        overflow="auto"
        maxHeight={500}
      >
        {schools.length === 0 ? (
          <Typography variant="h5" align="center">
            No schools found!
          </Typography>
        ) : (
          schools.map((school, index) => (
            <SchoolItem 
              key={index}
              school={school}
              handleDetailsOpen={handleDetailsOpen}
            />
          ))
        )}
      </Box>

      <Grid item container justifyContent="center">
        <CustomButton variant="contained" onClick={handleModalOpen}>
          <AddCircleOutlineIcon sx={{ color: "black" }} />
        </CustomButton>
      </Grid>

      <AddSchoolDialog 
        open={modalOpen} 
        handleClose={handleModalClose} 
        onSubmit={onSubmit} 
      />

      <SchoolDetails
        school={selectedSchool}
        open={detailsOpen}
        handleClose={handleDetailsClose}
      />
    </Grid>
  );
};

export default AllSchools;