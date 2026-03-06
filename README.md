# Frontend Prototype

## Proje yapısı
- `src/app`: route yapısı (admin + portal)
- `src/components`: layout/shared/domain bileşenleri
- `src/types/domain.ts`: tüm domain interface
- `src/data/mock/index.ts`: modüller arası ilişkili mock data
- `src/features`: frontend state/store

## Mock data
Mock veriler ID ilişkileriyle bağlıdır (machineId, customerId, requestId). Böylece ekranlar gerçek ürün hissi verir.

## Placeholder modüller
- Muhasebe V2 (`/accounting`, `/accounting/leasing`)

## Backend entegrasyon noktası
- `src/data/mock` yerine service/repository katmanı bağlanmalıdır.
- Sayfalar veri kaynağından bağımsız reusable bileşenlerle tasarlanmıştır.
