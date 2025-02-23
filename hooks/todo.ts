import { Todo } from "@/db/schema";
import { useQuery, useRealm } from "@realm/react";
import { Realm } from "realm";
import { useCallback } from "react";

const useTodoActions = (type: "simple" | "large") => {
  const realm = useRealm();

  const addTodo = useCallback(
    (props: { title: string }) => {
      if (props.title) {
        realm.write(() => {
          realm.create(Todo, { title: props.title, type });
        });
      }
    },
    [realm]
  );

  const markComplete = useCallback(
    (id: string) => {
      realm.write(() => {
        const todo = realm.objectForPrimaryKey(
          Todo,
          new Realm.BSON.ObjectId(id)
        );
        if (todo) {
          todo.isComplete = !todo.isComplete;
        }
      });
    },
    [realm]
  );

  const removeTodo = useCallback(
    (id: string) => {
      realm.write(() => {
        const todo = realm.objectForPrimaryKey(
          Todo,
          new Realm.BSON.ObjectId(id)
        );
        realm.delete(todo);
      });
    },
    [realm]
  );

  return { addTodo, removeTodo, markComplete };
};

export interface TodoQueryOptions {
  sort?: "asc" | "desc";
  search?: string;
}

const useTodo = (type: "simple" | "large", options?: TodoQueryOptions) => {
  const sort = options?.sort !== "asc";
  const search = options?.search || "";

  return useQuery(
    {
      type: Todo,
      query: (collection) => {
        return collection
          .filtered("type == $0 AND title CONTAINS[c] $1", type, search)
          .sorted("createdAt", sort);
      },
    },
    [type, sort, search]
  );
};

export const useSimpleTodo = (options?: TodoQueryOptions) =>
  useTodo("simple", options);
export const useSimpleTodoActions = () => useTodoActions("simple");

export const useLargeTodoActions = () => useTodoActions("large");
export const useLargeTodo = (options?: TodoQueryOptions) =>
  useTodo("large", options);
