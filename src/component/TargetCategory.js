"use strict";
import React, { useContext, useEffect, useState, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { SubmitContext } from "../context/ContextSubmit";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TargetDBVersion } from "./TargetVersion";
import { sourceCategoryAPI } from "./URL/BaseURL";
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

//This file contains the function that will access the API to get the target category
//The process will get the data from the API, then map through an array to assign the data to the UI
//dropdown element for the target category, then onClick assign the variable globally using the React Context API

function TargetEnvDisplay() {
  let versionHoler;
  let targetCategoryHolder;
  const classes = useStyles();
  const { targetCategoryContext, setTargetcategory } = useContext(
    SubmitContext
  );
  const {
    sourceNamespaceResultContext,
    clientAdminDBServerContext,
  } = useContext(SubmitContext);
  const { clientIDContext } = useContext(SubmitContext);
  const envTemplate = {
    category: "devtest",
    status: "1",
  };

  const [category, setTargetCat] = React.useState(envTemplate);
  const [sourceList, setSourcelist] = useState();

  const categoryAPI = useCallback(async () => {
    let url = sourceCategoryAPI;
    axios({
      method: "get",
      url,
    })
      .then(function (response) {
        setSourcelist(response.data);
        // console.log(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  });
  useEffect(() => {
    categoryAPI();
  }, []);

  const handleChange = (event) => {
    setTargetCat(event.target.value);
    console.log(clientAdminDBServerContext);
    console.log(clientIDContext);
    setTargetcategory(event.target.value.category);
  };

  if (sourceList !== undefined) {
    if (sourceNamespaceResultContext === 1) {
      targetCategoryHolder = (
        <div>
          {" "}
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Target Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="targetCategoryDropdown"
              value={category ? category : " "}
              onChange={handleChange}
            >
              {sourceList.map((myList) => {
                return (
                  <MenuItem key={myList.category} value={myList}>
                    {" "}
                    {myList.category.toLowerCase()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      );
    }
    if (clientIDContext !== undefined && targetCategoryContext !== undefined) {
      versionHoler = <TargetDBVersion />;
    }
  }

  return (
    <div>
      <Box>{targetCategoryHolder}</Box>
      <Box>{versionHoler}</Box>
    </div>
  );
}

export { TargetEnvDisplay };
