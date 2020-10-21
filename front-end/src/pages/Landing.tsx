import React from 'react';
import { Link } from 'react-router-dom'
import logoImg from '../assets/Logo.svg'
import imgHome from '../assets/ilustraHome.svg'
import { MdArrowForward } from 'react-icons/md'
import '../styles/pages/landing.css'


const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="row w-100 d-flex h-75 justify-content-center  align-items-center ">
          <div className="col-sm-4 d-flex flex-column  ">
            <img src={logoImg} className="img-logo" alt="Logo Happy" />
            <h1 className="mt-5">Leve felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas <strong>crianças</strong>.</p>
          </div>
          <div className="col-sm d-flex flex-column align-items-center justify-content-between">
            <div className="d-flex w-100 flex-column location align-items-end">
              <strong>Campo Grande</strong>
              <span>Mato Grosso do Sul</span>
            </div>
            <img src={imgHome} className="img-kids" alt="Imagem Crianças" />
            <Link to="/app" className="enter-app mt-5"><MdArrowForward fontSize="28px" color="#8D734B" /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;