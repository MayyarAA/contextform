"use strict";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { SubmitContext } from "../context/ContextSubmit";

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
// const [Clientid, setClientid] = useState("");

function SimpleSelect() {
  const classes = useStyles();
  const { clientIDContext, setClientID, setClientName } = useContext(
    SubmitContext
  );

  const [objTest, setobjTest] = useState();

  const clientAPI = useCallback(async () => {
    
    let url = "addhere";
    await axios({
      method: "get",
      url,
      auth: {
        username: user,
        password: pass,
      },
    })
      .then(function (response) {
        setobjTest(response.data);

        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  useEffect(() => {
    clientAPI();
  }, []);

  

  let clientArrTwo = [];

  clientArrTwo.push(clientEx);

  console.log(typeof clientArrTwo);

  const [age, setAge] = React.useState(clientEx);

  const handleChange = (event) => {
    setAge(event.target.value);
    setClientID(event.target.value.ClientID);
    setClientName(event.target.value.ClientName);
  };
  let clientIdDrop;
  if (objTest !== undefined) {
    console.log(objTest[1].ClientDatabase);
    for (let i = 1; i < 15; i++) {
      clientArrTwo.push(objTest[i]);
    }
    console.log(clientIDContext);

    clientIdDrop = (
      <div>
        {" "}
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Client Info</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            {clientArrTwo.map((myList) => {
              return (
                <MenuItem key={myList.ClientDatabase} value={myList}>
                  {" "}
                  {myList.ClientName} + {myList.Site}{" "}
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

export { SimpleSelect };
