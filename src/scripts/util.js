export function constrain(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
  }
  
  export function randomFrom(arr) {
    const itemIndex = Math.floor(Math.random() * arr.length);
    return arr[itemIndex];
  }