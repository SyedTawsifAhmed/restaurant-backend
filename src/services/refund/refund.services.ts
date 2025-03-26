`import Refund from "@/models/refund.model";
import { stripe } from "@/config/stripe";

export const createRefund = async (data: {
  preOrderId: string;
  paymentId: string;
  refundReason: string;
  }) => { 
  try {
    const refund = new Refund({
      preOrderId: data.preOrderId,
      paymentId: data.paymentId,
      refundStatus: "pending",
      refundReason: data.refundReason
    });
    const stripeRefund = await stripe.refunds.create({
      charge: data.paymentId,
      reason: data.refundReason,
    });
    return await refund.save();
  } catch (error) {
    throw error;
  }

};`