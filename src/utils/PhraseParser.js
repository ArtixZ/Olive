
const positiveSet = ['want', 'like'];
const negtiveSet = ["don't", 'not'];

const tags = ['healthy', 'protein', 'salad', 'pizza', 'burgers', 'catering', 'breakfast', 'chinese', 'italian', 'asian', 'diet dishes', 'calzones', 'sweet']

export function phraseParser(msg) {
    const msgAry = msg.split(" ");
    if(msgAry.find(item => item.toLowerCase() == 'report')) {
        return {
            renderReport: true
        }
    } else {
        return {
            keyword: msg
        }
    }
    // const neg = msgAry.filter( item => negtiveSet.includes(item.toLowerCase()) );
    // const pos = msgAry.filter( item => positiveSet.includes(item.toLowerCase()) );

    // const something = msgAry.filter( item => tags.includes(item.toLowerCase()) );

    // return {
    //     positive: !(neg.length > 0),
    //     something: something
    // }
}