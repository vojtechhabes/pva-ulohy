const point1 = [1, 2];
const point2 = [3, 4];
const point3 = [5, 6];

const points = [point1, point2, point3];

const distance = (point1, point2) => {
  return Math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2);
};

const isOnLine = (points) => {
  const distance1 = distance(points[0], points[1]);
  const distance2 = distance(points[1], points[2]);
  const distance3 = distance(points[0], points[2]);

  return (
    distance1 + distance2 === distance3 ||
    distance1 + distance3 === distance2 ||
    distance2 + distance3 === distance1
  );
};

if (isOnLine(points)) {
  console.log("Body leží na jedné přímce.");

  distance1 = distance(points[0], points[1]);
  distance2 = distance(points[0], points[2]);
  distance3 = distance(points[1], points[2]);

  if (distance1 > distance2 && distance1 > distance3) {
    console.log("Prostřední bod je bod 3.");
  } else if (distance2 > distance1 && distance2 > distance3) {
    console.log("Prostřední bod je bod 2.");
  } else {
    console.log("Prostřední bod je bod 1.");
  }
} else {
  console.log("Body neleží na jedné přímce.");
}
