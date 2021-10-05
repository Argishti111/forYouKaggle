const fs = require('fs');
const readline = require('readline');

fs.readdirSync('./valid/labels/').forEach(file => {
    // var data = fs.readFileSync('./test/labels/' + file); //read existing contents into data
    // let data1 = data.toString("utf-8")
    //
    // console.log(data1)
    const fileStream = fs.createReadStream('./valid/labels/' + file);
    async function processLineByLine() {
        const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

        let newData = ''
        let x
        let buffer

      for await (const line of rl) {

        // Each line in input.txt will be successively available here as `line`.
          if (line[0] == '0'){
              x = line.replace('0', '81')
          }
          else if (line[0] == '1') {
              x = line.replace('1', '82')
          }
        newData += x != '' && x + '\n'
  }
        buffer = Buffer.from(newData)
        fs.writeFileSync('./valid/labels/'+file, buffer,{encoding: 'utf-8'});

}

processLineByLine();
    // var fd = fs.openSync(file, 'w+');
    // var buffer = new Buffer('hello ');
    //
    // fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    // fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
    // // or fs.appendFile(fd, data);
    // fs.close(fd,()=> console.log('asd') );

});


