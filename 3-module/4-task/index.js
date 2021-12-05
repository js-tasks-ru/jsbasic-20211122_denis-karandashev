function showSalary(users, age) {
  let arr = users.filter(user => (user.age <= age));
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    let str = arr[i].name + ', ' + arr[i].balance;
    result = (i != (arr.length - 1)) ? result + str + '\n' : result + str;
  }
  return result;
}
