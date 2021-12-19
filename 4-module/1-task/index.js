function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  let f = '';
  for (let i = 0; i < friends.length; i++) {
    f += '<li>' + friends[i].firstName + ' ' + friends[i].lastName + '</li>';
  }
  ul.innerHTML = f;
  return ul;
}
