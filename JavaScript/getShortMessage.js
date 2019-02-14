const getShortMessage = (array) => {
    const array1 = array.filter(msg => msg.length<50)
    console.log(array1)
}
let array=[
    'Hello',
    'this is a text of more than 50 character and it\'s gonna be filtred if we apply getShotMessage function',
    'this is a text of less than 50 character',
    'this is a 50 characters text & it won\'t be visible'
];
getShortMessage(array)