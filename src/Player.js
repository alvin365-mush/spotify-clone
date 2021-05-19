import React from 'react'
import Body from './Body'
import Footer from './Footer'
import './Player.css'
import Sidebar from './Sidebar'

function Player({ spotify }) {
    return (
        <div>
            <div className="player_body">
                {/*sidebar*/}
                <Sidebar />
                {/* body*/}
                <Body spotify={spotify} />
            </div>

            {/* footer */}
            <Footer spotify={spotify} />
        </div>
    )
}

export default Player
