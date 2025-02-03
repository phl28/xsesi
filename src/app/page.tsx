"use client";

import JournalEntries from "@/components/organisms/JournalEntries";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b flex-none">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Xsesi&apos;s Academic Journal
              </h1>
              <div className="flex gap-2">
                <a
                  href={process.env.NEXT_PUBLIC_XSESI_LINKEDIN_URL}
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#0A66C2"
                    stroke="currentColor"
                    strokeWidth={0}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_XSESI_EMAIL_ADDRESS}`}
                >
                  <Mail size={20} strokeWidth={2} color="#0d0d0d" />
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Browse and read xsesi&apos;s published academic papers
            </p>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <JournalEntries />
      </main>

      <footer className="bg-white border-t flex-none">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            © {year} Xsesi&apos;s Academic Journal
          </p>
        </div>
      </footer>
    </div>
  );
}
