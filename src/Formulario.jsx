import { useState } from "react";


export default function Formulario ({agregar}) {

    const [usuarios, setUsuarios] = useState([])
    const [tipo, setTipo] = useState('');
    const [mostrar, setMostrar] = useState(false)

    const mostrarOcultar = ()=> {

        setMostrar(!mostrar)
    }

    const enviar = (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        // const telefono = document.getElementById('telefono').value;
        // const correo = document.getElementById('correo').value;
        // const direccion = document.getElementById('direccion').value;
        
        const nuevo = {
            nombre: nombre,
            apellido: apellido,
            // tipo: tipo,
            // telefono: telefono,
            // correo: correo,
            // direccion: direccion
        };
        agregar(nuevo);
        setUsuarios([...usuarios, nuevo])
    };

    return (

        
        
        <form onSubmit={enviar}>
            <div className="row g-4 my-3">
                <div className="col-md-6">
                    <label className="form-label" htmlFor="nombre">Nombre</label>
                    <input className="form-control" id="nombre" type="text" placeholder="Ingrese el nombre" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="apellido">Apellido</label>
                    <input className="form-control" id="apellido" type="text" placeholder="Ingrese el apellido" required/>
                </div>
                <button onClick={(e) =>mostrarOcultar(e.preventDefault())} className="btn btn-primary m-1">{mostrar? 'Ocultar' : 'Agregar'} datos de contacto</button>

                { mostrar && (
                <div>
                    <label htmlFor="datos">Datos personales</label>
                    <div className="col-md-3">
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value='' disabled>Seleccione tipo de contacto</option>
                            <option value="personal">Personal</option>
                            <option value="trabajo">Trabajo</option>
                            <option value="casa">Casa</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input id="telefono" className="form-control" type="text" placeholder="Ej: 569XXXXXXXX o 9XXXXXXXX" />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label" htmlFor="correo">Correo electrónico</label>
                        <input className="form-control" id="correo" type="email" placeholder="Ingrese el correo electrónico"/>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input id="direccion" className="form-control" type="text" placeholder="Ingrese su dirección"/>
                    </div>
                </div>
                )
            }

            </div>
            <div className="col-md-4 my-3">
                    <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
        </form>
    )
}