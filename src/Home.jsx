import {
  Box,
  Checkbox,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  Pagination,
  Alert,
} from "@mui/material";

import { FilterBox, FilterModal, StyleButton } from "./style/style";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import Userlist from "./components/List/Userlist";
import AddIcon from "@mui/icons-material/Add";
import Addlist from "./components/Addlist/Addlist";

import { motion } from "framer-motion";
import API from "./utils/axios";
import Spinner from "./utils/Spinner";

const Home = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [totaldata, setTotalData] = useState(0);

  const [pagecount, setPagecount] = useState(0);
  const [pages, setPages] = useState(1);

  const [age, setAge] = React.useState("All");
  const [filter, setFilter] = useState(["A+", "B+", "O-", "O+", "AB+", "AB-"]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addopen, setaddOpen] = React.useState(false);
  const handleAddOpen = () => setaddOpen(true);

  const handleChange = (event) => {
    setAge(event.target.value);

    clickNum(event, 1);
  };

  const group = [
    { id: 1, name: "A+" },
    { id: 2, name: "B+" },
    { id: 3, name: "AB+" },
    { id: 4, name: "O-" },
    { id: 5, name: "AB-" },
    { id: 5, name: "O+" },
  ];

  const checkfun = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setFilter([...filter, name]);
    } else {
      setFilter(filter.filter((e) => e !== name));
    }
    clickNum(undefined, 1);
  };

  const clickNum = (event, page) => {
    if (page === pages) {
      setPages(page);
      return setSpinner(false);
    }
    setPages(page);
    setSpinner(true);
  };

  const getData = async () => {
    setSpinner(true);
    try {
      const { data } = await API.get(
        `/data?division=${age}&filter=${encodeURIComponent(
          JSON.stringify(filter)
        )}&page=${pages}`
      );
      setTotalData(data?.totalData);
      setPagecount(data.page);

      setData(data?.data);
      setSpinner(false);
    } catch (err) {
      setError(true);
      setSpinner(false);
    }
  };

  useEffect(() => {
    getData();
  }, [age, filter, pages]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [open]);

  let content;
  if (spinner) content = <Spinner></Spinner>;
  if (!spinner && error)
    content = (
      <div style={{ marginTop: "30px" }}>
        <Alert severity="error" sx={{ justifyContent: "center" }}>
          Server Error, Please Try Again
        </Alert>
      </div>
    );

  if (!spinner && !error && data.length === 0)
    content = <Alert severity="error">No Data Found</Alert>;

  if (!spinner && !error && data.length > 0)
    content = (
      <Userlist
        getdata={getData}
        filter={filter}
        totalData={totaldata}
        division={age}
        data={data}
      />
    );

  return (
    <>
      {spinner && <Spinner></Spinner>}

      <Container sx={{ py: 8 }}>
        <FilterBox>
          <StyleButton
            startIcon={<SearchIcon></SearchIcon>}
            onClick={handleOpen}
          >
            Search Now
          </StyleButton>
          <StyleButton onClick={handleAddOpen} startIcon={<AddIcon />}>
            Add Now
          </StyleButton>
        </FilterBox>

        {content}

        <Box sx={{ mt: 8 }}>
          {data.length !== 0 && (
            <Pagination
              color="primary"
              count={pagecount}
              onChange={clickNum}
              defaultPage={pages}
            />
          )}
        </Box>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FilterModal
          sx={{ bgcolor: "primary.white" }}
          component={motion.div}
          animate={{ opacity: 1, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, transform: "translate(-50%, -20%)" }}
          transition={{ duration: 0.4 }}
        >
          <Typography
            sx={{ mb: 3 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Filter Lists
          </Typography>
          <form>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Division
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Barishal">Barishal</MenuItem>
                  <MenuItem value="Chattogram">Chattogram</MenuItem>
                  <MenuItem value="Dhaka">Dhaka</MenuItem>
                  <MenuItem value="Khulna">Khulna</MenuItem>
                  <MenuItem value="Rajshahi">Rajshahi</MenuItem>
                  <MenuItem value="Rangpur">Rangpur</MenuItem>
                  <MenuItem value="Mymensingh">Mymensingh</MenuItem>
                  <MenuItem value="Sylhet">Sylhet</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: 1 }}>
              {group.map((val, index) => {
                return (
                  <>
                    <Box key={index}>
                      <Checkbox
                        checked={filter.includes(val?.name)}
                        name={val?.name}
                        onChange={checkfun}
                        label={val?.name}
                      />{" "}
                      {val?.name}
                    </Box>
                  </>
                );
              })}
            </Box>
            <StyleButton
              onClick={() => setOpen(false)}
              sx={{ mt: 2, width: "100%" }}
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Search
            </StyleButton>
          </form>
        </FilterModal>
      </Modal>

      <Addlist
        getData={getData}
        open={addopen}
        setaddOpen={setaddOpen}
      ></Addlist>
    </>
  );
};

export default Home;
