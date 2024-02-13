const express = require("express");
const parser = require("body-parser");
const supabase = require("@supabase/supabase-js");
const path = require("path");

const app = express();
const client = new supabase.SupabaseClient(
  "http://127.0.0.1:54321",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
);
app.use(parser.json({ type: "application/*+json" }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "html");

app.get("/", async (req, res) => {
  res.send({ ok: "done" });
});

app.get("/reset-password", async (req, res) => {
  if (req.query.email) {
    const email = req.query.email;
    const reset = await client.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:4334/verify-account",
    });
    res.send({ ok: "sent reset", data: reset.data, error: reset.error });
  }
  res.send({ ok: "no email found" });
});

app.get("/verify-account", async (req, res) => {
  res.sendFile("reset-password.html", { root: path.join(__dirname, "public") });
});

app.get("/check-password", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  const login = await client.auth.signInWithPassword({
    email,
    password,
  });
  res.send(login.data);
});

app.listen(4334, () => console.log(`listening on port 4334`));
