"use strict";
import React, { useContext, useCallback, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import axios from "axios";
import { submitFormPOSTAPI } from "./URL/BaseURL";
import { SubmitContext } from "../context/ContextSubmit";
import {
  HashRouter as Router,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
//This file contains the function that will render the Submit Button
//All the user entered data will  be passed to the POST API call
//using the React Context API

function SubmitButton() {
  // const [btnDisabled, setBtnDisabled] = useState(true);
  let btnDisabled = true;
  let history = useHistory();
  const { sourceOptions } = useContext(SubmitContext);
  const {
    clientIDContext,
    clientNameContext,
    clientAdminDBContext,
    clientAdminDBServerContext,
    setRestoreSubmitResponseContext,
    restoreSubmitResponseContext,
  } = useContext(SubmitContext);
  const { sourceCategorycontext } = useContext(SubmitContext);
  const { sourceVersionContext } = useContext(SubmitContext);
  const { targetVersionContext } = useContext(SubmitContext);
  const { targetCategoryContext } = useContext(SubmitContext);
  const { userEmailcontext } = useContext(SubmitContext);
  const { userIDContext } = useContext(SubmitContext);
  const { controlDBTargetServerContext } = useContext(SubmitContext);
  const { adminDBTargetServerContext } = useContext(SubmitContext);
  const { controlDBSourceServerContext } = useContext(SubmitContext);
  const { adminDBSourceServerContext } = useContext(SubmitContext);
  const { targetDBnameContext } = useContext(SubmitContext);
  const {
    productBuildVersionContext,
    sourceProductRestoreTfsWorkspaceConetext,
    targetDBSQLVersionContext,
    targetProductRestoreTfsWorkspaceConetext,
  } = useContext(SubmitContext);

  if (clientIDContext !== undefined && targetVersionContext !== undefined) {
    btnDisabled = false;
  }

  //POST API call that will contain the user form data for a restore request
  const submitPostAPI = useCallback(async () => {
    history.push("/SubmitPage");
    let today = new Date();
    let timestamp = new Date().getTime();
    let time =
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getMilliseconds();
    let restoreTime =
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getDate() +
      "T" +
      time;
    let productRestoreBackupStamp =
      targetVersionContext +
      "_" +
      clientIDContext +
      "_" +
      "username" +
      "_" +
      today.getDate() +
      today.getMonth() +
      today.getFullYear() +
      "_" +
      today.getHours() +
      today.getMinutes() +
      today.getMilliseconds() +
      "_SQL" +
      targetDBSQLVersionContext +
      ".bak";

    let productBackupTargetStamp =
      "\\\\ncqafs01\\DBbackups\\DevDBBackfill\\" + productRestoreBackupStamp;

    console.log(timestamp);
    console.log(time);
    console.log(restoreTime);
    console.log(productRestoreBackupStamp);
    console.log(productBackupTargetStamp);
    console.log(targetVersionContext);
    console.log(controlDBTargetServerContext);
    console.log(adminDBTargetServerContext);
    console.log(targetProductRestoreTfsWorkspaceConetext);
    console.log(targetDBSQLVersionContext);
    console.log(clientIDContext);
    console.log(clientNameContext);
    console.log(clientAdminDBContext);
    console.log(restoreSubmitResponseContext);

    await axios({
      method: "post",
      url: submitFormPOSTAPI,
      data: {
        taskId: timestamp,
        taskStatus: "Completed",
        restoreStatus: "Success",
        productBuildVersion: productBuildVersionContext,
        productCurrentServer: controlDBSourceServerContext,
        productDestinationServer: adminDBTargetServerContext,
        productUser: "N/A",
        productPassword: "N/A",
        tfsWorkItemId: "D",
        productBackupPath: "\\\\ncqafs01\\DBbackups\\DevDBBackfill",
        productRestoreBackup: productRestoreBackupStamp,
        productNameSpace: targetVersionContext,
        productClientName: clientNameContext,
        productClientId: clientIDContext,
        productDropNameSpaceServer: controlDBSourceServerContext,
        productDropNameSpace: sourceVersionContext,
        productBackupStatus: "1|Backup File exist on Distination Server",
        productLastRestore: "NA",
        productBackupSource: "\\\\ncqafs01\\DBbackups\\DevDBBackfill",
        productBackupTarget: productBackupTargetStamp,
        productBackupSize: "70.18 GB",
        productBackupRequest: sourceVersionContext,
        productBackupAction: "-",
        productBackupType: "x",
        productBackupDate: "x",
        controlDbServer: controlDBTargetServerContext,
        controlDbUser: clientAdminDBContext,
        controlDbUserPassword: "sql@tfs2008",
        hashPassword: "D",
        restoreCreateDate: "1900-01-01T00:00:00",
        controlDbName: targetDBnameContext,
        controlDbBaseUrl: "https://qa.dayforce.com/853",
        adminDbServer: clientAdminDBServerContext,
        adminDbName: clientAdminDBContext,
        adminPodName: sourceCategorycontext,
        productRestoreTfsWorkspace: targetProductRestoreTfsWorkspaceConetext,
        restoreExecUserId: "P11F887",
        productRestoreDate: "2018-01-03",
        productRestoreTime: "08:27:33 AM",
        productRestoreNotification: false,
        productRestoreLogPath: timestamp + "_",
        productRestoreParameter: timestamp + "_",
        restoreAction: "RestoreAndUpgradeNetwork",
        restoreGroup: "",
        productClientRegistration: true,
        productRestoreType: sourceOptions,
        productBiNameSpace: "NA",
        productBiTemplate: "NA",
        productBiTemplatePath: "NA",
        productBiTemplateType: "L",
        restoreBackupToolBoxUrl: "",
        productClientIdChange: false,
        restoreRequestBy: userIDContext,
        restoreRequestEmail: userEmailcontext,
        restoreNotes: "",
        restoreDbUpgradeError: "NA",
        restoreDeleteBjeLogs: true,
        restoreRunArchive: false,
        restoreRunArchiveAll: false,
        clientIdExist: true,
        tfsPriority: 1,
        restoreTitle: null,
        restoreEmails: null,
        tfsWitUser: null,
        restoreExecUser: null,
        tfsRemainingWork: null,
      },
    })
      .then(function (response) {
        console.log(response);
        ResponseSetter(response.status);

        console.log(restoreSubmitResponseContext);
      })
      .catch(function (error) {});
  });

  //redndering the submit button
  return (
    <div>
      {/* <Link to="/SubmitPage" style={{ textDecoration: "none" }}> */}
      <Button
        disabled={btnDisabled}
        id="submitButtonFormPOST"
        variant="contained"
        color="primary"
        onClick={submitPostAPI}
        data-testid="submitButtonelement"
      >
        {" "}
        Submit
      </Button>
      {/* </Link> */}
    </div>
  );
}

function ResponseSetter(result) {
  console.log("reached responsefunctionssss");
  console.log(restoreSubmitResponseContext);
  let history = useHistory();

  history.push("/SubmitPage");
  const {
    setRestoreSubmitResponseContext,
    restoreSubmitResponseContext,
  } = useContext(SubmitContext);
  setRestoreSubmitResponseContext(result);
  console.log(restoreSubmitResponseContext);
}

export { SubmitButton };
