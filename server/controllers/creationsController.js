import Creation from "../models/Creation.js";

export const createCreation = async (req, res) => {
  try {
    const creation = await Creation.create({
      userId: req.user.id,   // IMPORTANT
      ...req.body
    });

    res.status(201).json(creation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCreations = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = {
      userId: req.user.id,
      ...(type ? { type } : {})
    };

    const creations = await Creation.find(filter).sort({ createdAt: -1 });

    res.json(creations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCreation = async (req, res) => {
  try {
    const updated = await Creation.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCreation = async (req, res) => {
  try {
    await Creation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

