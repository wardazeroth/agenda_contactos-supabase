import { useEffect } from "react";

export default function Datos({tipo, telefono, correo, direccion, id_dato_contacto, eliminar_datos}) {
        useEffect(() => {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
            }, []);
                    
        var fondo = ''
        
        if (tipo == 'personal') {
            fondo = 'card card-personal'
        } else if (tipo == 'trabajo') {
            fondo = 'card card-trabajo'
        } else {
            fondo = 'card card-casa'
        }

    return (
        <div className={fondo} key={id_dato_contacto}>
            <button type="button" onClick={eliminar_datos} className="btn-close ms-auto" aria-label="Close" data-bs-toggle='tooltip' data-bs-placement="top" title="Elimina estos datos"></button>
            <p>Tipo: {tipo}</p>
            {telefono && <p>Teléfono: {telefono}</p>}
            {correo && <p>Correo: {correo}</p>}
            {direccion && <p>Dirección: {direccion}</p>}
        </div>
    )
}