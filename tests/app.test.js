const test = require("node:test");
const assert = require("node:assert/strict");

const app = require("../app");

test("GET /health returns ok", async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, { status: "ok" });
  } finally {
    server.close();
  }
});
