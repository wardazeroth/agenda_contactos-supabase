import { useState } from "react";

export default function FormularioDatos({agregarDatos, contactoId}) {

    const [tipo, setTipo] = useState('');
    const [mostrar, setMostrar] = useState(false)
    const [datos, setDatos] = useState([])
    const [telefonoDatos, setTelefonoDatos] = useState('') 
    const [correoDatos, setCorreoDatos] = useState('')
    const [direccionDatos, setDireccionDatos] = useState('')
    const mostrarOcultar = ()=> {
        setMostrar(!mostrar)
    }

    const enviarDatos =(e) => {
        e.preventDefault();
        const contacto_id = contactoId

        const nuevo_datos = {
            id_contacto: contacto_id,
            tipo: tipo,
            telefono: telefonoDatos,
            correo: correoDatos,
            direccion: direccionDatos

        };

        if (tipo == '') {
            alert('Debe marcar un tipo de contacto')
            return;
        } else {
            const regex = /(^[0-9]{2})?[ -]?9[0-9]{8}$/
            let valid = regex.test(telefonoDatos)

                if (tipo == '') {
                    alert('Debe marcar un tipo de contacto')
                    return;
                } else if (isNaN(telefonoDatos)) {
                    alert('El teléfono debe ser numérico');
                    // divErrFono.className = 'text-danger small';
                    return;
                } else if (!valid) {
                    alert('El número no corresponde a un teléfono válido');
                    return;
                } else {
                    agregarDatos(nuevo_datos)
                    setDatos([...datos, nuevo_datos])
                }
        }

    };

    return (
        <div>
            <form onSubmit={enviarDatos}>
                    { mostrar && (
                        <div>
                            <label htmlFor="datos">Datos personales</label>
                            <div className="col-md-12">
                            <label htmlFor="tipo" className="form-label">Tipo</label>
                                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                    <option value='' disabled>Seleccione tipo de contacto</option>
                                    <option value="personal">Personal</option>
                                    <option value="trabajo">Trabajo</option>
                                    <option value="casa">Casa</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
                                <input id="telefono" className="form-control" type="text" value={telefonoDatos} onChange={(e) => setTelefonoDatos(e.target.value)} placeholder="Ej: 569XXXXXXXX o 9XXXXXXXX" />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label" htmlFor="correo">Correo electrónico</label>
                                <input className="form-control" id="correo" type="email" value={correoDatos} onChange={(e) => setCorreoDatos(e.target.value)} placeholder="Ingrese el correo electrónico"/>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="direccion" className="form-label">Dirección</label>
                                <input id="direccion" className="form-control" type="text" value={direccionDatos} onChange={(e)=> setDireccionDatos(e.target.value)} placeholder="Ingrese su dirección"/>
                            </div>
                            <div className="col-md-4 my-3">
                            <button type="submit" className="btn btn-primary">Enviar</button>
                            </div>
                        </div>
                        
                        )
                    }
                    <button onClick={(e) =>mostrarOcultar(e.preventDefault())} className="btn btn-primary m-1">{mostrar? 'Ocultar' : 'Agregar'} datos de contacto</button>
            </form>
        </div>

    )
} 