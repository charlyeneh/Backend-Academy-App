const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const { sample, sampleSize, random } = require('lodash');
const { createStudent, deleteAllStudents } = require('./services/students');
const { createSubject, deleteAllSubjects } = require('./services/subjects');

const COMMON = ['English', 'Mathematics', 'Literature', 'Home Economics', 'Agricultural Science', 'Computer Science'];
const JSS = ['Health Science', 'Physical Education', 'Civic Education', 'History'];
const SSS = ['Physics', 'Chemistry', 'Biology', 'Further Mathematics', 'Government'];
const JSS_CLASSES = ['JSS1', 'JSS2', 'JSS3'];
const SSS_CLASSES = ['SSS1', 'SSS2', 'SSS3'];
const SEX = ['male', 'female'];
const TOTAL_NUMBER_OF_STUDENTS = 9354;

const createSubjects = async (common, js, ss) => {
  const commonSubjects = sampleSize(common, 6);
  const jssSubjects = sampleSize(js, 3);
  const sssSubjects = sampleSize(ss, 3);

  const commonSubjectsPromises = commonSubjects.map(name => createSubject({ name, type: 'COMMON' }));
  const jssSubjectsPromises = jssSubjects.map(name => createSubject({ name, type: 'JSS' }));
  const sssSubjectsPromises = sssSubjects.map(name => createSubject({ name, type: 'SSS' }));

  await Promise.all([...commonSubjectsPromises, ...jssSubjectsPromises, ...sssSubjectsPromises]);

  return  {
    common: commonSubjects,
    jss: jssSubjects,
    sss: sssSubjects,
  }
}

function randomSubject(subjects = []) {
  const size = random(5, 9);
  return sampleSize(subjects, size);
}

function generateRandomStudent(className, sex, subjectPool) {
  return {
    firstName: faker.name.firstName(sex),
    middleName: faker.name.firstName(sex),
    lastName: faker.name.lastName(),
    dob: faker.date.birthdate(),
    sex,
    subjects: randomSubject(subjectPool),
    class: className,
  };
}

const connectDatabase = async() => {
  return await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/charly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const clearDatabase = async () => {
  await Promise.all([
    deleteAllStudents(),
    deleteAllSubjects(),
  ]);
}

const run = async() => {
  await connectDatabase();
  console.log('Connected to the DB!');

  await clearDatabase();
  const { common, jss, sss } = await createSubjects(COMMON, JSS, SSS);
  console.log('Created Subjects...');
  const CLASSES = [...JSS_CLASSES, ...SSS_CLASSES ];

  console.log('Creating Students...')
  for(let i = 0; i < TOTAL_NUMBER_OF_STUDENTS; i += 1) {
    const sex = sample(SEX);
    const className = sample(CLASSES);
    const subjectPool = JSS_CLASSES.includes(className) ? [...common, ...jss] : [...common, ...sss];
    const student = generateRandomStudent(className, sex, subjectPool);

    await createStudent(student);
    console.log(`Created Student ${i + 1} of ${TOTAL_NUMBER_OF_STUDENTS}...`);
  }

  await mongoose.connection.close();
}

run()
  .then(() => console.log('Datebase seeded!'))
  .catch(console.error)