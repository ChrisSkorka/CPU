var m = new Array(256);
var lineMap = new Array(256);
var instructionSet = [
["NOP", 1, "No Opperation"],
["ABA", 1, "A <= A + B"],
["AAB", 1, "B <= A + B"],
["AYX", 1, "X <= X + Y"],
["AXY", 1, "Y <= X + Y"],
["AYA", 1, "A <= A + Y"],
["AAY", 1, "Y <= A + Y"],
["ABX", 1, "X <= X + B"],
["AXB", 1, "B <= X + B"],
["ADD #", 2, "A <= A + #"],
["ADD", 2, "A <= A + M"],
["ADD X,", 2, "A <= A + M"],
["ADD Y,", 2, "A <= A + M"],
["SAB", 1, "A <= A - B"],
["SBA", 1, "A <= B - A"],
["SXY", 1, "A <= X - Y"],
["SYX", 1, "A <= Y - X"],
["SUB", 2, "A <= A - M"],
["SUB #", 2, "A <= A - #"],
["SUB X,", 2, "A <= A - M"],
["SUB Y,", 2, "A <= A - M"],
["INCA", 1, "A <= Increment A"],
["INCB", 1, "B <= Increment B"],
["INCX", 1, "X <= Increment X"],
["INCY", 1, "Y <= Increment Y"],
["INC", 2, "M <= Increment M"],
["INC X,", 2, "M <= Increment M"],
["INC Y,", 2, "M <= Increment M"],
["DECA", 1, "A <= Decrement A"],
["DECB", 1, "B <= Decrement B"],
["DECX", 1, "X <= Decrement X"],
["DECY", 1, "Y <= Decrement Y"],
["DEC", 2, "M <= Decrement M"],
["DEC X,", 2, "M <= Decrement M"],
["DEC Y,", 2, "M <= Decrement M"],
["LDA #", 2, "A <= Load M"],
["LDA", 2, "A <= Load M"],
["LDA X,", 2, "A <= Load M"],
["LDA Y,", 2, "A <= Load M"],
["LDB #", 2, "B <= Load M"],
["LDB", 2, "B <= Load M"],
["LDB X,", 2, "B <= Load M"],
["LDB Y,", 2, "B <= Load M"],
["LDX #", 2, "X <= Load M"],
["LDX", 2, "X <= Load M"],
["LDX X,", 2, "X <= Load M"],
["LDX Y,", 2, "X <= Load M"],
["LDY #", 2, "Y <= Load M"],
["LDY", 2, "Y <= Load M"],
["LDY X,", 2, "Y <= Load M"],
["LDY Y,", 2, "Y <= Load M"],
["STA", 2, "M <= Store A"],
["STB", 2, "M <= Store B"],
["STX", 2, "M <= Store X"],
["STY", 2, "M <= Store Y"],
["STA X,", 2, "M <= Store A"],
["STB X,", 2, "M <= Store B"],
["STX X,", 2, "M <= Store X"],
["STY X,", 2, "M <= Store Y"],
["STA Y,", 2, "M <= Store A"],
["STB Y,", 2, "M <= Store B"],
["STX Y,", 2, "M <= Store X"],
["STY Y,", 2, "M <= Store Y"],
["PRA", 1, "Print A"],
["PRB", 1, "Print B"],
["PRX", 1, "Print X"],
["PRY", 1, "Print Y"],
["PRNT #", 2, "Print #"],
["PRNT", 2, "Print M"],
["PRNT X,", 2, "Print M"],
["PRNT Y,", 2, "Print M"],
["SCNA", 1, "A <= Scan input"],
["SCNB", 1, "B <= Scan input"],
["WFI", 1, "Wait for input"],
["TAB", 1, "B <= A"],
["TBA", 1, "A <= B"],
["TXY", 1, "Y <= X"],
["TYX", 1, "X <= Y"],
["TAX", 1, "X <= A"],
["TXA", 1, "A <= X"],
["TBY", 1, "Y <= B"],
["TYB", 1, "B <= Y"],
["TAY", 1, "Y <= A"],
["TYA", 1, "A <= Y"],
["TXB", 1, "B <= X"],
["TBX", 1, "X <= B"],
["SHRA", 1, "A <= A Shift right"],
["SHLA", 1, "A <= A Shift left"],
["SHRB", 1, "B <= B Shift right"],
["SHLB", 1, "B <= B Shift left"],
["SLRA", 1, "A <= A Shift right looped"],
["SLLA", 1, "A <= A Shift left looped"],
["SLRB", 1, "B <= B Shift right looped"],
["SLLB", 1, "B <= B Shift left looped"],
["CLOF", 1, "Clear overflow"],
["SOF", 1, "Set overflow"],
["CMPA", 1, "Compare A to B"],
["CMPI", 1, "Compare X to Y"],
["CMP #", 2, "Compare A to #"],
["CMP", 2, "Compare A to M"],
["CMP X,", 2, "Compare A to M"],
["CMP Y,", 2, "Compare A to M"],
["BRA", 2, "Branch Always"],
["BOS", 2, "Branch if overflow set"],
["BOC", 2, "Branch if overflow clear"],
["BEQ", 2, "Branch if equal"],
["BNE", 2, "Branch if not equal"],
["BLS", 2, "Branch if less"],
["BGR", 2, "Branch if greater"],
["BLE", 2, "Branch if less or equal"],
["BGE", 2, "Branch if greater or equal"],
["OCA", 1, "A <= One's Compliment A"],
["OCB", 1, "B <= One's Compliment B"],
["OCX", 1, "X <= One's Compliment X"],
["OCY", 1, "Y <= One's Compliment Y"],
["OCM", 2, "M <= One's Compliment M"],
["OCM X,", 2, "M <= One's Compliment M"],
["OCM Y,", 2, "M <= One's Compliment M"],
["TCA", 1, "A <= Two's Compliment A"],
["TCB", 1, "B <= Two's Compliment B"],
["TCX", 1, "X <= Two's Compliment X"],
["TCY", 1, "Y <= Two's Compliment Y"],
["TCM", 2, "M <= Two's Compliment M"],
["TCM X,", 2, "M <= Two's Compliment M"],
["TCM Y,", 2, "M <= Two's Compliment M"],
["ANDA", 1, "A <= A AND B"],
["ORA", 1, "A <= A OR B"],
["XORA", 1, "A <= A XOR B"],
["ANDI", 1, "X <= X AND Y"],
["ORI", 1, "X <= X OR Y"],
["XORI", 1, "X <= X XOR Y"],
["CLA", 1, "Clear A"],
["CLB", 1, "Clear B"],
["CLX", 1, "Clear X"],
["CLY", 1, "Clear Y"],
["CLM", 2, "Clear M"],
["CLM X,", 2, "Clear M"],
["CLM Y,", 2, "Clear M"],
["CLD", 1, "Clear Display"],
["GOS", 1, "Go to Subroutine"],
["RTN", 1, "Return"],
["END", 1, "End execution"],
[".ORG", 2, "Skip to memory location"],
[".BYTE", 1, "Byte"],
[".STR", 2, "String"],
[".END", 1, "End Compiling"]];

var compilingLoop = null;

function begin(){
	genearateMemoryTable();
	generateReferenceTable();
	
	//enableKey(document.getElementById("code").firstChild, 9);
	enableKey(document.getElementById("codeInput"), 9);
	enableKey(document.getElementById("keyboard"), 8);
	
	CPUreset();
	
	fileIO();
	//unlockEditor();
}
function genearateMemoryTable(){
	var table = document.getElementById("memoryTable");
	
	for(var y = 0; y < 16; y++){
		var tr = document.createElement("TR");
		
		var td = document.createElement("TD");
		td.innerHTML = getHex(y * 16);
		tr.appendChild(td);
		
		for(var x = 0; x < 16; x++){
			var td = document.createElement("TD");
			
			var n = 16 * y + x;
			m[n] = 0;
			
			td.innerHTML = getHex(m[n]);
			tr.appendChild(td);
		}
		
		table.appendChild(tr);
	}
}

function generateReferenceTable(){
	var table = document.getElementById("referenceTable");
	
	for(var i = 0; i < instructionSet.length; i++){
		var tr = document.createElement("TR");
		
		var TDopcode = document.createElement("TD");
		var TDoperation = document.createElement("TD");
		var TDoperand = document.createElement("TD");
		TDopcode.innerHTML = instructionSet[i][0];
		TDoperand.innerHTML = instructionSet[i][1] == 2 ? "Yes" : "No";
		TDoperation.innerHTML = instructionSet[i][2];
		
		tr.appendChild(TDopcode);
		tr.appendChild(TDoperation);
		tr.appendChild(TDoperand);
		
		table.appendChild(tr);
	}
}

function getHex(num){
	return ("0" + num.toString(16)).slice(-2).toUpperCase();
}

