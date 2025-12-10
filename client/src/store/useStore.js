import { create } from 'zustand';

const useStore = create((set) => ({
  // User Data
  userData: {
    personalInfo: {
      name: '',
      tagline: '',
      about: '',
      email: '',
      location: '',
    },
    skills: [],
    projects: [],
    socials: {
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
    },
    theme: 'modern', // elegant, modern, bold
    color: '#3b82f6',
  },

  // Generated Assets
  generatedLogo: null,
  generatedPortfolio: null,
  
  // UI State
  currentStep: 0,
  isGenerating: false,
  
  // Actions
  setUserData: (data) => set((state) => ({ 
    userData: { ...state.userData, ...data } 
  })),
  
  updatePersonalInfo: (info) => set((state) => ({
    userData: { 
      ...state.userData, 
      personalInfo: { ...state.userData.personalInfo, ...info } 
    }
  })),

  addSkill: (skill) => set((state) => ({
    userData: { ...state.userData, skills: [...state.userData.skills, skill] }
  })),

  removeSkill: (index) => set((state) => ({
    userData: { 
      ...state.userData, 
      skills: state.userData.skills.filter((_, i) => i !== index) 
    }
  })),

  addProject: (project) => set((state) => ({
    userData: { ...state.userData, projects: [...state.userData.projects, project] }
  })),

  setTheme: (theme) => set((state) => ({
    userData: { ...state.userData, theme }
  })),

  setGeneratedLogo: (logo) => set({ generatedLogo: logo }),
  setGeneratedPortfolio: (data) => set({ generatedPortfolio: data }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setCurrentStep: (step) => set({ currentStep: step }),
}));

export default useStore;
