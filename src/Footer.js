import React, { useEffect } from 'react'
import './Footer.css'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import RepeatIcon from '@material-ui/icons/Repeat'
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useDataLayerValue } from './DataLayer'

function Footer({ spotify }) {

    const [{ token, item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then(response => {
            //console.log(response);

            dispatch({
                type: "SET_PLAYING",
                playing: response.is_playing,
            });

            dispatch({
                type: "SET_ITEM",
                item: response.item,
            });

        })

    }, [spotify])

    const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then(response => {
            dispatch({
                type: "SET_ITEM",
                item: response.item
            })
            dispatch({
                type: "SET_PLAYING",
                playing: true
            })
        })

    }
    const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then(response => {
            dispatch({
                type: "SET_ITEM",
                item: response.item
            })
            dispatch({
                type: "SET_PLAYING",
                playing: true
            })
        })

    }
    const handlePlayPause = () => {
        if (playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false
            });

        } else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true
            });
        }

    }
    return (
        <div className="footer">
            <div className="footer_left">
                <img className="footer_albumLogo" src={item?.album.images[0].url} alt={item?.name} />
                {item ? (
                    <div className="song_info">
                        <h4>{item.name}</h4>
                        <p>{item.artists.map(artist => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="song_info">
                        <h4>Nothing is playing</h4>
                        <p>......</p>
                    </div>
                )}

            </div>
            <div className="footer_center">
                <ShuffleIcon className="footer_green" />
                <SkipPreviousIcon onClick={skipPrevious} className="footer_icon" />
                {playing ? (
                    <PauseCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer_icon" />
                ) : (
                    <PlayCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer_icon" />
                )}
                <SkipNextIcon onClick={skipNext} className="footer_icon" />
                <RepeatIcon className="footer_green" />
            </div>
            <div className="footer_right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
