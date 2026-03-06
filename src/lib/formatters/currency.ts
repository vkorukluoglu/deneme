export const formatCurrency=(n:number,c:string="TRY")=>new Intl.NumberFormat("tr-TR",{style:"currency",currency:c as any,maximumFractionDigits:0}).format(n);
