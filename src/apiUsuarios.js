import axios from 'axios'

const API_URL = "https://uawjoztrdxvddxnwfxkv.supabase.co/rest/v1/contacto"

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhd2pvenRyZHh2ZGR4bndmeGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NTIzMDUsImV4cCI6MjA2NzQyODMwNX0.yFUfaVXBu9swr4M-orV43kYn7BhWd_BLD8Z9IpaJGVc"

export const obtenerUsuarios = async () => {
    const { data } = await axios.get(API_URL, {
        headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    return data
};

export const agregarUsuario = async (usuario) => {
    const {data} = await axios.post(API_URL, usuario, {
        headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        },
    });
    return data;
};

export const eliminarUsuario = async(id_contacto) => {
    await axios.delete(`${API_URL}?id_contacto=eq.${id_contacto}`, {
        headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
        },
    });
};

