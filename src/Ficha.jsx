

export default function Ficha({nombre, apellido, eliminar}) {
    return (
        <div className="card">
            <div className="card-header">
                {nombre} {apellido}
            </div>
            <div className="card-body">

            </div>
            <button onClick={eliminar} className="btn btn-danger m-1">Eliminar</button>
            
        </div>
    )
}