function enableKey(node, character) {
    node.onkeydown = function(e) {
        if (e.keyCode === character) { // tab was pressed

            // get caret position/selection
            var val = this.innerHTML,
                start = this.selectionStart,
                end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            //this.innerHTML = val.substring(0, start) + String.fromCharCode(character) + val.substring(end);
			document.execCommand('insertHTML', false, String.fromCharCode(character));
            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            return false;
        }
    };
}

function clearMemory(){
	for(var i = 0; i < 256; i++){
		m[i] = 0;
	}
}

function displayMemory(){
	var table = document.getElementById("memoryTable");
	var output = document.getElementById("output");
	
	var string = "";
	
	for(var y = 0; y < 16; y++){
		var tr = table.rows[y];
		
		
		for(var x = 1; x < 17; x++){
			var td = tr.cells[x];
			
			var n = 16 * y + x - 1;
			
			var hex = getHex(m[n]);
			
			td.innerHTML = hex;
			string += hex + " ";
		}
	}
	
	output.value = string;
}

//compile and colour code source
function compile(){	
	clearMemory();
	//var selection = getCaretPosition();
	
	var colorCode = document.getElementById("colorCode");
	//var colorCode = document.getElementById("colorCode");
	var codeInput = document.getElementById("codeInput");
	//var rawProgramCode = document.createElement("div");
	//var rawProgramCode = document.getElementById("code").firstChild;
	var codeLines = document.getElementById("codeLines");
	
	//var lines = codeInput.innerText.split("\n");
	var lines = codeInput.value.split("\n");
	while(colorCode.firstChild)colorCode.removeChild(colorCode.firstChild);
	
	/*
	var lines = [];
	while(colorCode.firstChild){
		var innerLines = colorCode.firstChild.textContent.split("\n");
		
		while(innerLines.length > 0)lines.push(innerLines.shift());
		
		colorCode.removeChild(colorCode.firstChild);
	}
	*/
	
	while(codeLines.firstChild)codeLines.removeChild(codeLines.firstChild);
	
	var code = [];
	var maxWidth = 0;
	var compiling = true;
	
	//extranct objects from string
	for(var l = 0; l < lines.length; l++){
		var errorMessage = null;
		
		//get individual line
		var line = lines[l];
		
		//get largest line
		if(line.length > maxWidth)maxWidth = line.length;
		//console.log("line.length: " + line.length + ", maxWidth: " + maxWidth);
		
		//get and add display line count
		var lineCount = l + 1;
		addLineCount(lineCount);
		//console.log("lineCount: " + lineCount + ", line: " + line);
		
		var indexComment = line.indexOf(";");
		if(indexComment == -1)indexComment = line.length;
		
		var indexInstruction = line.search(/\s/);
		if(indexInstruction == -1 || indexInstruction > indexComment)
			indexInstruction = indexComment;
		
		var comment = line.substring(indexComment, line.length);
		var lable = line.substring(0, indexInstruction);
		var instruction = line.substring(indexInstruction, indexComment);
		
		var indexOperand = instruction.length;
		var tempInstrunction = instruction.trimLeft();
		var tempIndex = tempInstrunction.search(/\s/);
		if(tempIndex != -1)indexOperand += tempIndex - tempInstrunction.length;
		
		var opcode = instruction.substring(0, indexOperand);
		var operand = instruction.substring(indexOperand, instruction.length);
				
		var div = document.createElement("div");
		var spanLable = document.createElement("span");
		var spanOpcode = document.createElement("span");
		var spanOperand = document.createElement("span");
		var spanComment = document.createElement("span");
		spanLable.innerHTML = lable;
		spanOpcode.innerHTML = opcode;
		spanOperand.innerHTML = operand;
		spanComment.innerHTML = comment;
		spanLable.classList.add('lable');
		spanOpcode.classList.add('opcode');
		spanOperand.classList.add('operand');
		spanComment.classList.add('comment');
		
		div.appendChild(spanLable);
		div.appendChild(spanOpcode);
		div.appendChild(spanOperand);
		div.appendChild(spanComment);
		
		colorCode.appendChild(div);
		//console.log("div: " + div.innerHTML);
		
		if(line.trim() == ""){
			if(!line.includes("\n"))spanComment.innerHTML = "\n";
			continue;
		}
		
		lable = lable.trim().toUpperCase();
		opcode = opcode.trim().toUpperCase();
		operand = operand.trim();
		
		if(operand.substring(0,1) === "#"){
			opcode += " #";
			operand = operand.substring(1, operand.length);
		}
		if(operand.substring(0,2) === "X,"){
			opcode += " X,";
			operand = operand.substring(2, operand.length);
		}
		if(operand.substring(0,2) === "Y,"){
			opcode += " Y,";
			operand = operand.substring(2, operand.length);
		}
		
		if(line.substring(0, indexComment).trim() === ""){
			setLineError(lineCount, errorMessage);
			continue;
		}
		if(opcode === ""){
			setLineError(lineCount, "No opcode provided");
			continue;
		}
		
		var opcodeID = getInstructionId(opcode);
		//console.log("opcodeID: " + opcodeID);
		
		if(opcodeID < 0 || opcodeID >= instructionSet.length){
			setLineError(lineCount, "'" + opcode + "' is not defined");
			continue;
		}
		
		if(!compiling)continue;
		
		if(instructionSet[opcodeID][1] < 2 && !(opcode.substring(0,1) == "."))operand = null;
		
		if(opcode == ".END"){
			compiling = false;
			continue;
		}
		
		if(opcode == ".ORG"){
			
			var address = getIntFromOperand(code, operand);
			if(address == -1)errorMessage = "Illegal operand at line " + lineCount;
			
			var currentAddress = getAddresOfLastInstruction(code);
			var difference = address - currentAddress;
			
			for(var i = 0; i < difference; i++){
				code.push([lineCount, i == 0?lable:null, null, 0, null]);
			}
			setLineError(lineCount, errorMessage);
			continue;
		}
		if(opcode == ".BYTE"){
			var instruction = getInstructionId(opcode);
			
			var values = operand.split(",");
			
			for(var i = 0; i < values.length; i++){
				var value = values[i];
				
				code.push([lineCount, i == 0?lable:null, null, instruction, value]);
			}
			setLineError(lineCount, errorMessage);
			continue;
		}
		
		if(opcode == ".STR"){
			var instruction = getInstructionId(".BYTE");
			
			var values = operand;
			
			//console.log("lable: " + lable);
			
			for(var i = 1; i < values.length -1; i++){
				var value = "'" + values.charAt(i) + "'";
				
				code.push([lineCount, i == 1 ? lable : null, null, instruction, value]);
				setLineError(lineCount, errorMessage);
			}
			
			code.push([lineCount, null, null, instruction, 0]);
			
			continue;
		}
		
		var values = [lineCount, lable, null, opcodeID, operand];
		
		if(opcodeID >= 0)code.push(values);
		
		setLineError(lineCount, errorMessage);
	}
	
	//assign addresses to lables
	var memoryCell = 0;
	
	//assign addresses to lables
	for(var i = 0; i < code.length; i++){
		var instruction = code[i];
		
		if(instruction[1])instruction[2] = memoryCell;
		
		if(instruction[3] < 0){
			setLineError(instruction[0], "Invalid operand");
			memoryCell++;
		}else{
			console.log("memoryCell: " + memoryCell + ", " + instructionSet[instruction[3]][0] + " " +  + instructionSet[instruction[3]][1]);
			memoryCell += instructionSet[instruction[3]][1];
		}
	}
	
	//insert lable addresses
	for(var i = 0; i < code.length; i++){
		var instruction = code[i];
		var operand = instruction[4];
		
		if(operand == null)continue;
		
		//console.log("ID: " + line[3]);
		var num = getIntFromOperand(code, operand);
		if(num < 0){
			setLineError(instruction[0], "Invalid operand");
			num = 0;
		}
		
		code[i][4] = num;
		
		//console.log(i + ": " + code[i][3] + " " + code[i][4]);
	}
	
	codeToMemory(code);
	
	displayMemory();
	
	//console.log("maxWidth: " + maxWidth);
	codeInput.style.width = (maxWidth + 4) + "ch";
}

