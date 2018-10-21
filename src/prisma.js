import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

// prisma.query.users(null, "{ id name email posts { id title }}").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query
//   .comments(null, "{ id text author { id name email } post {id title }}")
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "Wonderland",
//         body: "Save the world",
//         published: true,
//         author: {
//           connect: {
//             id: "cjnh5da0f002x0967enq4jpnw"
//           }
//         }
//       }
//     },
//     "{ id title body published }"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

//! DATA EXISTS
// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({
//     id: authorId
//   });

//   if (!userExists) {
//     throw new Error("User Not Found");
//   }

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     "{ id title body published author { id name email } }"
//   );

//   return post.author;
// };

// createPostForUser("xcjnh5wfhh003x0967m6wann70", {
//   title: "Cooling Taiwan",
//   body: "Hot Springs!!",
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });

//   if (!postExists) {
//     throw new Error("Post Not Found");
//   }

//   const post = await prisma.mutation.updatePost(
//     {
//       data: {
//         ...data
//       },
//       where: {
//         id: postId
//       }
//     },
//     "{ id title published author { id name email } }"
//   );

//   return post.author;
// };

// updatePostForUser("cjnh5iuqd00310967uha1e2j7", {
//   title: "Peace Forever 223",
//   body: "Love reading book",
//   published: false
// })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

//! USING METHODS CHAINING
// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "Superman",
//         body: "Folk Hero",
//         published: false,
//         author: {
//           connect: {
//             id: "cjnh5da0f002x0967enq4jpnw"
//           }
//         }
//       }
//     },
//     "{ id title body published }"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//     return prisma.query.users(null, "{ id name posts { id title }}");
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       data: { body: "Altering Again 2", published: false },
//       where: { id: "cjnh5iuqd00310967uha1e2j7" }
//     },
//     "{ id title published author { name id email }}"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//     return prisma.query.posts(
//       null,
//       "{id title body published author { id name email } }"
//     );
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

//! USING ASYNC AWAIT
// const createPostForUser = async (authorId, data) => {
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     "{ id }"
//   );

//   const user = await prisma.query.user(
//     {
//       where: {
//         id: authorId
//       }
//     },
//     "{ id name email posts { id title published }}"
//   );

//   return user;
// };

// createPostForUser("cjnh5wfhh003x0967m6wann70", {
//   title: "Next Stuff",
//   body: "Very Nice",
//   published: true
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

// const updatePostForUser = async (postId, data) => {
//   const post = await prisma.mutation.updatePost(
//     {
//       data: {
//         ...data
//       },
//       where: {
//         id: postId
//       }
//     },
//     "{ id title published author { id name email } }"
//   );

//   const user = await prisma.query.user(
//     {
//       where: {
//         id: post.author.id
//       }
//     },
//     "{ id name email posts { id title published }}"
//   );

//   return user;
// };

// updatePostForUser("cjnh5iuqd00310967uha1e2j7", {
//   title: "Peace Forever",
//   body: "Nice book",
//   published: true
// }).then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });
