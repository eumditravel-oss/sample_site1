import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

export type ConsultationDraft = {
  applicantName: string;
  phone: string;
  location: string;
  title: string;
  workType: string;
  schedule: string;
  message: string;
  agreed: boolean;
};

const initialDraft: ConsultationDraft = {
  applicantName: "",
  phone: "",
  location: "",
  title: "",
  workType: "",
  schedule: "",
  message: "",
  agreed: false,
};

const ConsultationDraftContext = createContext<{
  draft: ConsultationDraft;
  setDraft: Dispatch<SetStateAction<ConsultationDraft>>;
} | null>(null);

export function ConsultationDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ConsultationDraft>(initialDraft);
  return <ConsultationDraftContext.Provider value={{ draft, setDraft }}>{children}</ConsultationDraftContext.Provider>;
}

export function useConsultationDraft() {
  const context = useContext(ConsultationDraftContext);
  if (!context) throw new Error("useConsultationDraft must be used inside ConsultationDraftProvider");
  return context;
}
