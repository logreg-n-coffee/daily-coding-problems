// The area of a circle is defined as πr^2. 
// Estimate π to 3 decimal places using a Monte Carlo method.

// Hint: The basic equation of a circle is x2 + y2 = r2.

// Rationale: Define a unit cirle (1/4 circle) and a unit square in Quadrant I 
// A(circle) = 1/4 * pi * r ** 2 = 1/4 * pi, A(square) = 1
// P(point in the circle) = P(circle) / P(square) = pi / 4 
// and P(point in the circle) = N(points in the circle) / N(total points)
// so pi = 4 * N(points in the circle) / N(total points)
// in the circle 

const estimatePi = () => {
    // customize seed value
    const seed = 50000;
    // generate points within the unit square - array
    const points = Array(seed).fill().map(() => [Math.random(), Math.random()]);
    // filter the points within the circle - array
    const pointsInCircle = points.filter(p => p[0] ** 2 + p[1] ** 2 < 1);
    const inside = pointsInCircle.length;
    // pi value
    let pi = 4 * inside / seed;
    // parse pi value to 3 decimal places
    pi = (Math.round((pi + Number.EPSILON) * 1000) / 1000).toFixed(3);
    return pi;
};

console.log(estimatePi());
