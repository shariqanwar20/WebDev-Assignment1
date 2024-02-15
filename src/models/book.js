const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    genre: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
