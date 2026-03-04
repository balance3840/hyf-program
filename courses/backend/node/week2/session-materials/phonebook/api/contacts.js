// NOTE: This contacts API example is legacy/extra reference material.
// Week 2 now uses Snippets-based examples in the main flow. You can
// still use this file to practise Express + Knex error handling.

import express from "express";
import knex from "../database.js";

const router = express.Router();

// Example POST endpoint to add a new contact
router.post("/", async (request, response) => {
  try {
    console.log(request.body); // Server side log, for developers
    const [id] = await knex("contacts").insert(request.body); // Do not use this pattern with unvalidated data in production.
    response.status(201).json({ id }); // 201 Created
  } catch (error) {
    console.error("Error inserting contact:", error); // Server side error, for developers
    response
      .status(500)
      .json({ message: "Something went wrong on the server." }); // Client side error, for users. Avoid leaking database info.
  }
});

export default router;
