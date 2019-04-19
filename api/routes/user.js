var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");

router.get("/:id", async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const query = {"_id": ObjectId(req.params.id)};
    const data = await db.collection("users").find(query).toArray();

    console.log(data);

    return res.json(data);
  } catch (err) {
    next(err);
  }
  
});

router.get("/", async (req, res, next) => {
    try {
      const db = req.app.locals.db;
      const query = {};
      const data = await db.collection("users").find(query).toArray();
      
      console.log(data);
      
      return res.json(data);
    } catch (err) {
      next(err);
    }
    
  });

module.exports = router;
