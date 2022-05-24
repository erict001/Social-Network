const { User, Thought } = require('../models');
const { ObjectId } = require("mongoose").mongo

module.exports = {
  // Get all courses
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.user_id })
      .select('-__v')
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.user_id })
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No user with that ID' })
          : user.deleteMany({ _id: { $in: course.users } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.user_id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to a student
  addFriend(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Friend.findOneAndUpdate(
      { _id: req.params.friend_id },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res
            .status(404)
            .json({ message: 'No friend found with that ID :(' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeFriend(req, res) {
    Friend.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { assignment: { assignmentId: req.params.friend_id } } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
            .status(404)
            .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err))
  }

};
