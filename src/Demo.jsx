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
        const confirmacion = confirm('¿Está seguro que desea eliminar este usuario?');
        if (confirmacion) {
                    await eliminarUsuario (id_contacto);
        setArrUsuarios(arrUsuarios.filter(u => u.id_contacto != id_contacto ));
        }

    }

        const addDatos = async (datos) => {
        const resp = await añadirDatos(datos);
        setArrDatos([...arrDatos, resp[0]])
    }


    if (loading) return <div>Cargando usuarios...</div>;

    return (
        <div className="super mt-3">
            <div className="encabezado">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <h2>Agenda de contactos</h2>
                    
                <Formulario agregar={addUsuario} agregarDatos={addDatos}></Formulario>
            </div>
            <div className="container my-5">
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {
                        arrUsuarios.map((usuario) => (
                            <div className="col-auto" key={usuario.id_contacto}>
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
        </div>

    )
}