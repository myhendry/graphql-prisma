const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    return prisma.mutation.createUser({ data: args.data }, info);
  },

  async deleteUser(parent, { id }, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id } });
  },

  async updateUser(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updateUser(
      {
        where: {
          id
        },
        data
      },
      info
    );
  },

  async createPost(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author
            }
          }
        }
      },
      info
    );
  },

  async deletePost(parent, { id }, { prisma, pubsub }, info) {
    return prisma.mutation.deletePost({
      where: {
        id
      }
    });
  },

  async updatePost(parent, { id, data }, { prisma, pubsub }, info) {
    return prisma.mutation.updatePost(
      {
        data,
        where: {
          id
        }
      },
      info
    );
  },

  async createComment(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      },
      info
    );
  },

  async deleteComment(parent, { id }, { prisma, pubsub }, info) {
    return prisma.mutation.deleteComment(
      {
        where: {
          id
        }
      },
      info
    );
  },

  async updateComment(parent, { id, data }, { prisma, pubsub }, info) {
    return prisma.mutation.updateComment(
      {
        data,
        where: {
          id
        }
      },
      info
    );
  }
};

export { Mutation as default };
