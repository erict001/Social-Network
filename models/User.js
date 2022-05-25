const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      max_length: 50,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thought: [{
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
    
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
  // Setter to set the first and last name

const User = model('User', userSchema);

module.exports = User;