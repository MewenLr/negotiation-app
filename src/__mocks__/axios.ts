const mockAxios = jest.genMockFromModule('axios') as {
  create: { mockReturnThis: Function };
  get: {
    mockImplementation: Function;
    mockResolvedValue: Function;
  };
}

mockAxios.create.mockReturnThis()

export default mockAxios
