const NotesLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex-grow flex flex-col py-4">{children}</div>;
};

export default NotesLayout;