function getCaretPosition(){
	var code = document.getElementById("code");
	
	var selection = window.getSelection();
	var range = selection.getRangeAt(0);
	
	//var node = selection.anchorNode;
	//var offset = selection.anchorOffset;
	var node = range.startContainer;
	var offset = range.startOffset;
	
	//node = node.parentNode;
	var nodeParent = node.parentNode;
	while(nodeParent != code){
		
		for(var sibling = nodeParent.firstChild; sibling != node; sibling = sibling.nextSibling){
			if(sibling == null || typeof sibling == "undefined")return -1;
			
			offset += sibling.innerText.length;
			if(nodeParent.parentNode == code)offset++;
		}
		
		node = node.parentNode;
		nodeParent = node.parentNode;
		if(node == null || node == document || typeof node == "undefined")return -1;
		if(nodeParent == null || nodeParent == document || typeof nodeParent == "undefined")return -1;
	}
	
	//console.log("offset: " + offset);
	return offset;
}

function setCaretPosition(offset){
	var code = document.getElementById("code");
	
	var selection = window.getSelection();
	selection.removeAllRanges()
	
	var range = new Range();
	
	var node = code.firstChild;
	var nodeParent = node.parentNode;
	
	while(node != null && node.hasChildNodes()){
		node = node.firstChild;
		
		while(true){
			var length = node.textContent.length;
			
			if(offset > length){
				offset -= length;
				if(node.nextSibling == null)break;
			}else{
				break;
			}
			
			if(node.parentNode.parentNode == code)offset--;
			
			node = node.nextSibling;
		}
		
	}
	
	if(node.length > offset)offset = node.length;
	
	range.setStart(node, offset);
	range.setEnd(node, offset);
	range.collapse();
	
	selection.addRange(range);
}

