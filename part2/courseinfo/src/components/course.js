const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  );
};

const Total = ({ course }) => {
  let sum = course.parts.reduce(
    (total, current) => total + current.exercises,
    0,
  );
  return (
    <strong>total of {sum} exercises</strong>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name}
      {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  );
};
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
