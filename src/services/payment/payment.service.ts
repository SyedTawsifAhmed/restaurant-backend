import { stripe } from "@/config/stripe";
import Payment from "@/models/payment.model";

// Work in progress
export const createPayment = async (paymentData: {
  preorderId: any;
  amount: number;
  }) => {
  try {
    const payment = new Payment(
      {
        preorderId: paymentData.preorderId,
        paymentMethodId: null,
        amount: paymentData.amount,
        paymentMethod: "stripe",
        paymentStatus: "pending",
      }
    );
    const charge = await stripe.paymentIntents.create({
      amount: payment.amount,
      currency: "usd",
      payment_method_types: ["card"],
      confirm: true,
    })
    
    payment.paymentMethodId = charge.id;
    await payment.save();

    return { success: true, payment }
  } catch (error) {
    await Payment.findOneAndUpdate(
      { preorderId: paymentData.preorderId }, 
      { paymentStatus: "failed" }
    );
    throw error;
  }
};

export const getPayment = async (paymentId: string) => {
  try {
    const payment = await Payment.findById(paymentId);
    return payment;
  } catch (error) {
    throw error;
  }
}; 

export const getAllPayments = async () => {
  try {
    const payments = await Payment.find();
    return payments;
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

    const payments = await Payment.find(filter);
    return payments;

  } catch (error) {
    throw error;
  }
};

export const updatePaymentStatus = async (
  paymentId: string, 
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  ) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      paymentId, 
      { status }, 
      { new: true }
    );
    return payment;
  } catch (error) {
    throw error;
  }
};