//add line counter to side bar
function addLineCount(line, errorMessage){
	var codeLines = document.getElementById("codeLines");
	
	var divCount = document.createElement("div");
	divCount.id = "line" + line;
	divCount.innerHTML = line;
	setLineError(line, errorMessage);
	
	codeLines.appendChild(divCount);
}

//set error status to line counter
function setLineError(line, errorMessage){
	var divCount = document.getElementById("line" + line);
	
	if(errorMessage != null){
		console.log("Error at line " + line + ": '" + errorMessage + "' at: " + new Error().stack);
		divCount.classList.add('error');
		divCount.title = errorMessage;
	}
}

//get int from operand
function getIntFromOperand(code, operand){
	
	//console.log("getIntFromOperand: " + operand);
	
	if(operand == null)return 0;
	
	operand = String(operand);
	
	var num = operand;//parseInt(operand, 16);
	
	switch(operand.charAt(0)){
		case "$":
			operand = operand.replace("$", "");
			num = parseInt(operand, 16);
			break;
		case "%":
			operand = operand.replace("%", "");
			num = parseInt(operand, 2);
			break;
		case "'":
			operand = operand.replace("'", "");
			num = operand.charCodeAt(0);
			break;
		default:
			num = parseInt(operand, 10);
			break;
	}
	
	//get address of lable
	if(isNaN(num))num = getAddressOfLable(code, operand);

	if(num == null)num = -1;

	return num;
}

//get The address in memory of a lable
function getAddressOfLable(code, lable){
	lable = lable.toUpperCase();
	
	var num = null;
	for(var l = 0; l < code.length; l++){
		if(code[l][1] == lable)num = code[l][2];
	}
	return num;
}

//get num of bytes requred by an instruction as id
function getSizeOfInstruction(id){
	return instructionSet[id][1];
}

//get the ID of an instruction as string
function getInstructionId(instruction){
	for(var i = 0; i < instructionSet.length; i++){
		if(instructionSet[i][0] == instruction)return i;
	}
	return -1;
}

//write data from code to memory
function codeToMemory(code){
	var address = 0;
	
	var byteID = getInstructionId(".BYTE");
	
	for(var l = 0; l < code.length; l++){
		
		//console.log(code[l][3]);
		
		if(code[l][3] != byteID){
			m[address] = code[l][3];
			lineMap[address] = code[l][0]
			address++
		}
		
		if(code[l][4] != null){
			m[address] = code[l][4];
			address++
		}
	}
}

//get addres of last instruction
function getAddresOfLastInstruction(code){
	var address = 0;
	for(var l = 0; l < code.length; l++){
		address += code[l][4] == null ? 1 : 2;
	}
	
	return address;
}

var PC = 0;
var IR = 0;
var SP = 0;
var A = 0;
var B = 0;
var X = 0;
var Y = 0;
var screen = [""];

var AnotEqualB = 0;
var AgreaterB = 0;
var BgreaterA = 0;
var CarryOut = 0;

var loop;

