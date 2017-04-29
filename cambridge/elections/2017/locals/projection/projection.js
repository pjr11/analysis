var fs = require('fs');

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

console.log(JSON.stringify(readData(), null, 2));