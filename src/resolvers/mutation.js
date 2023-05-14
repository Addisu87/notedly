module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: "Addisu Haile",
    });
  },

  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findByIdAndRemove({ _id: id });
      return true;
    } catch (error) {
      return false;
    }
  },

  updateNote: async (parent, { content, id }, { models }) => {
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
};
