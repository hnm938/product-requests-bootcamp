const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
    },
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/:id", (req, res) => {
  const categoryId = req.params.id;

  // Find one category by its `id` value and include its associated Products
  Category.findOne({
    where: {
      id: categoryId,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((category) => {
      if (category) {
        // If the category is found, send a success response with the category data and its associated Products
        res.status(200).json(category);
      } else {
        // If the category is not found, send a not found response
        res.status(404).json({ message: "Category not found" });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during the query
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.put("/:id", (req, res) => {
  const categoryId = req.params.id;

  // Update the category with new data
  Category.update(req.body, {
    where: {
      id: categoryId,
    },
  })
    .then((rowsUpdated) => {
      if (rowsUpdated[0] > 0) {
        // If one or more rows were updated, send a success response
        res.status(200).json({ message: "Category updated successfully" });
      } else {
        // If no rows were updated (category not found), send a not found response
        res.status(404).json({ message: "Category not found" });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during the update process
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.delete("/:id", (req, res) => {
  const categoryId = req.params.id;

  // Delete one category by its `id` value
  Category.destroy({
    where: {
      id: categoryId,
    },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        // If one or more rows were deleted, send a success response
        res.status(200).json({ message: "Category deleted successfully" });
      } else {
        // If no rows were deleted (category not found), send a not found response
        res.status(404).json({ message: "Category not found" });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during the deletion process
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
