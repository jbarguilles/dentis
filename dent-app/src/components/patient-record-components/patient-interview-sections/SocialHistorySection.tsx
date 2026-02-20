import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { SocialHistoryData } from "@/types/patient-interview";

// Keep existing interface for backward compatibility
export interface SocialHistoryFormData extends SocialHistoryData {}

interface SocialHistoryProps {
  formData: SocialHistoryData;
  setFormData: (data: SocialHistoryData) => void;
}

const SocialHistorySection: React.FC<SocialHistoryProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: keyof SocialHistoryData, value: string | boolean) => {
    const updatedData: SocialHistoryData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  const handleTobaccoChange = (checked: boolean) => {
    if (!checked) {
      setFormData({
        ...formData,
        tobacco_checked: false,
        tobacco_kind: "",
        tobacco_frequency: "",
        tobacco_years_of_use: "",
        tobacco_last_used: "",
      });
    } else {
      setFormData({ ...formData, tobacco_checked: true });
    }
  };

  const handleAlcoholChange = (checked: boolean) => {
    if (!checked) {
      setFormData({
        ...formData,
        alcohol_checked: false,
        alcohol_kind: "",
        alcohol_frequency: "",
        alcohol_years_of_use: "",
        alcohol_last_used: "",
      });
    } else {
      setFormData({ ...formData, alcohol_checked: true });
    }
  };

  const handleDrugsChange = (checked: boolean) => {
    if (!checked) {
      setFormData({
        ...formData,
        drugs_checked: false,
        drug_kind: "",
        drug_frequency: "",
        drug_years_of_use: "",
        drug_last_used: "",
      });
    } else {
      setFormData({ ...formData, drugs_checked: true });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Social History</h2>
        <p className="text-sm text-gray-600 mb-8">
          Please provide information about your social habits and lifestyle.
        </p>

        {/* Tobacco Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              Tobacco Use
            </h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sh_tobacco"
                checked={formData.tobacco_checked}
                onCheckedChange={handleTobaccoChange}
              />
              <Label
                htmlFor="sh_tobacco"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Are you using or have used tobacco, cigarettes?
              </Label>
            </div>
          </div>

          <div className="ml-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tobacco_kind" className="text-sm font-medium text-gray-700">
                  What kind?
                </Label>
                <Input
                  id="tobacco_kind"
                  name="tobacco_kind"
                  value={formData.tobacco_kind}
                  onChange={(e) => handleInputChange("tobacco_kind", e.target.value)}
                  disabled={!formData.tobacco_checked}
                  placeholder="e.g., cigarettes, cigars, pipe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tobacco_frequency" className="text-sm font-medium text-gray-700">
                  How often?
                </Label>
                <Input
                  id="tobacco_frequency"
                  name="tobacco_frequency"
                  value={formData.tobacco_frequency}
                  onChange={(e) => handleInputChange("tobacco_frequency", e.target.value)}
                  disabled={!formData.tobacco_checked}
                  placeholder="e.g., daily, weekly"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tobacco_years_of_use" className="text-sm font-medium text-gray-700">
                  How many years?
                </Label>
                <Input
                  id="tobacco_years_of_use"
                  name="tobacco_years_of_use"
                  value={formData.tobacco_years_of_use}
                  onChange={(e) => handleInputChange("tobacco_years_of_use", e.target.value)}
                  disabled={!formData.tobacco_checked}
                  placeholder="Number of years"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tobacco_last_used" className="text-sm font-medium text-gray-700">
                  If stopped, how long since last used?
                </Label>
                <Input
                  id="tobacco_last_used"
                  name="tobacco_last_used"
                  value={formData.tobacco_last_used}
                  onChange={(e) => handleInputChange("tobacco_last_used", e.target.value)}
                  disabled={!formData.tobacco_checked}
                  placeholder="e.g., 2 months ago"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Alcohol Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              Alcohol Use
            </h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sh_alcohol"
                checked={formData.alcohol_checked}
                onCheckedChange={handleAlcoholChange}
              />
              <Label
                htmlFor="sh_alcohol"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Do you drink alcoholic beverage?
              </Label>
            </div>
          </div>

          <div className="ml-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alcohol_kind" className="text-sm font-medium text-gray-700">
                  What kind?
                </Label>
                <Input
                  id="alcohol_kind"
                  name="alcohol_kind"
                  value={formData.alcohol_kind}
                  onChange={(e) => handleInputChange("alcohol_kind", e.target.value)}
                  disabled={!formData.alcohol_checked}
                  placeholder="e.g., beer, wine, spirits"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alcohol_frequency" className="text-sm font-medium text-gray-700">
                  How often?
                </Label>
                <Input
                  id="alcohol_frequency"
                  name="alcohol_frequency"
                  value={formData.alcohol_frequency}
                  onChange={(e) => handleInputChange("alcohol_frequency", e.target.value)}
                  disabled={!formData.alcohol_checked}
                  placeholder="e.g., socially, daily"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alcohol_years_of_use" className="text-sm font-medium text-gray-700">
                  How many years?
                </Label>
                <Input
                  id="alcohol_years_of_use"
                  name="alcohol_years_of_use"
                  value={formData.alcohol_years_of_use}
                  onChange={(e) => handleInputChange("alcohol_years_of_use", e.target.value)}
                  disabled={!formData.alcohol_checked}
                  placeholder="Number of years"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alcohol_last_used" className="text-sm font-medium text-gray-700">
                  If stopped, how long since last used?
                </Label>
                <Input
                  id="alcohol_last_used"
                  name="alcohol_last_used"
                  value={formData.alcohol_last_used}
                  onChange={(e) => handleInputChange("alcohol_last_used", e.target.value)}
                  disabled={!formData.alcohol_checked}
                  placeholder="e.g., 6 months ago"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Drugs Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">Drug Use</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sh_drugs"
                checked={formData.drugs_checked}
                onCheckedChange={handleDrugsChange}
              />
              <Label
                htmlFor="sh_drugs"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Have you ever used drugs for recreation or non-therapeutic purposes?
              </Label>
            </div>
          </div>

          <div className="ml-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="drug_kind" className="text-sm font-medium text-gray-700">
                  What kind?
                </Label>
                <Input
                  id="drug_kind"
                  name="drug_kind"
                  value={formData.drug_kind}
                  onChange={(e) => handleInputChange("drug_kind", e.target.value)}
                  disabled={!formData.drugs_checked}
                  placeholder="Type of substance"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drug_frequency" className="text-sm font-medium text-gray-700">
                  How often?
                </Label>
                <Input
                  id="drug_frequency"
                  name="drug_frequency"
                  value={formData.drug_frequency}
                  onChange={(e) => handleInputChange("drug_frequency", e.target.value)}
                  disabled={!formData.drugs_checked}
                  placeholder="Frequency of use"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drug_years_of_use" className="text-sm font-medium text-gray-700">
                  How many years?
                </Label>
                <Input
                  id="drug_years_of_use"
                  name="drug_years_of_use"
                  value={formData.drug_years_of_use}
                  onChange={(e) => handleInputChange("drug_years_of_use", e.target.value)}
                  disabled={!formData.drugs_checked}
                  placeholder="Number of years"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drug_last_used" className="text-sm font-medium text-gray-700">
                  If stopped, how long since last used?
                </Label>
                <Input
                  id="drug_last_used"
                  name="drug_last_used"
                  value={formData.drug_last_used}
                  onChange={(e) => handleInputChange("drug_last_used", e.target.value)}
                  disabled={!formData.drugs_checked}
                  placeholder="Time since last use"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHistorySection;
