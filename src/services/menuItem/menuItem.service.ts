import MenuItem from "@/models/menuItem.model";

export const createMenuItem = async (data: {
  name: string;
  description: string;
  price: number;
  category: string;
  }) => {
  try {
    const menuItem = new MenuItem({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      available: true
    });
    return await menuItem.save();
  } catch (error) {
    throw error;
  }
};

export const getMenuItem = async (id: string) => {
  try {
    const menuItem = await MenuItem.findById(id);
    return menuItem;
  } catch (error) {
    throw error;
  }
};

export const getAllMenuItems = async () => {
  try {
    const menuItems = await MenuItem.find();
    return menuItems;
  } catch (error) {
    throw error;
  }
};

export const updateMenuItem = async (id: string, data: {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  }) => {
  try {
    if (!data.name && !data.description && !data.price && !data.category) {
      throw new Error("No data provided");
    }
    let filter: any = {};
    if (data.name) filter.name = data.name;
    if (data.description) filter.description = data.description;
    if (data.price) filter.price = data.price;
    if (data.category) filter.category = data.category;
    const menuItem = await MenuItem.findByIdAndUpdate(
      id, 
      filter, 
      { new: true }
    );
    return menuItem;
  } catch (error) {
    throw error;
  }
};

export const deleteMenuItem = async (id: string) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(id);
    return menuItem;
  } catch (error) {
    throw error;
  }
};