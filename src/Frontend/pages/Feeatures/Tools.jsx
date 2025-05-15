import React, { useState } from 'react';
import './tools.css';


export default function Tools() {
    const [vista, setVista] = useState('menu');
    const [formData, setFormData] = useState({
        vuelo: '',
        hospedaje: '',
        comida: '',
        entretenimiento: '',
        souvenirs: '',
    });
    const [customGastos, setCustomGastos] = useState([]);
    const [nuevoGastoNombre, setNuevoGastoNombre] = useState('');
    const [nuevoGastoValor, setNuevoGastoValor] = useState('');
    const [moneda, setMoneda] = useState('USD');
    const [comentario, setComentario] = useState('');
    const [total, setTotal] = useState(null);
    const [gastosPersonales, setGastosPersonales] = useState([]);
    const [nuevoGastoPersonal, setNuevoGastoPersonal] = useState({ persona: '', descripcion: '', monto: '' });
    const [resumenPersonas, setResumenPersonas] = useState([]);
    const [deudas, setDeudas] = useState([]);
    const [nombreDivision, setNombreDivision] = useState('');  // Aquí agregamos el nombre de la división

    const simbolosMoneda = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
    };

    // Guardar los datos de la división de gastos en el almacenamiento local
    const guardarDivisionEnPerfil = () => {
        if (!nombreDivision.trim()) {
            alert("Por favor, ingresa un nombre para la división de gastos.");
            return;
        }

        const division = {
            nombre: nombreDivision,
            gastos: gastosPersonales,
            deudas: deudas,
            total,
            moneda,
            comentario
        };

        // Obtenemos las divisiones de gastos previas (si existen) y las agregamos
        const divisionesGuardadas = JSON.parse(localStorage.getItem('divisionesDeGastos') || '[]');
        divisionesGuardadas.push(division);

        // Guardamos las divisiones de gastos en el almacenamiento local
        localStorage.setItem('divisionesDeGastos', JSON.stringify(divisionesGuardadas));

        alert('¡División de gastos guardada correctamente en tu perfil!');
        setVista('menu');  // Volver al menú principal
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddCustomGasto = () => {
        if (nuevoGastoNombre.trim() && !isNaN(parseFloat(nuevoGastoValor))) {
            setCustomGastos(prev => [
                ...prev,
                { nombre: nuevoGastoNombre.trim(), valor: parseFloat(nuevoGastoValor) }
            ]);
            setNuevoGastoNombre('');
            setNuevoGastoValor('');
        }
    };

    const calcularTotal = () => {
        const sumaFijos = Object.values(formData).reduce((acc, val) => acc + parseFloat(val || 0), 0);
        const sumaCustom = customGastos.reduce((acc, item) => acc + item.valor, 0);
        setTotal(sumaFijos + sumaCustom);
    };

    const handleAddGastoPersonal = () => {
        const { persona, descripcion, monto } = nuevoGastoPersonal;
        if (persona && descripcion && !isNaN(parseFloat(monto))) {
            setGastosPersonales(prev => [...prev, {
                persona,
                descripcion,
                monto: parseFloat(monto)
            }]);
            setNuevoGastoPersonal({ persona: '', descripcion: '', monto: '' });
        }
    };

    const calcularDivisiones = () => {
        const totalGastos = gastosPersonales.reduce((sum, g) => sum + g.monto, 0);
        const personasUnicas = [...new Set(gastosPersonales.map(g => g.persona))];
        const igualPorPersona = totalGastos / personasUnicas.length;

        const pagosPorPersona = {};
        personasUnicas.forEach(p => pagosPorPersona[p] = 0);
        gastosPersonales.forEach(g => {
            pagosPorPersona[g.persona] += g.monto;
        });

        const resultados = personasUnicas.map(p => ({
            persona: p,
            pagado: pagosPorPersona[p],
            debe: pagosPorPersona[p] - igualPorPersona,
        }));

        const deudasTemp = [];

        const deudores = resultados.filter(r => r.debe < 0);
        const acreedores = resultados.filter(r => r.debe > 0);

        deudores.forEach(deudor => {
            acreedores.forEach(acreedor => {
                if (deudor.debe < 0 && acreedor.debe > 0) {
                    const montoADebitar = Math.min(Math.abs(deudor.debe), acreedor.debe);
                    deudasTemp.push({
                        deudor: deudor.persona,
                        acreedor: acreedor.persona,
                        monto: montoADebitar,
                    });

                    deudor.debe += montoADebitar;
                    acreedor.debe -= montoADebitar;
                }
            });
        });

        setResumenPersonas(resultados);
        setDeudas(deudasTemp);
    };

    return (
        <div className="container my-5 px-3 containertools" style={{ maxWidth: '960px' }}>
            {vista === 'menu' && (
                <div className="row text-center">
                    <h1 className="mb-4">🧳 Herramientas de Viaje</h1>
                    <div className="col-md-6 mb-4">
                        <div
                            className="shadow-sm p-4 tools-card"
                            role="button"
                            onClick={() => setVista('planificador')}
                            style={{ borderRadius: '8px', cursor: 'pointer' }}
                        >
                            <img
                                src="https://previews.123rf.com/images/firstblood/firstblood1307/firstblood130700513/20653892-c%C3%A1lculo-del-presupuesto-de-la-casa-la-calculadora-una-pluma-el-diagrama.jpg"
                                className="img-fluid"
                                alt="Planificador"
                            />
                            <h5 className="mt-3 ">Planificador de Viaje</h5>
                            <p>Presupuesta tu viaje fácilmente.</p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div
                            className="shadow-sm p-4 tools-card"
                            role="button"
                            onClick={() => setVista('divisor')}
                            style={{  borderRadius: '8px', cursor: 'pointer' }}
                        >
                            <img
                                src="https://www.togetherprice.com/es/static/b7afeb3174d09b9322080c90f4cb1ab1/c61e6/dividir_gastos_entre_amigos.jpg"
                                className="img-fluid"
                                alt="Divisor de gastos"
                            />
                            <h5 className="mt-3">División de Gastos</h5>
                            <p>Reparte los gastos entre todos.</p>
                        </div>
                    </div>
                </div>
            )}

            {(vista === 'planificador' || vista === 'divisor') && (
                <div className="mb-4">
                    <button className="btn buttonback" onClick={() => setVista('menu')}> 🔙 Volver a Herramientas</button>
                </div>
            )}

            {/* PLANIFICADOR DE VIAJE/PRESUPUESTOS*/}
            {vista === 'planificador' && (
            <div className=" d-flex justify-content-center my-5 planifier">
                <div className="p-4 rounded " style={{ width: '100%', maxWidth: '600px' }}>
                <h2 className="mb-4 text-center">📊 Planificador de Viaje</h2>

                {/* Selector de moneda */}
                <div className="mb-4">
                    <label className="form-label">Selecciona la moneda</label>
                    <select className="form-select selectorcoin" value={moneda} onChange={(e) => setMoneda(e.target.value)}>
                    <option value="USD">USD - Dólar estadounidense</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - Libra esterlina</option>
                    <option value="JPY">JPY - Yen japonés</option>
                    </select>
                </div>

                {/* Formulario para ingresar gastos, hacemos una lista predeterminada de gastos que se hacen en un viaje */}
                <div className="mb-3">
                    <label className="form-label">Vuelo</label>
                    <input
                    type="number"
                    className="form-control"
                    name="vuelo"
                    value={formData.vuelo}
                    onChange={handleChange}
                    placeholder="Costo de vuelo"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Hospedaje</label>
                    <input
                    type="number"
                    className="form-control"
                    name="hospedaje"
                    value={formData.hospedaje}
                    onChange={handleChange}
                    placeholder="Costo de hospedaje"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Comida</label>
                    <input
                    type="number"
                    className="form-control"
                    name="comida"
                    value={formData.comida}
                    onChange={handleChange}
                    placeholder="Costo de comida"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Entretenimiento</label>
                    <input
                    type="number"
                    className="form-control"
                    name="entretenimiento"
                    value={formData.entretenimiento}
                    onChange={handleChange}
                    placeholder="Costo de entretenimiento"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Souvenirs</label>
                    <input
                    type="number"
                    className="form-control"
                    name="souvenirs"
                    value={formData.souvenirs}
                    onChange={handleChange}
                    placeholder="Costo de souvenirs"
                    />
                </div>

                {/* Otros gastos personalizados */}
                <div className="mb-3">
                    <h5>Otros gastos personalizados</h5>
                    <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del gasto"
                        value={nuevoGastoNombre}
                        onChange={(e) => setNuevoGastoNombre(e.target.value)}
                    />
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Valor"
                        value={nuevoGastoValor}
                        onChange={(e) => setNuevoGastoValor(e.target.value)}
                    />
                    <button className="btn btn-info" onClick={handleAddCustomGasto}>Añadir</button>
                    </div>
                </div>

                {customGastos.length > 0 && (
                    <ul className="list-group mb-3">
                    {customGastos.map((g, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between">
                        <span>{g.nombre}</span>
                        <span>{simbolosMoneda[moneda]}{g.valor.toFixed(2)}</span>
                        </li>
                    ))}
                    </ul>
                )}

                <div className="d-grid">
                    <button className="btn buttonresult" onClick={calcularTotal}>Calcular Total del Viaje</button>
                </div>

                {/* Mostrar lista de resultados detallados */}
                {total !== null && (
                    <>
                    <h5 className="mt-4 alert alert-success mt-4 text-center">Resumen de Gastos:</h5>
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between">
                        <span>Vuelo</span>
                        <span>{simbolosMoneda[moneda]}{formData.vuelo || 0}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                        <span>Hospedaje</span>
                        <span>{simbolosMoneda[moneda]}{formData.hospedaje || 0}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                        <span>Comida</span>
                        <span>{simbolosMoneda[moneda]}{formData.comida || 0}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                        <span>Entretenimiento</span>
                        <span>{simbolosMoneda[moneda]}{formData.entretenimiento || 0}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                        <span>Souvenirs</span>
                        <span>{simbolosMoneda[moneda]}{formData.souvenirs || 0}</span>
                        </li>
                        {customGastos.length > 0 && customGastos.map((g, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between">
                            <span>{g.nombre}</span>
                            <span>{simbolosMoneda[moneda]}{g.valor.toFixed(2)}</span>
                        </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between font-weight-bold">
                        <span>Total Estimado</span>
                        <span>{simbolosMoneda[moneda]}{total.toFixed(2)}</span>
                        </li>
                    </ul>

                    {/* Botón para guardar el presupuesto */}
                    <div className="mt-4">
                        {/*<button className="btn buttonsaveuser w-100" onClick={guardarDivisionEnPerfil}>
                        Guardar este presupuesto en tu perfil
                        </button>*/}
                    </div>
                    </>
                )}
                </div>
            </div>
            )}

        {/* DIVISOR DE GASTOS POR PERSONAS */}
            {vista === 'divisor' && (
                <div  className="p-4 shadow rounded split" >
                    <h2 className="mb-3 text-center">👥 División de Gastos por Personas</h2>

                    <div className="mb-4">
                        <label className="form-label">Nombre de la división de gastos</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej. Vacaciones 2025"
                            value={nombreDivision}
                            onChange={(e) => setNombreDivision(e.target.value)}
                        />
                    </div>

                    {/* Selector de moneda */}
                    <div className="mb-4">
                        <label className="form-label">Selecciona la moneda</label>
                        <select className="form-select selectorcoin" value={moneda} onChange={(e) => setMoneda(e.target.value)}>
                            <option value="USD">USD - Dólar estadounidense</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - Libra esterlina</option>
                            <option value="JPY">JPY - Yen japonés</option>
                        </select>
                    </div>

                    <div className="row g-2 mb-3">
                        <div className="col-md-4">
                            <input
                                className="form-control"
                                placeholder="Nombre"
                                value={nuevoGastoPersonal.persona}
                                onChange={(e) => setNuevoGastoPersonal(prev => ({ ...prev, persona: e.target.value }))}
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                className="form-control"
                                placeholder="Descripción"
                                value={nuevoGastoPersonal.descripcion}
                                onChange={(e) => setNuevoGastoPersonal(prev => ({ ...prev, descripcion: e.target.value }))}
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Monto"
                                value={nuevoGastoPersonal.monto}
                                onChange={(e) => setNuevoGastoPersonal(prev => ({ ...prev, monto: e.target.value }))}
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-info w-100" onClick={handleAddGastoPersonal}>Añadir</button>
                        </div>
                    </div>

                    {gastosPersonales.length > 0 && (
                        <>
                            <ul className="list-group mb-3">
                                {gastosPersonales.map((g, idx) => (
                                    <li className="list-group-item d-flex justify-content-between" key={idx}>
                                        <span>{g.persona} - {g.descripcion}</span>
                                        <span>{simbolosMoneda[moneda]}{g.monto.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="btn btn-dark w-100" onClick={calcularDivisiones}>Calcular división entre todos</button>
                        </>
                    )}

                    {deudas.length > 0 && (
                        <div className="mt-4">
                            <h5 className="mb-3">💸 Deudas entre personas:</h5>
                            {deudas.map((d, idx) => (
                                <div key={idx} className="alert alert-info">
                                    <strong>{d.deudor}</strong> debe <strong>{simbolosMoneda[moneda]}{d.monto.toFixed(2)}</strong> a <strong>{d.acreedor}</strong>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-4">
                       {/* <button className="btn buttonsave  w-100" onClick={guardarDivisionEnPerfil}>
                            Guardar esta división en tu perfil
                        </button>*/}
                    </div>
                </div>
            )}
        </div>
    );
}