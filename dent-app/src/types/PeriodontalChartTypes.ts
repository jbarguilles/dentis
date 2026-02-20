export interface PeriodontalChartTooth {
  toothId?: number;
  toothNumber: number;

  // PI (Plaque Index) - Boolean values displayed as +/-
  topPi?: boolean;
  bottomPi?: boolean;

  // BOP (Bleeding on Probing) - Integer values (can be positive, negative, or 0)
  topLeftBop?: number;
  topMidBop?: number;
  topRightBop?: number;
  botLeftBop?: number;
  botMidBop?: number;
  botRightBop?: number;

  // MOB (Mobility) - Integer value
  mob?: number;

  // SUP (Suppuration) - Boolean value displayed as +/-
  sup?: boolean;

  // CAL (Clinical Attachment Level) - Integer values
  topLeftCal?: number;
  topMidCal?: number;
  topRightCal?: number;
  botLeftCal?: number;
  botMidCal?: number;
  botRightCal?: number;

  // PPD (Probing Pocket Depth) - Integer values
  ppdLeft?: number;
  ppdMid?: number;
  ppdRight?: number;

  // CEJGM (Cemento-Enamel Junction to Gingival Margin) - Integer values (can be positive, negative, or 0)
  cejgmLeft?: number;
  cejgmMid?: number;
  cejgmRight?: number;

  // Furcation - Integer values (0-3)
  topFurcation: number;
  bottomFurcation1: number;
  bottomFurcation2: number;
}
