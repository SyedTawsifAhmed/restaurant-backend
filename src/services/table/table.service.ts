import Table from "@/models/table.model";

export const createTable = async (data: any) => {
  try {
    const newTable = new Table(data);
    return await newTable.save();
  } catch (error) {
    throw error;
  }
};

export const getTable = async (id: string) => {
  try {
    const table = await Table.findById(id);
    if (!table) {
      throw new Error("Table not found");
    }
    return table;
  } catch (error) {
    throw error;
  }
};

export const getAllTables = async () => {
  try {
    const tables = await Table.find();
    if (!tables) {
      throw new Error("Tables could not be fetched");
    }
    return tables;
  } catch (error) {
    throw error;
  }
};

export const availableTables = async () => {
  try {
    const tables = await Table.find({ available: true });
    if (!tables) {
      throw new Error("Tables could not be fetched");
    }
    return tables;
  } catch (error) {
    throw error;
  }
}

export const updateAvailability = async (id: string) => {
  try {
    const table = await Table.findById(id);
    if (!table) {
      throw new Error("Table not found");
    }
    table.available = !table.available;
    return await table.save();
  } catch (error) {
    throw error;
  }
};

export const deleteTable = async (id: string) => {
  try {
    const table = await Table.findByIdAndDelete(id);
    if (!table) {
      throw new Error("Table not found");
    }
  } catch (error) {
    throw error;
  }
};