from app.core.database import questions_collection

questions = [

    # =========================
    # SDE - FRESHER
    # =========================

    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is OOP?",
        "ideal_answer": "OOP is a programming paradigm based on objects and classes. Main concepts include inheritance, polymorphism, abstraction, and encapsulation."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is a linked list?",
        "ideal_answer": "A linked list is a linear data structure where nodes are connected using pointers."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "Explain stack and queue.",
        "ideal_answer": "Stack follows LIFO while queue follows FIFO. Stack uses push and pop operations while queue uses enqueue and dequeue."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is time complexity?",
        "ideal_answer": "Time complexity measures how the execution time of an algorithm grows with input size using Big O notation."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is recursion?",
        "ideal_answer": "Recursion is a programming technique where a function calls itself until a base condition is met."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is a database?",
        "ideal_answer": "A database is an organized collection of data that allows efficient storage, retrieval, and management."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is normalization?",
        "ideal_answer": "Normalization is the process of organizing database tables to reduce redundancy and improve consistency."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is an API?",
        "ideal_answer": "An API allows communication between different software systems using defined endpoints and protocols."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "What is inheritance in OOP?",
        "ideal_answer": "Inheritance allows one class to acquire properties and methods from another class."
    },

    {
        "role": "SDE",
        "level": "fresher",
        "question": "Explain arrays.",
        "ideal_answer": "An array is a collection of elements stored in contiguous memory locations."
    },



    # =========================
    # SDE - EXPERIENCED
    # =========================

    {
        "role": "SDE",
        "level": "experienced",
        "question": "Explain multithreading.",
        "ideal_answer": "Multithreading allows multiple threads to execute concurrently within a process."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "What is a hash table?",
        "ideal_answer": "A hash table stores key-value pairs and uses hashing for fast lookup."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "Explain REST API.",
        "ideal_answer": "REST API is an architectural style that uses HTTP methods for communication between systems."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "What is database indexing?",
        "ideal_answer": "Indexing improves database query performance by allowing faster data retrieval."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "Explain microservices architecture.",
        "ideal_answer": "Microservices architecture divides applications into independent smaller services."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "What is caching?",
        "ideal_answer": "Caching stores frequently accessed data temporarily for faster retrieval."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "Explain load balancing.",
        "ideal_answer": "Load balancing distributes incoming traffic across multiple servers."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "What is Docker?",
        "ideal_answer": "Docker is a containerization platform used to package applications with dependencies."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "What is JWT authentication?",
        "ideal_answer": "JWT authentication uses signed tokens for secure user authentication."
    },

    {
        "role": "SDE",
        "level": "experienced",
        "question": "Explain CI/CD.",
        "ideal_answer": "CI/CD automates software integration, testing, and deployment processes."
    },



    # =========================
    # HR - FRESHER
    # =========================

    {
        "role": "HR",
        "level": "fresher",
        "question": "Tell me about yourself.",
        "ideal_answer": "A good answer includes educational background, skills, strengths, and career goals."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "Why should we hire you?",
        "ideal_answer": "The answer should highlight technical skills, adaptability, and willingness to learn."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "What are your strengths?",
        "ideal_answer": "The answer should discuss strengths like teamwork, communication, and problem-solving."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "What are your weaknesses?",
        "ideal_answer": "The answer should mention a genuine weakness along with improvement efforts."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "Where do you see yourself in five years?",
        "ideal_answer": "The answer should discuss career growth, learning, and contribution to the company."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "Why do you want this job?",
        "ideal_answer": "The answer should connect personal skills and interests with the company role."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "How do you handle pressure?",
        "ideal_answer": "The answer should discuss time management and staying calm under pressure."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "Describe a challenge you faced.",
        "ideal_answer": "The answer should explain the challenge, actions taken, and lessons learned."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "What motivates you?",
        "ideal_answer": "The answer should discuss learning, growth, and achieving goals."
    },

    {
        "role": "HR",
        "level": "fresher",
        "question": "Are you a team player?",
        "ideal_answer": "The answer should explain collaboration and teamwork experiences."
    },



    # =========================
    # HR - EXPERIENCED
    # =========================

    {
        "role": "HR",
        "level": "experienced",
        "question": "Describe your leadership experience.",
        "ideal_answer": "The answer should explain leadership responsibilities, team management, and outcomes."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "How do you manage conflicts in a team?",
        "ideal_answer": "The answer should explain communication, problem-solving, and conflict resolution strategies."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "Explain a difficult project you handled.",
        "ideal_answer": "The answer should explain challenges, strategies used, and project outcomes."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "How do you prioritize tasks?",
        "ideal_answer": "The answer should explain planning, urgency analysis, and productivity techniques."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "What is your management style?",
        "ideal_answer": "The answer should discuss leadership approach, communication, and team collaboration."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "How do you handle failure?",
        "ideal_answer": "The answer should explain learning from mistakes and improving performance."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "How do you motivate your team?",
        "ideal_answer": "The answer should discuss encouragement, recognition, and goal alignment."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "Describe a successful project.",
        "ideal_answer": "The answer should explain planning, execution, teamwork, and successful outcomes."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "How do you adapt to change?",
        "ideal_answer": "The answer should discuss flexibility, learning, and positive mindset."
    },

    {
        "role": "HR",
        "level": "experienced",
        "question": "What are your career achievements?",
        "ideal_answer": "The answer should highlight measurable achievements and impact."
    },



    # =========================
    # DATA ANALYST - FRESHER
    # =========================

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "What is data cleaning?",
        "ideal_answer": "Data cleaning removes incorrect, duplicate, or incomplete data."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "What is data visualization?",
        "ideal_answer": "Data visualization represents data using charts and graphs."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "Explain Excel pivot tables.",
        "ideal_answer": "Pivot tables summarize and analyze large datasets efficiently."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "What is SQL?",
        "ideal_answer": "SQL is a language used to manage and query relational databases."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "What is a primary key?",
        "ideal_answer": "A primary key uniquely identifies each record in a database table."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "What is data analysis?",
        "ideal_answer": "Data analysis is the process of inspecting and interpreting data to extract insights."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "What is a dashboard?",
        "ideal_answer": "A dashboard visually displays important metrics and insights."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "What is Excel VLOOKUP?",
        "ideal_answer": "VLOOKUP searches for data in a table vertically."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "Explain data filtering.",
        "ideal_answer": "Data filtering displays only relevant data based on conditions."
    },

    {
        "role": "Data Analyst",
        "level": "fresher",
        "question": "What is business intelligence?",
        "ideal_answer": "Business intelligence involves analyzing business data for decision making."
    },



    # =========================
    # DATA ANALYST - EXPERIENCED
    # =========================

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "Explain ETL process.",
        "ideal_answer": "ETL stands for Extract, Transform, and Load. It prepares data for analysis."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "What is data warehousing?",
        "ideal_answer": "Data warehousing stores integrated data from multiple sources for analytics."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "Explain normalization and denormalization.",
        "ideal_answer": "Normalization reduces redundancy while denormalization improves performance."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "What is Power BI?",
        "ideal_answer": "Power BI is a business analytics tool used for visualization and reporting."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "Explain data pipelines.",
        "ideal_answer": "Data pipelines automate movement and transformation of data."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "What is predictive analytics?",
        "ideal_answer": "Predictive analytics uses statistical methods and machine learning to predict future outcomes."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "Explain KPI metrics.",
        "ideal_answer": "KPIs are measurable indicators used to evaluate business performance."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "What is A/B testing?",
        "ideal_answer": "A/B testing compares two versions to determine which performs better."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "Explain big data.",
        "ideal_answer": "Big data refers to extremely large datasets processed using advanced technologies."
    },

    {
        "role": "Data Analyst",
        "level": "experienced",
        "question": "What is machine learning?",
        "ideal_answer": "Machine learning enables systems to learn patterns from data and improve automatically."
    }

]

questions_collection.insert_many(questions)

print("Questions inserted successfully")