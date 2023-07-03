import express from 'express';
import fetch from 'node-fetch'
import { Router } from 'express'
const router = Router()

// Ruta para obtener el tipo de cambio desde la API de la Sunat
router.get('/cambio', (req, res) => {
  const url = 'https://api.apis.net.pe/v1/tipo-cambio-sunat';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el tipo de cambio' });
    });
});

export default router