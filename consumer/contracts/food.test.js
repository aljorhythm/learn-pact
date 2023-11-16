import { pactWith } from "jest-pact";

class FoodService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async getFood() {
    return (await fetch(`${this.baseUrl}/food`)).json();
  }
}

pactWith({ consumer: "Person", provider: "Food" }, (provider) => {
  let foodService;

  beforeEach(() => {
    foodService = new FoodService(provider.mockService.baseUrl);
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

    it("returns body", async () => {
      const body = await foodService.getFood();
      expect(body).toEqual({});
    });
  });
});