//output CPU state
function updateCpuState(){
	statePC = document.getElementById("statePC");
	stateIR = document.getElementById("stateIR");
	stateSP = document.getElementById("stateSP");
	stateA = document.getElementById("stateA");
	stateB = document.getElementById("stateB");
	stateX = document.getElementById("stateX");
	stateY = document.getElementById("stateY");
	screenView = document.getElementById("screen");
	
	statePC.innerHTML = getHex(PC);
	stateIR.innerHTML = getHex(IR);
	stateSP.innerHTML = getHex(SP);
	stateA.innerHTML = getHex(A);
	stateB.innerHTML = getHex(B);
	stateX.innerHTML = getHex(X);
	stateY.innerHTML = getHex(Y);
	
	var screenString = "";
	
	for(var y = 0; y < screen.length; y++){
		
		screenString += screen[y];
		screenString += y < screen.length-1 ? "\n":"|";
	}
	
	screenView.value = screenString;
	
	displayMemory();
}

//emulate one instruction
function CPUstep(){
	
	var line = lineMap[PC];
	var divCount = document.getElementById("line" + line);
	if(divCount != null)divCount.classList.remove('selected');
	
	IR = m[PC];
	
	var instruction = instructionSet[IR][0];
	var operand = m[PC + 1];
	
	keyboard = document.getElementById("keyboard");
	var key = String(keyboard.value).charCodeAt(0) || 0;
	//console.log("key: " + key);
	
	var incPC = true;
	
	switch(instruction){
		case "NOP":break;
		case "ABA":A = B + A; break;
		case "AAB":B = A + B; break;
		case "AYX":X = Y + X; break;
		case "AXY":Y = X + Y; break;
		case "AYA":A = Y + A; break;
		case "AAY":Y = A + Y; break;
		case "ABX":X = B + X; break;
		case "AXB":B = X + B; break;
		case "ADD #":A += operand; break;
		case "ADD":A += m[operand]; break;
		case "ADD X,":A += m[operand + X]; break;
		case "ADD Y,":A += m[operand + Y]; break;
		case "SAB":A = A - B; break;
		case "SBA":A = B - A; break;
		case "SXY":X = X - Y; break;
		case "SYX":X = Y - X; break;
		case "SUB":A -= m[operand]; break;
		case "SUB #":A -= operand; break;
		case "SUB X,":A -= m[operand + X]; break;
		case "SUB Y,":A -= m[operand + Y]; break;
		case "INCA":A++; break;
		case "INCB":B++; break;
		case "INCX":X++; break;
		case "INCY":Y++; break;
		case "INC":m[operand]++; break;
		case "INC X,":m[operand + X]++; break;
		case "INC Y,":m[operand + Y]++; break;
		case "DECA":A--; break;
		case "DECB":B--; break;
		case "DECX":X--; break;
		case "DECY":Y--; break;
		case "DEC":m[operand]--; break;
		case "DEC X,":m[operand + X]--; break;
		case "DEC Y,":m[operand + Y]--; break;
		case "LDA #":A = operand; break;
		case "LDA":A = m[operand]; break;
		case "LDA X,":A = m[operand + X]; break;
		case "LDA Y,":A = m[operand + Y]; break;
		case "LDB #":B = operand; break;
		case "LDB":B = m[operand]; break;
		case "LDB X,":B = m[operand + X]; break;
		case "LDB Y,":B = m[operand + Y]; break;
		case "LDX #":X = operand; break;
		case "LDX":X = m[operand]; break;
		case "LDX X,":X = m[operand + X]; break;
		case "LDX Y,":X = m[operand + Y]; break;
		case "LDY #":Y = operand; break;
		case "LDY":Y = m[operand]; break;
		case "LDY X,":Y = m[operand + X]; break;
		case "LDY Y,":Y = m[operand + Y]; break;
		case "STA":m[operand] = A; break;
		case "STB":m[operand] = B; break;
		case "STX":m[operand] = X; break;
		case "STY":m[operand] = Y; break;
		case "STA X,":m[operand + X] = A; break;
		case "STB X,":m[operand + X] = B; break;
		case "STX X,":m[operand + X] = X; break;
		case "STY X,":m[operand + X] = Y; break;
		case "STA Y,":m[operand + Y] = A; break;
		case "STB Y,":m[operand + Y] = B; break;
		case "STX Y,":m[operand + Y] = X; break;
		case "STY Y,":m[operand + Y] = Y; break;
		case "PRA":print(A); break;
		case "PRB":print(B); break;
		case "PRX":print(X); break;
		case "PRY":print(Y); break;
		case "PRNT #":print(operand); break;
		case "PRNT":print(m[operand]); break;
		case "PRNT X,":print(m[operand + X]); break;
		case "PRNT Y,":print(m[operand + Y]); break;
		case "SCNA":A = key; keyboard.value = keyboard.value.slice(1, keyboard.value.length); break;
		case "SCNB":B = key; keyboard.value = keyboard.value.slice(1, keyboard.value.length); break;
		case "WFI":if(key == 0)incPC = false; break;
		case "TAB":B = A; break;
		case "TBA":A = B; break;
		case "TXY":Y = X; break;
		case "TYX":X = Y; break;
		case "TAX":X = A; break;
		case "TXA":A = X; break;
		case "TBY":Y = B; break;
		case "TYB":B = Y; break;
		case "TAY":Y = A; break;
		case "TYA":A = Y; break;
		case "TXB":B = X; break;
		case "TBX":X = B; break;
		case "SHRA":A = A >> 1; break;
		case "SHLA":A = A << 1; break;
		case "SHRB":B = B >> 1; break;
		case "SHLB":B = B << 1; break;
		case "SLRA":
		case "SLLA":
		case "SLRB":
		case "SLLB":
		case "CLOF":
		case "SOF":
		case "CMPA":{
			AnotEqualB = (A != B)?1:0;
			AgreaterB = (A > B)?1:0;
			BgreaterA = (B > A)?1:0;
			break;
		}
		case "CMPI":{
			AnotEqualB = (X != Y)?1:0;
			AgreaterB = (X > Y)?1:0;
			BgreaterA = (Y > X)?1:0;
			break;
		}
		case "CMP #":{
			AnotEqualB = (A != operand)?1:0;
			AgreaterB = (A > operand)?1:0;
			BgreaterA = (operand > A)?1:0;
			break;
		}
		case "CMP":{
			AnotEqualB = (A != m[operand])?1:0;
			AgreaterB = (A > m[operand])?1:0;
			BgreaterA = (m[operand] > A)?1:0;
			break;
		}
		case "CMP X,":{
			AnotEqualB = (A != m[operand + X])?1:0;
			AgreaterB = (A > m[operand + X])?1:0;
			BgreaterA = (m[operand + X] > A)?1:0;
			break;
		}
		case "CMP Y,":{
			AnotEqualB = (A != m[operand + Y])?1:0;
			AgreaterB = (A > m[operand + Y])?1:0;
			BgreaterA = (m[operand + Y] > A)?1:0;
			break;
		}
		case "BRA":PC = operand; incPC = false; break;
		case "BOS":
		case "BOC":
		case "BEQ":if(!AnotEqualB){PC = operand; incPC = false;} break;
		case "BNE":if(AnotEqualB){PC = operand; incPC = false;} break;
		case "BLS":if(BgreaterA){PC = operand; incPC = false;} break;
		case "BGR":if(AgreaterB){PC = operand; incPC = false;} break;
		case "BLE":if(BgreaterA || !AnotEqualB){PC = operand; incPC = false;} break;
		case "BGE":if(AgreaterB || !AnotEqualB){PC = operand; incPC = false;} break;
		case "OCA":
		case "OCB":
		case "OCX":
		case "OCY":
		case "OCM":
		case "OCM X,":
		case "OCM Y,":
		case "TCA":
		case "TCB":
		case "TCX":
		case "TCY":
		case "TCM":
		case "TCM X,":
		case "TCM Y,":
		case "ANDA":A &= B; break;
		case "ORA":A |= B; break;
		case "XORA":A ^= B; break;
		case "ANDI":X &= Y; break;
		case "ORI":X |= Y; break;
		case "XORI":X ^= Y; break;
		case "CLA":A = 0; break;
		case "CLB":A = 0; break;
		case "CLX":A = 0; break;
		case "CLY":A = 0; break;
		case "CLM":m[operand] = 0; break;
		case "CLM X,":m[operand + X] = 0; break;
		case "CLM Y,":m[operand + Y] = 0; break;
		case "CLD":screen = [];
		case "GOS":
		case "RTN":
		case "END":clearInterval(loop); loop = null; incPC = false; break;
	}
	
	
	if(incPC)PC += instructionSet[IR][1];
	if(PC >= 256){
		clearInterval(loop);
		PC = 0;
	}
	
	var line = lineMap[PC];
	divCount = document.getElementById("line" + line);
	if(divCount != null)divCount.classList.add('selected');
	
	A %= 256;
	B %= 256;
	X %= 256;
	Y %= 256;
	A += A < 0 ? 256 : 0;
	B += B < 0 ? 256 : 0;
	X += X < 0 ? 256 : 0;
	Y += Y < 0 ? 256 : 0;
	
	updateCpuState();
}

