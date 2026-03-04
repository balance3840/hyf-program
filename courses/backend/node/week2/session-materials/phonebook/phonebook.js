// NOTE: This phonebook example is legacy/extra reference material.
// Week 2 now focuses on the Snippets API; you can still use this file
// to practise Knex patterns if you like.

import knex from "./database.js";

// Show https://devhints.io/knex for a useful cheatsheet of knex commands

// Create
const createContact = async (name, phonenumber) => {
  const [id] = await knex("contacts").insert({ name, phonenumber });
  return id;
};

// Read (all)
const getContacts = async () => {
  return await knex("contacts").select("*");
};

// Read (by id)
const getContactById = async (id) => {
  return await knex("contacts").where({ id }).first();
};

// Update
const updateContact = async (id, updates) => {
  await knex("contacts").where({ id }).update(updates);
  return await getContactById(id); // return updated record
};

// Delete
const deleteUser = async (id) => {
  await knex("contacts").where({ id }).del();
  return { deleted: true };
};

const main = async () => {
  // Call your functions here to test them
};

main().catch(console.error);
