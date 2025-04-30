import React from 'react';

export default function TravelTips() {
    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center">✈️ Travel Tips </h1>
            <p>Antes de planificar tus proximas vacaciones o escapada echale un vistazo a estos tips</p>
            <div className="accordion" id="travelTipsAccordion">

                {/* 1. Planificación General */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            🗓️ Antes del Viaje: Planificación General
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#travelTipsAccordion">
                        <div className="accordion-body">
                            <ul>
                                <li>Define tu presupuesto (usa nuestra calculadora).</li>
                                <li>Elige el destino ideal según clima y temporada, Inspirate en nuestras ideas <a href="/destinations">Aquí</a></li>
                                <li>Reserva vuelos y alojamiento con antelación.</li>
                                <li>Contrata un seguro de viaje completo.</li>
                                <li>Revisa requisitos de visado y vacunas.</li>
                                <li>Digitaliza tus documentos importantes.</li>
                                <li>Informa a tu banco sobre tu viaje.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. Qué Empacar */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            📦 Qué Empacar
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#travelTipsAccordion">
                        <div className="accordion-body">
                            <ul>
                                <li>Haz una lista por categorías: ropa, higiene, tecnología.</li>
                                <li>Lleva adaptadores universales.</li>
                                <li>Empaca medicinas esenciales y con receta.</li>
                                <li>Incluye ropa adecuada al clima del destino.</li>
                                <li>Lleva copias impresas de reservas y documentos clave.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3. Planificación del Destino */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            🗺️ Planificación del Destino
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#travelTipsAccordion">
                        <div className="accordion-body">
                            <ul>
                                <li>Crea un itinerario flexible.</li>
                                <li>Compra entradas anticipadas a sitios turísticos.</li>
                                <li>Infórmate sobre el transporte local.</li>
                                <li>Identifica hospitales, embajadas y zonas seguras.</li>
                                <li>Aprende frases básicas del idioma local.</li>
                                <li>Conoce normas culturales y de vestimenta.</li>
                                <li>Revisa el tipo de cambio y comisiones bancarias.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 4. Durante el Viaje */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            🧭 Durante el Viaje
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#travelTipsAccordion">
                        <div className="accordion-body">
                            <ul>
                                <li>Usa apps offline de mapas y traductores.</li>
                                <li>Guarda dinero y documentos por separado.</li>
                                <li>Cuidado con el agua y la alimentación.</li>
                                <li>Evita redes Wi-Fi públicas sin protección.</li>
                                <li>Sé un viajero responsable y respetuoso.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 5. Extras */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            💡 Consejos Extras
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#travelTipsAccordion">
                        <div className="accordion-body">
                            <ul>
                                <li>Lleva un registro de gastos diario, puedes consultar el apartado <a href="/tools" >Planificador</a>.</li>
                                <li>No olvides una batería externa.</li>
                                <li>Consulta apps útiles de clima y transporte.</li>
                                <li>Haz fotos de tus pertenencias y tickets.</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}