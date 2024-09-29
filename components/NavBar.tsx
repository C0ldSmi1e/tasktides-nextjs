import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-2 rounded-md border-black">
      <Link href="/">
        <h1 className="text-2xl font-bold">Tasktides</h1>
      </Link>
      <div className="flex gap-4">
        <Link href="/checklists">Checklists</Link>
      </div>
    </div>
  );
};

export default NavBar;
