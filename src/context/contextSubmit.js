import React, { createContext } from "react";

const SubmitContext = createContext();

const SubmitProvider = (props) => {
  const [sourceOptions, setSourceoptionContext] = React.useState();
  const [
    sourceNamespaceResultContext,
    setSourceNamespaceResultContext,
  ] = React.useState(0);
  const [clientIDContext, setClientID] = React.useState();

  const [sourceDBVersion, setSourceDBVersion] = React.useState();
  const [clientNameContextTest, setClientNameTest] = React.useState();
  const [clientNameContext, setClientName] = React.useState();
  const [
    productRestoreParameterContext,
    setProductRestoreParameterContext,
  ] = React.useState();
  const [clientAdminDBContext, setClientAdminDB] = React.useState();
  const [clientAdminDBServerContext, setClientAdminDBServer] = React.useState(
    0
  );
  const [sourceCategorycontext, setSourcecategory] = React.useState();
  const [sourceVersionContext, setsourceVersion] = React.useState();
  const [targetCategoryContext, setTargetcategory] = React.useState();
  const [targetVersionContext, setTargetVersion] = React.useState();
  const [userEmailcontext, setUseremail] = React.useState();
  const [userIDContext, setUserID] = React.useState();
  const [adminDBTargetServerContext, setAdminDBTargetServer] = React.useState();
  const [
    controlDBTargetServerContext,
    setControlDBTargetServer,
  ] = React.useState();
  const [
    controlDBSourceServerContext,
    setControlDBSourceServer,
  ] = React.useState();
  const [adminDBSourceServerContext, setAdminDBSourceServer] = React.useState();
  const [targetDBnameContext, setTargetDBnameContext] = React.useState();
  const [
    productBuildVersionContext,
    setProductBuildVersionContext,
  ] = React.useState();
  const [
    sourceProductRestoreTfsWorkspaceConetext,
    setSourceProductRestoreTfsWorkspaceConetext,
  ] = React.useState();
  const [
    targetProductRestoreTfsWorkspaceConetext,
    setTargetProductRestoreTfsWorkspaceConetext,
  ] = React.useState();
  const [
    targetDBSQLVersionContext,
    settargetDBSQLVersionContext,
  ] = React.useState();
  const [
    targetVersionObjectContext,
    setTargetVersionObjectContext,
  ] = React.useState([]);
  return (
    <SubmitContext.Provider
      value={{
        sourceOptions,
        setSourceoptionContext,
        clientIDContext,
        setClientID,
        clientNameContext,
        setClientName,
        sourceCategorycontext,
        setSourcecategory,
        sourceVersionContext,
        setsourceVersion,
        targetVersionContext,
        setTargetVersion,
        targetCategoryContext,
        setTargetcategory,
        userEmailcontext,
        setUseremail,
        userIDContext,
        setUserID,
        clientAdminDBContext,
        setClientAdminDB,
        clientAdminDBServerContext,
        setClientAdminDBServer,
        adminDBTargetServerContext,
        setAdminDBTargetServer,
        controlDBTargetServerContext,
        setControlDBTargetServer,
        controlDBSourceServerContext,
        setControlDBSourceServer,
        adminDBSourceServerContext,
        setAdminDBSourceServer,
        targetDBnameContext,
        setTargetDBnameContext,
        productBuildVersionContext,
        setProductBuildVersionContext,
        sourceProductRestoreTfsWorkspaceConetext,
        setSourceProductRestoreTfsWorkspaceConetext,
        targetProductRestoreTfsWorkspaceConetext,
        setTargetProductRestoreTfsWorkspaceConetext,
        targetDBSQLVersionContext,
        settargetDBSQLVersionContext,
        clientNameContextTest,
        setClientNameTest,
        sourceNamespaceResultContext,
        setSourceNamespaceResultContext,
        sourceDBVersion,
        setSourceDBVersion,

        productRestoreParameterContext,
        setProductRestoreParameterContext,
        targetVersionObjectContext,
        setTargetVersionObjectContext,
      }}
    >
      {props.children}
    </SubmitContext.Provider>
  );
};

export { SubmitContext, SubmitProvider };
