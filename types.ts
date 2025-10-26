export interface FormState {
  educationalUnit: string;
  subjectTeacher: string;
  level: string; // Jenjang
  subject: string; // Mata Pelajaran
  gradePhase: string; // Kelas / Fase
  material: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string;
  timeAllocation: string;
  learningModel: string;
  learningMode: string; // Moda Pembelajaran
}

export interface User {
  username: string;
}

// FIX: Add the missing 'Module' interface.
export interface Module {
  id: string;
  title: string;
  content: string;
  createdAt: string | number | Date;
}