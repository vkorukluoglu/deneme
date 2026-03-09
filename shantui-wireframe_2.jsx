import React, { useState } from "react";

/* ═══ WIREFRAME COMPONENTS ═══ */
const B = ({ label, children, style, hl, warn }) => {
  const bdr = hl ? "#FDE68A" : warn ? "#FECACA" : "#CBD5E1";
  const bg = hl ? "#FFFBEB" : warn ? "#FEF2F2" : "#F8FAFC";
  return (
    <div style={{ border: `2px dashed ${bdr}`, borderRadius: "8px", padding: "12px", background: bg, display: "flex", flexDirection: "column", gap: "8px", ...(style || {}) }}>
      {label && <span style={{ fontSize: "10px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>}
      {children}
    </div>
  );
};

const F = ({ label, w }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: w ? `0 0 ${w}` : "1" }}>
    <span style={{ fontSize: "10px", fontWeight: 600, color: "#64748B" }}>{label}</span>
    <div style={{ height: "32px", background: "#E2E8F0", borderRadius: "6px", border: "1px solid #CBD5E1" }} />
  </div>
);

const Bt = ({ label, primary, danger, small, ghost }) => {
  const bg = primary ? "#F59E0B" : danger ? "#FEE2E2" : ghost ? "transparent" : "#E2E8F0";
  const fg = primary ? "#fff" : danger ? "#DC2626" : ghost ? "#F59E0B" : "#475569";
  const bd = ghost ? "1.5px solid #F59E0B" : "none";
  return (
    <div style={{ padding: small ? "5px 12px" : "8px 16px", borderRadius: "6px", background: bg, color: fg, fontSize: small ? "10px" : "11px", fontWeight: 700, textAlign: "center", display: "inline-block", cursor: "pointer", border: bd }}>
      {label}
    </div>
  );
};

const Bd = ({ label, color }) => (
  <span style={{ padding: "3px 10px", borderRadius: "100px", background: color || "#E2E8F0", fontSize: "10px", fontWeight: 600, color: "#475569" }}>{label}</span>
);

const St = ({ label, value, sub }) => (
  <div style={{ border: "2px dashed #CBD5E1", borderRadius: "8px", padding: "14px", background: "#F8FAFC", flex: 1 }}>
    <div style={{ fontSize: "9px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
    <div style={{ fontSize: "20px", fontWeight: 800, color: "#334155" }}>{value}</div>
    {sub && <div style={{ fontSize: "9px", color: "#94A3B8", marginTop: "4px" }}>{sub}</div>}
    <div style={{ width: "24px", height: "3px", background: "#F59E0B", borderRadius: "2px", marginTop: "8px" }} />
  </div>
);

const N = ({ text, type }) => {
  const colors = {
    info: { bg: "#FEF3C7", bc: "#F59E0B", c: "#92400E" },
    success: { bg: "#ECFDF5", bc: "#10B981", c: "#065F46" },
    warn: { bg: "#FEF2F2", bc: "#EF4444", c: "#991B1B" },
    new: { bg: "#EDE9FE", bc: "#8B5CF6", c: "#5B21B6" }
  };
  const s = colors[type] || colors.info;
  return <div style={{ padding: "8px 12px", background: s.bg, borderRadius: "6px", fontSize: "10px", color: s.c, fontWeight: 500, borderLeft: `3px solid ${s.bc}` }}>{text}</div>;
};

const Sc = ({ title, children }) => (
  <div style={{ marginBottom: "20px" }}>
    <div style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid #E2E8F0" }}>{title}</div>
    {children}
  </div>
);

const Fl = ({ steps }) => (
  <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap", padding: "8px 0" }}>
    {steps.map((s, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Bd label={s.l} color={s.c} />
        {i < steps.length - 1 && <span style={{ color: "#CBD5E1", fontSize: "12px" }}>→</span>}
      </div>
    ))}
  </div>
);

const Tb = ({ filters, actions, bulk }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", background: "#fff", border: "2px dashed #CBD5E1", borderRadius: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
    {bulk && <div style={{ width: "18px", height: "18px", border: "2px solid #CBD5E1", borderRadius: "4px", flexShrink: 0 }} />}
    <div style={{ position: "relative", flex: 1, minWidth: "180px" }}>
      <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#94A3B8" }}>🔍</span>
      <div style={{ height: "32px", background: "#F1F5F9", borderRadius: "6px", border: "1px solid #CBD5E1", paddingLeft: "30px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "10px", color: "#94A3B8" }}>Ara...</span>
      </div>
    </div>
    {(filters || []).map((f, i) => (
      <div key={i} style={{ width: "130px" }}>
        <div style={{ height: "32px", background: "#F1F5F9", borderRadius: "6px", border: "1px solid #CBD5E1", display: "flex", alignItems: "center", padding: "0 10px" }}>
          <span style={{ fontSize: "10px", color: "#94A3B8" }}>{f}</span>
        </div>
      </div>
    ))}
    <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
      {(actions || []).map((a, i) => (
        <div key={i}><Bt label={a.l} primary={a.p} ghost={a.g} small /></div>
      ))}
    </div>
  </div>
);

const Tbl = ({ headers, rows, note }) => (
  <div style={{ border: "2px dashed #CBD5E1", borderRadius: "8px", overflow: "hidden", background: "#fff" }}>
    <div style={{ display: "flex", gap: "8px", padding: "10px 14px", background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
      {headers.map((h, i) => (
        <span key={i} style={{ flex: h.w || 1, fontSize: "9px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "3px" }}>
          {h.l}{h.s && <span style={{ fontSize: "7px" }}>↕</span>}
        </span>
      ))}
    </div>
    {Array.from({ length: rows || 4 }).map((_, i) => (
      <div key={i} style={{ display: "flex", gap: "8px", padding: "10px 14px", borderBottom: "1px solid #F1F5F9" }}>
        {headers.map((h, j) => (
          <div key={j} style={{ flex: h.w || 1, height: "14px", background: "#E2E8F0", borderRadius: "3px" }} />
        ))}
      </div>
    ))}
    <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: "10px", color: "#94A3B8" }}>{rows || 4} kayıt</span>
      <div style={{ display: "flex", gap: "4px" }}>
        <div style={{ padding: "3px 8px", borderRadius: "4px", background: "#E2E8F0", fontSize: "10px", cursor: "pointer" }}>←</div>
        <div style={{ padding: "3px 8px", borderRadius: "4px", background: "#F59E0B", fontSize: "10px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>1</div>
        <div style={{ padding: "3px 8px", borderRadius: "4px", background: "#E2E8F0", fontSize: "10px", cursor: "pointer" }}>→</div>
      </div>
    </div>
    {note && <div style={{ padding: "0 14px 10px" }}><N text={note} /></div>}
  </div>
);

const Timeline = ({ items }) => (
  <div style={{ position: "relative", paddingLeft: "24px" }}>
    <div style={{ position: "absolute", left: "8px", top: "4px", bottom: "4px", width: "2px", background: "#E2E8F0" }} />
    {items.map((item, i) => (
      <div key={i} style={{ position: "relative", marginBottom: "12px" }}>
        <div style={{ position: "absolute", left: "-20px", top: "4px", width: "12px", height: "12px", borderRadius: "50%", background: item.c || "#F59E0B", border: `2px solid #fff`, boxShadow: `0 0 0 2px ${item.c || "#F59E0B"}33` }} />
        <div style={{ fontSize: "9px", color: "#94A3B8", marginBottom: "2px" }}>{item.d}</div>
        <div style={{ fontSize: "11px", fontWeight: 600, color: "#334155" }}>{item.t}</div>
        {item.s && <div style={{ fontSize: "10px", color: "#64748B" }}>{item.s}</div>}
      </div>
    ))}
  </div>
);

/* ═══ PAGES CONFIG ═══ */
const PG = {
  "login": { t: "Giriş Ekranı", g: "Genel" },
  "dash-admin": { t: "Dashboard — Admin", g: "Dashboard" },
  "dash-satis": { t: "Dashboard — Satış", g: "Dashboard" },
  "dash-musteri": { t: "Dashboard — Müşteri", g: "Dashboard" },
  "env-list": { t: "Envanter Listesi", g: "Envanter" },
  "env-form": { t: "Ekle / Düzenle", g: "Envanter" },
  "env-detay": { t: "Makine Detay", g: "Envanter" },
  "env-teknik": { t: "Teknik Özellik Yönetimi", g: "Envanter" },
  "env-ekipman": { t: "Ekipman Envanteri", g: "Envanter" },
  "env-2el": { t: "2. El / Takas Giriş", g: "Envanter" },
  "ith-list": { t: "Proforma Listesi", g: "İthalat" },
  "ith-form": { t: "Proforma Girişi", g: "İthalat" },
  "ith-odeme": { t: "Ödeme Takibi", g: "İthalat" },
  "ith-tasima": { t: "Taşıma Süreci", g: "İthalat" },
  "ith-gumruk": { t: "Gümrük & Evrak", g: "İthalat" },
  "ith-maliyet": { t: "Maliyet Hesaplama", g: "İthalat" },
  "sat-stok": { t: "Stoktaki Makinalar", g: "Satış" },
  "sat-musteri": { t: "Müşteriler", g: "Satış" },
  "sat-musteri-detay": { t: "Müşteri Detay + Timeline", g: "Satış" },
  "sat-teklif-list": { t: "Teklifler", g: "Satış" },
  "sat-teklif-form": { t: "Teklif Oluştur", g: "Satış" },
  "sat-onay": { t: "Onay Süreci", g: "Satış" },
  "sat-teslim": { t: "Teslim Formu", g: "Satış" },
  "sat-iade": { t: "İptal / İade", g: "Satış" },
  "sat-randevu": { t: "Randevu / Takvim", g: "Satış" },
  "sat-onsiparis": { t: "Ön Sipariş", g: "Satış" },
  "srv-talepler": { t: "Talepler & İş Emirleri", g: "Servis" },
  "srv-isemri": { t: "İş Emri Detay", g: "Servis" },
  "srv-gecmis": { t: "Geçmiş & Kayıtlar", g: "Servis" },
  "srv-dokuman": { t: "Manueller & Kataloglar", g: "Servis" },
  "yp-katalog": { t: "Katalog", g: "Yedek Parça" },
  "yp-talepler": { t: "Talepler & Kargo", g: "Yedek Parça" },
  "mus-panel": { t: "Ana Ekran", g: "Müşteri Paneli" },
  "mus-makine": { t: "Makine Detay", g: "Müşteri Paneli" },
  "mus-servis": { t: "Servis Talebi", g: "Müşteri Paneli" },
  "mus-yp": { t: "Yedek Parça & Sipariş", g: "Müşteri Paneli" },
  "muh-genel": { t: "Genel Bakış", g: "Muhasebe" },
  "muh-kurfarki": { t: "Kur Farkı & Snapshot", g: "Muhasebe" },
  "raporlar": { t: "Raporlar", g: "Raporlar" },
  "log": { t: "İşlem Geçmişi (Audit Log)", g: "Sistem" },
  "ayarlar": { t: "Ayarlar", g: "Sistem" },
};

/* ═══ RENDERERS ═══ */
const R = (p) => {
  switch (p) {
    case "login":
      return (
        <div style={{ maxWidth: "380px", margin: "40px auto", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "14px", background: "linear-gradient(135deg,#F59E0B,#D97706)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "22px" }}>SY</span>
          </div>
          <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>Shantui Yanımda</div>
          <div style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "24px" }}>Admin Panel</div>
          <B label="Giriş">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <F label="E-posta" />
              <F label="Şifre" />
              <Bt label="Giriş Yap" primary />
              <N text="Rol bazlı yönlendirme. Tüzel müşterilerde ana hesap + alt kullanıcılar." />
            </div>
          </B>
        </div>
      );

    case "dash-admin":
      return (
        <div>
          <N text="YENİ: Global arama (Spotlight) header'da — kullanıcı, makine, şasi no, proforma no ile anında arama." type="new" />
          <div style={{ height: "12px" }} />
          <Sc title="Özet Kartlar">
            <div style={{ display: "flex", gap: "12px" }}>
              <St label="Stoktaki Makine" value="12" sub="8 satışa hazır, 4 antrepoda" />
              <St label="Aylık Satış" value="3" sub="$385K gelir" />
              <St label="Servis Talepleri" value="7" sub="3 yeni, 2 acil" />
              <St label="Garanti Kapsamında" value="18" sub="2 tanesi bu ay bitiyor" />
            </div>
          </Sc>
          <Sc title="Aktif İthalatlar">
            <Tbl headers={[{ l: "Proforma", s: 1 }, { l: "Durum" }, { l: "Toplam USD", s: 1 }, { l: "Ödeme" }, { l: "Taşıma" }, { l: "Kur Snapshot" }]} rows={3} />
          </Sc>
          <Sc title="Son İşlem Akışı (Activity Feed)">
            <Timeline items={[
              { d: "Bugün 14:30", t: "SE215 — Teklif onayı bekleniyor", s: "Satış: Ali K. → Admin onayına gönderdi", c: "#F59E0B" },
              { d: "Bugün 11:15", t: "IMP-2026-003 — Gümrük beyannamesi yüklendi", s: "İthalat: Mehmet D.", c: "#3B82F6" },
              { d: "Dün 16:40", t: "Servis Talebi #47 — Teknisyene atandı", s: "SE75 — Filtre değişimi", c: "#10B981" },
              { d: "Dün 09:00", t: "Yeni müşteri eklendi: ABC İnşaat", s: "Satış: Zeynep K.", c: "#8B5CF6" },
            ]} />
          </Sc>
          <N text="Admin tüm modüllerin özetini + activity feed'i görür. Her kart tıklayınca ilgili modüle gider." />
        </div>
      );

    case "dash-satis":
      return (
        <div>
          <Sc title="Özet">
            <div style={{ display: "flex", gap: "12px" }}>
              <St label="Stoktaki Makine" value="12" />
              <St label="Bekleyen Teklif" value="4" />
              <St label="Bu Ay Satış" value="2" />
              <St label="Yaklaşan Randevu" value="3" />
            </div>
          </Sc>
          <Sc title="Bugünkü Randevular">
            <Tbl headers={[{ l: "Saat" }, { l: "Müşteri" }, { l: "Makine" }, { l: "Tür" }, { l: "Durum" }]} rows={2} />
          </Sc>
          <Sc title="Bekleyen Teklifler">
            <Tbl headers={[{ l: "Teklif No" }, { l: "Müşteri" }, { l: "Tutar" }, { l: "Geçerlilik" }, { l: "Durum" }]} rows={2} />
          </Sc>
        </div>
      );

    case "dash-musteri":
    case "mus-panel": // Artık R(p) çağırmak yerine direkt componenti render ediyor
      return (
        <div>
          <Sc title="Makinalarım">
            <div style={{ display: "flex", gap: "12px" }}>
              {["SE215 — 340 gün garanti", "SE75 — 180 gün garanti"].map((m, i) => (
                <div key={i} style={{ flex: 1, border: "2px dashed #CBD5E1", borderRadius: "8px", padding: "16px", background: "#F8FAFC" }}>
                  <div style={{ height: "60px", background: "#E2E8F0", borderRadius: "6px", marginBottom: "8px" }} />
                  <div style={{ fontSize: "12px", fontWeight: 700 }}>{m.split(" — ")[0]}</div>
                  <div style={{ fontSize: "10px", color: "#94A3B8" }}>{m.split(" — ")[1]}</div>
                </div>
              ))}
            </div>
          </Sc>
          <Sc title="Açık Taleplerim">
            <Tbl headers={[{ l: "No" }, { l: "Tür" }, { l: "Makine" }, { l: "Tarih" }, { l: "Durum" }]} rows={2} />
          </Sc>
          <N text="Tüzel müşterilerde: Ana Hesap (Firma Yetkilisi) + Alt Kullanıcılar (Şantiye Şefi, Operatör vb.) ayrı yetki seviyeleri." type="new" />
        </div>
      );

    case "env-list":
      return (
        <div>
          <Tb filters={["Kategori", "Durum", "Kaynak"]} actions={[{ l: "Toplu İşlem", g: 1 }, { l: "Excel Aktar" }, { l: "+ Yeni Makine", p: 1 }]} bulk />
          <N text="YENİ: Checkbox ile toplu işlem — Toplu Fiyat Güncelle, Toplu Lokasyon Değiştir, Toplu Etiket. Kaynak filtresi: İthalat / 2.El Takas." type="new" />
          <div style={{ height: "8px" }} />
          <Tbl headers={[{ l: "☐", w: 0.3 }, { l: "Makine Adı", s: 1, w: 2 }, { l: "Marka", s: 1 }, { l: "Kategori" }, { l: "Kaynak" }, { l: "Ağırlık", s: 1 }, { l: "Durum" }, { l: "İşlem", w: 0.6 }]} rows={6} note="Kaynak: İthalat (mavi) / 2. El Takas (turuncu). Durum: Aktif/Pasif/Kontrol Bekliyor." />
        </div>
      );

    case "env-form":
      return (
        <div>
          <Sc title="Genel Bilgiler">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Makine Kodu *" />
              <F label="Makine Adı *" />
              <F label="Kategori (Dropdown)" />
              <F label="Alt Kategori" />
              <F label="Motor Tipi" />
              <F label="Marka" />
              <F label="Menşei" />
              <F label="GTIP Kodu" />
              <F label="Durum" />
              <F label="Ağırlık (kg)" />
              <F label="$/KG" />
              <F label="Gözetim (otomatik)" />
              <F label="KDV (%)" />
              <F label="İGV (%)" />
              <F label="Model Yılı" />
            </div>
          </Sc>
          <Sc title="Teknik Özellikler (Dinamik)">
            <N text="Kategori seçilince o kategoriye ait özellikler otomatik gelir. Teknik Özellik Yönetimi'nden tanımlanır." type="info" />
            <div style={{ height: "8px" }} />
            <div style={{ border: "2px dashed #CBD5E1", borderRadius: "8px", overflow: "hidden" }}>
              <div style={{ display: "flex", gap: "8px", padding: "10px 14px", background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
                <span style={{ flex: 2, fontSize: "9px", fontWeight: 700, color: "#94A3B8" }}>ÖZELLİK</span>
                <span style={{ flex: 2, fontSize: "9px", fontWeight: 700, color: "#94A3B8" }}>DEĞER</span>
                <span style={{ flex: 1, fontSize: "9px", fontWeight: 700, color: "#94A3B8" }}>BİRİM</span>
                <span style={{ flex: 0.4, fontSize: "9px", fontWeight: 700, color: "#94A3B8" }}>SİL</span>
              </div>
              {["Motor Gücü|129|kW", "Kova Kapasitesi|0.45-1.2|m3", "Max Kazı|6.510|mm", "Emisyon|Stage V|—"].map((r, i) => {
                const p = r.split("|");
                return (
                  <div key={i} style={{ display: "flex", gap: "8px", padding: "8px 14px", borderBottom: "1px solid #F1F5F9", alignItems: "center" }}>
                    <span style={{ flex: 2, fontSize: "11px", fontWeight: 600 }}>{p[0]}</span>
                    <div style={{ flex: 2, height: "28px", background: "#E2E8F0", borderRadius: "5px", border: "1px solid #CBD5E1", display: "flex", alignItems: "center", padding: "0 8px" }}>
                      <span style={{ fontSize: "10px", color: "#64748B" }}>{p[1]}</span>
                    </div>
                    <span style={{ flex: 1, fontSize: "10px", color: "#94A3B8" }}>{p[2]}</span>
                    <span style={{ flex: 0.4, fontSize: "12px", color: "#DC2626", textAlign: "center", cursor: "pointer" }}>✕</span>
                  </div>
                );
              })}
              <div style={{ padding: "10px 14px", background: "#FAFAFA", display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ flex: 2 }}><F label="Özellik seç..." /></div>
                <div style={{ flex: 2 }}><F label="Değer..." /></div>
                <div style={{ flex: 1 }}><span style={{ fontSize: "10px", color: "#94A3B8" }}>Otomatik</span></div>
                <div style={{ flex: 0.4 }}><Bt label="+" primary small /></div>
              </div>
            </div>
          </Sc>
          <div style={{ display: "flex", gap: "8px" }}><Bt label="Kaydet" primary /><Bt label="İptal" /></div>
        </div>
      );

    case "env-detay":
      return (
        <div>
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ width: "100px", height: "100px", background: "#E2E8F0", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>🏗️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "4px" }}>SE215</div>
              <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "8px" }}>Ekskavatör — Orta | Shantui | Dizel</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <Bd label="Aktif" color="#ECFDF5" />
                <Bd label="KDV %10" color="#DBEAFE" />
                <Bd label="Gözetim: $131.550" color="#FEF3C7" />
                <Bd label="Kaynak: İthalat" color="#DBEAFE" />
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}><Bt label="Düzenle" /><Bt label="Sil" danger /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <B label="Genel Bilgiler"><div style={{ fontSize: "11px", color: "#64748B", lineHeight: "2.2" }}>Makine Kodu: SE215<br />Kategori: Ekskavatör<br />Motor: Dizel<br />Ağırlık: 21.925 kg<br />KDV: %10 | İGV: %5</div></B>
            <B label="Teknik Özellikler (7)"><div style={{ fontSize: "11px", color: "#64748B", lineHeight: "2.2" }}>Motor Gücü: 129 kW<br />Kova: 0.45-1.2 m3<br />Max Kazı: 6.510 mm<br />Emisyon: Stage V<br />Garanti: 24 ay</div></B>
            <B label="Araç Veritabanı" hl><div style={{ fontSize: "11px", color: "#64748B", lineHeight: "2.2" }}>Ağırlık: 21.925 kg<br />$/KG: $6<br />Gözetim: $131.550</div></B>
          </div>
          <Sc title="İşlem Geçmişi (Audit Log)">
            <Timeline items={[
              { d: "05.03.2026", t: "Fiyat güncellendi: $120.000 → $118.000", s: "Admin: Veysel K.", c: "#F59E0B" },
              { d: "01.03.2026", t: "Envantere eklendi (İthalat IMP-2026-001)", s: "İthalat: Mehmet D.", c: "#3B82F6" },
              { d: "28.02.2026", t: "Gümrükten çıktı — Millileşti", s: "Sistem otomatik", c: "#10B981" }
            ]} />
          </Sc>
        </div>
      );

    case "env-teknik":
      return (
        <div>
          <N text="Teknik özellik şablonları tanımlanır. Kategori bazlı atanır. Makine eklerken otomatik form olarak gelir." />
          <div style={{ height: "12px" }} />
          <Tb filters={["Kategori"]} actions={[{ l: "+ Yeni Özellik", p: 1 }]} />
          <Tbl headers={[{ l: "Özellik Adı", s: 1, w: 2 }, { l: "Birim" }, { l: "Veri Tipi" }, { l: "Kategoriler", w: 1.5 }, { l: "Zorunlu" }, { l: "İşlem", w: 0.5 }]} rows={8} />
          <Sc title="Yeni Özellik Formu">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
              <F label="Özellik Adı *" />
              <F label="Birim" />
              <F label="Veri Tipi (Sayı/Metin/Seçim)" />
              <F label="Zorunlu?" />
            </div>
            <div style={{ marginTop: "10px" }}>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#64748B", marginBottom: "6px" }}>Kategoriler</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["Ekskavatör", "Dozer", "Loader", "Silindir", "Telehandler", "Tümü"].map((c, i) => (
                  <div key={i} style={{ padding: "5px 12px", borderRadius: "6px", border: i < 2 ? "2px solid #F59E0B" : "2px dashed #CBD5E1", background: i < 2 ? "#FFFBEB" : "#F8FAFC", fontSize: "10px", fontWeight: 600, color: i < 2 ? "#92400E" : "#94A3B8" }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </Sc>
        </div>
      );

    case "env-ekipman":
      return (
        <div>
          <Tb filters={["Kategori", "Uyumlu Model"]} actions={[{ l: "+ Yeni Ekipman", p: 1 }]} />
          <Tbl headers={[{ l: "Ekipman", s: 1, w: 2 }, { l: "Tip" }, { l: "Uyumlu Modeller" }, { l: "Fiyat", s: 1 }, { l: "Stok" }, { l: "Durum" }, { l: "İşlem", w: 0.5 }]} rows={4} note="Kova, kırıcı, sepet, quick coupler vb." />
        </div>
      );

    case "env-2el":
      return (
        <div>
          <N text="YENİ: Müşteriden takas/alım ile gelen ikinci el makineler. Envantere '2. El' kaynak etiketiyle eklenir." type="new" />
          <div style={{ height: "8px" }} />
          <Sc title="2. El Makine Girişi">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Makine Modeli (Envanterden Seç)" />
              <F label="Şasi No *" />
              <F label="Alış Fiyatı ($)" />
              <F label="Müşteriden Takas mı? (Evet/Hayır)" />
              <F label="Müşteri Seç (takas ise)" />
              <F label="Makine Durumu (İyi/Orta/Bakım Gerekli)" />
              <F label="Çalışma Saati" />
              <F label="Model Yılı" />
              <F label="Not / Ekspertiz Notu" />
            </div>
          </Sc>
          <Sc title="2. El Stok Listesi">
            <Tbl headers={[{ l: "Model" }, { l: "Şasi No" }, { l: "Kaynak" }, { l: "Alış Fiyatı" }, { l: "Durum" }, { l: "Çalışma Saati" }, { l: "İşlem", w: 0.5 }]} rows={3} note="Durum: Kontrol Bekliyor / Satışa Hazır / Satıldı. Sıfır stokla KARIŞTIRMAZ." />
          </Sc>
          <div style={{ display: "flex", gap: "8px" }}><Bt label="Kaydet" primary /><Bt label="İptal" /></div>
        </div>
      );

    case "ith-list":
      return (
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <St label="Toplam" value="8" />
            <St label="Taşımada" value="2" />
            <St label="Gümrükte" value="1" />
            <St label="Toplam" value="$1.2M" />
          </div>
          <Tb filters={["Durum"]} actions={[{ l: "Excel Import" }, { l: "+ İthalat Gir", p: 1 }]} />
          <Tbl headers={[{ l: "Proforma", s: 1 }, { l: "Fatura No" }, { l: "Tarih", s: 1 }, { l: "Makine" }, { l: "Toplam USD", s: 1 }, { l: "Ödeme" }, { l: "Kur (snapshot)" }, { l: "Durum" }, { l: "İşlem", w: 0.6 }]} rows={4} />
          <Fl steps={[{ l: "Taslak" }, { l: "Onaylı", c: "#DBEAFE" }, { l: "Taşımada", c: "#FEF3C7" }, { l: "Gümrükte", c: "#FFF7ED" }, { l: "Stokta", c: "#ECFDF5" }, { l: "Antrepoda", c: "#EDE9FE" }]} />
          <N text="YENİ: Excel/CSV import ile toplu proforma yükleme. Her işlem için kur snapshot'ı saklanır." type="new" />
        </div>
      );

    case "ith-form":
      return (
        <div>
          <Sc title="Proforma Bilgileri">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Fatura No *" />
              <F label="Sipariş No" />
              <F label="Tarih" />
              <F label="Ödeme Yöntemi" />
              <F label="Taşıma Şekli" />
              <F label="Döviz Kuru (TCMB otomatik)" />
              <F label="Tedarikçi" />
              <F label="Durum" />
              <F label="Not" />
            </div>
          </Sc>
          <N text="YENİ: Kur alanı TCMB API'den otomatik gelir. Kullanıcı isterse manuel değiştirebilir. İşlem tarihindeki kur snapshot olarak saklanır." type="new" />
          <Sc title="Makine Ekle (Envanterden + Şasi No)">
            <F label="Makine ara..." />
            <div style={{ height: "8px" }} />
            <Tbl headers={[{ l: "Model" }, { l: "Şasi No *" }, { l: "Adet" }, { l: "Birim Fiyat ($)" }, { l: "Toplam ($)" }, { l: "KDV" }, { l: "Sil", w: 0.4 }]} rows={3} />
            <div style={{ textAlign: "right", padding: "12px 0", fontSize: "14px", fontWeight: 800 }}>TOPLAM: $XXX.XXX (otomatik)</div>
          </Sc>
          <Sc title="Excel/CSV ile Toplu Yükleme">
            <B>
              <div style={{ textAlign: "center", padding: "12px" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>📄</div>
                <div style={{ fontSize: "11px", fontWeight: 600 }}>Proforma Excel dosyasını sürükle-bırak veya seç</div>
                <div style={{ fontSize: "10px", color: "#94A3B8", marginTop: "4px" }}>Makine kodu, şasi no, adet, fiyat sütunları eşleştirilir</div>
                <div style={{ marginTop: "8px" }}><Bt label="Dosya Seç" small /></div>
              </div>
            </B>
          </Sc>
          <div style={{ display: "flex", gap: "8px" }}><Bt label="Kaydet" primary /><Bt label="İptal" /></div>
        </div>
      );

    case "ith-odeme":
      return (
        <div>
          <Sc title="Ödeme Bilgileri">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <B label="Peşinat">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <F label="Peşinat Oranı (%)" />
                  <F label="Peşinat Tutarı (otomatik)" />
                  <F label="Peşinat Durumu" />
                  <F label="Ödeme Tarihi" />
                  <F label="Kur (o gün — snapshot)" />
                </div>
              </B>
              <B label="Akreditif (LC)">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <F label="LC Tutarı (otomatik)" />
                  <F label="LC Vade Süresi" />
                  <F label="LC Vade Tarihi" />
                  <F label="Banka" />
                  <F label="LC Durumu" />
                </div>
              </B>
            </div>
          </Sc>
          <Sc title="Ödeme Geçmişi">
            <Tbl headers={[{ l: "Tarih" }, { l: "Tutar" }, { l: "Kur (snapshot)" }, { l: "TL Karşılığı" }, { l: "Tür" }, { l: "Açıklama" }]} rows={2} />
          </Sc>
          <B label="Özet">
            <div style={{ display: "flex", gap: "20px", fontSize: "12px" }}>
              <span>Toplam: $500.000</span>
              <span>Ödenen: $100.000</span>
              <span style={{ fontWeight: 700, color: "#DC2626" }}>Kalan: $400.000</span>
              <Bd label="Kısmi Ödendi" color="#FEF3C7" />
            </div>
          </B>
          <div style={{ marginTop: "8px" }}><N text="YENİ: Her ödeme anındaki TCMB kuru snapshot olarak saklanır. Muhasebede kur farkı hesabı buna dayanır." type="new" /></div>
        </div>
      );

    case "ith-tasima":
      return (
        <div>
          <Sc title="Taşıma Bilgileri">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Nakliye Firması" />
              <F label="Navlun ($)" />
              <F label="Sigorta ($)" />
              <F label="Konteyner No" />
              <F label="Gemi / Araç" />
              <F label="Çıkış Limanı" />
              <F label="Varış Limanı" />
              <F label="Yükleme Tarihi" />
              <F label="Tahmini Varış" />
            </div>
          </Sc>
          <Fl steps={[{ l: "Yüklendi", c: "#DBEAFE" }, { l: "Yolda", c: "#FEF3C7" }, { l: "Limana Ulaştı", c: "#ECFDF5" }]} />
          <N text="Navlun + Sigorta toplam makine adedine eşit bölünür." />
        </div>
      );

    case "ith-gumruk":
      return (
        <div>
          <Fl steps={[{ l: "Limanda", c: "#FEF3C7" }, { l: "Gümrükte", c: "#FFF7ED" }, { l: "Millileşti", c: "#ECFDF5" }, { l: "Antrepoda", c: "#EDE9FE" }]} />
          <Sc title="Evrak Takibi">
            {["Gümrük Beyannamesi", "Menşe Belgesi", "Konşimento (B/L)", "Fatura", "Packing List", "TSE / TAREKS"].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", padding: "8px 0", borderBottom: "1px solid #E2E8F0", alignItems: "center" }}>
                <span style={{ flex: 2, fontSize: "11px", fontWeight: 600 }}>{e}</span>
                <Bd label={i < 3 ? "Yüklendi" : "Eksik"} color={i < 3 ? "#ECFDF5" : "#FEF2F2"} />
                <div style={{ flex: 1, height: "14px", background: "#E2E8F0", borderRadius: "3px" }} />
                <Bt label="Yükle" small />
              </div>
            ))}
          </Sc>
          <B label="Tamamlanma">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ flex: 1, height: "8px", background: "#E2E8F0", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "50%", height: "100%", background: "#F59E0B", borderRadius: "4px" }} />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700 }}>50%</span>
            </div>
          </B>
          <div style={{ height: "12px" }} />
          <div style={{ display: "flex", gap: "12px" }}>
            <B style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#059669" }}>MİLLİLEŞTİR</div>
              <div style={{ marginTop: "6px" }}><Bt label="Millileştir" primary small /></div>
            </B>
            <B style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#7C3AED" }}>ANTREPOYA AL</div>
              <div style={{ marginTop: "6px" }}><Bt label="Antrepoya Al" small /></div>
            </B>
          </div>
        </div>
      );

    case "ith-maliyet":
      return (
        <div>
          <N text="Her makine için ayrı maliyet — Excel formülüyle. Navlun eşit dağıtılır. Kur snapshot kullanılır." />
          <Sc title="SE215 — Şasi: SHTU2026001">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <B label="Fatura Bazlı Vergi">
                <div style={{ fontSize: "11px", color: "#64748B", lineHeight: "2.4" }}>
                  Fatura: $XXX | Navlun: $XXX | Sigorta: $XXX<br />CIF: $XXX | İGV (%5): $XXX<br />KDV Matrahı: $XXX<br />KDV — İNDİRİLEBİLİR: $XXX
                </div>
              </B>
              <B label="Gözetim Farkı" hl>
                <div style={{ fontSize: "11px", color: "#64748B", lineHeight: "2.4" }}>
                  Gözetim (DB): $131.550<br />Fark: $XXX | Fark İGV: $XXX<br /><span style={{ color: "#DC2626", fontWeight: 700 }}>Fark KDV — İNDİRİLEMEZ: $XXX</span>
                </div>
              </B>
            </div>
          </Sc>
          <Sc title="Ek Masraflar">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Liman Ardiye (TL)" />
              <F label="Gümrükleme (TL)" />
              <F label="Banka (TL)" />
              <F label="TSE/TAREKS (TL)" />
              <F label="Diğer (TL)" />
            </div>
          </Sc>
          <B label="GENEL TOPLAM" hl>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 800 }}>
              <span>$XXX.XXX</span>
              <span style={{ color: "#D97706" }}>XXX.XXX TL</span>
              <span style={{ color: "#059669" }}>Birim: XXX.XXX TL</span>
            </div>
          </B>
        </div>
      );

    case "sat-stok":
      return (
        <div>
          <Tb filters={["Kategori", "Durum", "Lokasyon", "Kaynak"]} actions={[{ l: "Toplu Fiyat Güncelle", g: 1 }]} bulk />
          <Tbl headers={[{ l: "☐", w: 0.3 }, { l: "Makine", s: 1, w: 1.5 }, { l: "Şasi No" }, { l: "Kategori" }, { l: "Lokasyon" }, { l: "Kaynak" }, { l: "Durum" }, { l: "Satış Fiyatı", s: 1 }, { l: "Detay", w: 0.4 }]} rows={5} note="Durum: Satışa Hazır / Antrepoda / 2.El / Kontrol Bekliyor. Toplu fiyat güncelleme ile seçilen makinelere % artış/azalış." />
        </div>
      );

    case "sat-musteri":
      return (
        <div>
          <Tb filters={["Ürün Alan", "Shantui Sahibi", "Kişi Tipi"]} actions={[{ l: "+ Yeni Müşteri", p: 1 }]} />
          <Tbl headers={[{ l: "Müşteri", s: 1, w: 2 }, { l: "Kişi Tipi" }, { l: "Tel" }, { l: "İl" }, { l: "Ürün Alan" }, { l: "Kullanıcılar" }, { l: "İşlem", w: 0.5 }]} rows={5} note="YENİ: Tüzel müşterilerde 'Kullanıcılar' sütunu — ana hesap + alt kullanıcı sayısı görünür." />
        </div>
      );

    case "sat-musteri-detay":
      return (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <B label="Müşteri Bilgileri">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <F label="Adı / Ünvanı" />
                <F label="Kişi Tipi" />
                <F label="Vergi No / TC" />
                <F label="Vergi Dairesi" />
                <F label="Telefon" />
                <F label="E-posta" />
                <F label="Adres" />
                <F label="İl / İlçe" />
              </div>
            </B>
            <B label="Durum & Alt Kullanıcılar">
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <Bd label="Ürün Alan: Evet" color="#ECFDF5" />
                <Bd label="Shantui Sahibi" color="#DBEAFE" />
              </div>
              <N text="YENİ: Tüzel müşterilerde alt kullanıcı yönetimi — Satın Alma Müdürü, Şantiye Şefi, Operatör vb. Her birinin ayrı yetkisi olabilir." type="new" />
              <div style={{ marginTop: "8px" }}><Tbl headers={[{ l: "Kullanıcı" }, { l: "Rol" }, { l: "Yetki" }, { l: "İşlem", w: 0.4 }]} rows={2} /></div>
              <div style={{ marginTop: "6px" }}><Bt label="+ Alt Kullanıcı Ekle" small primary /></div>
            </B>
          </div>
          <Sc title="Birleşik Zaman Çizelgesi (Timeline)">
            <N text="YENİ: Müşterinin tüm geçmişi tek akışta — satış, servis, yedek parça, ödeme hepsi kronolojik." type="new" />
            <div style={{ marginTop: "8px" }} />
            <Timeline items={[
              { d: "20.02.2026", t: "Servis: 1. Periyodik bakım yapıldı", s: "Teknisyen: Can A. — Garanti içi", c: "#10B981" },
              { d: "15.01.2026", t: "Satış: SE215 teslim edildi", s: "Şasi: SHTU2026001 — Garanti başladı", c: "#F59E0B" },
              { d: "10.01.2026", t: "Teklif onaylandı — Satış tamamlandı", s: "Teklif #TK-0042 — $118.000", c: "#3B82F6" },
              { d: "05.01.2026", t: "Teklif oluşturuldu", s: "Satış: Ali K.", c: "#8B5CF6" },
              { d: "28.12.2025", t: "İlk görüşme — Randevu", s: "Satış: Ali K. — Demo yapıldı", c: "#94A3B8" },
              { d: "20.12.2025", t: "Müşteri sisteme eklendi", s: "Satış: Ali K.", c: "#94A3B8" },
            ]} />
          </Sc>
        </div>
      );

    case "sat-teklif-list":
      return (
        <div>
          <Tb filters={["Durum"]} actions={[{ l: "+ Teklif Oluştur", p: 1 }]} />
          <Tbl headers={[{ l: "Teklif No", s: 1 }, { l: "Müşteri" }, { l: "Makine" }, { l: "Liste Fiyat" }, { l: "Teklif Fiyat" }, { l: "Fark %" }, { l: "Geçerlilik" }, { l: "Durum" }, { l: "İşlem", w: 0.6 }]} rows={4} />
          <Fl steps={[{ l: "Taslak" }, { l: "Onay Bekliyor", c: "#FEF3C7" }, { l: "Onaylı", c: "#DBEAFE" }, { l: "Satış OK", c: "#ECFDF5" }, { l: "Reddedildi", c: "#FEF2F2" }, { l: "Süresi Doldu", c: "#F3F4F6" }]} />
        </div>
      );

    case "sat-teklif-form":
      return (
        <div>
          <Sc title="Teklif Bilgileri">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Müşteri Seç *" />
              <F label="Para Birimi (USD/EUR/TL)" />
              <F label="Geçerlilik (gün)" />
              <F label="Satış Şekli (Normal/Leasing)" />
              <F label="Not" />
            </div>
          </Sc>
          <Sc title="Makine + Ekipman Seç">
            <F label="Makine/ekipman ara..." />
            <div style={{ height: "8px" }} />
            <Tbl headers={[{ l: "Ürün" }, { l: "Tip" }, { l: "Şasi" }, { l: "Liste Fiyat" }, { l: "Teklif Fiyat" }, { l: "Fark %" }, { l: "Sil", w: 0.3 }]} rows={2} />
            <N text="Satış personeli fiyatı serbestçe belirler. Admin onayda farkı görür." />
          </Sc>
          <Sc title="Leasing (Antrepo Satışı ise)">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Banka" />
              <F label="Leasing Süresi" />
              <F label="Referans No" />
            </div>
          </Sc>
          <div style={{ display: "flex", gap: "8px" }}><Bt label="Kaydet" primary /><Bt label="PDF Oluştur" ghost /><Bt label="İptal" /></div>
        </div>
      );

    case "sat-onay":
      return (
        <div>
          <Fl steps={[{ l: "1. Satış Teklif Oluşturur" }, { l: "2. Admin Onaylar", c: "#FEF3C7" }, { l: "3. Beklemede", c: "#DBEAFE" }, { l: "4. Satışı Onayla", c: "#ECFDF5" }]} />
          <B label="Admin Onay Ekranı">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              {[["Müşteri", "ABC İnşaat"], ["Liste", "$125.000"], ["Teklif", "$118.000"], ["Fark", "-5.6%"], ["Şekil", "Normal"], ["Geçerlilik", "15 gün"]].map((r, i) => (
                <div key={i} style={{ fontSize: "11px" }}><strong>{r[0]}:</strong> <span style={{ color: r[0] === "Fark" ? "#DC2626" : "#334155" }}>{r[1]}</span></div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px" }}><Bt label="Onayla" primary /><Bt label="Reddet" danger /></div>
          </B>
          <N text="Satış tamamlanınca: Stoktan düşer → Müşteriye bağlanır → Teslim formu açılır." />
        </div>
      );

    case "sat-teslim":
      return (
        <div>
          <Sc title="Teslim Formu">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Teslim Tarihi" />
              <F label="Teslim Yeri" />
              <F label="Garanti Başlangıç" />
              <F label="Garanti Bitiş (otomatik)" />
              <F label="Çalışma Saati" />
              <F label="Teslim Alan" />
              <F label="Lokasyon" />
              <F label="Not" />
            </div>
          </Sc>
          <N text="Garanti bitiş = başlangıç + envanterdeki garanti süresi." />
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}><Bt label="Teslimi Onayla" primary /><Bt label="İptal" /></div>
        </div>
      );

    case "sat-iade":
      return (
        <div>
          <N text="YENİ MODÜL: İptal ve iade süreçleri. Tersine lojistik." type="new" />
          <Sc title="İptal / İade Türü">
            <div style={{ display: "flex", gap: "12px" }}>
              <B style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "16px", marginBottom: "6px" }}>🚫</div>
                <div style={{ fontSize: "11px", fontWeight: 700 }}>Satış İptali</div>
                <div style={{ fontSize: "9px", color: "#64748B" }}>Teslim öncesi iptal</div>
              </B>
              <B style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "16px", marginBottom: "6px" }}>↩️</div>
                <div style={{ fontSize: "11px", fontWeight: 700 }}>İade Alma</div>
                <div style={{ fontSize: "9px", color: "#64748B" }}>Teslim sonrası iade</div>
              </B>
              <B style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "16px", marginBottom: "6px" }}>🔄</div>
                <div style={{ fontSize: "11px", fontWeight: 700 }}>Değişim</div>
                <div style={{ fontSize: "9px", color: "#64748B" }}>Başka makine ile değişim</div>
              </B>
            </div>
          </Sc>
          <Sc title="İptal/İade Formu">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Teklif/Satış No *" />
              <F label="Müşteri" />
              <F label="Makine + Şasi No" />
              <F label="İşlem Türü (İptal/İade/Değişim)" />
              <F label="Sebep" />
              <F label="Tarih" />
            </div>
          </Sc>
          <Sc title="İade Sonrası Makine Durumu">
            <div style={{ display: "flex", gap: "12px" }}>
              <B style={{ flex: 1 }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#D97706" }}>Kontrol Bekliyor</div>
                <div style={{ fontSize: "9px", color: "#64748B", marginTop: "4px" }}>Teknik kontrol + ekspertiz yapılacak</div>
              </B>
              <B style={{ flex: 1 }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#059669" }}>Sıfır Stoka Dön</div>
                <div style={{ fontSize: "9px", color: "#64748B", marginTop: "4px" }}>Sorun yoksa sıfır stoka geri döner</div>
              </B>
              <B style={{ flex: 1 }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#D97706" }}>2. El Kategorisine Al</div>
                <div style={{ fontSize: "9px", color: "#64748B", marginTop: "4px" }}>Kullanılmış, 2.el olarak satılır</div>
              </B>
            </div>
          </Sc>
          <Sc title="Muhasebe — İade İşlemleri">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <F label="İade Tutarı ($)" />
              <F label="İade Yöntemi (Nakit/Havale/Mahsup)" />
              <F label="İade Tarihi" />
              <F label="İade Durumu" />
            </div>
            <N text="Peşinat iadesi için muhasebede 'İade Ödemesi' kalemi oluşur." type="warn" />
          </Sc>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}><Bt label="İade/İptal İşlemini Kaydet" primary /><Bt label="İptal" /></div>
        </div>
      );

    case "sat-randevu":
      return (
        <div>
          <Tb filters={["Tarih", "Durum"]} actions={[{ l: "+ Randevu", p: 1 }]} />
          <Sc title="Takvim">
            <div style={{ height: "160px", border: "2px dashed #CBD5E1", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
              <span style={{ fontSize: "12px", color: "#94A3B8" }}>[ Aylık / Haftalık Takvim ]</span>
            </div>
          </Sc>
          <Sc title="Randevu Formu">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Müşteri (yoksa oluştur)" />
              <F label="İlgilendiği Makine" />
              <F label="Ziyaret Türü" />
              <F label="Tarih" />
              <F label="Saat" />
              <F label="Not" />
            </div>
          </Sc>
          <Sc title="Sonuç">
            <Fl steps={[{ l: "Planlandı" }, { l: "Gidildi", c: "#DBEAFE" }, { l: "Teklif Verildi", c: "#ECFDF5" }, { l: "2. Görüşme", c: "#FEF3C7" }, { l: "İptal", c: "#FEF2F2" }]} />
          </Sc>
          <N text="Satış personeli kendi randevularını, Admin tümünü görür. Mobile uyumlu tasarım — sahada tablet/telefondan kullanılabilir." />
        </div>
      );

    case "sat-onsiparis":
      return (
        <div>
          <Sc title="Ön Sipariş">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Müşteri" />
              <F label="Model (Envanterden)" />
              <F label="Adet" />
              <F label="Ekipman" />
              <F label="Tahmini Teslim" />
              <F label="Not" />
            </div>
          </Sc>
          <Fl steps={[{ l: "Talep" }, { l: "İthalata Bildirildi", c: "#DBEAFE" }, { l: "Üretimde", c: "#FEF3C7" }, { l: "Yolda", c: "#FFF7ED" }, { l: "Hazır", c: "#ECFDF5" }]} />
          <N text="Stokta olmayan makine için. Geldiğinde satışa dönüşür." />
        </div>
      );

    case "srv-talepler":
      return (
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <St label="Yeni" value="5" />
            <St label="Atandı" value="3" />
            <St label="İşlemde" value="2" />
            <St label="Tamamlandı" value="28" />
          </div>
          <Tb filters={["Durum", "Öncelik"]} actions={[]} />
          <Tbl headers={[{ l: "Talep No" }, { l: "Müşteri" }, { l: "Makine" }, { l: "Garanti" }, { l: "Teknisyen" }, { l: "İş Emri" }, { l: "Durum" }, { l: "İşlem", w: 0.5 }]} rows={4} note="YENİ: Her talep bir İş Emri'ne dönüşür. İş Emri ile yedek parça stoku otomatik düşer." />
          <N text="Talep havuza düşer → Admin teknisyene atar → İş Emri oluşur." type="info" />
        </div>
      );

    case "srv-isemri":
      return (
        <div>
          <N text="YENİ EKRAN: İş Emri (Work Order). Teknisyen kullandığı parçaları girer, stok otomatik düşer, maliyet otomatik hesaplanır." type="new" />
          <Sc title="İş Emri Detay">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <B label="İşlem Bilgileri">
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <F label="Yapılan İşlem" />
                  <F label="Garanti İçi / Dışı" />
                  <F label="Teknisyen" />
                  <F label="Başlangıç Tarihi" />
                  <F label="Bitiş Tarihi" />
                  <F label="İşçilik Ücreti" />
                  <F label="Not" />
                </div>
              </B>
              <B label="Kullanılan Parçalar (Stoktan Otomatik Düşer)" warn>
                <Tbl headers={[{ l: "Parça Kodu" }, { l: "Parça Adı" }, { l: "Adet" }, { l: "Birim Fiyat" }, { l: "Toplam" }]} rows={3} />
                <div style={{ marginTop: "6px" }}><F label="Parça ara ve ekle..." /></div>
                <N text="Teknisyen parça eklediğinde Yedek Parça stokundan OTOMATİK düşer ve muhasebede maliyet kalemi oluşur." type="warn" />
              </B>
            </div>
          </Sc>
          <B label="Maliyet Özet">
            <div style={{ display: "flex", gap: "20px", fontSize: "12px" }}>
              <span>İşçilik: XXX TL</span>
              <span>Parça: XXX TL</span>
              <span style={{ fontWeight: 700 }}>Toplam: XXX TL</span>
              <Bd label="Garanti İçi — Firma Ödüyor" color="#ECFDF5" />
            </div>
          </B>
        </div>
      );

    case "srv-gecmis":
      return (
        <div>
          <Tb filters={["Makine", "Müşteri"]} actions={[]} />
          <Tbl headers={[{ l: "Tarih", s: 1 }, { l: "Makine" }, { l: "İşlem" }, { l: "Parçalar" }, { l: "Teknisyen" }, { l: "Maliyet", s: 1 }, { l: "Garanti" }]} rows={5} />
        </div>
      );

    case "srv-dokuman":
      return (
        <div>
          <Tb filters={["Model", "Tip"]} actions={[{ l: "+ Yükle", p: 1 }]} />
          <Sc title="Servis Manuelleri">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
              {["SE215 Manual", "SE75 Manual", "DH24-M Manual", "LK58-M Manual"].map((d, i) => (
                <div key={i} style={{ border: "2px dashed #CBD5E1", borderRadius: "8px", padding: "16px", textAlign: "center", background: "#F8FAFC" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>📄</div>
                  <div style={{ fontSize: "11px", fontWeight: 600 }}>{d}</div>
                </div>
              ))}
            </div>
          </Sc>
          <Sc title="Dijital Kataloglar">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
              {["Ekskavatör", "Dozer", "Loader", "Yedek Parça"].map((d, i) => (
                <div key={i} style={{ border: "2px dashed #CBD5E1", borderRadius: "8px", padding: "16px", textAlign: "center", background: "#F8FAFC" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>📕</div>
                  <div style={{ fontSize: "11px", fontWeight: 600 }}>{d}</div>
                </div>
              ))}
            </div>
          </Sc>
        </div>
      );

    case "yp-katalog":
      return (
        <div>
          <Tb filters={["Kategori", "Uyumlu Model"]} actions={[{ l: "Excel Yükle" }, { l: "+ Ürün Ekle", p: 1 }]} />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: "flex", gap: "12px", padding: "12px", borderBottom: "1px solid #E2E8F0", alignItems: "center", background: "#fff", border: "1px solid #E2E8F0", borderRadius: i === 1 ? "8px 8px 0 0" : i === 4 ? "0 0 8px 8px" : "0", marginTop: i === 1 ? 0 : "-1px" }}>
              <div style={{ width: "48px", height: "48px", background: "#E2E8F0", borderRadius: "8px", flexShrink: 0 }} />
              <div style={{ flex: 2 }}>
                <div style={{ height: "12px", background: "#E2E8F0", borderRadius: "3px", width: "60%", marginBottom: "4px" }} />
                <div style={{ height: "10px", background: "#F1F5F9", borderRadius: "3px", width: "40%" }} />
              </div>
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} style={{ flex: 1, height: "14px", background: "#E2E8F0", borderRadius: "3px" }} />
              ))}
              <Bt label="Sepete Ekle" small primary />
            </div>
          ))}
          <N text="Görsel + Stok Kodu + Ad + Marka + Fiyat + İskonto + KDV Hariç + Stok. Excel toplu yükleme." />
        </div>
      );

    case "yp-talepler":
      return (
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <St label="Yeni" value="8" />
            <St label="Fiyat Verildi" value="3" />
            <St label="Kargoda" value="2" />
            <St label="Teslim" value="15" />
          </div>
          <Tbl headers={[{ l: "Talep No", s: 1 }, { l: "Müşteri" }, { l: "Ürünler" }, { l: "Toplam" }, { l: "Durum" }, { l: "Kargo" }, { l: "İşlem", w: 0.5 }]} rows={4} />
          <Fl steps={[{ l: "Yeni" }, { l: "İnceleniyor", c: "#DBEAFE" }, { l: "Fiyat Verildi", c: "#FEF3C7" }, { l: "Onaylandı", c: "#ECFDF5" }, { l: "Kargoda", c: "#E0F2FE" }, { l: "Teslim", c: "#ECFDF5" }]} />
        </div>
      );

    case "mus-makine":
      return (
        <div>
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "100px", height: "100px", background: "#E2E8F0", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>🏗️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>SE215 — SHTU2026001</div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <Bd label="Garanti: 340 gün" color="#ECFDF5" />
                <Bd label="1.250 saat" color="#DBEAFE" />
              </div>
              <div style={{ fontSize: "11px", color: "#64748B" }}>Teslim: 15.01.2026 | Garanti Bitiş: 15.01.2028</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <B label="Teknik Özellikler"><div style={{ fontSize: "11px", color: "#64748B", lineHeight: "2.2" }}>Motor: 129 kW | Kova: 0.45-1.2 m3<br />Max Kazı: 6.510 mm | Emisyon: Stage V</div></B>
            <B label="Servis Bakım Saatleri"><div style={{ fontSize: "11px", color: "#64748B", lineHeight: "2.2" }}>250s — Yağ+Filtre | 500s — Genel<br />1000s — Büyük | 2000s — Revizyon</div></B>
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <Bt label="Servis Talebi" primary /><Bt label="Yedek Parça" /><Bt label="Servis Manueli" />
          </div>
        </div>
      );

    case "mus-servis":
      return (
        <div>
          <Sc title="Yeni Talep">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <F label="Makine Seç" />
              <F label="Talep Türü" />
              <F label="Açıklama" />
              <F label="Öncelik" />
            </div>
            <div style={{ marginTop: "12px" }}><Bt label="Gönder" primary /></div>
          </Sc>
          <Sc title="Taleplerim">
            <Tbl headers={[{ l: "No" }, { l: "Makine" }, { l: "Tarih" }, { l: "Durum" }, { l: "Teknisyen" }]} rows={2} />
          </Sc>
        </div>
      );

    case "mus-yp":
      return (
        <div>
          <N text="Kendi makinesine uyumlu parçalar öne çıkar, tüm katalog görünür." />
          <Tb filters={["Kategori"]} actions={[]} />
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <Bd label="Makinem: SE215" color="#FEF3C7" />
            <Bd label="Tüm Katalog" />
          </div>
          <Tbl headers={[{ l: "Görsel", w: 0.5 }, { l: "Kod" }, { l: "Ad", w: 2 }, { l: "Fiyat" }, { l: "Stok" }, { l: "Adet", w: 0.5 }, { l: "Sepet", w: 0.5 }]} rows={3} />
          <B>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px" }}>3 ürün — XXX TL</span>
              <Bt label="Teklif Talep Et" primary />
            </div>
          </B>
          <Sc title="Siparişlerim">
            <Tbl headers={[{ l: "No" }, { l: "Ürünler" }, { l: "Tarih" }, { l: "Toplam" }, { l: "Durum" }, { l: "Kargo" }]} rows={2} />
          </Sc>
        </div>
      );

    case "muh-genel":
      return (
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <St label="İthalat Maliyet" value="$1.2M" />
            <St label="Ödeme Bekleyen" value="$400K" />
            <St label="Satış Gelir" value="$890K" />
            <St label="Kâr/Zarar" value="+$210K" />
          </div>
          <Sc title="İthalat Maliyetleri">
            <Tbl headers={[{ l: "Proforma" }, { l: "Maliyet", s: 1 }, { l: "Navlun" }, { l: "Gümrük" }, { l: "KDV İndir." }, { l: "KDV İndirilmez" }, { l: "Ödeme" }]} rows={2} />
          </Sc>
          <Sc title="Ödeme Takibi">
            <Tbl headers={[{ l: "Proforma" }, { l: "Yöntem" }, { l: "Toplam" }, { l: "Ödenen" }, { l: "Kalan" }, { l: "Vade" }, { l: "Durum" }]} rows={2} />
          </Sc>
          <Sc title="Satış Gelirleri">
            <Tbl headers={[{ l: "Teklif" }, { l: "Müşteri" }, { l: "Maliyet" }, { l: "Satış" }, { l: "Kâr" }, { l: "Kâr %", s: 1 }]} rows={2} />
          </Sc>
          <Sc title="İade Ödemeleri">
            <Tbl headers={[{ l: "İade No" }, { l: "Müşteri" }, { l: "Tutar" }, { l: "Yöntem" }, { l: "Tarih" }, { l: "Durum" }]} rows={1} />
          </Sc>
          <N text="Muhasebe görüntüle — müdahale edemez. PDF/Excel çıktı." />
        </div>
      );

    case "muh-kurfarki":
      return (
        <div>
          <N text="YENİ EKRAN: Kur farkı analizi. Her işlem için snapshot kuru ve güncel kur karşılaştırılır." type="new" />
          <Sc title="TCMB Kur Entegrasyonu">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <B label="Güncel Kur">
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#334155" }}>₺43.14</div>
                <div style={{ fontSize: "10px", color: "#94A3B8" }}>TCMB — 09.03.2026</div>
              </B>
              <B label="Proforma Kuru (Snapshot)">
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#D97706" }}>₺41.80</div>
                <div style={{ fontSize: "10px", color: "#94A3B8" }}>IMP-2026-001 — 15.01.2026</div>
              </B>
              <B label="Kur Farkı" hl>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#DC2626" }}>+₺1.34 / $</div>
                <div style={{ fontSize: "10px", color: "#92400E" }}>Toplam etki: +₺670.000</div>
              </B>
            </div>
          </Sc>
          <Sc title="İşlem Bazlı Kur Snapshot'ları">
            <Tbl headers={[{ l: "İşlem" }, { l: "Tarih" }, { l: "İşlem Kuru" }, { l: "Güncel Kur" }, { l: "Fark" }, { l: "Etki ($)" }, { l: "Etki (TL)" }]} rows={4} />
          </Sc>
          <N text="Her proforma, ödeme, fatura için işlem tarihindeki TCMB kuru saklanır. Kâr/zarar bu kur farklarına göre hesaplanır." type="info" />
        </div>
      );

    case "raporlar":
      return (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            {[
              { i: "📦", t: "İthalat", d: "Proforma, maliyet, durum" },
              { i: "💰", t: "Satış", d: "Aylık/yıllık, personel bazlı" },
              { i: "🔧", t: "Servis", d: "Talep sayısı, çözüm süresi" },
              { i: "⚙️", t: "Yedek Parça", d: "En çok satılan, stok" },
              { i: "🏗️", t: "Stok", d: "Makine, lokasyon, kaynak" },
              { i: "📊", t: "Kâr / Zarar", d: "Maliyet vs satış + kur farkı" }
            ].map((r, i) => (
              <div key={i} style={{ border: "2px dashed #CBD5E1", borderRadius: "8px", padding: "20px", textAlign: "center", background: "#F8FAFC" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{r.i}</div>
                <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{r.t}</div>
                <div style={{ fontSize: "10px", color: "#94A3B8" }}>{r.d}</div>
                <div style={{ marginTop: "10px" }}><Bt label="Oluştur" small /></div>
              </div>
            ))}
          </div>
          <N text="Tarih aralığı, filtreler, PDF/Excel çıktı." />
        </div>
      );

    case "log":
      return (
        <div>
          <N text="YENİ EKRAN: Tüm sistem işlemlerinin kaydı. Kim, ne zaman, ne yaptı? Admin görüntüler." type="new" />
          <Tb filters={["Modül", "Kullanıcı", "Tarih"]} actions={[{ l: "Excel Aktar" }]} />
          <Timeline items={[
            { d: "Bugün 14:32", t: "Fiyat Değişikliği: SE215 → $120.000 → $118.000", s: "Kullanıcı: Ali K. (Satış) | Modül: Satış", c: "#F59E0B" },
            { d: "Bugün 11:15", t: "Evrak Yüklendi: Gümrük Beyannamesi", s: "Kullanıcı: Mehmet D. (İthalat) | Modül: İthalat", c: "#3B82F6" },
            { d: "Bugün 09:45", t: "Yeni Müşteri Eklendi: ABC İnşaat A.Ş.", s: "Kullanıcı: Zeynep K. (Satış) | Modül: Satış", c: "#10B981" },
            { d: "Dün 16:30", t: "Teklif Silindi: TK-0039", s: "Kullanıcı: Ali K. (Satış) | Modül: Satış", c: "#DC2626" },
            { d: "Dün 14:00", t: "Şasi No Düzeltildi: SHTU2026001 → SHTU2026002", s: "Kullanıcı: Admin | Modül: Envanter", c: "#8B5CF6" },
            { d: "Dün 10:15", t: "Stok Lokasyon Değişikliği: İstanbul → Mersin", s: "Kullanıcı: Admin | Modül: Envanter", c: "#94A3B8" },
          ]} />
          <div style={{ marginTop: "12px" }}>
            <Tbl headers={[{ l: "Tarih", s: 1 }, { l: "Kullanıcı" }, { l: "Rol" }, { l: "Modül" }, { l: "İşlem", w: 2 }, { l: "Detay" }]} rows={6} />
          </div>
        </div>
      );

    case "ayarlar":
      return (
        <div>
          <Sc title="Genel Parametreler">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <F label="Döviz Kuru (TCMB Otomatik)" />
              <F label="KDV — Ekskavatör (%)" />
              <F label="KDV — Loader/Dozer (%)" />
              <F label="İGV (%)" />
              <F label="Ekskavatör $/KG" />
              <F label="Loader $/KG" />
              <F label="Dozer $/KG" />
            </div>
            <N text="YENİ: TCMB API entegrasyonu — kur otomatik güncellenir. Manuel override opsiyonel." type="new" />
          </Sc>
          <Sc title="Lokasyon / Depo">
            <Tbl headers={[{ l: "Ad" }, { l: "Adres" }, { l: "İl" }, { l: "Yetkili" }, { l: "İşlem", w: 0.5 }]} rows={2} />
            <div style={{ marginTop: "8px" }}><Bt label="+ Lokasyon" primary small /></div>
          </Sc>
          <Sc title="PDF Şablonları">
            <div style={{ display: "flex", gap: "12px" }}>
              {["Teklif Şablonu", "Proforma Şablonu"].map((s, i) => (
                <div key={i} style={{ flex: 1, border: "2px dashed #CBD5E1", borderRadius: "8px", padding: "16px", textAlign: "center", background: "#F8FAFC" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>📄</div>
                  <div style={{ fontSize: "11px", fontWeight: 600 }}>{s}</div>
                  <div style={{ marginTop: "8px" }}><Bt label="Değiştir" small /></div>
                </div>
              ))}
            </div>
          </Sc>
          <Sc title="Kullanıcı Yönetimi">
            <Tbl headers={[{ l: "Ad Soyad" }, { l: "E-posta" }, { l: "Rol" }, { l: "Durum" }, { l: "İşlem", w: 0.5 }]} rows={3} />
            <div style={{ marginTop: "8px" }}><Bt label="+ Kullanıcı" primary small /></div>
          </Sc>
          <Sc title="Bildirim Ayarları">
            <div style={{ fontSize: "11px", color: "#64748B", lineHeight: "2.2" }}>
              E-posta: Aktif | Sistem içi: Aktif<br />Müşteriye: Teklif, Servis, Kargo, Ön Sipariş
            </div>
          </Sc>
        </div>
      );

    default:
      return <div style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>Sayfa bulunamadı. Lütfen menüden bir sayfa seçin.</div>;
  }
};

/* ═══ MAIN COMPONENT ═══ */
export default function WireframeV3() {
  const [cp, setCp] = useState("dash-admin");
  const [gs, setGs] = useState(false);

  const groups = {};
  Object.keys(PG).forEach((k) => {
    const g = PG[k].g;
    if (!groups[g]) groups[g] = [];
    groups[g].push({ k: k, t: PG[k].t });
  });

  const order = ["Genel", "Dashboard", "Envanter", "İthalat", "Satış", "Servis", "Yedek Parça", "Müşteri Paneli", "Muhasebe", "Raporlar", "Sistem"];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", display: "flex", minHeight: "100vh", background: "#F1F5F9", color: "#334155" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: "240px", background: "#fff", borderRight: "1px solid #E2E8F0", overflowY: "auto", flexShrink: 0 }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#F59E0B,#D97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "11px" }}>SY</span>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#F59E0B" }}>WIREFRAME v3.1</div>
              <div style={{ fontSize: "9px", color: "#94A3B8" }}>{Object.keys(PG).length} ekran | Stabilite Güncellemesi</div>
            </div>
          </div>
        </div>
        
        {order.map((g) => {
          if (!groups[g]) return null;
          return (
            <div key={g} style={{ marginBottom: "2px" }}>
              <div style={{ padding: "8px 16px 3px", fontSize: "9px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {g}
              </div>
              {groups[g].map((p) => {
                const act = cp === p.k;
                return (
                  <button 
                    key={p.k} 
                    onClick={() => { setCp(p.k); setGs(false); }} 
                    style={{ 
                      display: "block", width: "100%", textAlign: "left", padding: "5px 16px 5px 22px", 
                      border: "none", cursor: "pointer", fontSize: "11px", fontWeight: act ? 700 : 500, 
                      color: act ? "#F59E0B" : "#64748B", background: act ? "#FFFBEB" : "transparent", 
                      borderLeft: act ? "3px solid #F59E0B" : "3px solid transparent", fontFamily: "'DM Sans', sans-serif" 
                    }}
                  >
                    {p.t}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        {/* HEADER with Global Search */}
        <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "10px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "9px", color: "#94A3B8" }}>{PG[cp]?.g || "Sayfa Bulunamadı"}</div>
            <div style={{ fontSize: "15px", fontWeight: 700 }}>{PG[cp]?.t || "Hata"}</div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Global Search - Spotlight */}
            <div 
              onClick={() => setGs(!gs)} 
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 16px", background: "#F1F5F9", borderRadius: "8px", border: "1px solid #E2E8F0", cursor: "pointer", minWidth: "200px" }}
            >
              <span style={{ fontSize: "12px" }}>🔍</span>
              <span style={{ fontSize: "11px", color: "#94A3B8", userSelect: "none" }}>Ara... (müşteri, şasi, proforma)</span>
              <span style={{ marginLeft: "auto", fontSize: "9px", color: "#CBD5E1", background: "#E2E8F0", padding: "2px 6px", borderRadius: "4px" }}>⌘K</span>
            </div>
            {/* Notification */}
            <div style={{ position: "relative", width: "32px", height: "32px", background: "#F1F5F9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "14px" }}>🔔</span>
              <div style={{ position: "absolute", top: "4px", right: "4px", width: "7px", height: "7px", borderRadius: "50%", background: "#EF4444" }} />
            </div>
            {/* Avatar */}
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg,#F59E0B,#D97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "10px" }}>VK</span>
            </div>
          </div>
        </div>

        {/* Global Search Modal */}
        {gs && (
          <div style={{ position: "absolute", top: "60px", right: "120px", width: "420px", background: "#fff", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", border: "1px solid #E2E8F0", padding: "16px", zIndex: 100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span>🔍</span>
              <div style={{ flex: 1, height: "36px", background: "#F1F5F9", borderRadius: "8px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", padding: "0 12px" }}>
                <span style={{ fontSize: "12px", color: "#94A3B8" }}>Müşteri, makine, şasi no, proforma no...</span>
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#94A3B8", marginBottom: "8px" }}>HIZLI ERİŞİM</div>
            {[
              { t: "SHTU2026001", s: "SE215 — Makine Detay", i: "🏗️", k: "env-detay" },
              { t: "ABC İnşaat", s: "Müşteri Detay", i: "👤", k: "sat-musteri-detay" },
              { t: "IMP-2026-001", s: "Proforma — Gümrükte", i: "📦", k: "ith-gumruk" },
              { t: "TK-0042", s: "Teklif — Onay Bekliyor", i: "📋", k: "sat-onay" }
            ].map((r, i) => (
              <div 
                key={i} 
                onClick={() => { setCp(r.k); setGs(false); }}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", borderRadius: "6px", cursor: "pointer", hover: { background: "#F8FAFC" } }}
              >
                <span>{r.i}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600 }}>{r.t}</div>
                  <div style={{ fontSize: "10px", color: "#94A3B8" }}>{r.s}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #E2E8F0", fontSize: "9px", color: "#94A3B8", textAlign: "center" }}>
              Menüyü kapatmak için arama çubuğuna tekrar tıklayın.
            </div>
          </div>
        )}

        {/* CONTENT RENDERER */}
        <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto", position: "relative" }}>
          {R(cp)}
        </div>
      </div>
    </div>
  );
}