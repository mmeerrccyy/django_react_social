import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import HeaderComponent from "../HeaderComponent";
import PostComponent from "./post/PostComponent";
import Grid from "@mui/material/Grid";
import {Tab, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import PostTab from "./post/PostTab";

function MyProfileComponent() {
  const {store} = useContext(Context)

  const [tabIndex, setTabIndex] = useState<string>("1");

  const changeIndex = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <HeaderComponent/>
      <Typography variant={"h1"}>Welcome back, {store.user.username}!</Typography>
      {/*<h3>Posts {store.posts.count}</h3>*/}
      <TabContext value={tabIndex}>
        <TabList onChange={changeIndex} aria-label="lab API tabs example">
          <Tab label={`Posts ${store.posts.count}`} value="1" />
          <Tab label="Friends" value="2" />
          <Tab label="Messages" value="3" />
        </TabList>
        <TabPanel value="1">
          <PostTab />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </>
  )
}

export default observer(MyProfileComponent);
