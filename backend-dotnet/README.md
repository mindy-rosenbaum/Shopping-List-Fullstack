# 🟦 Product Service (.NET Core)

שרת הליבה האחראי על ניהול קטלוג המוצרים והקטגוריות.

## 🗄 הקמת בסיס הנתונים
לפני הרצת השרת, יש להקים את בסיס הנתונים:
1. פתחו את ה-**SQL Server Management Studio (SSMS)**.
2. הריצו את הסקריפט שנמצא בנתיב: `infrastructure/db-script.sql`.
3. ודאו שה-ConnectionString בקובץ `appsettings.json` מעודכן עם שם השרת שלכם.

## 🏃‍♂️ הרצה
- דרך Visual Studio: לחצו על **F5**.
- דרך הטרמינל:
  ```bash
  dotnet run
-  השרת ירוץ בכתובת: http://localhost:5133
