import { pactWith } from "jest-pact";

const getFoodService = (baseUrl) => {
  return {
    async getFood() {
      return (await fetch(`${baseUrl}/food`)).json();
    },
  };
};

pactWith({ consumer: "Person", provider: "Food" }, (provider) => {
  let provider;

  beforeEach(() => {
    provider = getFoodService(provider.mockService.baseUrl);
  });

  describe("food endpoint", () => {
    beforeEach(() =>
      provider.addInteraction({
        state: "Food is available",
        uponReceiving: "A request for food",
        willRespondWith: {
          status: 200,
          body: {},
        },
        withRequest: {
          method: "GET",
          path: "/food",
        },
      })
    );

    it("returns status", async () => {
      const body = await provider.getFood();
      expect(body).toEqual({});
    });
  });
});
