import { StatusBadge } from "@/components/shared/StatusBadge";
export function MachineCard({ ad, kod, fiyat, durum }: { ad: string; kod: string; fiyat: string; durum: string }) {
  return <div className="card p-4"><p className="font-medium">{ad}</p><p className="muted">{kod}</p><p className="my-2 text-lg font-semibold">{fiyat}</p><StatusBadge status={durum} /></div>;
}
