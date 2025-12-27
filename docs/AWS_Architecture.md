# AWS System Architecture - Project Summary

המערכת מבוססת על ארכיטקטורת **Microservices** מנוהלת (Managed), המשלבת פתרונות **Serverless** ו-**Containers**. הדגש המרכזי בתכנון הוא על אבטחה רב-שכבתית (Defense in Depth), סקיילביליות אוטומטית, והפרדה מוחלטת בין שכבת ההגשה לשכבת הנתונים.

## 🖼 System Diagram
![System Architecture](docs/AWS_Architecture.png)
*(ניתן למצוא את גרסת ה-PDF האיכותית בתיקיית docs)*
*קובץ ההסבר בפורמט Word זמין גם הוא בתיקיה*

---

## 💻 Frontend (Client Side)
* **AWS S3:** שני מסכי ה-React מאוחסנים כאתר סטטי בתוך Bucket ייעודי.
* **Amazon CloudFront:** שירות CDN המגיש את האתר ב-HTTPS בצורה מהירה ומאובטחת לכל העולם תוך שימוש ב-Edge Caching.

## ⚙️ Backend (Application Layer)
מבנה משולב המאפשר גמישות וחיסכון במשאבים:

1. **Node.js Service:** * **AWS Lambda:** פונקציה ללא שרת (Serverless) המתעוררת רק בזמן קריאה. פתרון חסכוני ומדויק למשימת השמירה ב-OpenSearch.
2. **.NET Service:**
   * **Amazon ECS with Fargate:** מריץ את שרת ה-.NET כקונטיינר מנוהל. אין צורך בניהול שרתים פיזיים, אלא הגדרת משאבים בלבד (CPU/Memory).
3. **Amazon API Gateway:**
   * משמש כ"שער הכניסה" הראשי ומנתב את הקריאות מה-Frontend:
     * **נתיב א':** עובר דרך **ALB** (Application Load Balancer) אל שירות ה-.NET ב-ECS.
     * **נתיב ב':** מפעיל ישירות את ה-Lambda של ה-Node.js.

## 🗄 Database (Data Layer)
* **Amazon OpenSearch Service:** הגרסה המנוהלת של ElasticSearch עבור פונקציית ה-Node.js.
* **Amazon RDS (SQL Server):** בסיס נתונים מנוהל עבור שרת ה-.NET התומך ב-Entity Framework. המערכת מוגדרת כ-**Multi-AZ** לזמינות גבוהה ומספקת גיבויים ועדכוני אבטחה אוטומטיים.

---

## 🛡 Security - אבטחה
* **AWS WAF:** חומת אש אפליקטיבית המגנה על ה-API מפני הזרקות SQL או מתקפות Bot.
* **VPC (Virtual Private Cloud):** בידוד רשת מוחלט. ה-RDS וה-OpenSearch נמצאים ב-Subnets פרטיים. ה-Lambda וה-ECS מתקשרים איתם בתוך הרשת הפנימית בלבד.
* **AWS Secrets Manager:** ניהול מאובטח של Connection Strings ופרטי גישה. השרתים מושכים את המידע בזמן הריצה ולא מחזיקים סיסמאות בקוד (Hardcoded).
* **AWS IAM:** שימוש בעיקרון ה-Least Privilege. הגדרת Roles ספציפיים לכל רכיב (למשל: גישת כתיבה בלבד ל-OpenSearch עבור ה-Lambda).

## 🚀 IaC & CI/CD - אוטומציה
* **Terraform / CloudFormation:** כל התשתית מוגדרת כקוד (Infrastructure as Code), המאפשר הקמה חוזרת ומדויקת של הסביבה בלחיצת כפתור.
* **AWS CodePipeline:** תהליך CI/CD מלא:
  * ל-.NET: בניית Docker Image ודחיפה אוטומטית ל-ECS.
  * ל-Node.js: אריזת הקוד ועדכון ה-Lambda בכל שינוי ב-Git.

## 📊 Monitoring - ניטור
* **Amazon CloudWatch:** ריכוז לוגים (Logging) והגדרת מדדים (Metrics) למעקב אחרי ביצועים וזמני תגובה.
* **AWS X-Ray:** מיפוי בקשות מקצה לקצה (Distributed Tracing) לזיהוי צווארי בקבוק ועיכובים בזמן אמת.