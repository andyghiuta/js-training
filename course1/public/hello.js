writeJavaOrJs = {
	statementIf: function(){
		for (var i =1; i<=100;i++){
			var output = (i%3==0) && (i%5==0) ? "Javascript" : (i%3==0 ? "Java" + (i%5==0?"Script":""): i);
			console.log(output)
 		}
	}
}
writeJavaOrJs.statementIf();
