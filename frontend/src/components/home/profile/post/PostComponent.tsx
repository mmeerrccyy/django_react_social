import React, {FC, useContext} from "react";
import {Card, CardContent, IconButton, Typography} from "@mui/material";
import {PostResponseModel} from "../../../../models/response/PostResponseModel";
import {
  DeleteOutlined,
  EditOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import {Context} from "../../../../index";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react-lite";

function PostComponent({post}: { post: PostResponseModel }): JSX.Element {
  const {store} = useContext(Context)

  const isLiked = () => {
    if (store?.user?.id) {
      // @ts-ignore
      return post.liked.includes(store.user.id)
    }
    return false;
  }

  return (
    <Card sx={{minWidth: "100vh"}}>
      <CardContent>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Typography
              sx={{fontSize: 14}}
              color="text.secondary"
              gutterBottom
              align={"right"}
            >
              {post.created_at}
            </Typography>
          </Grid>
          {"    "}
          <Grid item>
            <DeleteOutlined onClick={() => store.deletePost(post.id)} />
          </Grid>
          <Grid item>
            <EditOutlined />
          </Grid>
        </Grid>
        <Typography
          variant={"h5"}
          component={"div"}
        >
          {post.text}
        </Typography>
        <Typography align={"right"}>
          {post.liked.length}
          {"   "}
          <IconButton color={"secondary"} component={"span"}>
            {isLiked() ? <Favorite onClick={() => store.likePost(post.id)}/> :
              <FavoriteBorder onClick={() => store.likePost(post.id)}/>}
          </IconButton>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default observer(PostComponent);
