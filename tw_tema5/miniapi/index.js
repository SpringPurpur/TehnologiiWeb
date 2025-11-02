import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const port = 8000;
let app = express();
let router = express.Router();

let resources = [
  { name: "ABC DEF", number: "4645789739871453", expDate: "06/28", cvv: 874 },
  { name: "BCD EFG", number: "7924365175946924", expDate: "23/31", cvv: 154 },
  { name: "CDE FGH", number: "3657145987320561", expDate: "28/29", cvv: 349 },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

//GET
router.route("/card/:name").get((req, res) => {
  const requestedName = req.params.name;
  const card = resources.find(
    (c) => c.name.toLowerCase() === requestedName.toLowerCase()
  );

  if (card) {
    return res.json(card);
  } else {
    return res
      .status(404)
      .send({ message: `Card for '${requestedName}' not found` });
  }
});

//POST
router.route("/card").post((req, res) => {
  const newCard = req.body;

  if (resources.find((c) => c.number === newCard.number)) {
    return res
      .status(409)
      .send({ message: "Card with this number already exists." });
  }

  resources.push(newCard);
  return res.status(201).json(newCard);
});

//PUT
router.route("/card/:name").put((req, res) => {
  const requestedName = req.params.name;
  const updatedDetails = req.body;

  const index = resources.findIndex(
    (c) => c.name.toLowerCase() === requestedName.toLowerCase()
  );

  if (index !== -1) {
    resources[index] = { ...resources[index], ...updatedDetails };
    return res.json(resources[index]);
  } else {
    return res
      .status(404)
      .send({ message: `Card for '${requestedName}' not found to update.` });
  }
});

//DELETE
router.route("/card/:name").delete((req, res) => {
  const requestedName = req.params.name;
  const initialLength = resources.length;

  resources = resources.filter(
    (c) => c.name.toLowerCase() !== requestedName.toLowerCase()
  );

  if (resources.length < initialLength) {
    return res.status(204).send();
  } else {
    return res
      .status(404)
      .send({ message: `Card for '${requestedName}' not found to delete.` });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
