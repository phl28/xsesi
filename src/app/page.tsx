import JournalEntries from "./components/JournalEntries";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b flex-none">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">
              Xsesi&apos;s Academic Journal
            </h1>
            <p className="text-sm text-gray-600">
              Browse and read xsesi&apos;s published academic papers
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="h-full">
          <JournalEntries />
        </div>
      </main>

      <footer className="bg-white border-t flex-none">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Xsesi&apos;s Academic Journal
          </p>
        </div>
      </footer>
    </div>
  );
}
