import * as db from "./index";

export const machineRepository = {
  list: async () => db.machines,
  getById: async (id: string) => db.machines.find((m) => m.id === id),
};

export const salesRepository = {
  listOffers: async () => db.offers,
  listCustomers: async () => db.customers,
};

export const serviceRepository = {
  listRequests: async () => db.serviceRequests,
};
