import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { useHistory } from "react-router-dom";
import SideBar from '../Components/SideBar'
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet'
import mapMarkerImg from '../assets/map-marker.svg';
import api from '../services/api'

import '../styles/pages/create-orphanage.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instruction, setInstruction] = useState('')
  const [openHours, setOpenHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, SetPreviewImages] = useState<string[]>([])

  function handleMapClick(event: LeafletMouseEvent) {
    setPosition({ latitude: 0, longitude: 0 })
    const { lat, lng } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault()
      const { latitude, longitude } = position

      const dataForm = new FormData()
      dataForm.append('name', name)
      dataForm.append('latitude', String(latitude))
      dataForm.append('longitude', String(longitude))
      dataForm.append('about', about)
      dataForm.append('instructions', instruction)
      dataForm.append('open_on_weekends', String(open_on_weekends))
      dataForm.append('open_hours', String(openHours))

      images.forEach(image => {
        dataForm.append('images', image)
      })

      const { data } = await api.post('orphanage', dataForm)
      console.log(data)
      if (!data || data.Error) {
        return alert('Erro no Cadastramento')
      }
      console.log(data)
      history.push('/app')
    } catch (error) {
      alert('Talves Falte alguns Campos')
    }
  }

  function handleSelectImagens(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(images => {
      return URL.createObjectURL(images)
    })

    SetPreviewImages(selectedImagesPreview)

  }

  return (
    <div id="page-create-orphanage">
      <SideBar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-20.477684, -54.6168978]}
              style={{ width: '100%', height: 280 }}
              zoom={13}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 ? <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} /> : null}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input value={name} onChange={e => setName(e.target.value)} id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea value={about} onChange={e => setAbout(e.target.value)} id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((index) => {
                  return (
                    <img key={index} src={index} alt={name} />
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label >
              </div>
              <input onChange={handleSelectImagens} multiple type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea value={instruction} onChange={e => setInstruction(e.target.value)} id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input value={openHours} onChange={e => setOpenHours(e.target.value)} id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}

                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
