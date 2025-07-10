import { useState } from "react";

export default function FormularioDatos({agregarDatos, contactoId}) {

    const [tipo, setTipo] = useState('');
    const [mostrar, setMostrar] = useState(false)
    const [datos, setDatos] = useState([])
    const [telefonoDatos, setTelefonoDatos] = useState('') 
    const [correoDatos, setCorreoDatos] = useState('')
    const [direccionDatos, setDireccionDatos] = useState('')
    const [errorUsuario, setErrorUsuario] = useState('')
    const [errorTipo, setErrorTipo] = useState('')
    const [errorFono, setErrorFono] = useState('')
    const [errorCorreo, setErrorCorreo] = useState('')

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
            setErrorTipo('Debe marcar un tipo de contacto')
            return;
        } else {
            const regex = /(^[0-9]{2})?[ -]?9[0-9]{8}$/
            let valid = regex.test(telefonoDatos)

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let valido = regexEmail.test(correoDatos);

                if (datos.find(d=> d.tipo === tipo)) {
                    setErrorTipo('Ya agregó este tipo de contacto')
                    return;
                }else if (tipo == '') {
                    setErrorTipo('Debe marcar un tipo de contacto')
                    return;
                } else if (isNaN(telefonoDatos)) {
                    setErrorFono('El teléfono debe ser numérico');
                    // divErrFono.className = 'text-danger small';
                    return;
                } else if (!valid  && telefonoDatos != '') {
                    setErrorFono('El número no corresponde a un teléfono válido');
                    return;
                }else if (!valido && correoDatos != '') {
                    setErrorCorreo('Debe ingresar un correo electrónico válido')
                    return;
                } else if (tipo && !telefonoDatos && !correoDatos && !direccionDatos) {
                    setErrorTipo('Debe agregar algún dato de contacto')
                    return;
                } else {
                    agregarDatos(nuevo_datos)
                    setDatos([...datos, nuevo_datos])
                }
        }
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        setTipo("");
        setTelefonoDatos("");
        setCorreoDatos("");
        setDireccionDatos("");

        setErrorUsuario('');
        setErrorTipo('');
        setErrorFono('');
        setErrorCorreo('');
        setMostrar(false);

    };

    return (
        <div>
            <form onSubmit={enviarDatos}>
                    { mostrar && (
                        <div>
                            <label htmlFor="datos">Datos personales</label>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="tipo" className="form-label"></label>
                                    <select value={tipo} className="form-select bg-primary text-white" onChange={(e) => setTipo(e.target.value)}>
                                        <option value='' disabled>Seleccione tipo de contacto</option>
                                        <option value="personal">Personal</option>
                                        <option value="trabajo">Trabajo</option>
                                        <option value="casa">Casa</option>
                                    </select>
                                <div>
                                    <p className = 'text-danger small'>{errorTipo}</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
                                <input id="telefono" className="form-control" type="text" value={telefonoDatos} onChange={(e) => setTelefonoDatos(e.target.value)} placeholder="Ej: 569XXXXXXXX o 9XXXXXXXX" />
                                <div>
                                    <p className = 'text-danger small'>{errorFono}</p>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label className="form-label" htmlFor="correo">Correo electrónico</label>
                                <input className="form-control" id="correo" type="email" value={correoDatos} onChange={(e) => setCorreoDatos(e.target.value)} placeholder="Ingrese el correo electrónico"/>
                                <div>
                                    <p className = 'text-danger small'>{errorCorreo}</p>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="direccion" className="form-label">Dirección</label>
                                <input id="direccion" className="form-control" type="text" value={direccionDatos} onChange={(e)=> setDireccionDatos(e.target.value)} placeholder="Ingrese su dirección"/>
                            </div>
                            <div className="col-md-4 my-3">
                            <button type="submit" className="btn btn-primary form-btn">Agregar</button>
                            </div>
                        </div>
                        
                        )
                    }
                    <button type="button" onClick={(e) => { e.preventDefault(); mostrarOcultar(); }} className="btn btn-info m-1">{mostrar? 'Cancelar' : 'Agregar datos de contacto'}</button>
            </form>
        </div>                                                                                                              

    )
} 