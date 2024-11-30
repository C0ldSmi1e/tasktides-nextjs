import useSWR, { mutate } from "swr";
import { StandardResponse } from "@/types/StandardResponse";
import { Note } from "@/app/notes/types/note";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: StandardResponse<Note[]> = await res.json();
  if (!data.success) {
    throw new Error(data.error || "An error occurred");
  }
  return data.data;
};

const mockNotes: Note[] = [
  { id: "1", title: "Note 1", content: "Content 1", isImportant: true },
  { id: "2", title: "Note 2", content: "Content 2", isImportant: false },
];

const useNotes = () => {
  const {
    data: notes,
    isLoading,
    error,
  } = useSWR("api/notes", fetcher);

  const addNote = async ({
    title,
    content,
    isImportant,
  }: {
    title: string;
    content: string;
    isImportant: boolean;
  }) => {
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ title, content, isImportant }),
      });

      const data: StandardResponse<Note> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }
      await mutate("api/notes");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (id: string, note: Note) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(note),
      });
      const data: StandardResponse<Note> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }
      await mutate("api/notes");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const data: StandardResponse<Note> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }
      await mutate("api/notes");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    notes,
    isLoading,
    isError: error,
    addNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
