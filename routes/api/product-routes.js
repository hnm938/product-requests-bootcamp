const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [
      { model: Category },
      { model: Tag, through: ProductTag }
    ]
  })
  .then((products) => {
    res.status(200).json(products);
  })
  .catch((err) => {
    console.log(err);
    res.status(200).json(err);
  })
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    include: [{ model: Category }, { model: Tag, through: ProductTag }],
  })
  .then((product) => {
    if (!product) {
      // If the product with the given id is not found
      res.status(404).json({ error: "Product not found" });
    } else {
      // If the product is found, send it as a JSON response
      res.status(200).json(product);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  })
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        // If there are product tags, create pairings to bulk create in the ProductTag model
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      } else {
        // If no product tags, just respond with the created product
        res.status(200).json(product);
      }
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  const productId = req.params.id;

  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        // If one or more rows were deleted, send a success response
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        // If no rows were deleted (product not found), send a not found response
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during the deletion process
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
