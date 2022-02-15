const twoSum = function (nums, target) {
  const complimentMap = {};

  for (var i = 0; i <= nums.length - 1; i++) {
    const compliment = target - nums[i];
    if (complimentMap[compliment] !== undefined) {
      return [i, complimentMap[compliment]];
    }

    complimentMap[compliment] = i;
  }
  return [-1, -1];
};


const sum = twoSum([2, 7, 11, 15], 9);

console.log({ sum });
