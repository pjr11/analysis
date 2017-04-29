var fs = require('fs');

// Here is the mapping from divisions to wards. The structure is:
// { division: { ward: n }}
// giving the percentage of each ward that goes in to each division.
// This doesn't necessarily add up to 100% for each division - for
// example Petersfield division gets 100% of Petersfield ward, plus
// 34% of Trumpington ward.

var mapping = {
  "Abbey": {
    "Abbey" : 1
  },
  "Arbury": {
    "Arbury": 0.86,
    "Castle": 0.1,
    "King's Hedges": 0.04,
    "West Chesterton": 0.11
  },
  "Castle": {
    "Arbury": 0.14,
    "Castle": 0.57,
    "West Chesterton": 0.2
  },
  "Cherry Hinton": {
    "Cherry Hinton": 0.93,
    "Coleridge": 0.39
  },
  "Chesterton": {
    "East Chesterton": 0.68,
    "West Chesterton": 0.60
  },
  "King's Hedges": {
    "East Chesterton": 0.32,
    "King's Hedges": 0.96,
    "West Chesterton": 0.09
  },
  "Market": {
    "Castle": 0.23,
    "Market": 1
  },
  "Newnham": {
    "Castle": 0.09,
    "Newnham": 1
  },
  "Petersfield": {
    "Petersfield": 1,
    "Trumpington": 0.34
  },
  "Queen Edith's": {
    "Cherry Hinton": 0.07,
    "Coleridge": 0.26,
    "Queen Edith's": 0.87
  },
  "Romsey": {
    "Coleridge": 0.34,
    "Romsey": 1
  },
  "Trumpington": {
    "Queen Edith's": 0.13
  }
};

// This code reads in the actual local election results for
// 2012-2016, and produces projected results for the new
// boundaries.

// Data is Ward,Party,2016,2015,2014,2013,2012


const readData = () => {
  const file = fs.readFileSync('./results.csv', { encoding: 'utf8' });
  const lines = file.split('\n');
  const data = {};

  lines.forEach(line => {
    const cols = line.split(',');
    const ward = cols[0];
    const party = cols[1];
    for (var i = 2; i <=6; i++) {
      var votes = cols[i];
      if (votes) {
        const year = 2018 - i;
        data[year] = data[year] || {};
        const yearData = data[year];
        yearData[ward] = yearData[ward] || {};
        const wardData = yearData[ward];
        wardData[party] = votes;
      }
    }
  });

  return data;
};

const makeProjections = () => {

};

const makeCSV = () => {

};

console.log(JSON.stringify(readData(), null, 2));
