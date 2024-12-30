import React, { useEffect, useState } from 'react';
import ReCaptchaForm from '../components/ReCaptchaForm';
import axios from 'axios';

const Access = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchAllRegions = async () => {
      try {
        let allRegions = [];
        let nextPage = 'http://127.0.0.1:8000/api/RegionYComunaCL/region/';

        // Mientras exista un enlace a la siguiente página, realiza la solicitud
        while (nextPage) {
          const response = await axios.get(nextPage);
          allRegions = [...allRegions, ...response.data.results]; // Acumula resultados
          nextPage = response.data.next; // Actualiza la URL de la siguiente página
        }

        setRegions(allRegions); // Guardar las regiones en el estado
      } catch (error) {
        console.error('Error al obtener las regiones:', error.message);
      }
    };

    fetchAllRegions();
  }, []);

  return (
    <>
      <ReCaptchaForm regions={regions} />
    </>
  );
};

export default Access;
