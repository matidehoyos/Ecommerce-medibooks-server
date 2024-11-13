import dotenv from 'dotenv';
dotenv.config();
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

const CreatePayment = async (req, res) => {
    const { items } = req.body; 

    if (!Array.isArray(items)) {
        console.error("Error: 'items' no es un arreglo");
        return res.status(400).json({ message: "'items' debe ser un arreglo" });
    }

    try {
        const preference = new Preference(client);
        const response = await preference.create({
            body: {
                items,
                back_urls: {
                    success: 'http://localhost:3000/success',  
                    failure: 'http://localhost:3000/failure',
                    pending: 'http://localhost:3000/pending'
                },
                auto_return: 'approved',  
            },
        });
        return res.status(200).json({ id: response.id });
    } catch (error) {
        console.error("Error al crear la preferencia:", error.message, error.response ? error.response.data : '');
        res.status(500).json({ message: "Error al crear la preferencia de pago", details: error.response ? error.response.data : 'No additional details' });
    }
    
};

export default CreatePayment;

