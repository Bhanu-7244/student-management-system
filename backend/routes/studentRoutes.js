const router = require("express").Router();
const Student = require("../models/Student");

router.get("/", async (req, res) => {
  try {
    const q = req.query.search?.trim();
    const filter = q ? {$or: [
      {name: {$regex: q, $options: "i"}},
      {email: {$regex: q, $options: "i"}},
      {course: {$regex: q, $options: "i"}}
    ]} : {};
    res.json(await Student.find(filter).sort({createdAt: -1}));
  } catch (e) { res.status(500).json({message: "Failed to fetch students"}); }
});

router.post("/", async (req, res) => {
  try { res.status(201).json(await Student.create(req.body)); }
  catch (e) { res.status(400).json({message: e.message}); }
});

router.put("/:id", async (req, res) => {
  try {
    const item = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!item) return res.status(404).json({message: "Student not found"});
    res.json(item);
  } catch (e) { res.status(400).json({message: e.message}); }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Student.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({message: "Student not found"});
    res.json({message: "Student deleted successfully"});
  } catch (e) { res.status(400).json({message: e.message}); }
});

module.exports = router;