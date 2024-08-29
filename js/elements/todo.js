/**
 * 
 * @param  options 
 */
function Todo(options) {
    if (
        options === undefined &&
        typeof(options) === 'string' &&
        typeof(options) === 'number'
        ) {
        
    }
    /**
     * use param.id as an id  for thisTodo if it is defined 
     * or else generate a random id.*/
    this.id = options ? options.id ? options.id : random_id() : random_id();
    this.catagory = 'personal';
    /* visual elements*/
    this.description = document.createElement();

}