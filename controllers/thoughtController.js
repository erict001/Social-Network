const { User, Thought } = require('../models');

module.exports = {
  // Get all courses
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thought_id })
      .select('-__v')
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thought_id })
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Thought.deleteMany({ _id: { $in: course.thoughts } })
      )
      .then(() => res.json({ message: 'Thoughts and users are deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thought_id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to a student
  addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);
    Reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
            .status(404)
            .json({ message: 'No friend found with that ID :(' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeReaction(req, res) {
    Reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $pull: { assignment: { reactionId: req.params.reaction_id } } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
            .status(404)
            .json({ message: 'No student found with that ID :(' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err))
  }

};