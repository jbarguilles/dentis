import React from "react";
import { PatientReferral } from "@/types/referral";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  FileText,
  Stethoscope,
  User,
  Check,
  X,
  Loader2,
} from "lucide-react";

interface ReferralCardProps {
  referral: PatientReferral;
  onAccept: (referralId: number) => void;
  onReject?: (referralId: number) => void;
  isAccepting?: boolean;
  isRejecting?: boolean;
}

export function ReferralCard({ 
  referral, 
  onAccept, 
  onReject,
  isAccepting = false,
  isRejecting = false,
}: ReferralCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300";
      case "ACCEPTED":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-[#800000]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {referral.chart_number}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{referral.patient_name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatDate(referral.created_at)}
            </div>
          </div>
          <div className="space-y-2">
            <Badge className={getStatusColor(referral.status)}>
              {referral.status}
            </Badge>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-medium">
                {referral.section_origin}
              </Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge variant="default" className="font-medium">
                {referral.section_destination}
              </Badge>
            </div>
            <div className="flex items-center justify-end gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Age: {referral.age}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Treatment */}
        <div className="flex items-start gap-2">
          <Stethoscope className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Treatment</p>
            <p className="text-base font-semibold">{referral.treatment}</p>
          </div>
        </div>

        {/* Specifics */}
        {referral.specifics && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Specifics of Treatment
            </p>
            <p className="text-sm leading-relaxed">{referral.specifics}</p>
          </div>
        )}

        {/* Medical Alert */}
        {referral.medical_alert && referral.medical_alert.toLowerCase() !== "none" && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Medical Alert
              </p>
              <p className="text-sm text-red-700 dark:text-red-400">
                {referral.medical_alert}
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        {referral.notes && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Notes & Special Indications
            </p>
            <p className="text-sm leading-relaxed">{referral.notes}</p>
          </div>
        )}

        {/* Referral Info */}
        <div className="pt-2 border-t text-sm text-muted-foreground">
          <p>Referred by: {referral.referred_by}</p>
          {referral.accepted_by && (
            <>
              <p>Accepted by: {referral.accepted_by}</p>
              {referral.accepted_at && (
                <p>Accepted at: {formatDate(referral.accepted_at)}</p>
              )}
            </>
          )}
        </div>

        {/* Action Buttons - Only show for pending referrals */}
        {referral.status === "PENDING" && (
          <div className="pt-3 flex justify-end gap-2">
            {onReject && (
              <Button 
                variant="outline" 
                onClick={() => onReject(referral.referral_id)} 
                className="gap-2"
                disabled={isAccepting || isRejecting}
              >
                {isRejecting && <Loader2 className="h-4 w-4 animate-spin" />}
                {!isRejecting && <X className="h-4 w-4" />}
                Reject
              </Button>
            )}
            <Button 
              onClick={() => onAccept(referral.referral_id)} 
              className="gap-2"
              disabled={isAccepting || isRejecting}
            >
              {isAccepting && <Loader2 className="h-4 w-4 animate-spin" />}
              {!isAccepting && <Check className="h-4 w-4" />}
              Accept Referral
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
