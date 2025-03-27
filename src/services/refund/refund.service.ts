import Refund from "@/models/refund.model";
import { stripe } from "@/config/stripe";

// Work in progress
export const createRefund = async (data: {
  preOrderId: string;
  paymentId: string;
  refundReason?: string;
  }) => { 
  try {
    if (!data.refundReason) {
      data.refundReason = "";
    }
    const refund = new Refund({
      preOrderId: data.preOrderId,
      paymentId: data.paymentId,
      refundStatus: "pending",
      refundReason: data.refundReason
    });
    const stripeRefund = await stripe.refunds.create({
      payment_intent: data.paymentId,
    })
    if (!stripeRefund) {
      throw new Error("Refund could not be created");
    }
    refund.refundStatus = "completed";
    return await refund.save();
  } catch (error) {
    throw error;
  }
};

export const getRefund = async (id: string) => {
  try {
    const refund = await Refund.findById(id);
    if (!refund) {
      throw new Error("Refund not found");
    }
    return refund;
  } catch (error) {
    throw error;
  }
};

export const getAllRefunds = async () => {
  try {
    const refunds = await Refund.find();
    return refunds;
  } catch (error) {
    throw error;
  }
};

export const updateRefund = async (
  id: string, 
  data: {
    refundStatus: 'pending' | 'completed' | 'failed';
    refundReason: string | null;
  }) => {
  try {
    const refund = await Refund.findByIdAndUpdate(id, data, { new: true });
    if (!refund) {
      throw new Error("Refund not found");
    }
    return refund;
  } catch (error) {
    throw error;
  }
};

export const filterPayments = async (
  query : 'lt' | 'gt' | 'eq', 
  value: number | Date, 
  ) => {
  try { 
    let filter: any = {};
    if (typeof value === "number") {
      filter.amount = query === "lt" ? { $lt: value }
        : query === "gt" ? { $gt: value }
        : query === "eq" ? value
        : undefined;
    }
    if (value instanceof Date) {
      if (query === "lt") {
        filter.createdAt = { $lt: value };
      } else if (query === "gt") {
        filter.createdAt = { $gt: value };
      } else if (query === "eq") {
        const dateStart = new Date(value);
        const dateEnd = new Date(value);
        dateEnd.setHours(23, 59, 59, 999); // End of the day

        filter.createdAt = { $gte: dateStart, $lte: dateEnd };
      }
    }
    const refunds = await Refund.find(filter);
    return refunds;
  } catch (error) {
    throw error;
  }
};

