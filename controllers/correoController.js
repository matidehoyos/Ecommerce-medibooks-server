export const cotizacionCorreo = async (req, res) => {
    const { provincia, destino, pesoTotal } = req.body;
    const codPos = destino.split('').filter(char => !isNaN(char)).join('');


    if (!destino || !pesoTotal) {
        return res.status(400).json({ message: 'Faltan datos necesarios para la cotización' });
    }

    const pesoEnKilos = (pesoTotal / 1000).toFixed(2); 


    const url = `https://correo-argentino1.p.rapidapi.com/calcularPrecio?cpOrigen=7600&cpDestino=${codPos}&provinciaOrigen=AR-B&provinciaDestino=${provincia}&peso=${pesoEnKilos}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'ee0f32e12cmsh1fbc08d232337e6p124f45jsnc519955096e0',
                'x-rapidapi-host': 'correo-argentino1.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error al obtener la cotización:', errorText);
            return res.status(response.status).send(errorText);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error en la solicitud a la API:', error.message);
        res.status(500).json({ message: 'Error al obtener la cotización', error: error.message });
    }
};
