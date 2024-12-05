import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';


// var leftList =  [3,  4,  2,  1,  3,  3];  
// var rightList = [4,  3,  5,  3,  9,  3];
const filepath = path.resolve('./input.txt');


const getInputFromFile = (): Promise<[Map<any,any>, number[]]> => {
    return new Promise((resolve, reject) => {
        let rightList: number[] = [];
        let leftDictionary = new Map();

        const fileStream = fs.createReadStream(filepath);

        const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
        });

        rl.on('line', (line) =>{
            const values = line.trim().split(/\s+/);
            let leftValue = parseFloat(values[0]); 
            let rightValue = parseFloat(values[1]); 
            const currentKey = leftDictionary.get(leftValue) ?? 0;
            leftDictionary.set(leftValue, currentKey + 1);
            rightList.push(rightValue);
        });

        rl.on('close', () => {
            resolve([leftDictionary, rightList]);
        });
        
        rl.on('error', (err) => {
            reject(err);
        });
    });
};



const similarityScore = async (): Promise<number> => {

    var tuple = await getInputFromFile();

    let leftList = tuple[0];
    let rightList = tuple[1];

    let similarityScore: number = 0;
    
    for(var i = 0; i < rightList.length; i++){
        let key = rightList[i];

        const currentValue = leftList.get(key);
        if(currentValue != undefined){
            similarityScore += (currentValue * key);
        }
    }
    console.log(similarityScore);
    return similarityScore;
}



similarityScore();

