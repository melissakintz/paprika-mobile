import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthPayLoad = {
  __typename?: 'AuthPayLoad';
  token: Scalars['String'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  taskId: Scalars['String'];
  userId: Scalars['String'];
};

export type CommentInput = {
  content: Scalars['String'];
  taskId: Scalars['String'];
};

export type Document = {
  __typename?: 'Document';
  fileName: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type DocumentInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDocument: Document;
  assignUsersToProject?: Maybe<Scalars['Boolean']>;
  createComment: Comment;
  createProject: Project;
  createProjectRole: ProjectRole;
  createTask: Task;
  deleteComment: Scalars['Boolean'];
  deleteDocument: Document;
  deleteProject?: Maybe<Scalars['Boolean']>;
  deleteTask?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  login: AuthPayLoad;
  register: AuthPayLoad;
  updateDocument: Document;
  updateProject: Project;
  updateTask: Task;
  updateUser: User;
};


export type MutationAddDocumentArgs = {
  DocumentInput: DocumentInput;
};


export type MutationAssignUsersToProjectArgs = {
  projectId: Scalars['String'];
  usersRoles?: InputMaybe<Array<InputMaybe<UsersRoles>>>;
};


export type MutationCreateCommentArgs = {
  commentInput: CommentInput;
};


export type MutationCreateProjectArgs = {
  participantsInput?: InputMaybe<Array<InputMaybe<ParticipantsInput>>>;
  projectInput: ProjectInput;
};


export type MutationCreateProjectRoleArgs = {
  roleName: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  taskInput: TaskInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeleteDocumentArgs = {
  docId: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationLoginArgs = {
  userLoginInput: UserLoginInput;
};


export type MutationRegisterArgs = {
  userCreateInput: UserCreateInput;
};


export type MutationUpdateDocumentArgs = {
  docId: Scalars['String'];
  newName: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  participantsInput?: InputMaybe<Array<InputMaybe<ParticipantsInput>>>;
  projectId: Scalars['String'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type ParticipantsInput = {
  projectRoleId: Scalars['String'];
  userId: Scalars['String'];
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type Project = {
  __typename?: 'Project';
  client: Scalars['String'];
  deleted: Scalars['Boolean'];
  description: Scalars['String'];
  endAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  participants?: Maybe<Array<Maybe<UserProject>>>;
  startAt?: Maybe<Scalars['Date']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
};

export type ProjectInput = {
  client: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type ProjectRole = {
  __typename?: 'ProjectRole';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllDocumentsByProject?: Maybe<Array<Maybe<Document>>>;
  getAllProjects: Array<Project>;
  getAllTasks: Array<Task>;
  getAllUsers: Array<User>;
  getCommentsByTask: Array<Comment>;
  getDocumentById?: Maybe<Document>;
  getProjectById: Project;
  getProjectRoles: Array<Maybe<ProjectRole>>;
  getProjectsByUser: Array<Maybe<Project>>;
  getTask: Task;
  getTaskByProject: Array<Maybe<Task>>;
  getUser: User;
};


export type QueryGetAllDocumentsByProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryGetCommentsByTaskArgs = {
  taskId: Scalars['String'];
};


export type QueryGetDocumentByIdArgs = {
  docId: Scalars['String'];
};


export type QueryGetProjectByIdArgs = {
  projectId: Scalars['String'];
};


export type QueryGetTaskArgs = {
  taskId: Scalars['String'];
};


export type QueryGetTaskByProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};

export enum RoleSite {
  Admin = 'ADMIN',
  Po = 'PO',
  User = 'USER'
}

export enum Status {
  Done = 'DONE',
  Inprogress = 'INPROGRESS',
  Open = 'OPEN'
}

export type Task = {
  __typename?: 'Task';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  priority: Priority;
  projectId: Scalars['String'];
  status: Status;
  timing?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type TaskInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
  users: Array<Scalars['String']>;
};

export type UpdateProjectInput = {
  client?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  endAt?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  startAt?: InputMaybe<Scalars['Date']>;
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Priority>;
  projectId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  taskId: Scalars['String'];
  timing?: InputMaybe<Scalars['String']>;
  users: Array<Scalars['String']>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleSite>;
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: RoleSite;
};

export type UserCreateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<RoleSite>;
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserProject = {
  __typename?: 'UserProject';
  projectRole?: Maybe<ProjectRole>;
  user?: Maybe<User>;
};

export type UsersRoles = {
  roleId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateProjectMutationVariables = Exact<{
  projectInput: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string, client: string, description: string } };

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars['String'];
  updateProjectInput: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, name: string, client: string, description: string } };

export type LoginMutationVariables = Exact<{
  userLoginInput: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayLoad', token: string, user: { __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role: RoleSite } } };

export type CreateTaskMutationVariables = Exact<{
  taskInput: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, name: string, description: string, status: Status, priority: Priority, projectId: string, timing?: string | null | undefined, users?: Array<{ __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role: RoleSite } | null | undefined> | null | undefined } };

export type UpdateTaskMutationVariables = Exact<{
  updateTaskInput: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string, name: string, description: string, status: Status, priority: Priority, projectId: string, timing?: string | null | undefined, users?: Array<{ __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role: RoleSite } | null | undefined> | null | undefined } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role: RoleSite, password: string }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role: RoleSite } };

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTasksQuery = { __typename?: 'Query', getAllTasks: Array<{ __typename?: 'Task', id: string, name: string, description: string, status: Status, priority: Priority, projectId: string, timing?: string | null | undefined, users?: Array<{ __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role: RoleSite } | null | undefined> | null | undefined }> };

export type GetTaskQueryVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type GetTaskQuery = { __typename?: 'Query', getTask: { __typename?: 'Task', id: string, name: string, status: Status, description: string, priority: Priority, projectId: string, timing?: string | null | undefined, users?: Array<{ __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role: RoleSite } | null | undefined> | null | undefined } };

export type GetTaskByProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetTaskByProjectQuery = { __typename?: 'Query', getTaskByProject: Array<{ __typename?: 'Task', id: string, name: string, status: Status, description: string, priority: Priority, projectId: string, timing?: string | null | undefined, users?: Array<{ __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role: RoleSite } | null | undefined> | null | undefined } | null | undefined> };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', id: string, startAt?: any | null | undefined, endAt?: any | null | undefined, name: string, client: string, description: string }> };

export type GetProjectByIdQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProjectById: { __typename?: 'Project', id: string, startAt?: any | null | undefined, endAt?: any | null | undefined, name: string, client: string, description: string } };

export type GetCommentsTaskQueryVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type GetCommentsTaskQuery = { __typename?: 'Query', getCommentsByTask: Array<{ __typename?: 'Comment', id: string, content: string, userId: string, createdAt: any, taskId: string }> };

export type GetProjectsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsByUserQuery = { __typename?: 'Query', getProjectsByUser: Array<{ __typename?: 'Project', id: string, startAt?: any | null | undefined, endAt?: any | null | undefined, name: string, client: string, description: string } | null | undefined> };


export const CreateProjectDocument = gql`
    mutation createProject($projectInput: ProjectInput!) {
  createProject(projectInput: $projectInput) {
    id
    name
    client
    description
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($projectId: String!, $updateProjectInput: UpdateProjectInput!) {
  updateProject(projectId: $projectId, updateProjectInput: $updateProjectInput) {
    id
    name
    client
    description
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      updateProjectInput: // value for 'updateProjectInput'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const LoginDocument = gql`
    mutation login($userLoginInput: UserLoginInput!) {
  login(userLoginInput: $userLoginInput) {
    token
    user {
      id
      email
      lastName
      firstName
      role
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userLoginInput: // value for 'userLoginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($taskInput: TaskInput!) {
  createTask(taskInput: $taskInput) {
    id
    name
    description
    status
    priority
    projectId
    timing
    users {
      id
      email
      lastName
      firstName
      role
    }
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      taskInput: // value for 'taskInput'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($updateTaskInput: UpdateTaskInput!) {
  updateTask(updateTaskInput: $updateTaskInput) {
    id
    name
    description
    status
    priority
    projectId
    timing
    users {
      id
      email
      lastName
      firstName
      role
    }
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      updateTaskInput: // value for 'updateTaskInput'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    id
    email
    lastName
    firstName
    role
    password
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserDocument = gql`
    query getUser($userId: String!) {
  getUser(userId: $userId) {
    id
    email
    lastName
    firstName
    role
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetAllTasksDocument = gql`
    query GetAllTasks {
  getAllTasks {
    id
    name
    description
    status
    priority
    projectId
    timing
    users {
      id
      email
      lastName
      firstName
      role
    }
  }
}
    `;

/**
 * __useGetAllTasksQuery__
 *
 * To run a query within a React component, call `useGetAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
      }
export function useGetAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
        }
export type GetAllTasksQueryHookResult = ReturnType<typeof useGetAllTasksQuery>;
export type GetAllTasksLazyQueryHookResult = ReturnType<typeof useGetAllTasksLazyQuery>;
export type GetAllTasksQueryResult = Apollo.QueryResult<GetAllTasksQuery, GetAllTasksQueryVariables>;
export const GetTaskDocument = gql`
    query GetTask($taskId: String!) {
  getTask(taskId: $taskId) {
    id
    name
    status
    description
    priority
    projectId
    timing
    users {
      id
      email
      lastName
      firstName
      role
    }
  }
}
    `;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export const GetTaskByProjectDocument = gql`
    query GetTaskByProject($projectId: String!) {
  getTaskByProject(projectId: $projectId) {
    id
    name
    status
    description
    priority
    projectId
    timing
    users {
      id
      email
      lastName
      firstName
      role
    }
  }
}
    `;

/**
 * __useGetTaskByProjectQuery__
 *
 * To run a query within a React component, call `useGetTaskByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskByProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetTaskByProjectQuery(baseOptions: Apollo.QueryHookOptions<GetTaskByProjectQuery, GetTaskByProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskByProjectQuery, GetTaskByProjectQueryVariables>(GetTaskByProjectDocument, options);
      }
export function useGetTaskByProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskByProjectQuery, GetTaskByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskByProjectQuery, GetTaskByProjectQueryVariables>(GetTaskByProjectDocument, options);
        }
export type GetTaskByProjectQueryHookResult = ReturnType<typeof useGetTaskByProjectQuery>;
export type GetTaskByProjectLazyQueryHookResult = ReturnType<typeof useGetTaskByProjectLazyQuery>;
export type GetTaskByProjectQueryResult = Apollo.QueryResult<GetTaskByProjectQuery, GetTaskByProjectQueryVariables>;
export const GetAllProjectsDocument = gql`
    query GetAllProjects {
  getAllProjects {
    id
    startAt
    endAt
    name
    client
    description
  }
}
    `;

/**
 * __useGetAllProjectsQuery__
 *
 * To run a query within a React component, call `useGetAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
      }
export function useGetAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
        }
export type GetAllProjectsQueryHookResult = ReturnType<typeof useGetAllProjectsQuery>;
export type GetAllProjectsLazyQueryHookResult = ReturnType<typeof useGetAllProjectsLazyQuery>;
export type GetAllProjectsQueryResult = Apollo.QueryResult<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($projectId: String!) {
  getProjectById(projectId: $projectId) {
    id
    startAt
    endAt
    name
    client
    description
  }
}
    `;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetCommentsTaskDocument = gql`
    query GetCommentsTask($taskId: String!) {
  getCommentsByTask(taskId: $taskId) {
    id
    content
    userId
    createdAt
    taskId
  }
}
    `;

/**
 * __useGetCommentsTaskQuery__
 *
 * To run a query within a React component, call `useGetCommentsTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetCommentsTaskQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsTaskQuery, GetCommentsTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsTaskQuery, GetCommentsTaskQueryVariables>(GetCommentsTaskDocument, options);
      }
export function useGetCommentsTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsTaskQuery, GetCommentsTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsTaskQuery, GetCommentsTaskQueryVariables>(GetCommentsTaskDocument, options);
        }
export type GetCommentsTaskQueryHookResult = ReturnType<typeof useGetCommentsTaskQuery>;
export type GetCommentsTaskLazyQueryHookResult = ReturnType<typeof useGetCommentsTaskLazyQuery>;
export type GetCommentsTaskQueryResult = Apollo.QueryResult<GetCommentsTaskQuery, GetCommentsTaskQueryVariables>;
export const GetProjectsByUserDocument = gql`
    query GetProjectsByUser {
  getProjectsByUser {
    id
    startAt
    endAt
    name
    client
    description
  }
}
    `;

/**
 * __useGetProjectsByUserQuery__
 *
 * To run a query within a React component, call `useGetProjectsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>(GetProjectsByUserDocument, options);
      }
export function useGetProjectsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>(GetProjectsByUserDocument, options);
        }
export type GetProjectsByUserQueryHookResult = ReturnType<typeof useGetProjectsByUserQuery>;
export type GetProjectsByUserLazyQueryHookResult = ReturnType<typeof useGetProjectsByUserLazyQuery>;
export type GetProjectsByUserQueryResult = Apollo.QueryResult<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>;