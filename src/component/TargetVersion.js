import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { SubmitContext } from "../context/ContextSubmit";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { sourceNamespaceAPI } from "./URL/BaseURL";
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

//This file contains the function that will access the API to get the DB version of customers
//The process will get the data from the API, then map through an array to assign the data to the UI
//dropdown element for the target version, then onClick assign the variable globally using the React Context API

function TargetDBVersion() {
  const [targVersionlist, setTargetlist] = useState();
  const [tVersion, setVersion] = React.useState();
  const [versionServer, setVersionServer] = React.useState();
  const { setTargetVersion, sourceDBVersion } = useContext(SubmitContext);
  const { targetCategoryContext } = useContext(SubmitContext);
  const { clientIDContext, clientAdminDBServerContext } = useContext(
    SubmitContext
  );
  const { setAdminDBTargetServer } = useContext(SubmitContext);
  const { setControlDBTargetServer } = useContext(SubmitContext);
  const { setTargetDBnameContext } = useContext(SubmitContext);
  const { setProductBuildVersionContext } = useContext(SubmitContext);
  const { setTargetProductRestoreTfsWorkspaceConetext } = useContext(
    SubmitContext
  );
  const { settargetDBSQLVersionContext } = useContext(SubmitContext);

  const classes = useStyles();
  let verList = {};
  let finalArr = [{ name: " ", result: " " }];
  let test2 = [];

  let holder;
  let displayArr = [];
  let stringFixer;
  let objFinalArr = [];

  const versionAPI = useCallback(async () => {
    let url =
      sourceNamespaceAPI + targetCategoryContext + "&id=" + clientIDContext;
    await axios({
      method: "get",
      url,
    })
      .then(function (response) {
        setTargetlist(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const handleChange = (event) => {
    setVersion(event.target.value);
    console.log(event.target.DBname);
    console.log(event.target.value);
    setVersionServer(event.target.value);
    setVersionServerDatabase(event.target.value);
  };
  useEffect(() => {
    versionAPI();
  }, [targetCategoryContext, clientIDContext]);
  //Passing the target server data using Context API
  const setVersionServerDatabase = (vServer) => {
    let serverAddress = vServer.split(",");
    console.log(serverAddress);
    setAdminDBTargetServer(serverAddress[1]);
    setControlDBTargetServer(serverAddress[4]);
    setTargetDBnameContext(serverAddress[3]);
    setProductBuildVersionContext(serverAddress[2]);
    setTargetVersion(serverAddress[0]);
    setTargetProductRestoreTfsWorkspaceConetext(serverAddress[5]);
    settargetDBSQLVersionContext(serverAddress[6]);
  };
  //This conditional statement ensures that the UI component will
  //Only render once there is a response from the API
  //Without this conditional statement, there are error logs
  //Due to the the UI element attempting to render and map
  //Over an empty array
  if (
    (targetCategoryContext !== undefined &&
      clientIDContext !== undefined &&
      sourceDBVersion !== undefined) ||
    (clientIDContext !== undefined &&
      targetCategoryContext !== undefined &&
      clientAdminDBServerContext === 0)
  ) {
    if (targVersionlist !== undefined) {
      console.log(targVersionlist);
      console.log(sourceDBVersion);
      //The code here is to resolve the error log when the siteName
      //Is not returned in the namespace API
      if (targVersionlist.length === 0) {
        let emptyArr = [
          {
            category: "QA",
            clientId: 80017,
            clientName: "wfm117",
            dt: null,
            siteDetail: null,
            siteName: {
              qa857:
                "857qawfm117,nan4dfc1sql06,857,qa857_control,ncdbqa20,d:dayforcegit\release\r-857,2016",
              qa858:
                "858qawfm117,nan4dfc1sql20,858,qa858_control,ncdbqa20,d:dayforcegit\release\r-858,2016",
              qa859:
                "859qawfm117,nan4dfc1sql20,859,qa859_control,ncdbqa20,d:dayforcegit\release\r-859,2016",
              qa860:
                "860qawfm117,nan4dfc1sql21,860,qa860_control,ncdbqa20, d:dayforcegitmaster,2016",
            },
          },
        ];
        setTargetlist(emptyArr);
      }

      console.log(targVersionlist);
      if (targVersionlist.length >= 1) {
        for (let i = 0; i < 3; i++) {
          if (targVersionlist[0].siteName !== "")
            verList = targVersionlist[0].siteName;
        }
        // console.log(verList);

        //The reason for the next 5 lines of code is that the response of
        //The API is an array of lenght 1 and the data inside is an obkject
        //Therefor the code needs to resolve the object into an array
        test2 = Object.values(verList);

        finalArr = Object.keys(verList);
        console.log(test2);
        console.log(finalArr);

        let fixerArr;
        //Parsing the API response of string to object
        for (let i = 0; i < test2.length; i++) {
          let targetSiteObj = {
            key: " ",
            namespace: " ",
            controlServer: " ",
            DBVersion: " ",
            adminServer: " ",
            TFSWorkItem: " ",
            SQLServer: " ",
            reserverdStatus: " ",
            value: " ",
            displayNamespace: " ",
            uniqueNamespace: " ",
          };
          fixerArr = test2[i].split(",", 8);
          console.log(fixerArr);
          targetSiteObj.key = i;
          targetSiteObj.namespace = fixerArr[0];
          targetSiteObj.controlServer = fixerArr[1];
          targetSiteObj.DBVersion = fixerArr[2];
          targetSiteObj.adminServer = fixerArr[4];
          targetSiteObj.TFSWorkItem = fixerArr[5];
          targetSiteObj.SQLServer = fixerArr[6];
          targetSiteObj.reserverdStatus = fixerArr[7];
          targetSiteObj.value = test2[i];
          targetSiteObj.uniqueNamespace = finalArr[i];
          displayArr.push(targetSiteObj);
        }
        // console.log(targetSiteObj);
        // console.log(displayArr);

        //Removing DB versions below source version
        //Removing reserved DBs
        for (let i = 0; i < displayArr.length; i++) {
          if (sourceDBVersion <= displayArr[i].DBVersion) {
            if (displayArr[i].reserverdStatus === "NR") {
              stringFixer =
                // displayArr[i].DBVersion +
                displayArr[i].uniqueNamespace + "_" + clientIDContext;
              displayArr[i].displayNamespace = stringFixer;
              objFinalArr.push(displayArr[i]);
            }
          }
        }

        console.log(objFinalArr);

        holder = (
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Target DB Version{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="targetVersionDropDown"
              value={tVersion ? tVersion : " "}
              onChange={handleChange}
            >
              {objFinalArr.map((myList) => {
                return (
                  <MenuItem
                    key={myList.key}
                    value={myList.value}
                    DBname={myList.DBVersion}
                    id="menucat"
                  >
                    {" "}
                    {myList.displayNamespace} [{myList.DBVersion}]
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      }
    }
  }
  let helpIcon = <HelpOutlineIcon />;

  let questionUI;
  questionUI = (
    <div>
      <Tooltip title="Reserverd and invalid target DB versions have been removed">
        {helpIcon}
      </Tooltip>
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box width={250}>{holder}</Box>
    </div>
  );
}

export { TargetDBVersion };
