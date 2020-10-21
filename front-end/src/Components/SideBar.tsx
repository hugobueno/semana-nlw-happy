import React from 'react'
import {useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import mapMarker from '../assets/map-marker.svg'
import '../styles/components/SideBar.css'

export default function SideBar(){
    const history = useHistory()
    return (
        <aside className="app-sidebar">
            <img src={mapMarker} alt="Happy" />

            <footer>
                <button type="button" onClick={e=> history.goBack()}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    )
}