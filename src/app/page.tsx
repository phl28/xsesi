import JournalEntries from "./components/JournalEntries";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Xsesi Academic Journal
            </h1>
            <p className="text-gray-600">
              Browse and read our published academic papers
            </p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <JournalEntries />
      </main>
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Xsesi Academic Journal. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
