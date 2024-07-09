
import express from "express";
import { check, validationResult } from "express-validator";
import { protectPharmacy, protectDoctor } from "../middleware/auth.js";
import Record from "../db/models/record.js";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", protect, async (req, res) => {
  try {
    const results = await Record.find();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving records");
  }
});

// This section will help you get a single record by id
router.get("/:id", protect, async (req, res) => {
  try {
    const result = await Record.findById(req.params.id);
    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving record");
  }
});

// This section will help you create a new record.
router.post(
  "/",
  protect,
  [
    check("name").not().isEmpty(),
    check("position").not().isEmpty(),
    check("level").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newRecord = new Record({
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
      });
      const result = await newRecord.save();
      res.status(201).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  }
);

// This section will help you update a record by id.
router.patch(
  "/:id",
  protect,
  [
    check("name").not().isEmpty(),
    check("position").not().isEmpty(),
    check("level").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updates = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
      };

      const result = await Record.findByIdAndUpdate(req.params.id, updates, { new: true });
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    }
  }
);

// This section will help you delete a record
router.delete("/:id", protect, async (req, res) => {
  try {
    const result = await Record.findByIdAndDelete(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;

















/* COD PROST SPART FACUT GRAMADA CA AM FOLOSIT MONGOOSE IN LOC DE MONGODB NU ATINGETI ACEST COD 

import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This helps convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

import { check, validationResult } from "express-validator";

import { protect } from "../middleware/auth.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", protect, async (req, res) => {
  try {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving records");
  }
});

// This section will help you get a single record by id
router.get("/:id", protect, async (req, res) => {
  try {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving record");
  }
});

// This section will help you create a new record.
router.post(
  "/",
  protect,
  [check("name").not().isEmpty(), check("position").not().isEmpty(), check("level").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let newDocument = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      };
      let collection = await db.collection("records");
      let result = await collection.insertOne(newDocument);
      res.status(201).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  }
);

// This section will help you update a record by id.
router.patch(
  "/:id",
  protect,
  [check("name").not().isEmpty(), check("position").not().isEmpty(), check("level").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
        $set: {
          name: req.body.name,
          position: req.body.position,
          level: req.body.level,
        },
      };

      let collection = await db.collection("records");
      let result = await collection.updateOne(query, updates);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    }
  }
);

// This section will help you delete a record
router.delete("/:id", protect, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    let collection = await db.collection("records");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
*/