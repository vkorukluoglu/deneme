import { KeyValueList } from "@/components/shared/KeyValueList";
export function ImportCostSummary() {
  return <div className="card p-4"><h3 className="mb-2 card-title">İthalat Maliyet Özeti</h3><KeyValueList items={[{ key: "CIF", value: "552.000 USD" }, { key: "Toplam Maliyet", value: "18.430.000 TL" }]} /></div>;
}
