# 🛒 Shopping Store - Backend (Node.js & Elasticsearch)

זהו שירות Backend חזק ואמין עבור אפליקציית חנות, שנבנה באמצעות **Node.js** ו-**Elasticsearch**.

## 🚀 תכונות מרכזיות
- **תשתית אוטומטית:** השרת מזהה ומאתחל באופן אוטומטי את האינדקס וה-Mapping ב-Elasticsearch עם עליית המערכת.
- **שלמות נתונים (Data Integrity):** שימוש ב-**Nested Mappings** עבור פריטי ההזמנה כדי להבטיח דיוק מירבי בחיפושים ובסינונים.
- **בטיחות טיפוסים (Type Safety):** הפרויקט נכתב ב-**TypeScript** כדי להבטיח מבנה נתונים אחיד בין ה-Frontend לבסיס הנתונים.

## 🏗 פרטי התשתית
סכימת הנתונים של Elasticsearch מוגדרת בקובץ `src/infrastructure/orderMapping.ts`.
- **Nested Items:** כל מוצר בתוך הזמנה שומר על הטווח שלו (מזהה, שם, מחיר וכמות) ללא ערבוב נתונים.
- **שדות Keyword:** כתובות אימייל מוגדרות כ-Keyword לצורך חיפוש מדויק (Exact Match).

## 🛠 התקנה והרצה
1. **דרישות קדם:** וודאו שמותקן Node.js ושרת Elasticsearch 8 רץ בכתובת `localhost:9200`.
2. צרו קובץ .env על בסיס .env.example ומלאו את הפרטים.
3. **התקנת תלויות:** הריצו את הפקודה `npm install`.
4. **הפעלת השרת:** הריצו את הפקודה `npm run dev`.

השרת ייצור באופן אוטומטי את האינדקס `orders` במידה והוא אינו קיים.