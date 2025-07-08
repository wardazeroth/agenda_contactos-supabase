import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import { agregarUsuario, obtenerUsuarios, eliminarUsuario} from "./apiUsuarios";
import Ficha from "./Ficha";


export default function Demo() {

    const [arrUsuarios, setArrUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerUsuarios().then(data => {
            setArrUsuarios(data);
            setLoading(false);
        });

    }, []);

    const addUsuario = async (nuevo) => {
        console.log("Datos que se envían:", nuevo)
        const respuesta = await agregarUsuario(nuevo);
        setArrUsuarios([...arrUsuarios, respuesta[0]])
        
    };


    const delUsuario = async (id_contacto) => {
        await eliminarUsuario (id_contacto);
        setArrUsuarios(arrUsuarios.filter(u => u.id_contacto != id_contacto ));
    }

    if (loading) return <div>Cargando usuarios...</div>;

    return (
        <div className="container my-5">
            <h2>Agenda de contactos</h2>
            <Formulario agregar={addUsuario}></Formulario>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    arrUsuarios.map((usuario) => (
                        <Ficha
                            nombre={usuario.nombre}
                            apellido={usuario.apellido}
                            eliminar={() => delUsuario(usuario.id_contacto)}
                        ></Ficha>
                    ))
                }
            </div>
            
        </div>
    )
}