import { config } from "@/config/config";
import { UpdateProductsQty } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(config.stripeSecretKey!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { items, email } = req.body;
    
    const modified_items = items.map((item: UpdateProductsQty) => ({
        quantity: item.quantity,
        price_data: {
            currency: "jpy",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.image],
            }
        }
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["US", "JP", "SG"],
        },
        line_items: modified_items,
        mode: "payment",
        success_url: `https://x-amazon-clone-e-commerce.vercel.app/success`,
        cancel_url: `https://x-amazon-clone-e-commerce.vercel.app/cancel`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item: any) => item.image))
        }
    });
    res.status(200).json({id:session.id})
}