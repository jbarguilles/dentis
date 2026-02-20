const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ChartData {
  patientNumber: string;
  treatmentPlans: string;
  lesionStatuses: string;
  icdasCodes: string;
  // Drawing data as base64 strings
  teeth11?: string;
  teeth12?: string;
  teeth13?: string;
  teeth14?: string;
  teeth15?: string;
  teeth16?: string;
  teeth17?: string;
  teeth18?: string;
  teeth21?: string;
  teeth22?: string;
  teeth23?: string;
  teeth24?: string;
  teeth25?: string;
  teeth26?: string;
  teeth27?: string;
  teeth28?: string;
  teeth31?: string;
  teeth32?: string;
  teeth33?: string;
  teeth34?: string;
  teeth35?: string;
  teeth36?: string;
  teeth37?: string;
  teeth38?: string;
  teeth41?: string;
  teeth42?: string;
  teeth43?: string;
  teeth44?: string;
  teeth45?: string;
  teeth46?: string;
  teeth47?: string;
  teeth48?: string;
  EC11?: string;
  EC12?: string;
  EC13?: string;
  EC14?: string;
  EC15?: string;
  EC16?: string;
  EC17?: string;
  EC18?: string;
  EC21?: string;
  EC22?: string;
  EC23?: string;
  EC24?: string;
  EC25?: string;
  EC26?: string;
  EC27?: string;
  EC28?: string;
  EC31?: string;
  EC32?: string;
  EC33?: string;
  EC34?: string;
  EC35?: string;
  EC36?: string;
  EC37?: string;
  EC38?: string;
  EC41?: string;
  EC42?: string;
  EC43?: string;
  EC44?: string;
  EC45?: string;
  EC46?: string;
  EC47?: string;
  EC48?: string;
}

export interface Chart {
  chartID: number;
  patientID: number;
  treatmentPlans: string;
  lesionStatuses: string;
  icdasCodes: string;
  // File paths for images
  teeth11Path?: string;
  teeth12Path?: string;
  teeth13Path?: string;
  teeth14Path?: string;
  teeth15Path?: string;
  teeth16Path?: string;
  teeth17Path?: string;
  teeth18Path?: string;
  teeth21Path?: string;
  teeth22Path?: string;
  teeth23Path?: string;
  teeth24Path?: string;
  teeth25Path?: string;
  teeth26Path?: string;
  teeth27Path?: string;
  teeth28Path?: string;
  teeth31Path?: string;
  teeth32Path?: string;
  teeth33Path?: string;
  teeth34Path?: string;
  teeth35Path?: string;
  teeth36Path?: string;
  teeth37Path?: string;
  teeth38Path?: string;
  teeth41Path?: string;
  teeth42Path?: string;
  teeth43Path?: string;
  teeth44Path?: string;
  teeth45Path?: string;
  teeth46Path?: string;
  teeth47Path?: string;
  teeth48Path?: string;
  EC11Path?: string;
  EC12Path?: string;
  EC13Path?: string;
  EC14Path?: string;
  EC15Path?: string;
  EC16Path?: string;
  EC17Path?: string;
  EC18Path?: string;
  EC21Path?: string;
  EC22Path?: string;
  EC23Path?: string;
  EC24Path?: string;
  EC25Path?: string;
  EC26Path?: string;
  EC27Path?: string;
  EC28Path?: string;
  EC31Path?: string;
  EC32Path?: string;
  EC33Path?: string;
  EC34Path?: string;
  EC35Path?: string;
  EC36Path?: string;
  EC37Path?: string;
  EC38Path?: string;
  EC41Path?: string;
  EC42Path?: string;
  EC43Path?: string;
  EC44Path?: string;
  EC45Path?: string;
  EC46Path?: string;
  EC47Path?: string;
  EC48Path?: string;
}

// Convert base64 data URL to byte array
const dataURLToByteArray = (dataURL: string): number[] => {
  const base64 = dataURL.split(",")[1];
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return Array.from(bytes);
};

// Convert ChartData to the format expected by the backend
const prepareChartData = (data: ChartData) => {
  const chartDTO: any = {
    patientNumber: data.patientNumber,
    treatmentPlans: data.treatmentPlans,
    lesionStatuses: data.lesionStatuses,
    icdasCodes: data.icdasCodes,
  };

  // Convert drawing data from base64 to byte arrays
  const drawingFields = [
    "teeth11",
    "teeth12",
    "teeth13",
    "teeth14",
    "teeth15",
    "teeth16",
    "teeth17",
    "teeth18",
    "teeth21",
    "teeth22",
    "teeth23",
    "teeth24",
    "teeth25",
    "teeth26",
    "teeth27",
    "teeth28",
    "teeth31",
    "teeth32",
    "teeth33",
    "teeth34",
    "teeth35",
    "teeth36",
    "teeth37",
    "teeth38",
    "teeth41",
    "teeth42",
    "teeth43",
    "teeth44",
    "teeth45",
    "teeth46",
    "teeth47",
    "teeth48",
    "EC11",
    "EC12",
    "EC13",
    "EC14",
    "EC15",
    "EC16",
    "EC17",
    "EC18",
    "EC21",
    "EC22",
    "EC23",
    "EC24",
    "EC25",
    "EC26",
    "EC27",
    "EC28",
    "EC31",
    "EC32",
    "EC33",
    "EC34",
    "EC35",
    "EC36",
    "EC37",
    "EC38",
    "EC41",
    "EC42",
    "EC43",
    "EC44",
    "EC45",
    "EC46",
    "EC47",
    "EC48",
  ];

  drawingFields.forEach((field) => {
    const drawingData = data[field as keyof ChartData];
    if (drawingData && typeof drawingData === "string") {
      chartDTO[field] = dataURLToByteArray(drawingData);
    }
  });

  return chartDTO;
};

// Save a dental chart
export const saveChart = async (chartData: ChartData): Promise<Chart> => {
  try {
    const preparedData = prepareChartData(chartData);

    const response = await fetch(`${API_URL}/chart/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving chart:", error);
    throw new Error("Failed to save chart");
  }
};

// Get chart by ID
export const getChartById = async (chartId: number): Promise<Chart> => {
  try {
    const response = await fetch(`${API_URL}/chart/findbyid?chartid=${chartId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching chart:", error);
    throw new Error("Failed to fetch chart");
  }
};

// Get chart by patient ID
export const getChartByPatientId = async (patientId: number): Promise<Chart> => {
  try {
    const response = await fetch(`${API_URL}/chart/findbypatient?patientid=${patientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching chart by patient ID:", error);
    throw new Error("Failed to fetch chart by patient ID");
  }
};

// Get image URL for display
export const getChartImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";
  return `${API_URL}/uploads/${imagePath}`;
};

// Update chart
export const updateChart = async (chartData: ChartData): Promise<Chart> => {
  try {
    const preparedData = prepareChartData(chartData);

    const response = await fetch(`${API_URL}/chart/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating chart:", error);
    throw new Error("Failed to update chart");
  }
};
