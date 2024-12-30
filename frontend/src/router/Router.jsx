import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from "../pages/Home";
import Markert from '../pages/Markert';
import PageCard from '../pages/PageCard';
import CheckOut from '../pages/CheckOut';
import Access from '../pages/Access';
import AboutUs from '../pages/AboutUs';

const Router = () => {
    const location = useLocation();

    useEffect(() => {
        // Desplazar al inicio de la página cuando la ruta cambie
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/store' element={<Markert />} />
            <Route path='/product/:name' element={<PageCard />} />
            <Route path='/checkOut' element={<CheckOut />} />
            <Route path='/access' element={<Access />} />
            <Route path='/aboutUs' element={<AboutUs />} />
        </Routes>
    );
}

export default Router;
