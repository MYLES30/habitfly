import Link from "next/link";
import fs from "fs";

export default function PrivacyPolicyPage() {
  // Read the privacy policy markdown file
  const policy = fs.readFileSync(
    "./app/privacy.md",
    "utf8"
  );

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-slate">
        {/* Render markdown as HTML (for demo, just plain text) */}
        <pre>{policy}</pre>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 underline hover:text-blue-700">Back to Home</Link>
      </div>
    </div>
  );
}
