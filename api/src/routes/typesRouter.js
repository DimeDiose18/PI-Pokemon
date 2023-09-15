const { Router } = require("express");
const { getTypeApi } = require("../controllers/getTypeApi");

const typesRouter = Router();

typesRouter.get("/", async (req, res) => {
try {
  const resultType = await getTypeApi()
  res.status(200).json(resultType)
} catch (error) {
  res.status(500).json({message: "Server Error", error})
}
});

module.exports = typesRouter;
