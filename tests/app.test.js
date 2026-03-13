const test = require("node:test");
const assert = require("node:assert/strict");

const app = require("../app");

test("GET / returns the welcome message", async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      message: "Hello from your Express backend!",
    });
  } finally {
    server.close();
  }
});

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

test("POST /api/todos validates empty titles", async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "   " }),
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(body, { error: "Title is required" });
  } finally {
    server.close();
  }
});
