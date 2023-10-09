const INITIAL_DIFFICULTY=2;
const MINE_RATE=1000;//milli
const GENESIS_DATA={
    timestamp:1,
    prevHash:"0x000",
    difficulty:INITIAL_DIFFICULTY,
    nonce:0,
    hash:'0x123',
    data:[]
}
module.exports={GENESIS_DATA,MINE_RATE}
