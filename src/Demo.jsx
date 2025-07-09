import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import { agregarUsuario, obtenerUsuarios, eliminarUsuario, añadirDatos } from "./apiUsuarios";
import Ficha from "./Ficha";


export default function Demo() {

    const [arrUsuarios, setArrUsuarios] = useState([]);
    const [arrDatos, setArrDatos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerUsuarios().then(data => {
            setArrUsuarios(data);
            setLoading(false);
        });

    }, []);

    const addUsuario = async (nuevo) => {
        console.log("Datos que se envían:", nuevo)
        const contacto = await agregarUsuario(nuevo);
        setArrUsuarios([...arrUsuarios, contacto])
        return contacto
    };

    const delUsuario = async (id_contacto) => {
        await eliminarUsuario (id_contacto);
        setArrUsuarios(arrUsuarios.filter(u => u.id_contacto != id_contacto ));
    }

        const addDatos = async (datos) => {
        const resp = await añadirDatos(datos);
        setArrDatos([...arrDatos, resp[0]])
    }


    if (loading) return <div>Cargando usuarios...</div>;

    return (
        <div className="container my-5">
            <h2>Agenda de contactos</h2>
            <Formulario agregar={addUsuario} agregarDatos={addDatos}></Formulario>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {
                    arrUsuarios.map((usuario) => (
                        <div className="col" key={usuario.id_contacto}>
                            <Ficha
                                nombre={usuario.nombre}
                                apellido={usuario.apellido}
                                id_contacto = {usuario.id_contacto}
                                eliminar={() => delUsuario(usuario.id_contacto)}                                
                            ></Ficha>
                        </div> 
                    ))
                } 
            </div>
        </div>
    )
}