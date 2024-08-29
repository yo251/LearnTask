function saveToLocalStorage(property_path, new_value) {
	let property_path_list = property_path.split('.');
	if (!localStorage[property_path_list[0]]) {
		localStorage[property_path_list[0]] = '{}';
	}
	if (property_path_list.length === 1) {
		//creating or reassigning localStorage property.
		localStorage[property_path_list[0]] = new_value;
	}
	else {
		//creating or reassigning a property of an object stored stringified 
		//to localStorage.
		try {
			let object = JSON.parse(localStorage[property_path_list[0]]);
			let property_bracket_path = ''
			for (let i = 1; i < property_path_list.length; i++) {
				const midpoint_property = property_path_list[i];
				property_bracket_path += "['" + midpoint_property + "']";
				let propertyIsValid = midpoint_property.length < 20;
				let PropertyIsDefined = eval(`object${property_bracket_path} !== undefined`);
				if (!propertyIsValid) {
					console.error('invalid midpoint_property ' + midpoint_property);
					break;
				}
				else if (!PropertyIsDefined) {
					//midpoint property is not valid.
					//create this midpoint property.
					eval(`object${property_bracket_path} = {}`);
				}
				if (i === property_path_list.length - 1) {
					//we reach the property we want assing it to new value.
					//create or reasign property.
					eval(`object${property_bracket_path} = new_value`);
					localStorage[property_path_list[0]] = JSON.stringify(object) ;
				}
			}
		} catch (error) {
			if ('JSON.parse' in error) {
				//JSON.parse related error has ocurred.
				console.error('problem when parsing localStorage.'+ property_path_list[0]);
			}
			console.error(error);
		}
	}
}
function getValueLocalStorage(property_path) {
	let property_path_list = property_path.split('.');
	if (property_path_list.length === 1) {
		//creating or reassigning localStorage property.
		return localStorage[property_path_list[0]];
	}
	else {
		//creating or reassigning a property of an object stored stringified 
		//to localStorage.
		try {
			let object = JSON.parse(localStorage[property_path_list[0]]);
			let property_bracket_path = ''
			let property_value;
			for (let i = 1; i < property_path_list.length; i++) {
				const midpoint_property = property_path_list[i];
				property_bracket_path += "['" + midpoint_property + "']";
				let propertyIsValid = midpoint_property.length < 20;
				let MidpointPropertyIsDefined = eval(`object${property_bracket_path} !== undefined`);
				if (i === property_path_list.length - 1) {
					//we reach the property we want assing it to new value.
					//create or reasign property.
					eval(`property_value = object${property_bracket_path}`)
					return property_value;
				}
				else if (!MidpointPropertyIsDefined) {
					//midpoint property is not defined.
					console.error(`cannot get value of property ${property_path} midpoint property ${midpoint_property}`);
					break;
				} else {
					
				}
			}
		} catch (error) {
			if ('JSON.parse' in error) {
				//JSON.parse related error has ocurred.
				console.error('problem when parsing localStorage.'+ property_path_list[0]);
			}
			console.error(error);
		}
	}
}
function removeFromLocalStorage(property_path){
	let property_path_list = property_path.split('.');
	if (property_path_list.length === 1) {
		//creating or reassigning localStorage property.
		delete localStorage[property_path_list[0]];
	}
	else {
		//creating or reassigning a property of an object stored stringified 
		//to localStorage.
		try {
			let object = JSON.parse(localStorage[property_path_list[0]]);
			let property_bracket_path = ''
			for (let i = 1; i < property_path_list.length; i++) {
				const midpoint_property = property_path_list[i];
				property_bracket_path += "['" + midpoint_property + "']";
				let propertyIsValid = midpoint_property.length < 20;
				let MidpointPropertyIsDefined = eval(`object${property_bracket_path} !== undefined`);
				if (i === property_path_list.length - 1) {
					//we reach the property we want assing it to new value.
					//create or reasign property.
					eval(`delete object${property_bracket_path}`);
					localStorage[property_path_list[0]] = JSON.stringify(object);
				}
				else if (!MidpointPropertyIsDefined) {
					//midpoint property is not defined.
					console.error(`cannot remove property ${property_path}\n midpoint property ${midpoint_property} is not defined`);
					break;
				}
			}
		} catch (error) {
			if ('JSON.parse' in error) {
				//JSON.parse related error has ocurred.
				console.error('problem when parsing localStorage.'+ property_path_list[0]);
			}
			console.error(error);
		}
	}
}
function random_id(){
	id = '';
	chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
	for(i=1; i<14; i++){
		id += chars[Math.floor(Math.random() * 36)];
	}
	//recursivly setting new id till no conflict is found.
	if(localStorage.tasks == null){
		localStorage.tasks = '{}';
	}
	if(localStorage.projects == null){
		localStorage.projects = '{}';
	}  
	if(localStorage.projects.includes(id) ){
		console.log(`id ${id} conflict found`);
		console.log('creating new id');
		id = random_id();
	}
	return id
}