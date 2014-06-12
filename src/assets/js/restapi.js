var oauth = OAuth({
    consumerKey: "73arrhee4ws89w2779mugcrd",
    consumerSecret: "kv2ruXCVCV",
    accessTokenKey: "hk723g9zm48sxs55nq4dn6y6",
    accessTokenSecret:"NAkYWU3H9Hxn"
});

oauth.get("http://api-public.netflix.com/catalog/people/200", success, failure);

function success(data) {
	console.log(data);
}

function failure(data) {
	console.log("FAIL!");
}
