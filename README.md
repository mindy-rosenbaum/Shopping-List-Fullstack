# 🛒 Shopping Store - Full Stack Enterprise System

מערכת מלאה מקצה לקצה לניהול חנות מקוונת, המשלבת ארכיטקטורת Microservices, חיפוש מתקדם ב-Elasticsearch וממשק משתמש מודרני.

## 🏗 ארכיטקטורת המערכת
הפרויקט בנוי משלושה רכיבים המקשרים בין טכנולוגיות שונות:

* **[Frontend (React)](./client):** ממשק הלקוח, מבוסס Vite ו-TypeScript.
* **[Order Service (Node.js)](./backend-node):** שירות ניהול הזמנות המקושר ל-Elasticsearch.
* **[Product Service (.NET 8)](./backend-dotnet):** שרת הליבה לניהול מוצרים וקטגוריות מול SQL Server.
---

## ☁️ תכנון ארכיטקטורה בענן (Cloud Architecture)
חלק מהותי מהפרויקט עוסק בתכנון המערכת לסביבת ענן מודרנית. כל חומרי התכנון מרוכזים בתיקיית `docs`:

* **🖼️ תרשים ארכיטקטורה:** ויזואליזציה של הרכיבים והקשרים ביניהם (AWS):
  ![Cloud Architecture Diagram](./docs/AWS_Architecture.png)

* **📄 [מסמך אפיון מפורט (Word)](./docs/AWS_Architecture.docx):** ניתוח מעמיק של הרכיבים, שיקולי Scalability ובחירת טכנולוגיות ענן.
* **📖 [מדריך ענן (README)](./docs/AWS_Architecture.md):** הסבר מהיר בפורמט Markdown על הארכיטקטורה המוצעת והיתרונות שלה.

ניתן לגשת לכל חומרי ההסבר כאן: **[מעבר לתיקיית התיעוד המלאה (Docs)](./docs)**

---
## 🏗 תשתיות ומסדי נתונים (Infrastructure)
כל קבצי הגדרת התשתית מרוכזים בתיקיית `/infrastructure` בשורש הפרויקט:

* **Docker & Elasticsearch:** הרצת Elasticsearch בקונטיינר באמצעות Docker Compose.
* **SQL Server:** סקריפט `db_script.sql` להקמת טבלאות המוצרים והקטגוריות.
* **Mapping:** הגדרת המפינג המקצועי (`orderMapping.ts`) נטענת אוטומטית על ידי שרת ה-Node.

## 🛠 טכנולוגיות
- **Client:** React 18, Vite, TypeScript, Tailwind CSS.
- **Backend Node:** Express, Elasticsearch Client, dotenv.
- **Backend .NET:** C#, ASP.NET Core Web API, Entity Framework.
- **Databases:** SQL Server (Products), Elasticsearch (Orders).

## 🏃‍♂️ הוראות הרצה למערכת המלאה

כדי שהמערכת תעבוד בצורה תקינה, יש להפעיל את הרכיבים לפי הסדר הבא:

### 1. תשתיות ומסדי נתונים (Docker) 🗄️

 לפני הכל, ודאו ש-**Docker Desktop** מותקן ורץ.
### הורדת Docker Desktop
  הורידו והתקינו את הגרסה המתאימה למערכת ההפעלה שלכם מהאתר הרשמי:
  [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
  *האתר יזהה אוטומטית אם המחשב שלכם מבוסס Windows או Mac (Intel/Apple Chip).*
   1. פתחו טרמינל בתיקיית `infrastructure`.
   2. הריצו את הפקודה:
      ```bash
      docker-compose up -d
   3. המתינו כ 30 שניות לעלייה מלאה של השרתים

### 2. 🛠️ הקמת בסיס הנתונים (SQL Server)

לאחר שהדוקר רץ, עליכם להקים את מבנה הנתונים:
   1. פתחו את **SQL Server Management Studio (SSMS)** או כל כלי ניהול SQL אחר.
   2. התחברו לשרת עם הפרטים הבאים:
         * **Server Name:** `localhost,1433`
         * **Authentication:** `SQL Server Authentication`
         * **Login:** `sa`
         * **Password:** `YourStrongPassword123!`
         * **CRITICAL:** Click on **Options >>**, go to **Connection Properties** and check the **"Trust server certificate"** box.
   3. לאחר ההתחברות, גררו לתוך התוכנה את הקובץ: `infrastructure/db-script.sql`.
   4. לחצו על **Execute** (או F5) להרצת הסקריפט.
         * *פעולה זו תיצור את מסד הנתונים, הטבלאות ותזין נתונים ראשוניים.*

### 3. שרת ההזמנות (Node.js):
   - כנסו לתיקיית `backend-node`.
   - העתיקו את `.env.example` ל-`.env`.
   - הריצו `npm install` ולאחר מכן `npm run dev`.

### 4. שרת הקטלוג (.NET):
   - כנסו לתיקיית `backend-dotnet`.
   - ודאו שה-Connection String ב-`appsettings.json` תקין.
   - הריצו את הפקודה `dotnet run` (או דרך Visual Studio).

### 5. ממשק המשתמש (React):
   - כנסו לתיקיית `client`.
   - הריצו `npm install` ולאחר מכן `npm run dev`.
   - פתחו את הדפדפן בכתובת שתוצג (בדרך כלל `http://localhost:5173`).

### דגשים חשובים
* מערכת הelasticsearch   מוגדרת לעבוד ללא אבטחה (xpack.security.enabled=false) לצורך סביבת פיתוח בלבד.
* סדר פעולות: חובה להפעיל את ה-Elasticsearch לפני שרת ה-Node.js כדי למנוע שגיאות חיבור.
---
מפתחת : מינדי רוזנבאום 2025 
