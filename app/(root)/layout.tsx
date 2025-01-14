import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedin = { firstName: "Adrian", lastName: "JSM" };

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedin} />
      {children}
    </main>
  );
}
