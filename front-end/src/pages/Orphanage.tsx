import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory } from 'react-router-dom';
import L from 'leaflet';
import SideBar from '../Components/SideBar'
import mapMarkerImg from '../assets/map-marker.svg';
import api from '../services/api'
import '../styles/pages/orphanage.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Orphanage {
  latitude: number,
  longitude: number,
  name: string,
  instructions: string,
  about: string,
  open_hours: string,
  open_on_weekends: boolean,
  images: Array<{
    _id: string,
    path: string
  }>
}

interface OrphanageParams {
  id: string
}

export default function Orphanage() {
  const { goBack } = useHistory();
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const params = useParams<OrphanageParams>()
  const [activeImageIndex, setActiveImageIndex ] = useState(0)


  useEffect(() => {
    api.get(`orphanage/${params.id}`,)

      .then((response) => {
        if (!response.data) {
          return
        }
        setOrphanage(response.data)
        console.log(response.data)
      })
  }, [params.id])

  if (!orphanage) {
    return <p>Carregando....</p>
  }

  const listImages = orphanage.images.map((element, index) => {
    return (
      <button
        onClick={()=>{
          setActiveImageIndex(index)
        }}
        key={element._id}
        className={activeImageIndex ===  index? 'active': ''}
        type="button">
        <img src={element.path} alt={orphanage.name} />
      </button>
    )
  })

  return (
    <div id="page-orphanage">
      <SideBar />


      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].path} alt={orphanage.name} />

          <div className="images">
            {listImages}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}&travelmode=walking`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.open_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>
              ) : (
                  <div className="open-off-weekends">
                    <FiInfo size={32} color="#FE669C" />
                Não Atendemos <br />
                fim de semana
                  </div>
                )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}