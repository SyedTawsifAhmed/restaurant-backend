import Preorder from "@/models/preorder.model";
import MenuItem from "@/models/menuItem.model";
import { createPayment } from "@/services/payment/payment.service";
import { vatRate, serviceCharge } from "@/config/restaurant";

const calculateTotalAmount = async (items: 
  { menuItemId: string; quantity: number }[]
  ) => {
  let totalAmount = 0;
  for (const item of items) {
    const menuItem = await MenuItem.findById(item.menuItemId);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    totalAmount += 
    (1 + vatRate) * ((menuItem.price * item.quantity) + serviceCharge);
  }
  return totalAmount;
};

export const createPreOrder = async (data: {
  reservationId: string;
  items: { menuItemId: string; quantity: number }[];
  }) => {
  try {
    const totalAmount = await calculateTotalAmount(data.items);
    const newPreOrder = new Preorder({
      reservationId: data.reservationId,
      items: data.items,
      totalAmount,
    });
    const transaction = await createPayment({ 
      preorderId: newPreOrder._id, 
      amount: totalAmount 
    });
    if (!transaction) {
      throw new Error("Transaction could not be created");
    }
    return newPreOrder.save();
  } catch (error) {
    throw error;
  }
};

export const getPreOrder = async (id: string) => {
  try {
    const preOrder = await Preorder.findById(id);
    if (!preOrder) {
      throw new Error("PreOrder not found");
    }
    return preOrder;
  } catch (error) {
    throw error;
  }
};

export const getPreOrdersByReservation = async (reservationId: string) => {
  try {
    const preOrders = await Preorder.find({ reservationId });
    if (!preOrders) {
      throw new Error("PreOrders not found");
    }
    return preOrders;
  } catch (error) {
    throw error;
  }
};

export const getAllPreOrders = async () => {
  try {
    const preOrders = await Preorder.find();
    if (!preOrders) {
      throw new Error("PreOrders could not be fetched");
    }
    return preOrders;
  } catch (error) {
    throw error;
  }
};


// Temporary
export const deletePreOrder = async (id: string) => {
  try {
    const preOrder = await Preorder.findByIdAndDelete(id);
    if (!preOrder) {
      throw new Error("PreOrder not found");
    }
  } catch (error) {
    throw error;
  }
};