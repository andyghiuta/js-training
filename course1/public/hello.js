writeJavaOrJs = {
	statementIf: function(){
		for (var i =1; i<=100;i++){
			console.log(i%3==0 ? "Java" + (i%5==0?"Script":""): i);
 		}
	}
}

writeJavaOrJs.statementIf();
