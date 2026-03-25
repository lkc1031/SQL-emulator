export const sqlExamples = [
  {
    title: '1. Basic Query (SELECT)',
    description: 'Select all data from a table',
    query: 'SELECT * FROM students;'
  },
  {
    title: '2. Filter Data (WHERE)',
    description: 'Find students in grade 9',
    query: 'SELECT first_name, last_name FROM students WHERE grade_level = 9;'
  },
  {
    title: '3. Sort Data (ORDER BY)',
    description: 'Sort students by age in descending order',
    query: 'SELECT * FROM students ORDER BY age DESC;'
  },
  {
    title: '4. Aggregate Function (COUNT)',
    description: 'Count the total number of students',
    query: 'SELECT COUNT(*) AS total_students FROM students;'
  },
  {
    title: '5. Grouping (GROUP BY)',
    description: 'Count the number of students in each grade',
    query: 'SELECT grade_level, COUNT(*) AS student_count FROM students GROUP BY grade_level;'
  },
  {
    title: '6. Table Join (JOIN)',
    description: 'Query the names of classes students are enrolled in',
    query: `SELECT students.first_name, students.last_name, classes.name AS class_name
FROM enrollments
JOIN students ON enrollments.student_id = students.id
JOIN classes ON enrollments.class_id = classes.id;`
  },
  {
    title: '7. Pattern Matching (LIKE)',
    description: 'Find students whose first name starts with "E"',
    query: "SELECT * FROM students WHERE first_name LIKE 'E%';"
  },
  {
    title: '8. Group Filtering (HAVING)',
    description: 'Find classes with more than 1 enrolled student',
    query: `SELECT class_id, COUNT(*) as enrolled_count 
FROM enrollments 
GROUP BY class_id 
HAVING COUNT(*) > 1;`
  },
  {
    title: '9. Free Practice',
    description: 'Practice SQL freely using the books table',
    query: `-- Welcome to the Free Practice area!
-- You can freely modify, insert, or delete data here (refresh the page to restore default data)

-- 1. Query Data (Default)
SELECT * FROM books;

-- 2. Insert Data (Uncomment the lines below to test)
-- INSERT INTO books (id, title, author, published_year, genre) 
-- VALUES (7, 'The Lord of the Rings', 'J.R.R. Tolkien', 1954, 'Fantasy');

-- 3. Update Data
-- UPDATE books SET genre = 'Epic Fantasy' WHERE id = 7;

-- 4. Delete Data
-- DELETE FROM books WHERE id = 7;`
  }
];
