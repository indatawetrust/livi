#!/usr/bin/env node
const argv = require('yargs').argv,
      fs = require('fs'),
      exec = require('child_process').exec,
      path = require('path')

if (!argv.json || !argv.each) process.exit()

const replacer = (each, data) => {
  for (let _ of each.match(/#item(\.|[a-zA-Z0-9_\$])+/g)) {
    let keys = _.replace('#item.', '')
                .split('.')
                .map(_=> `['${_}']`)
                .join('')
  
    _ = new RegExp(_.replace(/(\(|\)|\[|\]|\.|\*|\{|\}|\+|\?|\||\$)/g, "\\$1"))
  
    each = each.replace(new RegExp(_, 'g'), eval(`data${keys}`))
  }
  
  return each
}

const run = jobs => {
  
  let job = jobs.shift()

  const runner = job => exec(job, (error, stdout, stderr) => {
    
    console.log(`pending jobs ~> ${jobs.length}`)    
    
    job = jobs.shift()

    if (job) runner(job)

  })

  runner(job)

}

try {
  
  const json = require(path.join(process.cwd(), argv.json), 'utf8'),
        each = fs.readFileSync(path.join(process.cwd(), argv.each), 'utf8'),
        jobs = []

  for (let j of json) {
    jobs.push(replacer(each, j))
  }
  
  run(jobs)
  
} catch (e) { process.exit() }
