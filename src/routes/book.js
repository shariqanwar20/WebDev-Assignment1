const express = require("express");
const bookController = require("../controller/bookController");

const router = express.Router();

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:isbn", bookController.getBookByIsbn);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;