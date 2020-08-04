"use strict";
import React, { useContext, useEffect, useState, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { SubmitContext } from "../context/ContextSubmit";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  roottwo: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function TargetEnvDisplay() {
  const classes = useStyles();
  const { setTargetcategory } = useContext(SubmitContext);
  const envTemplate = {
    category: "devtest",
    status: "1",
  };

  const [age, setAge] = React.useState(envTemplate);
  const [sourceList, setSourcelist] = useState();

  const categoryAPI = useCallback(async () => {
    let url =
      "http://torsvcmtool02.dayforce.com:8088/api/buildversion/category/list/1";
    axios({
      method: "get",
      url,
    })
      .then(function (response) {
        setSourcelist(response.data);
        console.log(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  });
  useEffect(() => {
    categoryAPI();
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);

    setTargetcategory(event.target.value.category);
  };
  let clientIdDrop;

  if (sourceList !== undefined) {
    clientIdDrop = (
      <div>
        {" "}
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Target Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            {sourceList.map((myList) => {
              return (
                <MenuItem key={myList.category} value={myList}>
                  {" "}
                  {myList.category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }

  return <div>{clientIdDrop}</div>;
}

export { TargetEnvDisplay };
