import httpService from "./http.service";

const characteristicEndPoint = "characteristic/";

const characteristicService = {
  getAll: async () => {
    const { data } = await httpService.get(characteristicEndPoint);
    return data;
  },
  getAllByProduct: async (payload) => {
    const { data } = await httpService.post(
      characteristicEndPoint + "allByProduct",
      payload
    );
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(characteristicEndPoint + id);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      characteristicEndPoint + payload._id,
      payload
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      characteristicEndPoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(characteristicEndPoint + id);
    return data;
  },
};

export default characteristicService;
