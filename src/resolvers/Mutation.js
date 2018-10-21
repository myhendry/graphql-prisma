import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(user => {
      return user.email === args.data.email;
    });

    if (emailTaken) {
      throw new Error("Email taken");
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);
    return user;
  },

  deleteUser(parent, { id }, { db }, info) {
    // Find user
    const userIndex = db.users.findIndex(user => {
      return user.id === id;
    });

    // If no user found
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Mutate the demo array
    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter(post => {
      // Filter out posts belonging to specific author
      const match = post.author === id;

      if (match) {
        // If post belonging to author found, filter out comments not belonging to post
        db.comments = db.comments.filter(comment => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });

    comments = db.comments.filter(comment => comment.author !== id);

    // return deleted User
    return deletedUsers[0];
  },
  updateUser(parent, { id, data }, { db }, info) {
    const user = db.users.find(user => {
      return user.id === id;
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some(user => {
        return user.email === data.email;
      });

      if (emailTaken) {
        throw new Error("Email taken");
      }

      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },
  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => {
      return user.id === args.data.author;
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    const post = {
      id: uuidv4(),
      ...args.data
    };

    db.posts.push(post);

    if (args.data.published) {
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: post
        }
      });
    }

    return post;
  },
  deletePost(parent, { id }, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex(post => {
      return post.id === id;
    });

    if (postIndex === -1) {
      throw new Error("Post not found");
    }

    const [post] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => {
      return comment.post !== id;
    });

    if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: post
        }
      });
    }

    return post;
  },
  updatePost(parent, { id, data }, { db, pubsub }, info) {
    const post = db.posts.find(post => post.id === id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error("Post does not exists");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }

    if (typeof data.body === "string") {
      post.body = data.body;
    }

    if (typeof data.published === "boolean") {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: originalPost
          }
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: post
          }
        });
      }
    } else if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: post
        }
      });
    }

    return post;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => {
      return user.id === args.data.author;
    });

    const postExists = db.posts.some(post => {
      return post.id === args.data.post && post.published;
    });

    if (!userExists || !postExists) {
      throw new Error("User or Post not found");
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: "CREATED",
        data: comment
      }
    });

    return comment;
  },
  deleteComment(parent, { id }, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(comment => comment.id === id);

    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    const [deletedComment] = db.comments.splice(commentIndex, 1);

    db.comments = db.comments.filter(comment => comment.id !== id);
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment
      }
    });

    return deletedComment;
  },
  updateComment(parent, { id, data }, { db, pubsub }, info) {
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) {
      throw new Error("Comment does not exist");
    }

    if (typeof data.text === "string") {
      comment.text = data.text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: "UPDATED",
        data: comment
      }
    });

    return comment;
  }
};

export { Mutation as default };
