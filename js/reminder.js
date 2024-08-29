/*
*parameters:
are set like this
*(notify_time,{id, notified, onnotify})
*/
function Reminder(notify_time, options){
	this.id = options ? options.id ? options.id : random_id() :  random_id();
	this.notify_time = new Date(notify_time).getTime();	
	Object.defineProperty(this, 'setNotifyTime', {
		set : function setNotifyTime(new_value){
			//new value is a valid date string or a epoch timestamps.
			if(new Date(new_value).getTime() !== this.notify_time) {
				this.notify_time = new Date(new_value);;
				remindersManager.add(this);
			}
		}
	});
	this.notified = options ? options.notified ? options.notified : false : false ; ;
	this.onnotify = options ? options.onnotify ? options.onnotify : function(){} : function(){};
	this.notify = function(){
		this.onnotify();
		this.notified = true;
		remindersManager.remove(this);
	}
	//if reminder.notify_time sepcify a date after current time or not notified.
	if(this.notify_time > Date.now() || !this.notified){
		remindersManager.add(this);
	}
}