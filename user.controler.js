const mongodb = require("mongodb");
const client = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

module.exports = {
  create: (req, res) => {
    const user = req.body;
    client.connect(url, (err, db) => {
      if (err) {
        throw err;
      }
      const dbo = db.db("myroot");
      dbo.collection("users").insertOne(user, (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
        db.close();
      });
    });
  },

  get: (req, res) => {
    client.connect(url, (err, db) => {
      if (err) {
        throw err;
      }

      const dbo = db.db("myroot");

      dbo
        .collection("users")
        .find({})
        .toArray((err, result) => {
          if (err) {
            throw err;
          }
          res.send(result);
          db.close();
        });
    });
  },

  delete: (req, res) => {
    const id = req.param("id");
    const query = { _id: mongodb.ObjectId(id) };
    client.connect(url, (err, db) => {
      if (err) {
        throw err;
      }
      const dbo = db.db("myroot");

      dbo.collection("users").deleteOne(query, (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
        db.close();
      });
    });
  },

  update: (req, res) => {
    // const firstName = req.body.first_name;
    // const newvalue = { '$set': { firstName: firstName }}
    const user = req.body;
    const query = { _id: mongodb.ObjectId(user._id) };
    const newvalue = {
      $set: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
      },
    };
    client.connect(url, (err, db) => {
      if (err) {
        throw err;
      }
      const dbo = db.db("myroot");

      dbo.collection("users").updateOne(query, newvalue, (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
        db.close();
      });
    });
  },
};
