const express = require("express");
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require("../modules/pool");

// GET all koalas?
koalaRouter.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "koalas";'; //REMEMBER TO COME BACK
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting Koallas", error);
      res.sendStatus(500);
    });
});

// POST
koalaRouter.post("/", (req, res) => {
  let newKoala = req.body;
  console.log(`Adding koala`, newKoala);

  let queryText = `INSERT INTO "koalas" 
    ("Name", "Age", "Gender", "Ready for Transfer", "Notes")
    VALUES
    ($1, $2, $3, $4, $5);`;

  pool
    .query(queryText, [
      newKoala['Name'],
      newKoala['Age'],
      newKoala['Gender'],
      newKoala['Ready for Transfer'],
      newKoala['Notes'],
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding Koala`, error);
      res.sendStatus(500);
    });
});
// PUT
koalaRouter.put("/koala/:id", (req, res) => {
  let idToUpdate = req.params.id;
  let newName = req.body.name;
  let newAge = req.body.age;
  let newGender = req.body.gender;
  let newReadyForTransfer = req.body.readyForTransfer;
  let newNotes = req.body.notes;

  let sqlText = `
    UPDATE "koalas"
    SET "Name"=$1,
        "Age"=$2,
        "Gender"=$3
        "Ready for Transfer"=$4
        "Notes"=$5
    WHERE "id"=$6;
  `;

  let sqlValues = [
    idToUpdate,
    newName,
    newAge,
    newGender,
    newReadyForTransfer,
    newNotes,
  ];

  pool
    .Routeruery(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log("PUT /koalas/:id fail:", dbErr);
      res.sendStatus(500);
    });
});

// DELETE
koalaRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sqlText = `
    DELETE FROM "koalas"
      WHERE "id"=$1
  `;
  const sqlValues = [id];
  pool
    .query(sqlText, sqlValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = koalaRouter;
