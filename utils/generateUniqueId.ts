import generateUniqueId from "generate-unique-id";

export const generateId = () => {
  return generateUniqueId({
    length: 10,
    useLetters: true,
    useNumbers: true,
  });
};