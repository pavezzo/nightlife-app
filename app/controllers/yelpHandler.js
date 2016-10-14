const Yelp = require('yelp')

const yelp = new Yelp({
  consumer_key: 'e6obMMonNQffMgepIhhTqA',
  consumer_secret: 'xHIrlZuNORHhdoxzXCPXqZS3nJo',
  token: 'eJwtFE_JEaHd6Q18WZvedvfN7RiPjrkn',
  token_secret: 'ZRUFlUJX-4cv_2Rlqztr9bYe8og'
})

module.exports = (reqLoc, callback) => {

    yelp.search({ category_filter: 'bars', location: reqLoc})
        .then((data) => {
            let bars = [];

            for (let i = 0; i < data.businesses.length; i++) {
                bars.push({
                    name: data.businesses[i].name,
                    pic: data.businesses[i].image_url,
                    text: data.businesses[i].snippet_text
                })
            }

            callback(bars)
        })

        .catch((err) => {
            console.log('yelp error')
            console.error(err)
        })

}
