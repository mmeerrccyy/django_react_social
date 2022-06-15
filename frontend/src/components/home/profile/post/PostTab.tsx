import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import PostComponent from "./PostComponent";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {Card, CardContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function PostTab() {
  const {store} = useContext(Context)

  useEffect(() => {
    store.getMyPosts();
  }, [])

  return (
    <Grid container columns={1} spacing={2}>
      <Grid item xs={8}>
        <Card style={{minWidth: "100%"}}>
          <CardContent>
            <TextField
              id="outlined-multiline-static"
              label={"Create new post"}
              multiline
              rows={4}
              value={store.new_post_text}
              onChange={(e) => store.changeNewPostText(e.target.value)}
              placeholder={"Text"}
              style={{minWidth: "100%"}}
            />
            <Button
              variant={"contained"}
              style={{marginTop: "15px", minWidth: "100%"}}
              onClick={() => store.createPost()}
            >
              Create post
            </Button>
          </CardContent>
        </Card>
      </Grid>
      {store.posts.results?.map((el, key) => {
        return (
          <Grid item xs={8}>
            <PostComponent post={el} key={key} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default observer(PostTab);
