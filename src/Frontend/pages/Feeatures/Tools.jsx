import React, { useState } from 'react';

export default function Tools () {
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

    const simbolosMoneda = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
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
            debe: igualPorPersona - pagosPorPersona[p]
        }));

        setResumenPersonas(resultados);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">✈️ Planificador de Viaje</h1>
            <p className="text-center">Estima tu presupuesto, añade tus propios gastos y guarda tus ideas.</p>

            <div className="card p-4 shadow-sm mb-5">
                <div className="mb-3">
                    <label className="form-label">Selecciona moneda</label>
                    <select
                        className="form-select"
                        value={moneda}
                        onChange={(e) => setMoneda(e.target.value)}
                    >
                        <option value="USD">Dólares ($)</option>
                        <option value="EUR">Euros (€)</option>
                        <option value="GBP">Libras (£)</option>
                        <option value="JPY">Yenes (¥)</option>
                    </select>
                </div>

                {Object.entries(formData).map(([key, val]) => (
                    <div className="mb-3" key={key}>
                        <label className="form-label text-capitalize">Gasto en {key}</label>
                        <input
                            type="number"
                            className="form-control"
                            name={key}
                            value={val}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <hr />
                <h5>➕ Añadir otro gasto</h5>
                <div className="row g-2 mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del gasto"
                            value={nuevoGastoNombre}
                            onChange={(e) => setNuevoGastoNombre(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Valor"
                            value={nuevoGastoValor}
                            onChange={(e) => setNuevoGastoValor(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-success w-100" onClick={handleAddCustomGasto}>Añadir</button>
                    </div>
                </div>

                {customGastos.length > 0 && (
                    <ul className="list-group mb-3">
                        {customGastos.map((item, idx) => (
                            <li className="list-group-item d-flex justify-content-between" key={idx}>
                                <span>{item.nombre}</span>
                                <span>{simbolosMoneda[moneda]}{item.valor.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mb-3">
                    <label className="form-label">Comentarios o notas</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary w-100" onClick={calcularTotal}>Calcular Presupuesto</button>

                {total !== null && (
                    <div className="alert alert-success mt-4">
                        <h5 className="text-center">🧾 Presupuesto Detallado</h5>
                        <ul className="list-group list-group-flush">
                            {Object.entries(formData).map(([key, val]) => (
                                <li className="list-group-item d-flex justify-content-between" key={key}>
                                    <span>{key}</span>
                                    <span>{simbolosMoneda[moneda]}{parseFloat(val || 0).toFixed(2)}</span>
                                </li>
                            ))}
                            {customGastos.map((item, idx) => (
                                <li className="list-group-item d-flex justify-content-between" key={idx}>
                                    <span>{item.nombre}</span>
                                    <span>{simbolosMoneda[moneda]}{item.valor.toFixed(2)}</span>
                                </li>
                            ))}
                            <li className="list-group-item fw-bold d-flex justify-content-between">
                                Total
                                <span>{simbolosMoneda[moneda]}{total.toFixed(2)}</span>
                            </li>
                        </ul>
                        {comentario && <p className="mt-3 fst-italic">📝 {comentario}</p>}
                    </div>
                )}
            </div>

            {/* CALCULADORA DE GASTOS PERSONALES */}
            <div className="card p-4 shadow-sm">
                <h2 className="mb-3">👥 División de Gastos por Personas</h2>
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

                {resumenPersonas.length > 0 && (
                    <div className="mt-4">
                        <h5 className="mb-3">💳 Resultado por persona:</h5>
                        {resumenPersonas.map((r, idx) => {
                            const pagos = gastosPersonales.filter(g => g.persona === r.persona);
                            return (
                                <div className="mb-4" key={idx}>
                                    <h6 className="fw-bold">{r.persona}</h6>
                                    <ul className="list-group mb-2">
                                        {pagos.map((g, i) => (
                                            <li className="list-group-item d-flex justify-content-between" key={i}>
                                                <span>{g.descripcion}</span>
                                                <span>{simbolosMoneda[moneda]}{g.monto.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="alert alert-secondary d-flex justify-content-between">
                                        <span>Total pagado</span>
                                        <span>{simbolosMoneda[moneda]}{r.pagado.toFixed(2)}</span>
                                    </div>
                                    <div className={`alert ${r.debe === 0 ? 'alert-success' : r.debe > 0 ? 'alert-warning' : 'alert-info'}`}>
                                        {r.debe === 0
                                            ? '✅ Ha pagado lo justo.'
                                            : r.debe > 0
                                                ? `⚠️ Debe pagar ${simbolosMoneda[moneda]}${r.debe.toFixed(2)}`
                                                : `🤑 Le deben ${simbolosMoneda[moneda]}${Math.abs(r.debe).toFixed(2)}`
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}