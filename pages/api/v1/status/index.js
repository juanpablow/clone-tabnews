import database from "../../../../infra/database.js";

async function status(req, res) {
  const result = await database.query("SELECT 2 + 2 as sum;");
  console.log(result);
  res.status(200).json({ key: "value" });
}

export default status;
