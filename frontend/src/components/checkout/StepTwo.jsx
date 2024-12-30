import React, { useState,useEffect } from 'react';
import { useSelector } from "react-redux";
import { Typography, Button, Radio } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
const StepTwo = ({regions}) => {
  const isLoggedIn = useSelector((state) => !!state.auth.accessToken);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [comunas, setComunas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    run: "",
    dv: "",
    region: "",
    comuna: "",
    direccion: "",
    email: "",
  });
  const [formData, setFormData] = useState({
          email: '',
          regions: '',
          password: '',
          password_confirm: '',
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          run: '',
          dv: '',
          region: '',
          comuna: '',
          direccion: '',
      });
  
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderCode, setOrderCode] = useState(null);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.trim().toLowerCase() : value.trim(),
    }));
  };

  const applyFiltersToGuestData = () => {
    const filteredData = { ...guestData };
    for (const key in filteredData) {
      if (key === "email") continue;
      filteredData[key] = capitalize(filteredData[key].trim());
    }
    return filteredData;
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    const filteredData = applyFiltersToGuestData();
    console.log("Datos del formulario invitado:", filteredData);
    console.log("Método de pago seleccionado:", paymentMethod);
    setOrderCode(`P#${Math.floor(Math.random() * 100000) + 50000}`);
    setShowGuestForm(false); // Ocultar el formulario después de enviarlo
  };
  const fetchComunas = async (regionId) => {
    setLoading(true);
    let currentPage = 1;
    const allComunas = []; // Aquí almacenaremos todas las comunas

    try {
        // Obtener el total de comunas y recorrer todas las páginas
        let response;
        do {
            const url = `http://127.0.0.1:8000/api/RegionYComunaCL/comuna/?id_region=${regionId}&page=${currentPage}`;
            response = await axios.get(url);
            allComunas.push(...response.data.results); // Agregar las comunas de la página actual
            currentPage++; // Incrementar para la siguiente página
        } while (response.data.next); // Continuar mientras haya una página siguiente

        console.log("Todas las comunas obtenidas:", allComunas); // Verifica todas las comunas obtenidas
        setComunas(allComunas); // Actualizar el estado de comunas con todas las obtenidas
    } catch (error) {
        console.error("Error fetching comunas:", error);
    } finally {
        setLoading(false);
    }
};





const handleRegionChange = (e) => {
    const selectedRegionId = e.target.value;  // Aquí se toma la ID de la región, no el nombre
    setFormData((prev) => ({
        ...prev,
        region: selectedRegionId,  // Guarda la ID de la región
    }));
    setComunas([]);  // Limpia las comunas cuando se selecciona una nueva región
    fetchComunas(selectedRegionId);  // Llama con la ID de la región
};


  return (
    <div className="h-fit b-10">
      <Typography variant="h5" className="mb-4">
        Método de Pago
      </Typography>
      {isLoggedIn ? (
        <form>
          <div className="mt-4">
            <Radio
              id="credit-card"
              name="payment"
              value="credit-card"
              label="Tarjeta de Crédito"
              onChange={() => setPaymentMethod("credit-card")}
            />
            <Radio
              id="paypal"
              name="payment"
              value="paypal"
              label="PayPal"
              onChange={() => setPaymentMethod("paypal")}
            />
            <Radio
              id="cash"
              name="payment"
              value="cash"
              label="Efectivo"
              onChange={() => setPaymentMethod("cash")}
            />
            <Radio
              id="bank-transfer"
              name="payment"
              value="bank-transfer"
              label="Transferencia Bancaria"
              onChange={() => setPaymentMethod("bank-transfer")}
            />
          </div>
        </form>
      ) : (
        <div className="mt-4">
          {!showGuestForm ? (
            <>
              <Typography variant="h6" className="mb-4">
                No estás registrado
              </Typography>
              <div className="flex gap-4">
              <Button variant="gradient" color="blue" disabled={orderCode}>
                <Link to="/access">Registrarse</Link>
              </Button>
              <Button variant="outlined" color="gray" onClick={() => setShowGuestForm(true)} disabled={orderCode}>
                Continuar sin registrarse
              </Button>
              </div>
            </>
          ) : (
            !orderCode && (
              <form onSubmit={handleGuestSubmit} className="flex flex-col space-y-4">
                <Typography variant="h6">Datos para la venta</Typography>
                <input
                  type="text"
                  name="primer_nombre"
                  placeholder="Primer Nombre"
                  value={guestData.primer_nombre}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="segundo_nombre"
                  placeholder="Segundo Nombre"
                  value={guestData.segundo_nombre}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="primer_apellido"
                  placeholder="Primer Apellido"
                  value={guestData.primer_apellido}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="segundo_apellido"
                  placeholder="Segundo Apellido"
                  value={guestData.segundo_apellido}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="run"
                  placeholder="RUN"
                  value={guestData.run}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="dv"
                  placeholder="Dígito Verificador"
                  value={guestData.dv}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
                <select
                            name="region"
                            value={formData.region}
                            onChange={handleRegionChange}  // Aquí llamamos a handleRegionChange
                            className="p-2 border rounded"
                            required
                        >
                            <option value="" disabled>Selecciona una región</option>
                            {regions.map((region) => (
                                <option key={region.id} value={region.id}>{region.nombre}</option> 
                            ))}
                        </select>


                        <select
                            name="comuna"
                            value={formData.comuna}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            disabled={loading} // Deshabilitar si estamos cargando
                            required
                        >
                            <option value="" disabled>Selecciona una comuna</option>
                            {comunas.map((comuna) => (
                                <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
                            ))}
                        </select>

                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={guestData.direccion}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={guestData.email}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
                <div className="mt-4">
                  <Typography variant="subtitle2">Selecciona un método de pago:</Typography>
                  <Radio
                    id="cash"
                    name="payment"
                    value="cash"
                    label="Efectivo"
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <Radio
                    id="bank-transfer"
                    name="payment"
                    value="bank-transfer"
                    label="Transferencia Bancaria"
                    onChange={() => setPaymentMethod("bank-transfer")}
                  />
                </div>
                <Button type="submit" variant="gradient" color="blue">
                  Enviar
                </Button>
              </form>
            )
          )}
          {orderCode && (
            <Typography variant="h6" className="mt-4 text-green-500">
              ¡Código de pedido generado: {orderCode}!
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default StepTwo;
