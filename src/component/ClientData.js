import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "react-autocomplete";

import { SourceDBVersion } from "./SourceVersion";
import { Box, Grid, GridList, Container, Typography } from "@material-ui/core";
import { SubmitContext } from "../context/ContextSubmit";
import FormControl from "@material-ui/core/FormControl";
import { adminClientAPI } from "./URL/BaseURL";
import {
  useTheme,
  makeStyles,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const textTheme = createMuiTheme({
  // palette: {
  text: {
    primary: "#ffffff",
    secondary: "#00000",
  },
  // },
});

const WhiteTextTypography = withStyles({
  root: {
    color: "#9e9e9e",
    font: "Roboto",
    align: "left",
  },
})(Typography);
function ClientSearch() {
  const classes = useStyles();
  function searchingFor() {}
  let sVersionHolder;
  let searchBar;
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 80,
      defaultWidth: 200,
    })
  );
  const [clientList, setClientList] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { clientNameContextTest, setClientNameTest } = useContext(
    SubmitContext
  );
  const { sourceCategorycontext } = useContext(SubmitContext);
  const {
    clientNameContext,
    clientIDContext,
    setClientID,
    setClientName,
    clientAdminDBServerContext,
    setClientAdminDBServer,
    clientAdminDBContext,
    setClientAdminDB,
  } = useContext(SubmitContext);
  // const { clientNameContextTest } = useContext(SubmitContext);
  let envAPI = useCallback(async () => {
    let url = adminClientAPI + sourceCategorycontext;
    await axios({
      method: "get",
      url,
    })
      .then(function (response) {
        setClientList(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  useEffect(() => {
    envAPI();
  }, [sourceCategorycontext]);

  useEffect(() => {
    searchingFor();
    console.log(searchTerm);
  }, [searchTerm, sourceCategorycontext]);
  let holder;

  if (clientList !== undefined) {
    searchingFor = () => {
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].clientId == searchTerm) {
          console.log(clientList[i]);
          setClientID(clientList[i].clientId);
          setClientAdminDBServer(clientList[i].adminDbSrv);
          setClientAdminDB(clientList[i].adminDb);
          setClientName(clientList[i].clientName);
        }
      }
    };
    const handleChange = (event, value) => {
      setSearchTerm(event.target.value);
      // setClientNameTest(event.target.value);
      setClientID(value);
      console.log(event.target.value);
      console.log(value);
    };

    const handleClick = (event, value) => {
      // setSearchTerm(value);
      setClientID(event.target.value);
    };
    const onSelect = (item) => {
      setSearchTerm(item.clientId);
      setClientNameTest(item.adminDbSrv);
    };
    const renderItem = (item) => {
      return (
        <div>
          {item.clientName} {item.clientId}
        </div>
      );
    };
    const rowRenderer = (data) => ({ key, index, style, parent }) => {
      const client = data[index];
      return (
        <CellMeasurer
          key={key}
          cache={cache.current}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div
            key={key}
            style={style}
            onMouseDown={onSelect.bind(null, client)}
          >
            <h4>
              {" "}
              {client.clientName}-{client.clientId}
            </h4>
          </div>
        </CellMeasurer>
      );
    };

    const renderMenu = (data) => () => {
      return (
        <div align="left" style={{ width: "100%", height: "40vh" }}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                defferredMeasurementCache={cache.current}
                rowHeight={cache.current.rowHeight}
                rowCount={data.length}
                rowRenderer={rowRenderer(data)}
                // onClick={handleClick}
                onSelect={onSelect}
              />
            )}
          </AutoSizer>
        </div>
      );
    };

    // const searchTerm = searchingFor;
    let data = clientList;
    if (searchTerm.length > 0) {
      data = clientList.filter(
        (item) =>
          item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          //   item.clientId.includes(searchTerm)
          item.clientId == searchTerm
      );
      //   : clientList;
    }

    searchBar = (
      <div>
        <FormControl required>
          <Box fontFamily="Roboto" color="#9e9e9e" align="left" fontSize={14}>
            Client Info*
          </Box>

          <Autocomplete
            classes={classes}
            renderItem={renderItem}
            items={data}
            getItemValue={(item) => item.clientName}
            value={searchTerm}
            id="clientDropDownSearch"
            onChange={handleChange}
            onClick={handleClick}
            onSelect={(item) => onSelect(item)}
            renderMenu={renderMenu(data)}
            renderItem={(item) => (
              <div>
                {" "}
                {item.clientId} {item.clientId}
              </div>
            )}
            shouldItemRender={() => false}
            inputProps={{
              style: { width: "200px", height: "30px" },
              placeholder: "Enter Client Name or ID",
            }}
            wrapperStyle={{ width: "100%" }}
          />
        </FormControl>
      </div>
    );
  }
  if (sourceCategorycontext !== undefined && clientIDContext !== undefined) {
    console.log("Reached adminclient near source db");
    sVersionHolder = <SourceDBVersion />;
  }

  return (
    <div>
      {searchBar}

      {sVersionHolder}
    </div>
  );
}

export { ClientSearch };
