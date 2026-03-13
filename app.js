const express = require("express");
const { pool } = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello from your Express backend!",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/api/todos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, completed, created_at FROM todos ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.get("/api/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, completed, created_at FROM todos WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch todo" });
  }
});

app.post("/api/todos", async (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed, created_at",
      [title.trim()]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create todo" });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  const { title, completed } = req.body;

  try {
    const existingTodo = await pool.query(
      "SELECT id, title, completed FROM todos WHERE id = $1",
      [req.params.id]
    );

    if (existingTodo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const updatedTitle =
      typeof title === "string" && title.trim()
        ? title.trim()
        : existingTodo.rows[0].title;
    const updatedCompleted =
      typeof completed === "boolean"
        ? completed
        : existingTodo.rows[0].completed;

    const result = await pool.query(
      `UPDATE todos
       SET title = $1, completed = $2
       WHERE id = $3
       RETURNING id, title, completed, created_at`,
      [updatedTitle, updatedCompleted, req.params.id]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = app;
