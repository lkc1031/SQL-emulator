export const sqlExamples = [
  {
    title: '1. 基礎查詢 (SELECT)',
    description: '從資料表中選取所有資料',
    query: 'SELECT * FROM students;'
  },
  {
    title: '2. 篩選資料 (WHERE)',
    description: '找出年級為 9 的學生',
    query: 'SELECT first_name, last_name FROM students WHERE grade_level = 9;'
  },
  {
    title: '3. 排序資料 (ORDER BY)',
    description: '依據年齡由大到小排序學生',
    query: 'SELECT * FROM students ORDER BY age DESC;'
  },
  {
    title: '4. 聚合函數 (COUNT)',
    description: '計算共有幾位學生',
    query: 'SELECT COUNT(*) AS total_students FROM students;'
  },
  {
    title: '5. 條件分組 (GROUP BY)',
    description: '計算每個年級的學生人數',
    query: 'SELECT grade_level, COUNT(*) AS student_count FROM students GROUP BY grade_level;'
  },
  {
    title: '6. 關聯查詢 (JOIN)',
    description: '查詢學生修習的課程名稱',
    query: `SELECT students.first_name, students.last_name, classes.name AS class_name
FROM enrollments
JOIN students ON enrollments.student_id = students.id
JOIN classes ON enrollments.class_id = classes.id;`
  },
  {
    title: '7. 模糊查詢 (LIKE)',
    description: '找出名字以 "E" 開頭的學生',
    query: "SELECT * FROM students WHERE first_name LIKE 'E%';"
  },
  {
    title: '8. 條件過濾 (HAVING)',
    description: '找出修課人數大於 1 的課程',
    query: `SELECT class_id, COUNT(*) as enrolled_count 
FROM enrollments 
GROUP BY class_id 
HAVING COUNT(*) > 1;`
  },
  {
    title: '9. 自由練習 (Free Practice)',
    description: '使用 books 表格自由練習 SQL',
    query: `-- 歡迎來到自由練習區！
-- 您可以在這裡自由修改、新增或刪除資料 (重新整理網頁即可恢復預設資料)

-- 1. 查詢資料 (預設)
SELECT * FROM books;

-- 2. 新增資料 (您可以取消下方的註解來測試)
-- INSERT INTO books (id, title, author, published_year, genre) 
-- VALUES (7, 'The Lord of the Rings', 'J.R.R. Tolkien', 1954, 'Fantasy');

-- 3. 修改資料
-- UPDATE books SET genre = 'Epic Fantasy' WHERE id = 7;

-- 4. 刪除資料
-- DELETE FROM books WHERE id = 7;`
  }
];
