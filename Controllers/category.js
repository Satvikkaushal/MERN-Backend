const Category = require("../models/category");


exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            res.status(400).json({
                err: "category not found"
            })
        }
        req.category = category;
    })
    next();
}

exports.createCategory = (req, res) => {
    console.log("in create category ")
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save category in DB"
            });
        }
        res.json({ category });
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
}
exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            res.status(400).json({
                err: "category not found"
            })
        }
        res.json(categories);
    })

}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if (err) {
            res.status(400).json({
                err: "failed to update category"
            })
        }
        res.json(updatedCategory);
    });
}

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            res.status(400).json({
                err: "failed to delete category"
            })
        }
        res.json({
            message: "deleted sucessfully",
            categoryId: category._id,
            categoryName: category.name
        });
    })
}


