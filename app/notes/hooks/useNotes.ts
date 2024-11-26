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
    console.log(title, content, isImportant);
  };

  const updateNote = async (note: Note) => {
  };

  const deleteNote = async (id: string) => {
  };

  return {
    notes: mockNotes,
    isLoading: false,
    isError: false,
    addNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
