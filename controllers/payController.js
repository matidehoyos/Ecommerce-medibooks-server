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
                    success: 'https://medibooks.vercel.app/success',  
                    failure: 'https://medibooks.vercel.app/failure',
                    pending: 'https://medibooks.vercel.app/pending'
                },
                auto_return: 'approved',  
            },
        });
        return res.status(200).json({ id: response.id});
    } catch (error) {
        console.error("Error al crear la preferencia:", error.message);
        res.status(500).json({ message: "Error al crear la preferencia de pago" });
    }
};

export default CreatePayment;

