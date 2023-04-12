import db from "@/utils/db";
import { getToken } from "next-auth/jwt";
import Order from "../../../../../models/Order";

const handler = async (req, res) => {
    const session = await getToken({ req });
    if(!session) {
        return res.status(401).send('Error : SignIn required');
    }
    await db.connect();
    const order = await Order.findById(req.query.id);
    if (order) {
        if (order.isPaid) {
            return res.status(400).send({ message: 'Error: the order is already paid' });
        }
        order.isPaid = true;
        order.paidAt = Date.now;
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.email_address,
        };
        const paidOrder = await order.save();
        await db.disconnect();
        res.send({ message: 'Order paid successfully', order: paidOrder });
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'Error: order not found' });
    }
}

export default handler;