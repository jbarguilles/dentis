export interface DraftInfo {
  patientNumber: string | null;
  timestamp: string;
  draftKey: string;
  patientName?: string;
  currentSection?: number;
  isNewPatient: boolean;
}

/**
 * Get a list of all patient admission drafts stored in sessionStorage
 */
export const getDraftsList = (): DraftInfo[] => {
  if (typeof window === "undefined") return [];

  const drafts: DraftInfo[] = [];

  // Iterate through all sessionStorage keys
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith("patientAdmissionDraft_")) {
      try {
        const draftData = JSON.parse(sessionStorage.getItem(key) || "{}");

        // Extract patient name from form data if available
        const patientName = draftData.formData?.patientInformationData
          ? `${draftData.formData.patientInformationData.firstName || ""} ${draftData.formData.patientInformationData.lastName || ""}`.trim()
          : "Unknown Patient";

        drafts.push({
          patientNumber: draftData.patientNumber,
          timestamp: draftData.timestamp || new Date().toISOString(),
          draftKey: key,
          patientName: patientName || "Unnamed",
          currentSection: draftData.currentSection,
          isNewPatient: !draftData.patientNumber,
        });
      } catch (error) {
        console.warn(`Failed to parse draft data for key: ${key}`, error);
        // Optionally remove corrupted draft
        sessionStorage.removeItem(key);
      }
    }
  }

  // Sort by timestamp (newest first)
  return drafts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

/**
 * Remove a specific draft by its key
 */
export const removeDraft = (draftKey: string): boolean => {
  if (typeof window === "undefined") return false;

  try {
    sessionStorage.removeItem(draftKey);

    // If it's a new patient draft, also remove the draft ID
    if (draftKey.includes("new_")) {
      sessionStorage.removeItem("newPatientDraftId");
    }

    return true;
  } catch (error) {
    console.error("Failed to remove draft:", error);
    return false;
  }
};

/**
 * Remove all patient admission drafts
 */
export const clearAllDrafts = (): number => {
  if (typeof window === "undefined") return 0;

  let removedCount = 0;
  const keysToRemove: string[] = [];

  // Collect all draft keys
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith("patientAdmissionDraft_")) {
      keysToRemove.push(key);
    }
  }

  // Remove all draft keys
  keysToRemove.forEach((key) => {
    try {
      sessionStorage.removeItem(key);
      removedCount++;
    } catch (error) {
      console.warn(`Failed to remove draft key: ${key}`, error);
    }
  });

  // Also clear new patient draft ID
  sessionStorage.removeItem("newPatientDraftId");

  return removedCount;
};

/**
 * Get the size of all draft data in bytes (approximate)
 */
export const getDraftsStorageSize = (): number => {
  if (typeof window === "undefined") return 0;

  let totalSize = 0;

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith("patientAdmissionDraft_")) {
      const value = sessionStorage.getItem(key) || "";
      // Approximate size calculation (key + value in UTF-16)
      totalSize += (key.length + value.length) * 2;
    }
  }

  return totalSize;
};

/**
 * Check if a draft exists for a specific patient
 */
export const hasDraftForPatient = (patientNumber: string | null): boolean => {
  if (typeof window === "undefined") return false;

  const draftKey = patientNumber
    ? `patientAdmissionDraft_${patientNumber}`
    : `patientAdmissionDraft_${sessionStorage.getItem("newPatientDraftId") || "new_unknown"}`;

  return sessionStorage.getItem(draftKey) !== null;
};

/**
 * Get formatted time since draft was created
 */
export const getTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const draftTime = new Date(timestamp);
  const diffMs = now.getTime() - draftTime.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
};

/**
 * Get section name by index
 */
export const getSectionName = (sectionIndex: number): string => {
  const sections = [
    "Patient Information",
    "Patient Interview",
    "Physical Assessment",
    "Soft Tissue Examination",
    "Dental Charts",
    "Radiographic Examination",
    "Problem List",
  ];

  return sections[sectionIndex] || "Unknown Section";
};