//add char to screen
function print(ch){
	
	var s = String.fromCharCode(ch);
	
	//console.log("screen.length: " + screen.length);
	if(screen.length == 0)screen.push([]);
	//console.log("screen.length: " + screen.length);
	var y = screen.length - 1;
	var x = screen[y].length;
	
	if(ch == 8){//backspace
		screen[y] = screen[y].slice(0, screen[y].length -1);
		return;
	}
	if(ch == 10){//new line
		screen.push("");
		if(screen.length >= 11)screen.shift();//adjusted to 11 since length is index + 1
		return;
	}
	
	if(x >= 32){
		y++
		x = 0;
		screen.push("");
	}
	
	screen[y] += s;
	
	if(y >= 10)screen.shift();
	//console.log("Screen: " + screen.toString());
}

//emulate CPU and run program
function CPUrun(){
	//lockEditor();
	if(loop != null)return;
	
	var frequency = document.getElementById("frequency").value;
	frequency = 1000/frequency;
	
	loop = setInterval(function(){
		
		CPUstep();
		
		
	},frequency);
	
	
}

//pause emulation
function CPUpause(){
	clearInterval(loop);
	loop = null;
}

// reset CPU state
function CPUreset(){
	//unlockEditor();
	clearInterval(loop);
	loop = null;
	
	var line = lineMap[PC];
	var divCount = document.getElementById("line" + line);
	if(divCount != null)divCount.classList.remove('selected');
	
	divCount = document.getElementById("line1");
	if(divCount != null)divCount.classList.add('selected');
	
	PC = 0;
	IR = 0;
	SP = 0;
	A = 0;
	B = 0;
	X = 0;
	Y = 0;
	screen = new Array();

	AnotEqualB = 0;
	AgreaterB = 0;
	BgreaterA = 0;
	CarryOut = 0;
	
	keyboard = document.getElementById("keyboard").value = "";
	
	updateCpuState();
}

