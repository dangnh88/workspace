import PDFUploader from './components/PDFUploader';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">PDF Processor</h1>
      <PDFUploader />
    </main>
  );
} 