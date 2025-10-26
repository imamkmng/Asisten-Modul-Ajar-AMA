import React, { useState } from 'react';
import { type FormState } from '../types';
import { GenerateIcon } from './icons';

interface GeneratorFormProps {
  onGenerate: (formData: FormState) => void;
  isLoading: boolean;
}

// Helper komponen didefinisikan di luar komponen utama untuk mencegah re-render yang tidak perlu
const InputField = ({ id, label, value, onChange, ...props }: { id: string; label: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement>; [key: string]: any }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-150"
        required
        {...props}
      />
    </div>
  );

const TextAreaField = ({ id, label, value, onChange, ...props }: { id: string; label: string; value: string; onChange: React.ChangeEventHandler<HTMLTextAreaElement>; [key: string]: any }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-150"
        rows={3}
        {...props}
      />
    </div>
  );


const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<FormState>({
    educationalUnit: 'SMA Negeri 1 Contoh',
    subjectTeacher: 'Andi Wijaya, S.Pd.',
    level: 'SMA',
    subject: 'Ilmu Pengetahuan Alam',
    gradePhase: '10 / E',
    material: 'Ekosistem dan Interaksinya',
    capaianPembelajaran: '',
    tujuanPembelajaran: '',
    timeAllocation: '3 x 45 Menit',
    learningModel: 'Problem Based Learning',
    learningMode: 'Tatap Muka (Luring)',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Detail Pembelajaran</h2>
        
        <InputField id="educationalUnit" label="Satuan Pendidikan" value={formData.educationalUnit} onChange={handleChange} placeholder="Contoh: SMA Negeri 1" />
        <InputField id="subjectTeacher" label="Guru Mata Pelajaran" value={formData.subjectTeacher} onChange={handleChange} placeholder="Contoh: Budi, S.Pd." />
        <InputField id="level" label="Jenjang" value={formData.level} onChange={handleChange} placeholder="Contoh: SMA / SMK" />
        <InputField id="subject" label="Mata Pelajaran" value={formData.subject} onChange={handleChange} placeholder="Contoh: Matematika" />
        <InputField id="gradePhase" label="Kelas / Fase" value={formData.gradePhase} onChange={handleChange} placeholder="Contoh: 10 / E" />
        <InputField id="material" label="Materi" value={formData.material} onChange={handleChange} placeholder="Contoh: Aljabar Linear" />
        
        <TextAreaField 
            id="capaianPembelajaran" 
            label="Capaian Pembelajaran (Opsional)" 
            value={formData.capaianPembelajaran} 
            onChange={handleChange}
            placeholder="Jika diisi, Generator akan menggunakan ini. Jika kosong, Generator akan membuatnya." 
        />
        <TextAreaField 
            id="tujuanPembelajaran" 
            label="Tujuan Pembelajaran (Opsional)" 
            value={formData.tujuanPembelajaran} 
            onChange={handleChange}
            placeholder="Jika diisi, Generator akan menggunakan ini. Jika kosong, Generator akan membuatnya." 
        />

        <InputField id="timeAllocation" label="Alokasi Waktu" value={formData.timeAllocation} onChange={handleChange} placeholder="Contoh: 2 x 45 Menit" />
        <InputField id="learningModel" label="Model Pembelajaran" value={formData.learningModel} onChange={handleChange} placeholder="Contoh: Project Based Learning" />
        <InputField id="learningMode" label="Moda Pembelajaran" value={formData.learningMode} onChange={handleChange} placeholder="Contoh: Daring / Luring" />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            'Memproses...'
          ) : (
            <>
              <GenerateIcon />
              Buat Modul Ajar
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GeneratorForm;