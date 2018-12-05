export const typeDefs = /* GraphQL */ `type AggregateTodo {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createTodo(data: TodoCreateInput!): Todo!
  updateTodo(data: TodoUpdateInput!, where: TodoWhereUniqueInput!): Todo
  updateManyTodoes(data: TodoUpdateManyMutationInput!, where: TodoWhereInput): BatchPayload!
  upsertTodo(where: TodoWhereUniqueInput!, create: TodoCreateInput!, update: TodoUpdateInput!): Todo!
  deleteTodo(where: TodoWhereUniqueInput!): Todo
  deleteManyTodoes(where: TodoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  todo(where: TodoWhereUniqueInput!): Todo
  todoes(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo]!
  todoesConnection(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TodoConnection!
  node(id: ID!): Node
}

type Subscription {
  todo(where: TodoSubscriptionWhereInput): TodoSubscriptionPayload
}

type Todo {
  id: ID!
  name: String!
  complete: Boolean!
}

type TodoConnection {
  pageInfo: PageInfo!
  edges: [TodoEdge]!
  aggregate: AggregateTodo!
}

input TodoCreateInput {
  name: String!
  complete: Boolean
}

type TodoEdge {
  node: Todo!
  cursor: String!
}

enum TodoOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  complete_ASC
  complete_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TodoPreviousValues {
  id: ID!
  name: String!
  complete: Boolean!
}

type TodoSubscriptionPayload {
  mutation: MutationType!
  node: Todo
  updatedFields: [String!]
  previousValues: TodoPreviousValues
}

input TodoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TodoWhereInput
  AND: [TodoSubscriptionWhereInput!]
  OR: [TodoSubscriptionWhereInput!]
  NOT: [TodoSubscriptionWhereInput!]
}

input TodoUpdateInput {
  name: String
  complete: Boolean
}

input TodoUpdateManyMutationInput {
  name: String
  complete: Boolean
}

input TodoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  complete: Boolean
  complete_not: Boolean
  AND: [TodoWhereInput!]
  OR: [TodoWhereInput!]
  NOT: [TodoWhereInput!]
}

input TodoWhereUniqueInput {
  id: ID
}
`