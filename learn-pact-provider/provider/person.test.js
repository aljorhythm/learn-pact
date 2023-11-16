import { getPort } from "get-port-please";
import { Verifier } from "@pact-foundation/pact";
import http from "http";

const providerApp = http.createServer((_, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("{}");
});

describe("Pact Verification", () => {
  let opts;
  let provider = "Food";
  beforeAll(async () => {
    const PROVIDER_PORT = await getPort();
    console.log(
      "🚀 ~ file: pacts.test.js:15 ~ beforeAll ~ PROVIDER_PORT:",
      PROVIDER_PORT
    );

    const BROKER = {
      BASEURL: "http://localhost:9292",
    };

    const PROVIDER = {
      BASEURL: `http://localhost:${PROVIDER_PORT}`,
    };

    opts = {
      provider,
      providerBaseUrl: PROVIDER.BASEURL,
      pactBrokerUrl: BROKER.BASEURL,
      consumerVersionSelectors: [{ tag: "main" }],
    };
    await new Promise((resolve) => {
      providerApp.listen(PROVIDER_PORT, () => {
        console.log(`Server is listening on port ${PROVIDER_PORT}`);
        resolve();
      });
    });
  });
  afterAll(async () => {
    await new Promise((resolve) => providerApp.close(resolve))
  });
  it(`should validate expectations of ${provider}`, () => {
    return new Verifier(opts)
      .verifyProvider()
      .then((output) => {
        console.log("Pact Verification Complete!");
        console.log(output);
      })
      .catch((e) => {
        console.error("Pact verification failed :(", e);
      });
  });
});
