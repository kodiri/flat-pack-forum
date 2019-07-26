let spamSet = new Set();

module.exports = function throttleSeconds(ipAddress, seconds, res, onNotSpam) {
    console.log("IP Address of the request is: ", ipAddress);
    if (spamSet.has(ipAddress)) {
        console.log(`IP Address ${ipAddress} is already in current requests, must wait at least 60 seconds`
            + `before sending a request again`);
        res.end(JSON.stringify({
            result: false,
            message: 'Too many requests sent within 60s'
        }));
    } else {
        onNotSpam();
        spamSet.add(ipAddress);
        setTimeout(() => {
            spamSet.delete(ipAddress);
        }, seconds * 1000);
    }
}