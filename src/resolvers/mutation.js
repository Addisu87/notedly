const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
require("dotenv").config();

const gravatar = require("gravatar");
const mongoose = require("mongoose");

module.exports = {
  // add the users context
  newNote: async (parent, args, { models, user }) => {
    // if there is no user in the context, throw an authentication error
    if (!user) {
      throw new AuthenticationError("You must be signed in to create a note");
    }
    return await models.Note.create({
      content: args.content,
      // reference the author's mongo id
      author: mongoose.Types.ObjectId(user.id),
    });
  },

  deleteNote: async (parent, { id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError("You must be signed in to delete a note");
    }
    // find the note
    const note = await models.Note.findById(id);
    // If the note owner and current user don't match, throw a forbidden error
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the note");
    }

    try {
      await note.remove();
      return true;
    } catch (error) {
      // If there's an error along the way,return false
      return false;
    }
  },

  updateNote: async (parent, { content, id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError("You must be signed in to update a note");
    }

    // find a note
    const note = await models.Note.findById(id);
    // if the note owner and current user don't match, throw a forbidden error message
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the note");
    }

    // Update the note in the db and return the updated note
    return await models.Note.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    );
  },

  signUp: async (parent, { username, email, password }, { models }) => {
    // normalize email address
    email = email.trim().toLowerCase();
    // hash the password
    const hashed = await bcrypt.hash(password, 10);
    // create the gravatar url
    const avatar = gravatar.url(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });

      // Create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.error(err);
      // If there's a problem creating the account, throw an error
      throw new Error("There was a problem creating your account.");
    }
  },

  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // normalize email address
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({ $or: [{ email }, { username }] });
    // if no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError("Incorrect username or password.");
    }
    // if the passwords don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError("Incorrect username or password.");
    }

    // create and return the json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
