import axios from 'axios'

const API_URL = "https://uawjoztrdxvddxnwfxkv.supabase.co/rest/v1"

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhd2pvenRyZHh2ZGR4bndmeGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NTIzMDUsImV4cCI6MjA2NzQyODMwNX0.yFUfaVXBu9swr4M-orV43kYn7BhWd_BLD8Z9IpaJGVc"

export const obtenerUsuarios = async () => {
    const { data } = await axios.get(`${API_URL}/contacto`, {
        headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    return data
};

export const agregarUsuario = async (usuario) => {
    const {data} = await axios.post(`${API_URL}/contacto`, usuario, {
        headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        },
    });
    return data[0];
};

export const eliminarUsuario = async(id_contacto) => {
    try {
        await axios.delete(`${API_URL}/contacto?id_contacto=eq.${id_contacto}`, {
            headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`,
            },
        });
    }
    catch (error) {
    console.log('eliminar' + error.response.data); 
    }
};

export const obtenerDatos = async () => {
    const {data} = await axios.get(`${API_URL}/dato_contacto`, {
        headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
        }
    });
    return data
}


export const añadirDatos = async (datos) => {
    try {
        const {data} = await axios.post(`${API_URL}/dato_contacto`, datos, {
        headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        },
    });
    return data;
    }
    catch (error) {
    console.log(error.response.data); 
    }
    
}

export const eliminarDatos = async(id_dato_contacto) => {
    try {
        await axios.delete(`${API_URL}/dato_contacto?id_dato_contacto=eq.${id_dato_contacto}`, {
            headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`,
            },
        });
    }
    catch (error) {
    console.log('eliminar' + error.response.data); 
    }
};