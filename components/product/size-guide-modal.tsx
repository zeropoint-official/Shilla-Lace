"use client";

import { useEffect } from "react";
import { XIcon } from "@/components/ui/icons";

type Props = {
  open: boolean;
  onClose: () => void;
};

const sizeData = [
  { size: "S", bust: '32-34"', waist: '24-26"', hips: '34-36"' },
  { size: "M", bust: '34-36"', waist: '26-28"', hips: '36-38"' },
  { size: "L", bust: '36-38"', waist: '28-30"', hips: '38-40"' },
  { size: "XL", bust: '38-40"', waist: '30-32"', hips: '40-42"' },
];

export function SizeGuideModal({ open, onClose }: Props) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-bg-elevated border border-cream/5 max-w-md w-full p-6 md:p-8 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl text-cream font-light">
            Size Guide
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-cream/30 hover:text-cream transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-cream/10">
              <th className="text-left py-2.5 text-[10px] tracking-[0.15em] uppercase font-normal text-cream/50">
                Size
              </th>
              <th className="text-left py-2.5 text-[10px] tracking-[0.15em] uppercase font-normal text-cream/50">
                Bust
              </th>
              <th className="text-left py-2.5 text-[10px] tracking-[0.15em] uppercase font-normal text-cream/50">
                Waist
              </th>
              <th className="text-left py-2.5 text-[10px] tracking-[0.15em] uppercase font-normal text-cream/50">
                Hips
              </th>
            </tr>
          </thead>
          <tbody>
            {sizeData.map((row) => (
              <tr key={row.size} className="border-b border-cream/5">
                <td className="py-2.5 text-cream">{row.size}</td>
                <td className="py-2.5 text-cream/40">{row.bust}</td>
                <td className="py-2.5 text-cream/40">{row.waist}</td>
                <td className="py-2.5 text-cream/40">{row.hips}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-[10px] text-cream/30 space-y-1.5">
          <p>
            <span className="text-cream/50">How to measure:</span> Use a soft
            measuring tape around the fullest part of each area.
          </p>
          <p>
            Between sizes? We recommend sizing up for a more comfortable fit.
          </p>
        </div>
      </div>
    </div>
  );
}
