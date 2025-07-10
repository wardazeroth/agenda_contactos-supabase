import { useEffect, useState } from "react";
import { obtenerDatos, añadirDatos, eliminarDatos} from "./apiUsuarios";

import FormularioDatos from "./FormularioDatos"
import Datos from "./Datos";

export default function Ficha({nombre, apellido, id_contacto, eliminar}) {
        const [arrDatos, setArrDatos] = useState([]);
        
        useEffect(() => {
            obtenerDatos().then(data => {
                setArrDatos(data);
                // setLoading(false);
            });
    
        }, []);

            const addDatos = async (datos) => {
            const resp = await añadirDatos(datos);
            setArrDatos([...arrDatos, resp[0]])
            
        }

        const delDatos = async (id_dato_contacto) => {
            const confirmacion = confirm('¿Confirma que desea eliminar este set de datos?');
            if (confirmacion) {
                await eliminarDatos (id_dato_contacto);
                setArrDatos(arrDatos.filter(d => d.id_dato_contacto != id_dato_contacto));
        }
        }

        var fondo = ''
        
        if (fondo == 'personal') {
            fondo = 'card card-personal'
        } else if (fondo == 'trabajo') {
            fondo = 'card card-trabajo'
        } else {
            fondo = 'card card-trabajo'
        }

    return (
        <div className="card supercard">
            <div className="card-header">
                {nombre} {apellido}
            </div>
            <div className="card-body">
                {
                    arrDatos.filter(datos=> datos.id_contacto == id_contacto)
                    .map((datos) => (
                        <div key={datos.id_dato_contacto}>
                        <Datos
                                tipo= {datos.tipo}
                                telefono = {datos.telefono}
                                correo = {datos.correo}
                                direccion={datos.direccion}
                                dato_contacto= {datos.id_dato_contacto}
                                eliminar_datos = {()=>delDatos(datos.id_dato_contacto)}
                            ></Datos>
                        </div>
                    ))
                }
            <FormularioDatos agregarDatos={addDatos} contactoId={id_contacto}></FormularioDatos>
            </div>
            <button onClick={eliminar} className="btn btn-danger m-1">Eliminar contacto</button>
        </div>
    )
}