//lock coding input
function lockEditor(){
	if(compilingLoop != null)clearInterval(compilingLoop);
	compilingLoop = null;
	document.getElementById("codeInput").readOnly = true;
}

//unlock coding input
function unlockEditor(){
	if(compilingLoop == null)compilingLoop = setInterval(function(){
		compile();
	}, 100);
	document.getElementById("codeInput").readOnly = false;
}

function fileIO(){
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	//navigator.webkitPersistentStorage
	
	var MB = 1048576;
	var size = 5 * MB;
	
	/*
	navigator.webkitPersistentStorage.requestQuota(size, function(grantedBytes) {  
		console.log(grantedBytes, 'bytes granted');
	}, function(e) {
		console.log("Failed to retrieve sandbox file system");
		console.log("Error: " + e);
		document.getElementById("outputFile").style.display = "none";
		document.getElementById("inputFile").style.display = "none";
	});
	*/
	
	
	navigator.webkitPersistentStorage.requestQuota(size, function(grantedBytes){
			console.log('Granted: ',grantedBytes, "bytes");
		
		window.requestFileSystem(PERSISTENT, grantedBytes, function(fileSystem){
			console.log('Opened file system: ' + fileSystem.name);
			
			fileSystem.root.getFile('program.txt', {create: true, exclusive: true}, function(fileEntry) {

				// fileEntry.isFile === true
				// fileEntry.name == 'log.txt'
				// fileEntry.fullPath == '/log.txt'
				console.log("fileEntry.fullPath", fileEntry.fullPath);

			}, null);
			
			
		}, function(e){
			console.log("Failed to retrieve sandbox file system");
			console.log("Error: " + e);
			document.getElementById("outputFile").style.display = "none";
			document.getElementById("inputFile").style.display = "none";
		});
	}, function(e) {
		console.log("Failed to request quota");
		console.log('Error: ', e);
		document.getElementById("outputFile").style.display = "none";
		document.getElementById("inputFile").style.display = "none";
	});
}

//read file
function loadFile(){
	var codeInput = document.getElementById("codeInput");
	
	
	
	
	
}

//save file
function saveFile(){
	var codeInput = document.getElementById("codeInput");
	
	var fileSystem = window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
	
}

function onInitFs(fs) {

  fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

    // fileEntry.isFile === true
    // fileEntry.name == 'log.txt'
    // fileEntry.fullPath == '/log.txt'

  }, errorHandler);

}

