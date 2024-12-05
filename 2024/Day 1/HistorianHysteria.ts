import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';


// var leftList =  [3,  4,  2,  1,  3,  3];  
// var rightList = [4,  3,  5,  3,  9,  3];
const filepath = path.resolve('./input.txt');

const getInputFromFile = (): Promise<[number[], number[]]> => {
    return new Promise((resolve, reject) => {
        let leftList: number[] = [];
        let rightList: number[] = [];

        const fileStream = fs.createReadStream(filepath);

        const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
        });

        rl.on('line', (line) =>{
            const values = line.trim().split(/\s+/);
            let leftValue = parseFloat(values[0]); 
            let rightValue = parseFloat(values[1]); 
            
            leftList.push(leftValue);
            rightList.push(rightValue);
        });

        rl.on('close', () => {
            resolve([leftList, rightList]);
        });
        
        rl.on('error', (err) => {
            reject(err);
        });
    });
};



const sortList = async (): Promise<number> => {

    var tuple = await getInputFromFile();

    let leftList = tuple[0];
    let rightList = tuple[1];

    let leftLen = leftList.length;
    let rightLen = leftList.length;

    if(leftLen != rightLen) {
        return -1;
    }

    leftList.sort();
    rightList.sort();

    let currentDist: number = 0;
    
    for(var i = 0; i < leftLen; i++){
        currentDist = currentDist + Math.abs(leftList[i] - rightList[i]);
    }
    console.log(currentDist);
    return currentDist;
}



sortList();


