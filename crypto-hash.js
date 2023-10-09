const crypto=require('crypto')//provides js
const hexToBinary=require('hex-to-binary')
const cryptoHash=(...inputs)=>{//spread operator
    const hash= crypto.createHash('sha256');
    hash.update(inputs.sort().join(''));
    return hash.digest('hex');
}
// result=cryptoHash("hello","world");

module.exports=cryptoHash;

// console.log(result);