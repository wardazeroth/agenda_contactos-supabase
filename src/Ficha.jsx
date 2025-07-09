import { useEffect, useState } from "react";
import { obtenerDatos, añadirDatos, eliminarDatos} from "./apiUsuarios";

import FormularioDatos from "./FormularioDatos"

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
            await eliminarDatos (id_dato_contacto);
            setArrDatos(arrDatos.filter(d => d.id_dato_contacto != id_dato_contacto));
        }

        var fondo = ''
        arrDatos.filter(d => d.id_contacto == id_contacto).map((datos) =>(
            fondo = datos.tipo
        ))
        
        if (fondo == 'personal') {
            fondo = 'card card-personal'
        } else if (fondo == 'trabajo') {
            fondo = 'card card-trabajo'
        } else {
            fondo = 'card card-trabajo'
        }

    return (
        <div className="card">
            <div className="card-header">
                {nombre} {apellido}
            </div>
            <div className="card-body">
            <div className="row row-cols-1 g-4">
                {
                    arrDatos.filter(datos=> datos.id_contacto == id_contacto)
                    .map((datos) => (
                        <div className={fondo} key={datos.id_dato_contacto}>
                            <p>Tipo: {datos.tipo}</p>
                            <p>Telefono: {datos.telefono}</p>
                            <p>Correo: {datos.correo}</p>
                            <p>Dirección : {datos.direccion}</p>
                            <button onClick={()=>delDatos(datos.id_dato_contacto)} className="btn btn-danger m-1">Eliminar dato de contacto</button>
                        </div>
                    ))
                }
            </div>
            <FormularioDatos agregarDatos={addDatos} contactoId={id_contacto}></FormularioDatos>
            </div>
            <button onClick={eliminar} className="btn btn-danger m-1">Eliminar</button>
            
        </div>
    )
}