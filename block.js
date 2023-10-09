const {GENESIS_DATA, MINE_RATE}=require('./config');
const cryptoHash=require('./crypto-hash');
const hexToBinary=require('hex-to-binary')

class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty})
    {
        this.timestamp=timestamp;
        this.prevHash=prevHash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty= difficulty;

    }
    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock,data}){
        // const timestamp=Date.now()
        let hash,timestamp;
        const prevHash=prevBlock.hash;
        let {difficulty}=prevBlock;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock:prevBlock ,
                timestamp,
            });
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty);
        }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        return new this({
            hash,timestamp,prevHash,data,nonce,difficulty,
        });
    }

    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty}=originalBlock;
        const difference=timestamp-originalBlock.timestamp;
        if (difficulty<1) return 1;

         if(difference>MINE_RATE ){
            return difficulty-1;
        }
        return difficulty+1;
    }
}
//22" ,prevHash:'0xc12',hash:'0xacb',data:'hello'}); 
// const block2=new Block({
//     timestamp:"3/09/22",prevHash:'0hg23',hash:'0ij72',data:'world'}); 

// const genesisBlock= Block.genesis();
// // console.log(block1);
// console.log(genesisBlock);

// const result = Block.mineBlock({prevBlock:block1,data:"block2"});
// console.log(result);

module.exports=Block;

