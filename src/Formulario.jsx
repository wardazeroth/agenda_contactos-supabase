import { useState } from "react";


export default function Formulario ({agregar, agregarDatos}) {

    const [usuarios, setUsuarios] = useState([]);
    const [tipo, setTipo] = useState('');
    const [mostrar, setMostrar] = useState(false);
    const [datos, setDatos] = useState('')
    const [telefono, setTelefono] = useState('') 
    const [correo, setCorreo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [errorUsuario, setErrorUsuario] = useState('')
    const [errorTipo, setErrorTipo] = useState('')
    const [errorFono, setErrorFono] = useState('')
    const [errorCorreo, setErrorCorreo] = useState('')

    const mostrarOcultar = ()=> {
        setMostrar(!mostrar)
    }


    const enviar = async (event) => {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const nuevo = {
            nombre: nombre,
            apellido: apellido,
        };

        
        if (usuarios.find(u => u.nombre == nombre && u.apellido == apellido)) {
            setErrorUsuario('El contacto ya está guardado')
            return;
        }

        const contacto_ultimo = await agregar(nuevo);
        const id_contacto = contacto_ultimo.id_contacto

        console.log('el id contact: '+id_contacto)
        setUsuarios([...usuarios, nuevo])

        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        setErrorUsuario('');

        const nuevo_datos = {
            tipo: tipo,
            telefono: telefono,
            correo: correo,
            direccion: direccion,
            id_contacto: id_contacto
        }

        
        if (telefono || correo || direccion ) {

        const regex = /(^[0-9]{2})?[ -]?9[0-9]{8}$/
        let valid = regex.test(telefono)
        
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valido = regexEmail.test(correo);

            console.log(tipo)

            if (tipo == '') {
                setErrorTipo('Debe marcar un tipo de contacto')
                return;
            } else if (isNaN(telefono)) {
                setErrorFono('El teléfono debe ser numérico');
                // divErrFono.className = 'text-danger small';
                return;
            } else if (!valid && telefono != '') {
                setErrorFono('El número no corresponde a un teléfono válido');
                return;
            }else if (!valido && correo != '') {
                setErrorCorreo('Debe ingresar un correo electrónico válido')
                return;
            }else {
                agregarDatos(nuevo_datos)
                setDatos([...datos, nuevo_datos])
            }
            setTipo("");
            setTelefono("");
            setCorreo("");
            setDireccion("");

            setErrorUsuario('');
            setErrorTipo('');
            setErrorFono('');
            setErrorCorreo('');
            setMostrar(false);
        }

    };


    return (
        <div>
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
                    <div>
                        <p className = 'text-danger small'>{errorUsuario}</p>
                    </div>
                    
                </div>
                { mostrar && (
                    <div className="mb-3 encabezado">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
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
                            <input id="telefono" className="form-control" type="text" value={telefono} onChange={(e)=> setTelefono(e.target.value)} placeholder="Ej: 569XXXXXXXX o 9XXXXXXXX" />
                            <div>
                                <p className = 'text-danger small'>{errorFono}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label" htmlFor="correo">Correo electrónico</label>
                            <input className="form-control" id="correo" type="email" value={correo} onChange={(e)=> setCorreo(e.target.value)} placeholder="Ingrese el correo electrónico"/>
                            <div>
                                <p className = 'text-danger small'>{errorCorreo}</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="direccion" className="form-label">Dirección</label>
                            <input id="direccion" className="form-control" type="text" value={direccion} onChange={(e)=> setDireccion(e.target.value)} placeholder="Ingrese su dirección"/>
                        </div>
                    </div>
                    
                    )
                }
            <button onClick={(e) =>mostrarOcultar(e.preventDefault())} className="btn btn-info m-1">{mostrar? 'Cancelar' : 'Agregar datos de contacto'} </button>    
            
                <div className="col-md-4 my-3">
                        <button type="submit" className="btn btn-primary form-btn">Agregar Contacto</button>
                </div>
            </form>
        </div>

    )
}