"use client";

import { useEffect, useState } from "react";
import { XIcon } from "@/components/ui/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedSize?: string;
};

const sizeDataInches = [
  { size: "S", bust: '32-34"', waist: '24-26"', hips: '34-36"' },
  { size: "M", bust: '34-36"', waist: '26-28"', hips: '36-38"' },
  { size: "L", bust: '36-38"', waist: '28-30"', hips: '38-40"' },
  { size: "XL", bust: '38-40"', waist: '30-32"', hips: '40-42"' },
];

const sizeDataCm = [
  { size: "S", bust: "81-86 cm", waist: "61-66 cm", hips: "86-91 cm" },
  { size: "M", bust: "86-91 cm", waist: "66-71 cm", hips: "91-97 cm" },
  { size: "L", bust: "91-97 cm", waist: "71-76 cm", hips: "97-102 cm" },
  { size: "XL", bust: "97-102 cm", waist: "76-81 cm", hips: "102-107 cm" },
];

export function SizeGuideModal({ open, onClose, selectedSize }: Props) {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!open) return null;

  const sizeData = unit === "in" ? sizeDataInches : sizeDataCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fade-up_0.3s_ease-out]"
        onClick={onClose}
      />
      <div className="relative bg-bg-elevated border border-cream/8 max-w-lg w-full p-6 md:p-8 max-h-[85vh] overflow-y-auto animate-[fade-up_0.3s_ease-out]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl text-cream font-light">
            Size Guide
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-cream/40 hover:text-cream transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* How to measure illustration */}
        <div className="bg-bg-card border border-cream/8 p-4 mb-6">
          <p className="text-xs text-cream/70 font-medium mb-3 tracking-wide uppercase">How to Measure</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="w-10 h-10 mx-auto mb-1.5 rounded-full border border-cream/20 flex items-center justify-center">
                <span className="text-[11px] text-cream/60">1</span>
              </div>
              <p className="text-[11px] text-cream/70 font-medium">Bust</p>
              <p className="text-[10px] text-cream/40 mt-0.5">Fullest part of chest</p>
            </div>
            <div>
              <div className="w-10 h-10 mx-auto mb-1.5 rounded-full border border-cream/20 flex items-center justify-center">
                <span className="text-[11px] text-cream/60">2</span>
              </div>
              <p className="text-[11px] text-cream/70 font-medium">Waist</p>
              <p className="text-[10px] text-cream/40 mt-0.5">Narrowest point</p>
            </div>
            <div>
              <div className="w-10 h-10 mx-auto mb-1.5 rounded-full border border-cream/20 flex items-center justify-center">
                <span className="text-[11px] text-cream/60">3</span>
              </div>
              <p className="text-[11px] text-cream/70 font-medium">Hips</p>
              <p className="text-[10px] text-cream/40 mt-0.5">Widest part of hips</p>
            </div>
          </div>
        </div>

        {/* Unit toggle */}
        <div className="flex items-center gap-1 mb-4 bg-bg-card inline-flex p-0.5 border border-cream/10">
          <button
            onClick={() => setUnit("in")}
            className={`px-4 py-1.5 text-[11px] tracking-wide transition-all ${
              unit === "in"
                ? "bg-cream text-bg font-medium"
                : "text-cream/50 hover:text-cream"
            }`}
          >
            Inches
          </button>
          <button
            onClick={() => setUnit("cm")}
            className={`px-4 py-1.5 text-[11px] tracking-wide transition-all ${
              unit === "cm"
                ? "bg-cream text-bg font-medium"
                : "text-cream/50 hover:text-cream"
            }`}
          >
            Centimeters
          </button>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-cream/15">
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase font-normal text-cream/60">
                Size
              </th>
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase font-normal text-cream/60">
                Bust
              </th>
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase font-normal text-cream/60">
                Waist
              </th>
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase font-normal text-cream/60">
                Hips
              </th>
            </tr>
          </thead>
          <tbody>
            {sizeData.map((row) => {
              const isSelected = selectedSize === row.size;
              return (
                <tr
                  key={row.size}
                  className={`border-b border-cream/8 transition-colors ${
                    isSelected ? "bg-accent/10" : ""
                  }`}
                >
                  <td className={`py-3 font-medium ${isSelected ? "text-accent-glow" : "text-cream"}`}>
                    {row.size}
                    {isSelected && (
                      <span className="ml-1.5 text-[9px] text-accent-glow tracking-wider uppercase">Selected</span>
                    )}
                  </td>
                  <td className={`py-3 ${isSelected ? "text-cream/70" : "text-cream/50"}`}>{row.bust}</td>
                  <td className={`py-3 ${isSelected ? "text-cream/70" : "text-cream/50"}`}>{row.waist}</td>
                  <td className={`py-3 ${isSelected ? "text-cream/70" : "text-cream/50"}`}>{row.hips}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-6 space-y-2">
          <p className="text-[11px] text-cream/50">
            <span className="text-cream/70 font-medium">Tip:</span> Use a soft
            measuring tape around the fullest part of each area.
          </p>
          <p className="text-[11px] text-cream/50">
            Between sizes? We recommend sizing up for a more comfortable fit.
          </p>
          <p className="text-[11px] text-cream/50">
            <span className="text-cream/70 font-medium">Not the right fit?</span> Free exchanges within 14 days.
          </p>
        </div>
      </div>
    </div>
  );
}
