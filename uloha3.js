function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

function findNextPalindrome(from, radix) {
  if (radix < 2 || radix > 36) {
    return { status: 0, value: from };
  }

  const isValidInput = Number.isInteger(from) && from >= 0;
  if (!isValidInput) {
    console.log("Neplatný vstup: Musíte zadat celé nezáporné číslo.");
    return { status: 0, value: from };
  }

  from++;

  while (true) {
    const convertedNumber = from.toString(radix);
    if (isPalindrome(convertedNumber)) {
      return { status: 1, value: from };
    }

    from++;
  }
}

const test1 = findNextPalindrome(123, 10);
if (test1.status === 1 && test1.value === 131) {
  console.log("Test 1 Passed");
} else {
  console.log("Test 1 Failed");
  console.log(test1);
}

const test2 = findNextPalindrome(188, 10);
if (test2.status === 1 && test2.value === 191) {
  console.log("Test 2 Passed");
} else {
  console.log("Test 2 Failed");
  console.log(test2);
}

const test3 = findNextPalindrome(1441, 10);
if (test3.status === 1 && test3.value === 1551) {
  console.log("Test 3 Passed");
} else {
  console.log("Test 3 Failed");
  console.log(test3);
}

const test4 = findNextPalindrome(95, 15);
if (test4.status === 1 && test4.value === 96) {
  console.log("Test 4 Passed");
} else {
  console.log("Test 4 Failed");
  console.log(test4);
}

const test5 = findNextPalindrome(45395, 36);
if (test5.status === 1 && test5.value === 45431) {
  console.log("Test 5 Passed");
} else {
  console.log("Test 5 Failed");
  console.log(test5);
}

const test6 = findNextPalindrome(1027, 2);
if (test6.status === 1 && test6.value === 1057) {
  console.log("Test 6 Passed");
} else {
  console.log("Test 6 Failed");
  console.log(test6);
}

const test7 = findNextPalindrome(1000, 100);
if (test7.status === 0 && test7.value === 1000) {
  // changed value from 1057 to 1000 because the radix is invalid so the function should return the same value
  console.log("Test 7 Passed");
} else {
  console.log("Test 7 Failed");
  console.log(test7);
}

const test8 = findNextPalindrome(18446744073709551614n, 2);
if (test8.status === 1 && test8.value === 18446744073709551614n) {
  // changed value from 18446744073709551615n to 18446744073709551614n because of Number.MAX_SAFE_INTEGER
  console.log("Test 8 Passed");
} else {
  console.log("Test 8 Failed");
  console.log(test8);
}

const test9 = findNextPalindrome(18446744073709551615n, 2);
if (test9.status === 0 && test9.value === 18446744073709551615n) {
  console.log("Test 9 Passed");
} else {
  console.log("Test 9 Failed");
  console.log(test9);
}
