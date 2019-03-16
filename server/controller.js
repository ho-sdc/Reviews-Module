    let fetchReviews = (title, redis, id, callback) => {
        redis.get(id, (err, data) => {
            if (err){
                callback(err, null)
            } else if (data) {
                callback(null, JSON.parse(data))
            } else {
                title.find({ productId: id })
                .then((data) => {
                  redis.setex(id, 60, JSON.stringify(data), () => { callback(null, data) })
                })
                .catch((err) => { callback(err, null) })
            }
        })
    }

module.exports = { fetchReviews } 
