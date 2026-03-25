import alasql from 'alasql';

export const initializeDatabase = () => {
  // Drop tables if they exist to handle React StrictMode remounts
  alasql('DROP TABLE IF EXISTS students');
  alasql('DROP TABLE IF EXISTS teachers');
  alasql('DROP TABLE IF EXISTS classes');
  alasql('DROP TABLE IF EXISTS enrollments');
  alasql('DROP TABLE IF EXISTS books');

  // Create tables
  alasql('CREATE TABLE students (id INT, first_name STRING, last_name STRING, grade_level INT, age INT)');
  alasql('CREATE TABLE teachers (id INT, first_name STRING, last_name STRING, subject STRING)');
  alasql('CREATE TABLE classes (id INT, name STRING, teacher_id INT, room STRING)');
  alasql('CREATE TABLE enrollments (student_id INT, class_id INT, grade STRING)');
  alasql('CREATE TABLE books (id INT, title STRING, author STRING, published_year INT, genre STRING)');

  // Insert data
  alasql(`INSERT INTO students VALUES 
    (1, 'Alice', 'Smith', 9, 14),
    (2, 'Bob', 'Johnson', 10, 15),
    (3, 'Charlie', 'Brown', 9, 14),
    (4, 'Diana', 'Prince', 11, 16),
    (5, 'Evan', 'Wright', 12, 17),
    (6, 'Fiona', 'Gallagher', 10, 15)
  `);

  alasql(`INSERT INTO teachers VALUES 
    (1, 'Mr.', 'Anderson', 'Math'),
    (2, 'Ms.', 'Bates', 'Science'),
    (3, 'Mrs.', 'Clark', 'History'),
    (4, 'Dr.', 'Davis', 'Computer Science')
  `);

  alasql(`INSERT INTO classes VALUES 
    (101, 'Algebra I', 1, 'Room 10A'),
    (102, 'Biology', 2, 'Room 20B'),
    (103, 'World History', 3, 'Room 15C'),
    (104, 'Intro to Programming', 4, 'Lab 1'),
    (105, 'Calculus', 1, 'Room 10A')
  `);

  alasql(`INSERT INTO enrollments VALUES 
    (1, 101, 'A'),
    (1, 102, 'B'),
    (2, 101, 'C'),
    (2, 103, 'A'),
    (3, 104, 'A'),
    (4, 105, 'B'),
    (5, 104, 'A'),
    (6, 102, 'B'),
    (6, 103, 'C')
  `);

  alasql(`INSERT INTO books VALUES 
    (1, 'Harry Potter', 'J.K. Rowling', 1997, 'Fantasy'),
    (2, 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy'),
    (3, '1984', 'George Orwell', 1949, 'Science Fiction'),
    (4, 'To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction'),
    (5, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Fiction'),
    (6, 'Dune', 'Frank Herbert', 1965, 'Science Fiction')
  `);
};

export const runQuery = (query: string) => {
  try {
    const result = alasql(query);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const schemaDefinition = [
  {
    name: 'students',
    columns: [
      { name: 'id', type: 'INT' },
      { name: 'first_name', type: 'STRING' },
      { name: 'last_name', type: 'STRING' },
      { name: 'grade_level', type: 'INT' },
      { name: 'age', type: 'INT' }
    ]
  },
  {
    name: 'teachers',
    columns: [
      { name: 'id', type: 'INT' },
      { name: 'first_name', type: 'STRING' },
      { name: 'last_name', type: 'STRING' },
      { name: 'subject', type: 'STRING' }
    ]
  },
  {
    name: 'classes',
    columns: [
      { name: 'id', type: 'INT' },
      { name: 'name', type: 'STRING' },
      { name: 'teacher_id', type: 'INT' },
      { name: 'room', type: 'STRING' }
    ]
  },
  {
    name: 'enrollments',
    columns: [
      { name: 'student_id', type: 'INT' },
      { name: 'class_id', type: 'INT' },
      { name: 'grade', type: 'STRING' }
    ]
  },
  {
    name: 'books',
    columns: [
      { name: 'id', type: 'INT' },
      { name: 'title', type: 'STRING' },
      { name: 'author', type: 'STRING' },
      { name: 'published_year', type: 'INT' },
      { name: 'genre', type: 'STRING' }
    ]
  }
];
