import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Avatar, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Grid, IconButton, Typography } from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345
        },
        avatar: {
            backgroundColor: "#220021",
            color: "#FFFFFF"
        },
        media: {
            height: 0,
            paddingTop: "90%" // 16:9 -> 56.25%
        }
    })
);

export default function Team() {
    const classes = useStyles();

    return (
        <Box mt={2} p={4}>
            <Box mt={2} p={4}>
                <Typography variant="h4" align="center" color="secondary">Team</Typography>
            </Box>
            <Grid container alignItems="center" justifyContent="center" spacing={5}>
                {/*
                    <Grid item xs={12} sm={6} md={3}>
                        <Box my={2}>
                            <Card className={classes.root} elevation={3}>
                                <CardActionArea>
                                    <CardMedia component="img" image="media/fabio.png" title="Fabio Senti"/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5">Fabio Senti</Typography>
                                        <Typography gutterBottom variant="subtitle1">Assistant</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Fabio kann eigentlich nichts aber ist trotzdem voll dabei. Er kauft auch manchmal NFTs.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="twitter">
                                        <TwitterIcon/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="team" className={classes.avatar}>FS</Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="Fabio Senti"
                            subheader="Assistant"
                        />
                        <CardMedia className={classes.media} image="media/fabio.png" title="Fabio Senti"/>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Fabio kann eigentlich nichts aber ist trotzdem voll dabei. Er kauft auch manchmal NFTs.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="twitter">
                                <TwitterIcon color="secondary"/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="team" className={classes.avatar}>FG</Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="Filip Geschwandtner"
                            subheader="Assistant"
                        />
                        <CardMedia className={classes.media} image="media/fabio.png" title="Filip Geschwandtner"/>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Filip kann eigentlich nichts aber ist trotzdem voll dabei. Er kauft auch manchmal NFTs.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="twitter">
                                <TwitterIcon color="secondary"/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="team" className={classes.avatar}>AB</Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="Arindam Bajpayee"
                            subheader="Assistant"
                        />
                        <CardMedia className={classes.media} image="media/fabio.png" title="Arindam Bajpayee"/>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Arindam also doesn't have a clue as to what he is doing. He keeps on buying useless NFTs all the time.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="twitter">
                                <TwitterIcon color="secondary"/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
