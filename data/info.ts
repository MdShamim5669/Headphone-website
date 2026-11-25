import type { Block } from "@/components/info/InfoPage";
type Info = { kicker: string; title: string; intro: string; blocks: Block[]; updated?: string };
const U = "November 2026";
export const INFO: Record<string, Info> = {
  about: { kicker: "About", title: "Sound you can see", intro: "SONIQ builds wireless headphones and lets you explore every curve in 3D before you buy.", blocks: [
    { h: "Our story", p: ["SONIQ started with one idea: buying headphones online should feel as good as trying them on in a store. So every product on this site is a real 3D model you can spin, zoom and inspect."] },
    { h: "What we care about", p: ["Honest specs, long battery life, comfort for all-day wear, and repairable parts. We test every model for at least 200 hours before it goes on sale."] },
    { h: "Worldwide", p: ["We ship to more than 60 countries, including Bangladesh, with duties shown at checkout."] } ] },
  shipping: { kicker: "Support", title: "Shipping", intro: "Fast, tracked delivery worldwide. Free on orders over $150.", updated: U, blocks: [
    { h: "Processing time", p: ["Orders placed before 2 PM ship the same business day. Others ship within 24 hours."] },
    { h: "Rates & delivery times", p: ["Standard (3–5 business days): $9.99, free over $150.", "Express (1–2 business days): $19.99.", "International (5–10 business days): calculated at checkout, duties included."] },
    { h: "Tracking", p: ["You get a tracking link by email as soon as your order leaves our warehouse."] } ] },
  returns: { kicker: "Support", title: "Returns & refunds", intro: "30 days to change your mind. No questions asked.", updated: U, blocks: [
    { h: "How to return", p: ["Contact us with your order number. We email a prepaid return label within one business day."] },
    { h: "Refunds", p: ["Refunds go back to your original payment method within 5 business days after we receive the item."] },
    { h: "Exchanges", p: ["Want a different color or model? Choose exchange and we ship the new pair as soon as your return is scanned."] } ] },
  warranty: { kicker: "Support", title: "Warranty", intro: "Every SONIQ headphone is covered by a 2-year limited warranty.", updated: U, blocks: [
    { h: "What is covered", p: ["Manufacturing defects in materials and workmanship, including drivers, buttons, charging ports and Bluetooth hardware.", "Free battery replacement during the first year."] },
    { h: "What is not covered", p: ["Accidental damage, water damage beyond the stated rating, normal wear of ear cushions, and unauthorized repairs."] },
    { h: "Make a claim", p: ["Send your order number and a short description through the contact page. Most claims are approved within 48 hours."] } ] },
  privacy: { kicker: "Legal", title: "Privacy policy", intro: "We collect only what we need to run the store and never sell your data.", updated: U, blocks: [
    { h: "Data we collect", p: ["Order details (name, address, email, phone), payment confirmations from our payment provider (we never see your full card number), and anonymous analytics if you accept cookies."] },
    { h: "How we use it", p: ["To process and ship orders, send order updates, answer support requests, and—only if you subscribe—send our newsletter."] },
    { h: "Your rights", p: ["You can ask us to access, correct, export or delete your data at any time through the contact page."] },
    { h: "Cookies", p: ["Essential cookies keep your cart working. Analytics cookies are optional and only load after you accept them in the cookie banner."] } ] },
  terms: { kicker: "Legal", title: "Terms of service", intro: "The rules for using this site and buying from SONIQ.", updated: U, blocks: [
    { h: "Orders", p: ["An order is confirmed when you receive a confirmation email. We may cancel orders affected by pricing errors or stock problems and will refund you in full."] },
    { h: "Prices", p: ["Prices are shown in USD and include applicable discounts. Taxes and shipping are shown before you pay."] },
    { h: "Use of the site", p: ["The 3D models, images and text on this site belong to SONIQ or its licensors and may not be copied for commercial use."] },
    { h: "Liability", p: ["To the extent allowed by law, our liability is limited to the amount you paid for the product."] } ] },
};
