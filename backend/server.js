const express = require("express");
const sqlite3 = require("sqlite3");
const bodyparser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const app = express();
const port = 8081;

const db = new sqlite3.Database(
  "C:/Users/user/Desktop/MyFitnessVersion2/backend/myfitness.db"
);
app.use(express.json());
app.use(cors(corsOptions));

const calculateBMI = (height, weight) => {
  return parseFloat((weight / height) * height * 0.1);
};

app.get("/api/data", (req, res) => {
  db.all("SELECT * FROM exercise", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/exongoal/:id", (req, res) => {
  const id = req.params.id; // Use req.params.id to get the value of the route parameter
  db.all(
    "SELECT * FROM exercise JOIN workout ON exercise.workoutid = workout.workoutid JOIN goal ON workout.goalid = goal.goalID WHERE goal.goalid = ?",
    [parseInt(id)],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(rows);
      }
    }
  );
});

app.get("/api/classes", (req, res) => {
  db.all("SELECT * FROM class", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM user", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
});

app.post("/api/signup", (req, res) => {
  console.log(req.body);
  const { sname, semail, spassword, sheight, sweight, sgender, sgoalID } =
    req.body;
  const BMI = calculateBMI(sweight, sheight);
  db.run(
    "INSERT INTO user (username, useremail, userpassword, usergender, userheight, userweight, userbmi, goalid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [sname, semail, spassword, sgender, sheight, sweight, BMI, sgoalID],
    (err) => {
      if (err) {
        console.error(err.message);
        console.log(err.message);
      } else {
        console.log("User registered successfully");
        res.status(200).json({ message: "User registered successfully" });
      }
    }
  );
});

app.get("/api/userid/:useremail", (req, res) => {
  const useremail = req.params.useremail;

  db.get(
    "SELECT userid FROM user WHERE useremail = ?",
    [useremail],
    (err, rows) => {
      if (err) {
        console.log(err.message);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else if (rows) {
        res.json({ success: true, user: rows });
      } else {
        res.json({ success: true, message: "No user found" });
      }
    }
  );
});

app.get("/api/goalid/:useremail", (req, res) => {
  const useremail = req.params.useremail;

  db.get(
    "SELECT goalid FROM user WHERE useremail = ?",
    [useremail],
    (err, rows) => {
      if (err) {
        console.log(err.message);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else if (rows) {
        res.json({ success: true, user: rows });
      } else {
        res.json({ success: true, message: "No user found" });
      }
    }
  );
});

app.get("/api/signin", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  db.get(
    "SELECT * FROM user WHERE userEmail = ? AND userPassword = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else if (row) {
        res.json({ success: true, user: row });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    }
  );
});

app.get("/api/mealplan/:id", (req, res) => {
  const id = req.params.id;

  db.all(
    "SELECT * FROM hasfood JOIN food ON hasfood.foodid = food.foodid JOIN nutritionplan ON hasfood.planid = nutritionplan.planid WHERE hasfood.planid = ?",
    [parseInt(id)],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else if (rows.length > 0) {
        res.json({ success: true, data: rows });
      } else {
        res.status(404).json({ success: false, message: "Plan not found" });
      }
    }
  );
});

app.post("/api/userprogressdef/:userid", (req, res) => {
  const userid = req.params.userid;
  db.run(
    "INSERT INTO userprogress (userid, usergoalprogress, userworkoutprogress) VALUES (?, ?, ?)",
    [userid, 0, 0],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }

      res.json({ success: true, message: "User progress added successfully" });
    }
  );
});

app.get("/api/userinfo/:usermail", (req, res) => {
  const useremail = req.params.usermail;
  db.get("SELECT * FROM user WHERE useremail = ?", [useremail], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
});

app.post("/api/addusertoclass", (req, res) => {
  const { userid, indexFetch } = req.body;
  if (!userid || !indexFetch) {
    return res.status(400).json({
      error: "Both userid and classid are required in the request body",
    });
  }

  db.run(
    "INSERT INTO userclass (userid, classid) VALUES (?, ?)",
    [userid, indexFetch],
    (err) => {
      if (err) {
        console.log("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json({ message: "User added to class successfully" });
    }
  );
});

app.get("/api/userprogress/:userid", (req, res) => {
  const userid = req.params.userid;
  db.get(
    "SELECT usergoalprogress FROM userprogress WHERE userid = ?",
    [userid],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!row) {
        return res.status(404).json({ error: "User progress not found" });
      }
      const userProgress = row.usergoalprogress;
      return res.json({ userProgress });
    }
  );
});

app.post("/api/updateprogress", (req, res) => {
  const { userid, goalid, workoutid, exerciseid } = req.body;

  if (!userid || !goalid || !workoutid || !exerciseid) {
    return res
      .status(400)
      .json({ error: "Missing required fields in the request body" });
  }

  db.get(
    "INSERT INTO achieved (userid, goalid, workoutid, exerciseid) VALUES (?,?,?,?)",
    [userid, goalid, workoutid, exerciseid],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res
        .status(201)
        .json({ message: "User progress updated successfully" });
    }
  );
});

app.get("/api/seeprogress", (req, res) => {
  const { userid, goalid, workoutid, exerciseid } = req.query;

  if (!userid || !goalid || !workoutid || !exerciseid) {
    return res
      .status(400)
      .json({ error: "Missing required fields in the request query parameters" });
  }

  db.get(
    "SELECT userid, goalid, workoutid, exerciseid FROM achieved WHERE userid = ? AND goalid = ? AND workoutid = ? AND exerciseid = ?;",
    [userid, goalid, workoutid, exerciseid],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result) {
        return res.status(200).json({ exists: true, data: result });
      } else {
        return res.status(200).json({ exists: false });
      }
    }
  );
});






app.post("/api/addgoalprogress/:userid", (req, res) => {
  const userid = req.params.userid;
  db.run(
    "UPDATE userprogress SET usergoalprogress = usergoalprogress + (25.0 / 3.0), userworkoutprogress = userworkoutprogress + (25.0 / 3.0) WHERE userid = ?",
    [userid],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Progress updated successfully");
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("Baby, this is what we came for");
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});
