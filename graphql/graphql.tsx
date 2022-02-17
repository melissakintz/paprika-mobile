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

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createProject: Project;
  createTask: Task;
  deleteComment: Scalars['Boolean'];
  deleteProject?: Maybe<Scalars['Boolean']>;
  deleteTask?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  login: LoginResponse;
  register: User;
  updateProject: Project;
  updateTask: Task;
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  commentInput: CommentInput;
};


export type MutationCreateProjectArgs = {
  projectInput: ProjectInput;
};


export type MutationCreateTaskArgs = {
  taskInput: TaskInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
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
  loginUserInput: LoginUserInput;
};


export type MutationRegisterArgs = {
  userInput: UserInput;
};


export type MutationUpdateProjectArgs = {
  projectId: Scalars['String'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type Project = {
  __typename?: 'Project';
  client: Scalars['String'];
  description: Scalars['String'];
  endAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  startAt?: Maybe<Scalars['Date']>;
};

export type ProjectInput = {
  client: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllProjects: Array<Project>;
  getAllTasks: Array<Task>;
  getAllUsers: Array<User>;
  getCommentsByTask: Array<Comment>;
  getProject: Project;
  getTask: Task;
  getUser: User;
};


export type QueryGetCommentsByTaskArgs = {
  taskId: Scalars['String'];
};


export type QueryGetProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryGetTaskArgs = {
  taskId: Scalars['String'];
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
};

export type TaskInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
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
  role?: Maybe<RoleSite>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role?: RoleSite | null | undefined }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, email: string, lastName: string, firstName: string, role?: RoleSite | null | undefined } };

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTasksQuery = { __typename?: 'Query', getAllTasks: Array<{ __typename?: 'Task', id: string, name: string, description: string, status: Status, priority: Priority, projectId: string, timing?: string | null | undefined }> };

export type GetTasksQueryVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type GetTasksQuery = { __typename?: 'Query', getTask: { __typename?: 'Task', id: string, name: string, status: Status, description: string, priority: Priority, projectId: string, timing?: string | null | undefined } };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', id: string, startAt?: any | null | undefined, endAt?: any | null | undefined, name: string, client: string, description: string }> };

export type GetProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetProjectQuery = { __typename?: 'Query', getProject: { __typename?: 'Project', id: string, startAt?: any | null | undefined, endAt?: any | null | undefined, name: string, client: string, description: string } };

export type GetCommentsTaskQueryVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type GetCommentsTaskQuery = { __typename?: 'Query', getCommentsByTask: Array<{ __typename?: 'Comment', id: string, content: string, userId: string, createdAt: any, taskId: string }> };


export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    id
    email
    lastName
    firstName
    role
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
export const GetTasksDocument = gql`
    query GetTasks($taskId: String!) {
  getTask(taskId: $taskId) {
    id
    name
    status
    description
    priority
    projectId
    timing
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
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
export const GetProjectDocument = gql`
    query GetProject($projectId: String!) {
  getProject(projectId: $projectId) {
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
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
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