import PreOrder from "@/models/preorder.model";

export const createPreOrder = async (data: {
  reservationId: string;
  items: { menuItemId: string; quantity: number }[];
  }) => {
  try {
    const newPreOrder = new PreOrder(data);
    return newPreOrder.save();
  } catch (error) {
    throw error;
  }
};

export const getPreOrder = async (id: string) => {
  try {
    const preOrder = await PreOrder.findById(id);
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
    const preOrders = await PreOrder.find({ reservationId });
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
    const preOrders = await PreOrder.find();
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
    const preOrder = await PreOrder.findByIdAndDelete(id);
    if (!preOrder) {
      throw new Error("PreOrder not found");
    }
  } catch (error) {
    throw error;
  }
};