//document.write('Hello From JavaScript');

writeJavaOrJs = {
	statementIf: function() {
		for (var i = 1; i <= 100; i++) {
			if (i % 3 == 0) {
				console.log("Java");
			} else if (i % 5 == 0) {
				console.log("Script");
			} else if ((i % 3 == 0) && (i % 5 == 0)) {
				console.log("JavaScript")
			} else if ((i % 3 !== 0) && (i % 5 !== 0)) {
				console.log(i);
			}
		}
	}
	/*,
	statementSwitch: function(){
		for (var i = 1; i <= 100; i++) {
			var java = i%3 == 0 ? "Java" : i,
				script = i%5 == 0 ? "Script" : i,
				javascript = (i%3==0) && (i%5==0) ? "Javascript" : i;
			
			console.log(java+script+javascript);
			/!*switch(i){
				case ((i%3)==0):
					console.log("Java")
					break;
				case (i%5==0):
					console.log("Script");
					break;
				
			}*!/
		}
	}*/
}

writeJavaOrJs.statementIf();