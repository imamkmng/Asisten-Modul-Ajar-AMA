// This component uses react-markdown.
// Please install it: npm install react-markdown
import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from './LoadingSpinner';
import { DocIcon, SaveIcon } from './icons';

interface ModuleDisplayProps {
  content: string;
  isLoading: boolean;
  error: string | null;
  onSave: (title: string, content: string) => Promise<void>;
  isSaving: boolean;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({ content, isLoading, error, onSave, isSaving }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExportDOC = () => {
    const contentToExport = contentRef.current;
    if (!contentToExport) return;

    const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const postHtml = "</body></html>";
    const sourceHTML = preHtml + contentToExport.innerHTML + postHtml;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'modul-ajar.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const handleSaveClick = () => {
    // Ekstrak judul dari materi pokok untuk nama file riwayat
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const materialLine = lines.find(line => line.includes('> - **Materi Pokok:**'));
    let title = 'Modul Ajar Baru';
    if (materialLine) {
        title = materialLine.split(':')[1].trim();
    } else if (lines.length > 0) {
        // Fallback ke baris pertama jika tidak ditemukan
        title = lines[0].replace(/[^a-zA-Z0-9 ]/g, "").trim().substring(0, 50);
    }
    onSave(title, content);
  };
  
  const WelcomeMessage = () => (
    <div className="text-center p-8">
      <h2 className="text-xl font-semibold text-gray-700">Selamat Datang di Asisten Modul Ajar (AMA)</h2>
      <p className="mt-2 text-gray-500">
        Isi formulir di samping untuk memulai. Modul ajar yang Anda buat akan ditampilkan di sini.
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md relative min-h-[calc(100vh-10rem)]">
      {content && !isLoading && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 text-primary-700 text-sm font-semibold rounded-md shadow-sm hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-colors disabled:bg-gray-200 disabled:text-gray-500"
          >
            {isSaving ? <LoadingSpinner/> : <SaveIcon />}
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Modul'}</span>
          </button>
          <button
            onClick={handleExportDOC}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-primary-300 text-primary-700 text-sm font-semibold rounded-md shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-colors"
          >
            <DocIcon />
            <span>Ekspor DOC</span>
          </button>
        </div>
      )}

      <div className="p-6 sm:p-8 flex justify-center">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Generator sedang merancang modul ajar Anda...</p>
            <p className="mt-2 text-sm text-gray-500">Jika modul ajar yang dihasilkan tidak sesuai, silakan generate ulang.</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-red-600 font-semibold">Terjadi Kesalahan</p>
              <p className="mt-2 text-gray-500 max-w-md">{error}</p>
            </div>
          </div>
        )}
        {!isLoading && !error && !content && <WelcomeMessage />}
        {content && (
          <div ref={contentRef} className="w-full pt-12">
            <article className="prose prose-lg prose-p:leading-relaxed prose-headings:text-primary-700 prose-h2:border-b prose-h2:pb-2 prose-h2:border-gray-200 prose-a:text-primary-600 prose-blockquote:my-4 prose-blockquote:bg-primary-50 prose-blockquote:border-l-4 prose-blockquote:border-primary-200 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:not-italic prose-blockquote:rounded-r-lg">
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDisplay;