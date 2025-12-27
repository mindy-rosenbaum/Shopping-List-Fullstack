### 4. ה-README ל-React (בתיקיית `client`)
```markdown
# 🟨 Shopping Client (React)

ממשק המשתמש של החנות.

## 🔌 Proxy Configuration
הפרויקט משתמש ב-Proxy בתוך `vite.config.ts` כדי לנתב בקשות API:
- `/api/products` & `/api/categories` -> נשלחים ל-.NET.
- `/api/orders` -> נשלחים ל-Node.js.

## 🏃‍♂️ הרצה
```bash
npm install
npm run dev