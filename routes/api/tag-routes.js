const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // Find all tags and include associated Product data
  Tag.findAll({
    include: {
      model: Product,
    },
  })
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/:id", (req, res) => {
  const tagId = req.params.id;

  // Find a single tag by its `id` and include associated Product data
  Tag.findByPk(tagId, {
    include: {
      model: Product,
    },
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/", (req, res) => {
  // Create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(201).json(tag);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});


router.put("/:id", (req, res) => {
  const tagId = req.params.id;
  const { tag_name } = req.body;

  // Update a tag's name by its `id` value
  Tag.update(
    { tag_name },
    {
      where: {
        id: tagId,
      },
    }
  )
    .then((rowsUpdated) => {
      if (rowsUpdated > 0) {
        // If one or more rows were updated, send a success response
        res.status(200).json({ message: "Tag updated successfully" });
      } else {
        // If no rows were updated (tag not found), send a not found response
        res.status(404).json({ message: "Tag not found" });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during the update process
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.delete("/:id", (req, res) => {
  const tagId = req.params.id;

  // Delete one tag by its `id` value
  Tag.destroy({
    where: {
      id: tagId,
    },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        // If one or more rows were deleted, send a success response
        res.status(200).json({ message: "Tag deleted successfully" });
      } else {
        // If no rows were deleted (tag not found), send a not found response
        res.status(404).json({ message: "Tag not found" });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during the deletion process
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
