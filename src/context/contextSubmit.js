import React, { useState, createContext } from "react";

const SubmitContext = createContext();

const SubmitProvider = (props) => {
  const [sourceOptions, setSourceoptionContext] = React.useState();
  const [clientIDContext, setClientID] = React.useState();
  const [clientNameContext, setClientName] = React.useState();
  const [sourceCategorycontext, setSourcecategory] = React.useState();
  const [sourceVersionContext, setsourceVersion] = React.useState();
  const [targetCategoryContext, setTargetcategory] = React.useState();
  const [targetVersionContext, setTargetVersion] = React.useState();
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
      }}
    >
      {props.children}
    </SubmitContext.Provider>
  );
};

export { SubmitContext, SubmitProvider };
