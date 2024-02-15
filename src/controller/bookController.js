const Book = require("../models/book");

const createBook = async (req, res, next) => {
  try {
    const { name, isbn, genre } = req.body;
    if (!name || !isbn || !genre) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const book = await Book.create({ name, isbn, genre, owner: req.user._id });
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ owner: req.user._id });

    if (!books) {
      return res
        .status(400)
        .json({ success: false, message: "Books not found" });
    }

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBookByIsbn = async (req, res, next) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { name, isbn, genre } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        name,
        isbn,
        genre,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookByIsbn,
  updateBook,
  deleteBook,
};
