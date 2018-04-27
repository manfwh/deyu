
module.exports = {
    toPrimise(fn) {
        if( typeof fn !== 'function') {
            throw Error(`${fn.name}must be a function, but it's not`)
        }
        return function () {
            const args = Array.from(arguments);
            return new Promise((resolve, reject) =>{
                fn.apply(this, args)
            })
        }
    }
}