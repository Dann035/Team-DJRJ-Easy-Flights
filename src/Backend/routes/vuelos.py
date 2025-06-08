from flask import Blueprint, request, jsonify
import json
import os


vuelos_bp = Blueprint('vuelos', __name__, url_prefix='/vuelos')

MOCK_PATH = os.path.join(
    os.path.dirname(__file__),
    '../../Frontend/Mock/roundtrip.json'
)

CITY_TO_AIRPORT = {
    "27542715": ["27542715"],  # Las Vegas -> JFK
    "27537542": ["27537542"],  # New York -> HNL
    "27542089": ["27542089"],  # Tokyo -> EWR
    "27536644": ["27536644"],  # Miami -> HNL
    "27544008": ["27544008"],  # London -> EWR
    "27540602": ["27540602"],  # Cancun -> HNL
    "27542899": ["27542899"],  # Orlando -> JFK
    "27546347": ["27546347"],  # San Juan -> EWR
    "27544891": ["27544891"],  # Chicago -> EWR
    "27539733": ["27539733"],  # Paris -> EWR
}

def load_mock_data():
    with open(MOCK_PATH, 'r') as f:
        return json.load(f)

@vuelos_bp.route('/', methods=['GET'])
def get_vuelos():
    origen = request.args.get('origen')
    destino = request.args.get('destino')
    data = load_mock_data()
    vuelos = data['data']['flightQuotes']['buckets']['results']

    if origen and destino:
        origen_airports = CITY_TO_AIRPORT.get(origen, [])
        destino_airports = CITY_TO_AIRPORT.get(destino, [])
        vuelos_filtrados = []
        for vuelo in vuelos:
            content = vuelo.get('content', {})
            out_leg = content.get('outboundLeg', {})
            origin_airport = out_leg.get('originAirport', {}).get('id')
            dest_airport = out_leg.get('destinationAirport', {}).get('id')
            if origin_airport in origen_airports and dest_airport in destino_airports:
                vuelos_filtrados.append(vuelo)
        return jsonify(vuelos_filtrados)
    else:
        return jsonify({vuelos})