import React from 'react'
import './Body.css'
import { useDataLayerValue } from './DataLayer';
import Header from './Header'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import SongRow from './SongRow';


function Body({ spotify }) {

    const [{ discover_weekly }, dispatch] = useDataLayerValue();

    return (
        <div className="body">
            <Header spotify={spotify} />

            <div className="body_info">
                <img src={discover_weekly?.images[0].url} alt="https://cdn.playlists.net/images/playlists/image/medium/3b95cdcac50753f907c22c7c6e138dd4.jpg"
                />
                <div className="body_infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            <div className="body_songs">
                <div className="body_icons">
                    <PlayCircleFilledIcon className="body_shuffle" />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>
                {/*list of songs*/}
                {discover_weekly?.tracks.items.map(item =>
                    <SongRow track={item.track} />
                )}
            </div>
        </div>
    )
}

export default Body
