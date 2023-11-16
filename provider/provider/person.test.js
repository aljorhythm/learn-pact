import { getPort } from "get-port-please";
import { Verifier } from "@pact-foundation/pact";
import http from "http";

const providerApp = http.createServer((_, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("{}");
});

describe("Pact Verification", () => {
  let opts;
  const PROVIDER_NAME = "Food";
  const BROKER_BASEURL = "http://localhost:9292";
  
  beforeAll(async () => {
    const PROVIDER_PORT = await getPort();
    const PROVIDER_BASEURL = `http://localhost:${PROVIDER_PORT}`;

    opts = {
      provider: PROVIDER_NAME,
      providerBaseUrl: PROVIDER_BASEURL,
      pactBrokerUrl: BROKER_BASEURL,
      consumerVersionSelectors: [{ tag: "main", latest: true }],
    };
    await new Promise((resolve) => {
      providerApp.listen(PROVIDER_PORT, () => {
        console.log(`Server is listening on port ${PROVIDER_PORT}`);
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => providerApp.close(resolve));
  });

  it(`should validate expectations of ${PROVIDER_NAME}`, async () => {
    await new Verifier(opts).verifyProvider();
    console.log("Pact Verification Complete!");
  });
});
