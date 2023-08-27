const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
<<<<<<< HEAD
  "04ac5c495359c6f79feab0d73e0957bceb5fca87962391437f5802df15753f29b3b6f7042fe9bd852cd1d1a06225c394f60307e8e2b43d8e38f9719d8f1f180e57": 100, // Dan
  "049e475b828ae6f3cb89fd179f9c8e568d893401558d3103a77aebf75273b5ee563c5361e5cc3ed8c0b3295505dbee62f5f174723be5ba68946bb530018330a94f": 50,  // el
  "04c4b4db449d5778fa7812eda41e35fd40a49a070c9d16a7e20e747d5df5d8890b53cb3833d0178776baa5af33c92fdb5bc48a4f65b7189bdb1c7a875522d9d8c3": 75,  // ben
=======
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
>>>>>>> origin/main
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
<<<<<<< HEAD
  // TODO: get a signature from the client-side application
  // recover the public address fro the signature

=======
>>>>>>> origin/main
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
<<<<<<< HEAD

=======
>>>>>>> origin/main
