CREATE DATABASE ShoppingListDB;
GO

USE ShoppingListDB;
GO

CREATE TABLE Categories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    CategoryId INT FOREIGN KEY REFERENCES Categories(Id)
);
GO

-- הכנסת קטגוריות
INSERT INTO Categories (Name) VALUES 
    (N'ירקות ופירות'),       -- 1
    (N'מוצרי חלב וביצים'),   -- 2
    (N'בשר ודגים'),          -- 3
    (N'מאפה ולחמים'),       -- 4
    (N'משקאות'),            -- 5
    (N'שימורים ובישול'),     -- 6
    (N'חטיפים ומתוקים'),     -- 7
    (N'קפואים'),            -- 8
    (N'ניקיון ובית'),        -- 9
    (N'טיפוח והגיינה'),      -- 10
    (N'דגנים וקטניות'),      -- 11
    (N'מעדנייה'),           -- 12
    (N'מוצרי חשמל'),         -- 13
    (N'טקסטיל לבית'),        -- 14
    (N'כלי בית');           -- 15
GO

-- ירקות ופירות (CategoryId = 1)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'עגבניה', 5.90, 1),
    (N'מלפפון', 8.50, 1),
    (N'בצל', 4.20, 1),
    (N'תפוח עץ', 12.90, 1),
    (N'בננה', 7.80, 1),
    (N'גזר', 9.90, 1);
GO

-- מוצרי חלב (CategoryId = 2)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'חלב 3%', 6.20, 2),
    (N'חלב 1%', 6.20, 2),
    (N'חלב 0%', 6.50, 2),
    (N'גבינה לבנה', 8.90, 2),
    (N'קוטג', 9.50, 2),
    (N'יוגורט', 8.50, 2);
GO

-- בשר ודגים (CategoryId = 3)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'חזה עוף', 24.90, 3),
    (N'בשר טחון', 32.90, 3),
    (N'סטייק אנטריקוט', 89.90, 3),
    (N'פילה סלמון', 79.90, 3);
GO

-- מאפה (CategoryId = 4)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'לחם אחיד', 4.50, 4),
    (N'פיתות 10 יח', 18.90, 4),
    (N'לחמניות', 5.90, 4);
GO
-- משקאות (CategoryId = 5)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'שישיית מים מינרליים', 14.90, 5),
    (N'קולה 1.5 ליטר', 8.90, 5),
    (N'מיץ תפוזים טבעי', 12.90, 5),
    (N'סודה רבעייה', 11.90, 5),
    (N'בירה מארז', 22.90, 5),
    (N'יין אדום יבש', 19.90, 5);
GO

-- שימורים ובישול (CategoryId = 6)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'שמן קנולה', 12.90, 6),
    (N'רסק עגבניות', 8.90, 6),
    (N'טונה בשמן מארז', 18.90, 6),
    (N'זיתים ירוקים', 9.90, 6),
    (N'פסטה פנונה', 14.90, 6),
    (N'אורז פרסי', 16.90, 6);
GO

-- חטיפים ומתוקים (CategoryId = 7)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'חטיף צ׳יפס גדול', 6.90, 7),
    (N'במבה קלאסית', 4.50, 7),
    (N'שוקולד פרה', 5.90, 7),
    (N'ביסקוויטים', 9.90, 7),
    (N'ופלים שוקולד', 12.90, 7),
    (N'מסטיק מארז', 18.90, 7);
GO

-- קפואים (CategoryId = 8)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'אפונה קפואה', 12.90, 8),
    (N'בורקס גבינה קפוא', 18.90, 8),
    (N'גלידה משפחתית', 24.90, 8),
    (N'פיצה קפואה', 14.90, 8),
    (N'צ׳יפס קפוא', 12.90, 8);
GO

-- ניקיון ובית (CategoryId = 9)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'נוזל כלים', 8.90, 9),
    (N'אבקת כביסה', 45.90, 9),
    (N'מרכך כביסה', 16.90, 9),
    (N'נייר טואלט (30 גלילים)', 28.90, 9),
    (N'נוזל רצפות', 24.90, 9);
GO

-- טיפוח והגיינה (CategoryId = 10)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'שמפו לשיער', 14.90, 10),
    (N'מרכך לשיער', 14.90, 10),
    (N'סבון נוזלי', 8.90, 10),
    (N'משחת שיניים', 12.90, 10),
    (N'דאודורנט', 16.90, 10);
GO

-- דגנים וקטניות (CategoryId = 11)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'קורנפלקס', 18.90, 11),
    (N'גרנולה דבש', 24.90, 11),
    (N'עדשים ירוקות', 8.90, 11),
    (N'חומוס יבש', 7.50, 11),
    (N'קוסקוס מהיר', 6.90, 11);
GO

-- מעדנייה (CategoryId = 12)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'גבינה צהובה פרוסה', 16.90, 12),
    (N'סלמון מעושן', 28.90, 12),
    (N'פסטרמה דבש', 14.90, 12),
    (N'סלט חומוס 500 גרם', 12.90, 12);
GO

-- מוצרי חשמל (CategoryId = 13)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'קומקום חשמלי', 68.90, 13),
    (N'טוסטר לחיצה', 89.90, 13),
    (N'מייבש שיער', 45.90, 13),
    (N'בלנדר מוט', 79.90, 13);
GO

-- טקסטיל לבית (CategoryId = 14)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'מגבת גוף גדולה', 34.90, 14),
    (N'סט מצעים יחיד', 89.90, 14),
    (N'ציפית לכרית', 12.90, 14),
    (N'מגבת פנים', 16.90, 14);
GO

-- כלי בית (CategoryId = 15)
INSERT INTO Products (Name, Price, CategoryId) VALUES 
    (N'סט צלחות (6 יח)', 65.90, 15),
    (N'כוסות זכוכית מארז', 24.90, 15),
    (N'סכין שף', 45.90, 15),
    (N'מחבת נון-סטיק', 56.90, 15),
    (N'קרש חיתוך עץ', 32.90, 15);
GO