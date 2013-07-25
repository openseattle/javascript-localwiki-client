var LocalWikiClient = require('../index.js')

var wiki = new LocalWikiClient({
  url: 'http://seattlewiki.net'
})

wiki.eachType(function(type){
  wiki.count(type.name, function(err, count){
    if (err) { throw new Error; }
    console.log('total ' + type.name + 's: ' + count)
  })
})
