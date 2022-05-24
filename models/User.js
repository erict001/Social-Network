const { Schema, model } = require('mongoose');

// Schema to create Student model
const studentSchema = new Schema(
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
    thoughtId: [{
      type: Schema.Types.ObjectId,
      ref: "Thoughts"
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

UserSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

const User = model('User', UserSchema);

module.exports = User;