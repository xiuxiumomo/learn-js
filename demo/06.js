const keyWords = "child-1";

const data = [
  {
    parentId: -1,
    id: 1,
    name: "jack",
    child: [
      {
        parentId: 1,
        id: 101,
        name: "jack-child-1",
      },
      {
        parentId: 1,
        id: 102,
        name: "jack-child-2",
      },
    ],
  },
  {
    parentId: -1,
    id: 2,
    name: "pack",
    child: [
      {
        parentId: 2,
        id: 201,
        name: "pack-phild-1",
      },
      {
        parentId: 2,
        id: 202,
        name: "pack-phild-2",
      },
    ],
  },
];

function getWords(arr, words) {
  let list = arr.filter((item)=>{
    let child = item.child;
    let _list = child.filter((k)=>{
      if(k.name.includes(words)) {
        return k
      }
    })
    if( item.name.includes(words) || _list.length) {
      item.child = _list
      return item
    }
  })
  return list
}
let res = getWords(data,keyWords)

function getNames(arr,words) {
  let list = [];
  arr.forEach((item)=>{
    if(item.name.includes(words)) {
      list.push({id: item.id,name: item.name})
    }else if(item.child && item.child.length) {
      item.child.forEach((k)=>{
        list.push({
          id: k.id,
          name: `${item.name}/${k.name}`
        })
      })
    }
  })
}