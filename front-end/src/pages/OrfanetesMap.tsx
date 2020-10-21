import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { MdAdd, MdKeyboardArrowRight } from 'react-icons/md'
import imgLocal from '../assets/Local.png'
import mapMarker from '../assets/map-marker.svg'
import '../styles/pages/orphanages-map.css'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../services/api'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

interface Orphanage {
  _id: string,
  latitude: number,
  longitude: number,
  name: string,
}

const OrfanetesMap: React.FC = () => {

  //INFORMANDO AO STATE QUE O QUE SERA ARMAZENADO ALI É UM VETO DE OBJETO ORPHANAGE
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanage').then((response) => {
      if (!response.data) {
        return
      }
      setOrphanages(response.data)
      console.log(response.data)
    })
  }, [])



  const listMarkers = orphanages.map((index) => {
    return (
      <Marker key={index._id}
        position={[index.latitude, index.longitude]}
        icon={mapIcon}>
        <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240} >
          {index.name}
          <Link to={`/orphanages/${index._id}`}>
            <MdKeyboardArrowRight />
          </Link>
        </Popup>

      </Marker>
    )
  })

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={imgLocal} alt="Local" />
          <h2>Escolha um orfanato no Mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Campo Grande</strong>
          <span>Mato Grosso do Sul</span>
        </footer>
      </aside>
      <Map

        center={[-20.4635928, -54.604329]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}>
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        {listMarkers}
      </Map>
      <Link to="/orphanages/create" className="create-orphanages"><MdAdd fontSize="28px" color="#fff" /></Link>
    </div>
  )
}

export default OrfanetesMap;