import { Button } from "@/components/Button";
import {
  TodoQueryOptions,
  useSimpleTodo,
  useSimpleTodoActions,
} from "@/hooks/todo";
import { useMemo, useRef, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function SimpleList() {
  const [sort, setSort] = useState<TodoQueryOptions["sort"]>("desc");
  const [search, setSearch] = useState<TodoQueryOptions["search"]>("");

  const todos = useSimpleTodo({ sort, search });

  const { addTodo, removeTodo, markComplete } = useSimpleTodoActions();

  const todoList = useMemo(() => {
    return (
      todos?.map((todo) => {
        return {
          id: todo._id.toString(),
          title: todo.title,
          isComplete: todo.isComplete,
          createdAt: todo.createdAt,
        };
      }) || []
    );
  }, [todos]);

  const inputRef = useRef("");
  const searchRef = useRef("");
  const inputTextRef = useRef<TextInput>(null);

  const toggleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ marginTop: 24, gap: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TextInput
            style={{
              borderWidth: 1,
              height: 54,
              width: 260,
              borderRadius: 16,
              paddingHorizontal: 16,
              fontSize: 22,
            }}
            ref={inputTextRef}
            placeholder="Enter a todo"
            onChangeText={(t) => (inputRef.current = t)}
          />
          <Button
            onPress={() => {
              addTodo({ title: inputRef.current });
              inputRef.current = "";
              inputTextRef.current?.clear();
            }}
            style={{ minWidth: 40 }}
          >
            Add
          </Button>
        </View>
      </View>

      <View style={{ marginTop: 12, gap: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TextInput
            style={{
              borderWidth: 1,
              height: 54,
              width: 220,
              borderRadius: 16,
              paddingHorizontal: 16,
              fontSize: 22,
            }}
            placeholder="Search"
            onChangeText={(t) => (searchRef.current = t)}
          />
          <Button
            onPress={() => {
              setSearch(searchRef.current);
            }}
            style={{ minWidth: 40, padding: 10 }}
          >
            <Icon name="magnify" size={30} />
          </Button>
          <Button onPress={toggleSort} style={{ minWidth: 40, padding: 10 }}>
            <Icon
              name={sort === "desc" ? "arrow-down" : "arrow-up"}
              size={30}
            />
          </Button>
        </View>
      </View>

      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              padding: 16,
              borderRadius: 16,
              borderWidth: 1,
              width: 340,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Pressable onPress={() => markComplete(item.id)}>
              <Icon
                name={item.isComplete ? "checkbox-outline" : "square-outline"}
                color="yellowgreen"
                size={24}
              />
            </Pressable>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                flex: 1,
                textDecorationLine: item.isComplete ? "line-through" : "none",
              }}
              numberOfLines={3}
            >
              {item.title}
            </Text>

            <Pressable onPress={() => removeTodo(item.id)}>
              <Icon name="delete-outline" color="red" size={24} />
            </Pressable>
          </View>
        )}
        contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
        style={{ marginVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
