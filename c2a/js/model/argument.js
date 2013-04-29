var Argument = function(name, datatype, value){
	this.name_ = name;
	this.datatype_ = datatype;
	this.value_ = value ? value : null;
}

Argument.prototype.getName = function(){
	return this.name_;
}

Argument.prototype.getDatatype = function(){
	return this.datatype_;
}

Argument.prototype.getValue = function(){
	return this.value_;
}

Argument.prototype.setValue = function(value){
	this.value_ = value;
	console.log(JSON.stringify(this));
}