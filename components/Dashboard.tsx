import React, { useState, useCallback, useEffect } from 'react';
import GeneratorForm from './GeneratorForm';
import ModuleDisplay from './ModuleDisplay';
import Header from './Header';
import Footer from './Footer';
import ModuleHistory from './ModuleHistory';
import { type FormState, type User, type Module } from '../types';
import { generateModuleContent } from '../services/geminiService';
import { getModules, saveModule } from '../services/apiService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [generatedModule, setGeneratedModule] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null); // State baru untuk error API

  const [savedModules, setSavedModules] = useState<Module[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const fetchModules = useCallback(async () => {
    setApiError(null);
    setIsHistoryLoading(true);
    try {
      const response = await getModules(user.username);
      if (response.success && response.modules) {
        const sortedModules = response.modules.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setSavedModules(sortedModules);
      } else {
        setApiError(`Gagal memuat riwayat: ${response.message || 'Error tidak diketahui'}`);
      }
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Gagal terhubung ke server riwayat.');
    } finally {
      setIsHistoryLoading(false);
    }
  }, [user.username]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);
  

  const handleGenerate = useCallback(async (formData: FormState) => {
    setIsLoading(true);
    setError(null);
    setGeneratedModule('');
    try {
      const content = await generateModuleContent(formData);
      setGeneratedModule(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak dikenal.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSave = useCallback(async (title: string, content: string) => {
    setApiError(null);
    setIsSaving(true);
    try {
        const response = await saveModule(user.username, title, content);
        if (response.success && response.newModule) {
            setSavedModules(prev => [response.newModule, ...prev]);
        } else {
            setApiError(`Gagal menyimpan: ${response.message || 'Error tidak diketahui'}`);
        }
    } catch (err) {
        setApiError(`Gagal menyimpan: ${err instanceof Error ? err.message : 'Error tidak dikenal'}`);
    } finally {
        setIsSaving(false);
    }
}, [user.username]);

  const handleSelectModule = (content: string) => {
    setGeneratedModule(content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header user={user} onLogout={onLogout} />
      <main className="p-4 sm:p-6 lg:p-8 flex-grow">
        <div className="container mx-auto max-w-7xl">
          {apiError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{apiError}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setApiError(null)}>
                      <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
              </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-8 space-y-6">
                <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
                <ModuleHistory 
                  modules={savedModules}
                  onSelect={handleSelectModule}
                  isLoading={isHistoryLoading}
                />
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              <ModuleDisplay
                content={generatedModule}
                isLoading={isLoading}
                error={error}
                onSave={handleSave}
                isSaving={isSaving}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;