const ignoreList = ['', 'World', 'Total:'];

const ignore = (el, list) => {
  let arr = [];
  const a = ignoreList.concat(list)
  if(a.includes(el)){
    return
  }else {
    arr.push(el)
  }
  return arr;
}

module.exports = {ignore}